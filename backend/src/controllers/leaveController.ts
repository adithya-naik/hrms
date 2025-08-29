import type { Response, NextFunction, Express } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createError } from "../middleware/errorHandler";
import type { AuthRequest } from "../middleware/auth";
import { LeaveType, LeaveStatus, UserRole } from "@prisma/client";
import { format, addDays as dateFnsAddDays, isSameDay } from "date-fns";
import { logger } from "../utils/logger";
import multer from "multer";
import path from "path";
import { safeDate } from "../utils/date";
import { sendEmail, emailTemplates } from "../lib/email";

// List of public holidays for 2025
const PUBLIC_HOLIDAYS_2025 = [
  new Date(2025, 0, 1),   // New Year Day
  new Date(2025, 0, 14),  // Sankranti
  new Date(2025, 1, 26),  // Maha Shivaratri
  new Date(2025, 2, 14),  // Holi
  new Date(2025, 7, 15),  // Independence Day
  new Date(2025, 7, 27),  // Ganesh Chaturthi
  new Date(2025, 9, 2),   // Dussera
  new Date(2025, 9, 20),  // Deepavali
  new Date(2025, 9, 21),  // Govardhan Puja
  new Date(2025, 11, 25)  // Christmas
].map(date => new Date(date.getFullYear(), date.getMonth(), date.getDate()));

/**
 * Checks if a given date is a public holiday or Sunday
 */
function isHolidayOrSunday(date: Date): boolean {
  // Check if it's Sunday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  if (date.getDay() === 0) return true;
  
  // Check if it's a public holiday
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return PUBLIC_HOLIDAYS_2025.some(holiday => 
    isSameDay(holiday, dateOnly)
  );
}

// Utility: Add days to a Date object
function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const createLeaveSchema = z
  .object({
    leaveType: z.nativeEnum(LeaveType),
    startDate: z
      .string()
      .refine((s) => !isNaN(new Date(s).getTime()), { message: "Invalid start date format" })
      .transform((s) => safeDate(s)),
    endDate: z
      .string()
      .refine((s) => !isNaN(new Date(s).getTime()), { message: "Invalid end date format" })
      .transform((s) => safeDate(s)),
    reason: z.string().min(1),
    isHalfDay: z
      .union([z.string(), z.boolean()])
      .transform((val) => val === "true" || val === true)
      .default(false),
    emergencyLeave: z
      .union([z.string(), z.boolean()])
      .transform((val) => val === "true" || val === true)
      .default(false),
    attachments: z.array(z.string()).optional().default([]),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be on or after start date",
    path: ["endDate"],
  })

const approveRejectSchema = z.object({
  rejectionReason: z.string().optional(),
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`)
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error("File type not allowed"))
  }
}

export const upload = multer({ storage, fileFilter })

class LeaveController {
  constructor() {
    this.createLeave = this.createLeave.bind(this)
    this.getLeaves = this.getLeaves.bind(this)
    this.getLeaveBalances = this.getLeaveBalances.bind(this)
    this.approveLeave = this.approveLeave.bind(this)
    this.rejectLeave = this.rejectLeave.bind(this)
    this.cancelLeave = this.cancelLeave.bind(this)
    this.getTeamLeaves = this.getTeamLeaves.bind(this)
    this.getLeavePolicies = this.getLeavePolicies.bind(this)
    this.createLeavePolicy = this.createLeavePolicy.bind(this)
    this.updateLeavePolicy = this.updateLeavePolicy.bind(this)
    this.deleteLeavePolicy = this.deleteLeavePolicy.bind(this)
    this.updateDayStatuses = this.updateDayStatuses.bind(this)
    this.getMyLeaveDates = this.getMyLeaveDates.bind(this)
  }

  private async getCompanyInfo() {
    const setting = await prisma.setting.findFirst()
    return {
      companyName: setting?.companyName || "Your Company",
      logoUrl: setting?.logoUrl || null,
      address: setting?.address || null,
      contactEmail: setting?.contactEmail || null,
      contactPhone: setting?.contactPhone || null,
    }
  }

  async getLeaves(req: AuthRequest, res: Response) {
    const { status, page = "1", limit = "10" } = req.query
    const skip = (Number.parseInt(page as string) - 1) * Number.parseInt(limit as string)

    const where: any = { requesterId: req.user!.id }
    if (status) {
      where.status = status
    }

    const [leaves, total] = await Promise.all([
      prisma.leave.findMany({
        where,
        include: {
          approver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: Number.parseInt(limit as string),
      }),
      prisma.leave.count({ where }),
    ])

    res.json({
      leaves,
      pagination: {
        total,
        page: Number.parseInt(page as string),
        limit: Number.parseInt(limit as string),
        totalPages: Math.ceil(total / Number.parseInt(limit as string)),
      },
    })
  }

  async createLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[] | undefined
      const attachments = files?.map((file) => `/uploads/${file.filename}`) || []
      const bodyWithAttachments = { ...req.body, attachments }

      const data = createLeaveSchema.parse(bodyWithAttachments)
      const userId = req.user!.id

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { manager: true, hr: true },
      })
      if (!user) throw createError("User not found", 404)

      // Validate against balances & overlapping
      await this.validateLeaveRequest(userId, data)

      const totalDays = this.calculateLeaveDays(data.startDate, data.endDate, data.isHalfDay)
      const policy = await prisma.leavePolicy.findUnique({ where: { leaveType: data.leaveType } })
      if (!policy) throw new Error("Leave policy not found")

      // Calculate leave distribution (regular days vs LOP)
      const { regularDays, lopDays, isLOP } = await this.calculateLeaveDistribution(
        userId,
        data.leaveType,
        totalDays,
        data.startDate.getFullYear(),
        data.startDate // Pass startDate to get correct month
      )

      // 1️⃣ Create main leave
      const leave = await prisma.leave.create({
        data: {
          ...data,
          totalDays,
          leavePolicyId: policy.id,
          isLOP: isLOP || lopDays > 0, // Mark as LOP if any days are LOP
          requesterId: userId,
          attachments,
        },
      })

      // 2️⃣ Create LeaveDayStatus entries
      const dayCount = Math.ceil(totalDays)
      const dayStatuses = Array.from({ length: dayCount }).map((_, i) => ({
        leaveId: leave.id,
        date: addDays(data.startDate, i),
        status: LeaveStatus.PENDING,
      }))

      await prisma.leaveDayStatus.createMany({ data: dayStatuses })

      // We'll update balances only when approved

      // 4️⃣ Send emails + notifications
      const company = await this.getCompanyInfo()
      const emailData = {
        requesterName: `${user.firstName} ${user.lastName}`,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        totalDays,
        reason: data.reason,
      }
      const template = emailTemplates.leaveRequest(company, emailData)

      const lopMessage = lopDays > 0 ? ` (${regularDays} from ${data.leaveType}, ${lopDays} as LOP)` : ""

      if (user.manager?.email) {
        const ok = await this.sendEmailAndLog({ to: user.manager.email, ...template }, "leaveRequest")
        await this.sendAppNotification(
          user.manager.id,
          "New Leave Request",
          `${user.firstName} ${user.lastName} requested ${totalDays} day(s) of ${data.leaveType}${lopMessage}.`,
          ok ? "info" : "error",
          leave.id,
        )
      }
      if (user.hr?.email) {
        const ok = await this.sendEmailAndLog({ to: user.hr.email, ...template }, "leaveRequest")
        await this.sendAppNotification(
          user.hr.id,
          "New Leave Request",
          `${user.firstName} ${user.lastName} requested ${totalDays} day(s) of ${data.leaveType}${lopMessage}.`,
          ok ? "info" : "error",
          leave.id,
        )
      }

      const submittedTemplate = emailTemplates.leaveSubmitted(company, emailData)
      const okSubmitted = await this.sendEmailAndLog({ to: user.email, ...submittedTemplate }, "leaveSubmitted")
      await this.sendAppNotification(
        user.id,
        "Leave Submitted",
        `Your ${data.leaveType} leave (${totalDays} day${totalDays > 1 ? "s" : ""}) is pending approval${lopMessage}.`,
        okSubmitted ? "info" : "error",
        leave.id,
      )

      return res.status(201).json({ message: "Leave created successfully", leave })
    } catch (error) {
      next(error)
    }
  }

  async getLeaveBalances(req: AuthRequest, res: Response) {
    const year = Number.parseInt(req.query.year as string) || new Date().getFullYear()

    const balances = await prisma.leaveBalance.findMany({
      where: {
        userId: req.user!.id,
        year,
      },
      include: {
        leavePolicy: true,
      },
    })

    res.json({ balances })
  }

  async getMyLeaveDates(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id

      const leaves = await prisma.leave.findMany({
        where: { requesterId: userId },
        select: {
          id: true,
          leaveType: true,
          status: true,
          dayStatuses: {
            select: {
              id: true,
              date: true,
              status: true,
              reason: true,
            },
          },
        },
      })

      const results = leaves.flatMap((leave) =>
        leave.dayStatuses.map((day) => ({
          leaveId: leave.id,
          leaveType: leave.leaveType,
          overallStatus: leave.status,
          date: format(new Date(day.date), "yyyy-MM-dd"),
          dayStatus: day.status,
          rejectionReason: day.reason || null,
        })),
      )

      res.json(results)
    } catch (err) {
      console.error("❌ getMyLeaveDates error:", err)
      res.status(500).json({ error: "Failed to fetch leave dates" })
    }
  }

  async approveLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user!.id

      const leave = await prisma.leave.findUnique({
        where: { id },
        include: {
          requester: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              managerId: true,
            },
          },
          dayStatuses: true,
        },
      })

      if (!leave) {
        throw createError("Leave request not found", 404)
      }

      if (leave.status !== LeaveStatus.PENDING) {
        throw createError("Leave request already processed", 400)
      }

      if (req.user!.role === UserRole.MANAGER && leave.requester.managerId !== userId) {
        throw createError("You can only approve leaves for your team members", 403)
      }

      await prisma.$transaction(async (tx) => {
        // Update leave status
        await tx.leave.update({
          where: { id },
          data: {
            status: LeaveStatus.APPROVED,
            approverId: userId,
            approvedDate: new Date(),
          },
        })

        // Update all day statuses to APPROVED
        await tx.leaveDayStatus.updateMany({
          where: { leaveId: id },
          data: { status: LeaveStatus.APPROVED },
        })

        await this.updateLeaveBalanceOnApproval(
          tx,
          leave.requesterId,
          leave.leaveType,
          leave.totalDays,
          leave.startDate.getFullYear(),
          leave.startDate // Pass startDate
        )
      })

      const company = await this.getCompanyInfo()

      const emailData = {
        requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        totalDays: leave.totalDays,
      }

      const template = emailTemplates.leaveApproved(company, emailData)

      const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...template }, "leaveApproved")

      await this.sendAppNotification(
        leave.requesterId,
        "Leave Approved",
        `Your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"}) was approved${leave.isLOP ? " (includes LOP)" : ""}.`,
        ok ? "success" : "info",
        leave.id,
      )

      res.json({ message: "Leave approved successfully", leave })
    } catch (error) {
      next(error)
    }
  }

  async rejectLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { rejectionReason } = approveRejectSchema.parse(req.body)
      const userId = req.user!.id

      const leave = await prisma.leave.findUnique({
        where: { id },
        include: {
          requester: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              managerId: true,
            },
          },
          dayStatuses: true,
        },
      })

      if (!leave) {
        throw createError("Leave request not found", 404)
      }

      if (leave.status !== LeaveStatus.PENDING) {
        throw createError("Leave request already processed", 400)
      }

      if (req.user!.role === UserRole.MANAGER && leave.requester.managerId !== userId) {
        throw createError("You can only reject leaves for your team members", 403)
      }

      await prisma.$transaction(async (tx) => {
        // Update leave status
        await tx.leave.update({
          where: { id },
          data: {
            status: LeaveStatus.REJECTED,
            approverId: userId,
            rejectionReason,
          },
        })

        // Update all day statuses to REJECTED
        await tx.leaveDayStatus.updateMany({
          where: { leaveId: id },
          data: {
            status: LeaveStatus.REJECTED,
            reason: rejectionReason,
          },
        })
      })

      const company = await this.getCompanyInfo()

      const emailData = {
        requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        totalDays: leave.totalDays,
        reason: rejectionReason || "Not specified",
      }

      const template = emailTemplates.leaveRejected(company, emailData)

      const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...template }, "leaveRejected")

      await this.sendAppNotification(
        leave.requesterId,
        "Leave Rejected",
        `Your ${leave.leaveType} leave was rejected.${rejectionReason ? ` Reason: ${rejectionReason}` : ""}`,
        ok ? "error" : "info",
        leave.id,
      )

      res.json({ message: "Leave rejected successfully", leave })
    } catch (error) {
      next(error)
    }
  }

  async cancelLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const user = req.user!

      const leave = await prisma.leave.findUnique({
        where: { id },
        include: {
          dayStatuses: true,
        },
      })

      if (!leave) {
        throw createError("Leave request not found", 404)
      }

      if (leave.requesterId !== user.id) {
        throw createError("You can only cancel your own leave requests", 403)
      }

      if (leave.status !== LeaveStatus.PENDING && leave.status !== LeaveStatus.APPROVED) {
        throw createError("Cannot cancel this leave request", 400)
      }

      await prisma.$transaction(async (tx) => {
        // Update leave status
        await tx.leave.update({
          where: { id },
          data: { status: LeaveStatus.CANCELLED },
        })

        // Update all day statuses to CANCELLED
        await tx.leaveDayStatus.updateMany({
          where: { leaveId: id },
          data: { status: LeaveStatus.CANCELLED },
        })

        if (leave.status === LeaveStatus.APPROVED) {
          await this.restoreLeaveBalanceOnCancel(
            tx,
            leave.requesterId,
            leave.leaveType,
            leave.totalDays,
            leave.startDate.getFullYear(),
            leave.startDate // Pass startDate
          )
        }
        // If leave was pending, no balance changes were made, so nothing to restore
      })

      await this.sendAppNotification(
        user.id,
        "Leave Cancelled",
        `You cancelled your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"})${leave.isLOP ? " (includes LOP)" : ""}.`,
        "info",
        leave.id,
      )

      res.json({ message: "Leave cancelled successfully", leave })
    } catch (error) {
      next(error)
    }
  }

  // ... existing code for other methods ...

  async getTeamLeaves(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, page = "1", limit = "10" } = req.query
      const skip = (Number.parseInt(page as string) - 1) * Number.parseInt(limit as string)

      const where: any = {}

      if (req.user!.role === UserRole.MANAGER) {
        where.requester = { managerId: req.user!.id }
      } else if (req.user!.role === UserRole.HR || req.user!.role === UserRole.ADMIN) {
        // HR/Admin can see all leaves
      } else {
        return next(createError("Not authorized to view team leaves", 403))
      }

      if (status) {
        where.status = status
      }

      const [leaves, total] = await Promise.all([
        prisma.leave.findMany({
          where,
          include: {
            requester: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                employeeId: true,
                department: true,
              },
            },
            approver: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: Number.parseInt(limit as string),
        }),
        prisma.leave.count({ where }),
      ])

      res.json({
        leaves,
        pagination: {
          total,
          page: Number.parseInt(page as string),
          limit: Number.parseInt(limit as string),
          totalPages: Math.ceil(total / Number.parseInt(limit as string)),
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async getLeavePolicies(req: AuthRequest, res: Response) {
    const policies = await prisma.leavePolicy.findMany({
      where: { isActive: true },
      orderBy: { leaveType: "asc" },
    })

    res.json({ policies })
  }

  async createLeavePolicy(req: AuthRequest, res: Response) {
    const policy = await prisma.leavePolicy.create({
      data: req.body,
    })

    res.status(201).json({ policy })
  }

  async updateLeavePolicy(req: AuthRequest, res: Response) {
    const { id } = req.params

    const policy = await prisma.leavePolicy.update({
      where: { id },
      data: req.body,
    })

    res.json({ policy })
  }

  async deleteLeavePolicy(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      // Use transaction to ensure all related data is deleted
      await prisma.$transaction(async (tx) => {
        // Delete related leave balances
        await tx.leaveBalance.deleteMany({
          where: { leavePolicyId: id },
        })

        // Delete related leaves and their day statuses (cascade will handle dayStatuses)
        await tx.leave.deleteMany({
          where: { leavePolicyId: id },
        })

        // Delete the policy
        await tx.leavePolicy.delete({
          where: { id },
        })
      })

      res.json({ success: true })
    } catch (error) {
      logger.error("Failed to delete leave policy:", error)
      next(createError("Unable to delete leave policy. It may still be in use.", 400))
    }
  }

  async updateDayStatuses(req: AuthRequest, res: Response) {
  const { id } = req.params
  const { dayStatuses } = req.body as {
    dayStatuses: { date: string; status: LeaveStatus; rejectedReason?: string }[]
  }

  const leave = await prisma.leave.findUnique({
    where: { id },
    include: { 
      requester: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          managerId: true,
        },
      },
    },
  })

  if (!leave) throw createError("Leave request not found", 404)

  if (req.user!.role === UserRole.MANAGER && leave.requester.managerId !== req.user!.id) {
    throw createError("You can only update leaves for your team members", 403)
  }

  await Promise.all(
    dayStatuses.map((d) =>
      prisma.leaveDayStatus.upsert({
        where: { leaveId_date: { leaveId: id, date: new Date(d.date) } },
        update: { status: d.status, reason: d.rejectedReason },
        create: { leaveId: id, date: new Date(d.date), status: d.status, reason: d.rejectedReason },
      }),
    ),
  )

  const updatedDays = await prisma.leaveDayStatus.findMany({ where: { leaveId: id } })

  // Determine the overall leave status
  let newOverallStatus = leave.status
  if (updatedDays.every((d) => d.status === LeaveStatus.REJECTED)) {
    newOverallStatus = LeaveStatus.REJECTED
  } else if (updatedDays.every((d) => d.status === LeaveStatus.APPROVED)) {
    newOverallStatus = LeaveStatus.APPROVED
  } else if (updatedDays.some((d) => d.status === LeaveStatus.APPROVED)) {
    newOverallStatus = LeaveStatus.PARTIAL
  }

  // Update main leave status
  const updatedLeave = await prisma.leave.update({ 
    where: { id }, 
    data: { 
      status: newOverallStatus,
      approverId: req.user!.id,
      approvedDate: newOverallStatus === LeaveStatus.APPROVED ? new Date() : null,
    }
  })

  // Send email notifications based on the new status
  const company = await this.getCompanyInfo()
  const emailData = {
    requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    totalDays: leave.totalDays,
  }

  // Send appropriate email based on overall status
  if (newOverallStatus === LeaveStatus.APPROVED) {
    // All days approved
    const template = emailTemplates.leaveApproved(company, emailData)
    const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...template }, "leaveApproved")
    
    await this.sendAppNotification(
      leave.requesterId,
      "Leave Approved",
      `Your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"}) was approved${leave.isLOP ? " (includes LOP)" : ""}.`,
      ok ? "success" : "info",
      leave.id,
    )

    // Update leave balances when fully approved
    await prisma.$transaction(async (tx) => {
      await this.updateLeaveBalanceOnApproval(
        tx,
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        leave.startDate.getFullYear(),
      )
    })

  } else if (newOverallStatus === LeaveStatus.REJECTED) {
    // All days rejected - get rejection reasons
    const rejectedDays = updatedDays.filter(d => d.status === LeaveStatus.REJECTED)
    const rejectionReasons = rejectedDays
      .map(d => d.reason)
      .filter(r => r && r.trim())
      .join(', ') || "Not specified"

    const template = emailTemplates.leaveRejected(company, { ...emailData, reason: rejectionReasons })
    const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...template }, "leaveRejected")
    
    await this.sendAppNotification(
      leave.requesterId,
      "Leave Rejected",
      `Your ${leave.leaveType} leave was rejected.${rejectionReasons !== "Not specified" ? ` Reason: ${rejectionReasons}` : ""}`,
      ok ? "error" : "info",
      leave.id,
    )

  } else if (newOverallStatus === LeaveStatus.PARTIAL) {
    // Partial approval - send custom email
    const approvedDays = updatedDays.filter(d => d.status === LeaveStatus.APPROVED)
    const rejectedDays = updatedDays.filter(d => d.status === LeaveStatus.REJECTED)
    
    const approvedDates = approvedDays.map(d => format(new Date(d.date), "MMM dd, yyyy")).join(", ")
    const rejectedDates = rejectedDays.map(d => format(new Date(d.date), "MMM dd, yyyy")).join(", ")
    
    const rejectionReasons = rejectedDays
      .map(d => d.reason)
      .filter(r => r && r.trim())
      .join(', ') || "Not specified"

    // Create custom partial approval email
    const partialTemplate = {
      subject: `Partial Approval: ${leave.leaveType} Leave Request`,
      html: `
        <div style="font-family: Inter, -apple-system, Segoe UI, Roboto, Arial; background:#f6f7fb; padding:24px;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee; padding: 20px;">
            <h2 style="margin:0 0 16px 0; color: #f59e0b;">Partial Leave Approval</h2>
            <p>Dear <strong>${emailData.requesterName}</strong>,</p>
            <p>Your ${leave.leaveType} leave request has been <strong>partially approved</strong>.</p>
            
            <div style="margin: 16px 0;">
              <h3 style="color: #10b981; margin: 8px 0;">Approved Days:</h3>
              <p style="margin: 4px 0; padding: 8px; background: #d1fae5; border-radius: 4px;">${approvedDates}</p>
            </div>
            
            <div style="margin: 16px 0;">
              <h3 style="color: #ef4444; margin: 8px 0;">Rejected Days:</h3>
              <p style="margin: 4px 0; padding: 8px; background: #fee2e2; border-radius: 4px;">${rejectedDates}</p>
              ${rejectionReasons !== "Not specified" ? `<p><strong>Reason for rejection:</strong> ${rejectionReasons}</p>` : ""}
            </div>
            
            <p>If you have any questions, please contact your manager or HR.</p>
          </div>
        </div>
      `
    }
    
    const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...partialTemplate }, "leaveRequest")
    
    await this.sendAppNotification(
      leave.requesterId,
      "Leave Partially Approved",
      `Your ${leave.leaveType} leave was partially approved. ${approvedDays.length} day(s) approved, ${rejectedDays.length} day(s) rejected.`,
      ok ? "info" : "error",
      leave.id,
    )

    // Update leave balances for approved days only
    await prisma.$transaction(async (tx) => {
      await this.updateLeaveBalanceOnApproval(
        tx,
        leave.requesterId,
        leave.leaveType,
        approvedDays.length,
        leave.startDate.getFullYear(),
      )
    })
  }

  res.json({ success: true, dayStatuses: updatedDays, overallStatus: newOverallStatus })
}

  private async calculateLeaveDistribution(
    userId: string,
    leaveType: LeaveType,
    totalDays: number,
    year: number,
    startDate?: Date,
  ): Promise<{ regularDays: number; lopDays: number; isLOP: boolean }> {
    // Handle special leave types first
    switch (leaveType) {
      case LeaveType.LOP:
        return { regularDays: 0, lopDays: totalDays, isLOP: true };
      case LeaveType.WFH:
      case LeaveType.CASUAL: // Treat casual leave same as WFH - never LOP
        return { regularDays: totalDays, lopDays: 0, isLOP: false };
      // Continue with other leave types
    }

    const leavePolicyId = await this.getLeavePolicyId(leaveType);
    if (!leavePolicyId) {
      logger.warn(`No active policy found for leave type: ${leaveType}`);
      return { regularDays: 0, lopDays: totalDays, isLOP: true };
    }

    try {
      // For casual leave, always check the balance but don't mark as LOP
      if (leaveType === LeaveType.CASUAL) {
        const balance = await this.getOrCreateBalance(userId, leavePolicyId, year, startDate);
        if (balance.availableDays < totalDays) {
          logger.warn(`Insufficient casual leave balance: ${balance.availableDays} available, ${totalDays} requested`);
          // For casual leave, we still don't mark as LOP, but we should probably handle this case
          // For now, we'll allow it but log a warning
        }
        return { regularDays: totalDays, lopDays: 0, isLOP: false };
      }

      // For other leave types, proceed with normal balance checking
      let balance = null;
      if (startDate) {
        const month = startDate.getMonth() + 1;
        balance = await prisma.leaveBalance.findUnique({
          where: {
            userId_leavePolicyId_year_month: {
              userId,
              leavePolicyId,
              year,
              month,
            },
          },
        });
        logger.info(`Monthly balance for ${leaveType} (month ${month}): ${JSON.stringify(balance)}`);
      }

      // If no monthly balance found, try to find annual balance
      if (!balance) {
        balance = await prisma.leaveBalance.findFirst({
          where: {
            userId,
            leavePolicyId,
            year,
            month: 0, // Annual balance
          },
        });
        logger.info(`Annual balance for ${leaveType}: ${JSON.stringify(balance)}`);
      }

      if (!balance) {
        logger.warn(`No leave balance found for user ${userId}, policy ${leavePolicyId}, year ${year}`);
        return { regularDays: 0, lopDays: totalDays, isLOP: true };
      }

      // Calculate available days, ensuring we don't go negative
      const availableDays = Math.max(0, balance.availableDays);
      logger.info(`Available days for ${leaveType}: ${availableDays}, Requested: ${totalDays}`);
      
      // If available days is 0, all days are LOP
      if (availableDays <= 0) {
        return { regularDays: 0, lopDays: totalDays, isLOP: true };
      }
      
      // If we have enough balance, all days are regular
      if (availableDays >= totalDays) {
        return { regularDays: totalDays, lopDays: 0, isLOP: false };
      }
      
      // Otherwise, use available balance for regular days and remaining as LOP
      return {
        regularDays: availableDays,
        lopDays: totalDays - availableDays,
        isLOP: true
      };
    } catch (error) {
      logger.error(`Error calculating leave distribution: ${error}`);
      // In case of error, be conservative and mark as LOP
      // (WFH is already handled at the start of the function)
      return { 
        regularDays: 0,
        lopDays: totalDays,
        isLOP: true
      };
    }
  }

  private async updateLeaveBalanceOnApproval(
    tx: any,
    userId: string,
    leaveType: LeaveType,
    totalDays: number,
    year: number,
    startDate?: Date,
  ) {
    // For casual leave, always use the full amount from the casual leave balance
    if (leaveType === LeaveType.CASUAL) {
      await this.updateSpecificLeaveBalance(tx, userId, leaveType, totalDays, "approve", year)
      return
    }
    
    // For other leave types, calculate regular vs LOP days
    const { regularDays, lopDays } = await this.calculateLeaveDistribution(
      userId, 
      leaveType, 
      totalDays, 
      year,
      startDate
    )

    // Update regular leave balance if any regular days are used
    if (regularDays > 0 && leaveType !== LeaveType.LOP) {
      await this.updateSpecificLeaveBalance(tx, userId, leaveType, regularDays, "approve", year)
    }

    // Update LOP balance if any LOP days are used
    if (lopDays > 0) {
      await this.updateSpecificLeaveBalance(tx, userId, LeaveType.LOP, lopDays, "approve", year)
    }
  }

  private async restoreLeaveBalanceOnCancel(
    tx: any,
    userId: string,
    leaveType: LeaveType,
    totalDays: number,
    year: number,
    startDate?: Date,
  ) {
    const { regularDays, lopDays } = await this.calculateLeaveDistribution(
      userId, 
      leaveType, 
      totalDays, 
      year,
      startDate
    )

    // Restore regular leave balance if any regular days were used
    if (regularDays > 0 && leaveType !== LeaveType.LOP) {
      await this.updateSpecificLeaveBalance(tx, userId, leaveType, regularDays, "cancel", year)
    }

    // Restore LOP balance if any LOP days were used
    if (lopDays > 0) {
      await this.updateSpecificLeaveBalance(tx, userId, LeaveType.LOP, lopDays, "cancel", year)
    }
  }

  private async updateSpecificLeaveBalance(
    tx: any,
    userId: string,
    leaveType: LeaveType,
    days: number,
    action: "approve" | "cancel",
    year: number,
  ) {
    try {
      const leavePolicyId = await this.getLeavePolicyId(leaveType)

      if (!leavePolicyId) {
        logger.error(`❌ No leave policy found for leave type: ${leaveType}`)
        throw new Error(`No leave policy found for leave type: ${leaveType}`)
      }

      // First try to find the exact balance record
      let balance = await tx.leaveBalance.findFirst({
        where: {
          userId,
          leavePolicyId,
          year,
          // First try to find a monthly balance if it's not LOP
          ...(leaveType !== LeaveType.LOP ? { month: { not: 0 } } : {})
        },
        orderBy: {
          // Prefer monthly over annual balance
          month: 'desc' as const
        }
      })

      // If no monthly balance found, try annual balance
      if (!balance) {
        balance = await tx.leaveBalance.findUnique({
          where: {
            userId_leavePolicyId_year_month: {
              userId,
              leavePolicyId,
              year,
              month: 0, // Annual balance
            },
          },
        })
      }

      // If still no balance record exists, create one
      if (!balance) {
        const policy = await tx.leavePolicy.findUnique({
          where: { id: leavePolicyId },
        })

        if (!policy) {
          throw new Error(`Leave policy not found: ${leavePolicyId}`)
        }

        // For casual leave, ensure we have a balance record
        if (leaveType === LeaveType.CASUAL) {
          balance = await tx.leaveBalance.create({
            data: {
              userId,
              leavePolicyId,
              year,
              month: 0, // Annual balance by default
              totalQuota: policy.annualQuota || 0,
              usedDays: 0,
              pendingDays: 0,
              availableDays: policy.annualQuota || 0,
              resetDate: new Date(),
            },
          });
          logger.info(`Created new casual leave balance record: ${JSON.stringify(balance)}`);
          return;
        }

        balance = await tx.leaveBalance.create({
          data: {
            userId,
            leavePolicyId,
            year,
            month: 0, // Annual balance by default
            totalQuota: policy.annualQuota || 0,
            usedDays: 0,
            pendingDays: 0,
            availableDays: policy.annualQuota || 0,
            resetDate: new Date(),
          },
        });
        logger.info(`Created new balance record: ${JSON.stringify(balance)}`);
      }

      logger.info(`🔄 Balance update: user=${userId}, type=${leaveType}, action=${action}, days=${days}`)
      logger.info(`📊 Before - Used: ${balance.usedDays}, Available: ${balance.availableDays}, Total: ${balance.totalQuota}`)

      // Calculate new values
      let newUsedDays = balance.usedDays;
      let newAvailableDays = balance.availableDays;

      if (action === "approve") {
        // When approving, move days from pending to used
        newUsedDays = balance.usedDays + days;
        newAvailableDays = Math.max(0, balance.availableDays - days);
      } else {
        // When cancelling, move days from used back to available
        newUsedDays = Math.max(0, balance.usedDays - days);
        newAvailableDays = balance.availableDays + days;
      }

      // Ensure we don't exceed total quota
      newAvailableDays = Math.min(newAvailableDays, balance.totalQuota);

      logger.info(`📊 After - Used: ${newUsedDays}, Available: ${newAvailableDays}, Total: ${balance.totalQuota}`);

      // Update the balance
      await tx.leaveBalance.update({
        where: { id: balance.id },
        data: {
          usedDays: newUsedDays,
          availableDays: newAvailableDays,
        },
      });

      logger.info(`✅ Balance updated successfully for user ${userId} | ${leaveType} | ${action} | days: ${days}`)
    } catch (error) {
      logger.error(`❌ Failed to update leave balance: ${error}`)
      throw error
    }
  }

  private async validateLeaveRequest(userId: string, data: z.infer<typeof createLeaveSchema>) {
    if (data.startDate >= data.endDate) {
      throw createError("End date must be after start date", 400)
    }
    if (!data.emergencyLeave) {
      const today = new Date()
      const start = new Date(data.startDate.getFullYear(), data.startDate.getMonth(), data.startDate.getDate())
      const now = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      if (start < now) {
        throw createError("Leave start date must be today or in the future", 400)
      }
    }
    const overlapping = await prisma.leave.findFirst({
      where: {
        requesterId: userId,
        status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
        OR: [
          {
            startDate: { lte: data.endDate },
            endDate: { gte: data.startDate },
          },
        ],
      },
    })
    if (overlapping) {
      throw createError("You have overlapping leave requests", 400)
    }
  }

  private calculateLeaveDays(startDate: Date, endDate: Date, isHalfDay: boolean): number {
    if (isHalfDay) return 0.5;
    
    // Create date objects without time components
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    if (end < start) return 0;
    
    let workingDays = 0;
    let currentDate = new Date(start);
    
    // Iterate through each day in the range
    while (currentDate <= end) {
      // Only count weekdays (1-5) that are not public holidays
      if (!isHolidayOrSunday(currentDate)) {
        workingDays++;
      } else {
        logger.info(`Excluding holiday/weekend: ${currentDate.toDateString()}`);
      }
      
      // Move to next day using date-fns addDays to handle month/year transitions
      currentDate = dateFnsAddDays(currentDate, 1);
    }
    
    return workingDays;
  }

  private async getLeavePolicyId(leaveType: LeaveType): Promise<string> {
    const policy = await prisma.leavePolicy.findFirst({
      where: { leaveType, isActive: true },
    })
    return policy?.id || ""
  }

  private async sendEmailAndLog(
    opts: { to: string; subject: string; html: string },
    label: "leaveRequest" | "leaveApproved" | "leaveRejected" | "leaveSubmitted",
  ): Promise<boolean> {
    try {
      await sendEmail({ to: opts.to, subject: opts.subject, html: opts.html })
      logger.info(`✅ Email sent | ${label} | to=${opts.to}`)
      return true
    } catch (err) {
      logger.error(`❌ Email failed | ${label} | to=${opts.to} | err=${(err as Error).message}`)
      return false
    }
  }

  private async sendAppNotification(
  userId: string,
  title: string,
  message: string,
  type: "info" | "success" | "error" = "info",
  leaveId?: string
) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        leaveId: leaveId || null,
        isRead: false,
      },
    });
    logger.info(`✅ Notification created | user=${userId} | title="${title}"`);
    return notification;
  } catch (err) {
    logger.error(`❌ Failed to create notification | user=${userId} | title="${title}" | ${(err as Error).message}`);
    // Do not throw to avoid breaking leave flow
  }
}
}
export const leaveController = new LeaveController()