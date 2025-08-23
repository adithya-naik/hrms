import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { LeaveType, LeaveStatus, UserRole, Prisma } from '@prisma/client';
import { sendEmail, emailTemplates } from '../lib/email';
import { logger } from '../utils/logger';
import multer from 'multer';
import path from 'path';
import { safeDate, formatDate } from '../utils/date';

const createLeaveSchema = z.object({
  leaveType: z.nativeEnum(LeaveType),
  startDate: z.string()
    .refine((s) => !isNaN(new Date(s).getTime()), { message: "Invalid start date format" })
    .transform((s) => safeDate(s)),
  endDate: z.string()
    .refine((s) => !isNaN(new Date(s).getTime()), { message: "Invalid end date format" })
    .transform((s) => safeDate(s)),
  reason: z.string().min(1),

  // Convert string "true"/"false" from form-data to boolean
  isHalfDay: z.union([z.string(), z.boolean()]).transform((val) => val === 'true' || val === true).default(false),
  emergencyLeave: z.union([z.string(), z.boolean()]).transform((val) => val === 'true' || val === true).default(false),

  attachments: z.array(z.string()).optional().default([]),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be on or after start date",
  path: ["endDate"],
});

const approveRejectSchema = z.object({
  rejectionReason: z.string().optional(),
});

// Uploads will go to 'uploads/' folder with original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Only allow specific file types
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'));
  }
};

export const upload = multer({ storage, fileFilter });

class LeaveController {
  constructor() {
    this.createLeave = this.createLeave.bind(this);
    this.getLeaves = this.getLeaves.bind(this);
    this.getLeaveBalances = this.getLeaveBalances.bind(this);
    this.approveLeave = this.approveLeave.bind(this);
    this.rejectLeave = this.rejectLeave.bind(this);
    this.cancelLeave = this.cancelLeave.bind(this);
    this.getTeamLeaves = this.getTeamLeaves.bind(this);
    this.getLeavePolicies = this.getLeavePolicies.bind(this);
    this.createLeavePolicy = this.createLeavePolicy.bind(this);
    this.updateLeavePolicy = this.updateLeavePolicy.bind(this);
    this.deleteLeavePolicy = this.deleteLeavePolicy.bind(this);
    this.updateDayStatuses = this.updateDayStatuses.bind(this);
  }

  private async getCompanyInfo() {
    const setting = await prisma.setting.findFirst();
    console.log(setting);
    return {
      companyName: setting?.companyName || "Your Company",
      logoUrl: setting?.logoUrl || null,
      address: setting?.address || null,
      contactEmail: setting?.contactEmail || null,
      contactPhone: setting?.contactPhone || null,
    };
  }

  async getLeaves(req: AuthRequest, res: Response) {
    const { status, page = '1', limit = '10' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = { requesterId: req.user!.id };
    if (status) {
      where.status = status;
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
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.leave.count({ where }),
    ]);

    res.json({
      leaves,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  }

  async createLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // Extract attachments uploaded via multer
      const files = req.files as Express.Multer.File[] | undefined;

      // Convert file paths to URLs accessible from frontend
      const attachments = files?.map(file => `/uploads/${file.filename}`) || [];

      // Parse the rest of the body with enhanced data including attachments
      const bodyWithAttachments = { ...req.body, attachments };
      logger.info(`Received payload: ${JSON.stringify(bodyWithAttachments)}`);

      const data = createLeaveSchema.parse(bodyWithAttachments);
      const userId = req.user!.id;

      logger.info(`Parsed startDate: ${data.startDate}, endDate: ${data.endDate}`);
      logger.info(`startDate instanceof Date: ${data.startDate instanceof Date}`);
      logger.info(`endDate instanceof Date: ${data.endDate instanceof Date}`);
      logger.info(`startDate valid: ${!isNaN(data.startDate.getTime())}`);
      logger.info(`endDate valid: ${!isNaN(data.endDate.getTime())}`);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { 
          manager: true,
          hr: true 
        },
      });

      if (!user) {
        throw createError('User not found', 404);
      }

      // Validate leave request
      await this.validateLeaveRequest(userId, data);

      // Calculate total days
      const totalDays = this.calculateLeaveDays(data.startDate, data.endDate, data.isHalfDay);

      const leave = await prisma.leave.create({
        data: {
          ...data,
          requesterId: userId,
          totalDays,
          attachments, // Save URLs
        },
        include: {
          requester: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              manager: {
                select: {
                  email: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      // Update pending days in leave balance with leave start year
      await this.updateLeaveBalance(userId, data.leaveType, totalDays, 'pending', data.startDate.getFullYear());

      const company = await this.getCompanyInfo();

      const emailData = {
        requesterName: `${user.firstName} ${user.lastName}`,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        totalDays,
        reason: data.reason,
      };

      logger.info(`Email data: ${JSON.stringify(emailData)}`);

      const template = emailTemplates.leaveRequest(company, emailData);

      // Send notification to manager
      if (user.manager?.email) {
        const ok = await this.sendEmailAndLog(
          { to: user.manager.email, ...template },
          "leaveRequest"
        );
        await this.sendAppNotification(
          user.manager.id,
          "New Leave Request",
          `${user.firstName} ${user.lastName} requested ${totalDays} day(s) of ${data.leaveType}.`,
          ok ? "info" : "error",
          leave.id
        );
      }

      // Send notification to HR
      if (user.hr?.email) {
        const ok = await this.sendEmailAndLog(
          { to: user.hr.email, ...template },
          "leaveRequest"
        );
        await this.sendAppNotification(
          user.hr.id,
          "New Leave Request",
          `${user.firstName} ${user.lastName} requested ${totalDays} day(s) of ${data.leaveType}.`,
          ok ? "info" : "error",
          leave.id
        );
      }

      // Send submission confirmation to requester
      const submittedTemplate = emailTemplates.leaveSubmitted(company, emailData);
      const okSubmitted = await this.sendEmailAndLog(
        { to: user.email, ...submittedTemplate },
        "leaveSubmitted"
      );
      await this.sendAppNotification(
        user.id,
        "Leave Submitted",
        `Your ${data.leaveType} leave (${totalDays} day${totalDays === 1 ? "" : "s"}) is pending approval.`,
        okSubmitted ? "info" : "error",
        leave.id
      );

      res.status(201).json({ message: "Leave request created successfully", leave });
    } catch (error) {
      next(error);
    }
  }

  async getLeaveBalances(req: AuthRequest, res: Response) {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();
    console.log("\n\n\User from token:\n\n\n", req.user);
    
    const balances = await prisma.leaveBalance.findMany({
      where: {
        userId: req.user!.id,
        year,
      },
      include: {
        leavePolicy: true,
      },
    });

    res.json({ balances });
  }

  async approveLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

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
        },
      });

      if (!leave) {
        throw createError('Leave request not found', 404);
      }

      if (leave.status !== LeaveStatus.PENDING) {
        throw createError('Leave request already processed', 400);
      }

      // Check authorization
      if (req.user!.role === UserRole.MANAGER && leave.requester.managerId !== userId) {
        throw createError('You can only approve leaves for your team members', 403);
      }

      const updatedLeave = await prisma.leave.update({
        where: { id },
        data: {
          status: LeaveStatus.APPROVED,
          approverId: userId,
          approvedDate: new Date(),
        },
      });

      // Update leave balance with leave start year
      await this.updateLeaveBalance(
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        'approve',
        leave.startDate.getFullYear()
      );

      const company = await this.getCompanyInfo();

      const emailData = {
        requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        totalDays: leave.totalDays,
      };

      const template = emailTemplates.leaveApproved(company, emailData);

      const ok = await this.sendEmailAndLog(
        { to: leave.requester.email, ...template },
        "leaveApproved"
      );

      await this.sendAppNotification(
        leave.requesterId,
        "Leave Approved",
        `Your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"}) was approved.`,
        ok ? "success" : "info",
        leave.id
      );

      res.json({ message: "Leave approved successfully", leave: updatedLeave });
    } catch (error) {
      next(error);
    }
  }

  async rejectLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { rejectionReason } = approveRejectSchema.parse(req.body);
      const userId = req.user!.id;

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
        },
      });

      if (!leave) {
        throw createError('Leave request not found', 404);
      }

      if (leave.status !== LeaveStatus.PENDING) {
        throw createError('Leave request already processed', 400);
      }

      // Check authorization
      if (req.user!.role === UserRole.MANAGER && leave.requester.managerId !== userId) {
        throw createError('You can only reject leaves for your team members', 403);
      }

      const updatedLeave = await prisma.leave.update({
        where: { id },
        data: {
          status: LeaveStatus.REJECTED,
          approverId: userId,
          rejectionReason,
        },
      });

      // Restore pending balance with leave start year
      await this.updateLeaveBalance(
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        'reject',
        leave.startDate.getFullYear()
      );

      const company = await this.getCompanyInfo();

      const emailData = {
        requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        totalDays: leave.totalDays,
        reason: rejectionReason || "Not specified",
      };

      const template = emailTemplates.leaveRejected(company, emailData);

      const ok = await this.sendEmailAndLog(
        { to: leave.requester.email, ...template },
        "leaveRejected"
      );

      await this.sendAppNotification(
        leave.requesterId,
        "Leave Rejected",
        `Your ${leave.leaveType} leave was rejected.${rejectionReason ? ` Reason: ${rejectionReason}` : ""}`,
        ok ? "error" : "info",
        leave.id
      );

      res.json({ message: "Leave rejected successfully", leave: updatedLeave });
    } catch (error) {
      next(error);
    }
  }

  async cancelLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = req.user!;

      // Fetch the leave
      const leave = await prisma.leave.findUnique({
        where: { id },
      });

      if (!leave) {
        throw createError('Leave request not found', 404);
      }

      // Only the requester can cancel their own leave
      if (leave.requesterId !== user.id) {
        throw createError('You can only cancel your own leave requests', 403);
      }

      // Only pending or approved leaves can be cancelled
      if (leave.status !== LeaveStatus.PENDING && leave.status !== LeaveStatus.APPROVED) {
        throw createError('Cannot cancel this leave request', 400);
      }

      // Update leave status to CANCELLED
      const updatedLeave = await prisma.leave.update({
        where: { id },
        data: { status: LeaveStatus.CANCELLED },
      });

      // Restore leave balance if needed
      const balanceAction = leave.status === LeaveStatus.PENDING ? 'reject' : 'cancel';
      await this.updateLeaveBalance(
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        balanceAction,
        leave.startDate.getFullYear()
      );

      await this.sendAppNotification(
        user.id,
        "Leave Cancelled",
        `You cancelled your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"}).`,
        "info",
        leave.id
      );

      res.json({ message: "Leave cancelled successfully", leave: updatedLeave });
    } catch (error) {
      next(error);
    }
  }

  async getTeamLeaves(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, page = '1', limit = '10' } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      let where: any = {};

      if (req.user!.role === UserRole.MANAGER) {
        // Get team members for this manager
        where.requester = { managerId: req.user!.id };
      } else if (req.user!.role === UserRole.HR || req.user!.role === UserRole.ADMIN) {
        // HR and Admin can see all leaves
      } else {
        return next(createError("Not authorized to view team leaves", 403));
      }

      if (status) {
        where.status = status;
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
          orderBy: { createdAt: 'desc' },
          skip,
          take: parseInt(limit as string),
        }),
        prisma.leave.count({ where }),
      ]);

      res.json({
        leaves,
        pagination: {
          total,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getLeavePolicies(req: AuthRequest, res: Response) {
    const policies = await prisma.leavePolicy.findMany({
      where: { isActive: true },
      orderBy: { leaveType: 'asc' },
    });

    res.json({ policies });
  }

  async createLeavePolicy(req: AuthRequest, res: Response) {
    const policy = await prisma.leavePolicy.create({
      data: req.body,
    });

    res.status(201).json({ policy });
  }

  async updateLeavePolicy(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const policy = await prisma.leavePolicy.update({
      where: { id },
      data: req.body,
    });

    res.json({ policy });
  }

  async deleteLeavePolicy(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      // Delete leave balances linked to this policy
      await prisma.leaveBalance.deleteMany({
        where: { leavePolicyId: id },
      });

      // Then delete the policy
      await prisma.leavePolicy.delete({
        where: { id },
      });

      res.json({ success: true });
    } catch (error) {
      logger.error('Failed to delete leave policy:', error);
      next(createError('Unable to delete leave policy. It may still be in use.', 400));
    }
  }

  async updateDayStatuses(req: AuthRequest, res: Response) {
    const { id } = req.params; // leaveId
    const { dayStatuses } = req.body as {
      dayStatuses: { date: string; status: LeaveStatus; rejectedReason?: string }[]
    };

    const leave = await prisma.leave.findUnique({
      where: { id },
      include: { requester: true },
    });

    if (!leave) throw createError('Leave request not found', 404);

    if (req.user!.role === UserRole.MANAGER && leave.requester.managerId !== req.user!.id) {
      throw createError('You can only update leaves for your team members', 403);
    }

    // Upsert each day status
    await Promise.all(
      dayStatuses.map(d =>
        prisma.leaveDayStatus.upsert({
          where: { leaveId_date: { leaveId: id, date: new Date(d.date) } },
          update: { status: d.status, reason: d.rejectedReason },
          create: { leaveId: id, date: new Date(d.date), status: d.status, reason: d.rejectedReason },
        })
      )
    );

    // Fetch all updated day statuses
    const updatedDays = await prisma.leaveDayStatus.findMany({ where: { leaveId: id } });

    // Update parent leave status
    if (updatedDays.every(d => d.status === LeaveStatus.REJECTED)) {
      await prisma.leave.update({ where: { id }, data: { status: LeaveStatus.REJECTED } });
    } else if (updatedDays.some(d => d.status === LeaveStatus.APPROVED)) {
      await prisma.leave.update({ where: { id }, data: { status: LeaveStatus.PARTIAL } });
    }

    res.json({ success: true, dayStatuses: updatedDays });
  }

  private async validateLeaveRequest(userId: string, data: z.infer<typeof createLeaveSchema>) {
    // Check if start date is before end date
    if (data.startDate >= data.endDate) {
      throw createError('End date must be after start date', 400);
    }

    // Check if dates are in the future (except emergency leaves)
    if (!data.emergencyLeave) {
      const today = new Date();
      const start = new Date(data.startDate.getFullYear(), data.startDate.getMonth(), data.startDate.getDate());
      const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (start < now) {
        throw createError('Leave start date must be today or in the future', 400);
      }
    }

    // Check for overlapping leaves
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
    });

    if (overlapping) {
      throw createError('You have overlapping leave requests', 400);
    }

    // Get leavePolicyId for the provided leaveType
    const leavePolicyId = await this.getLeavePolicyId(data.leaveType);

    // Check leave balance using leavePolicyId instead of leaveType
    const balance = await prisma.leaveBalance.findUnique({
      where: {
        userId_leavePolicyId_year: {
          userId,
          leavePolicyId,
          year: data.startDate.getFullYear(),
        },
      },
    });

    if (!balance) {
      throw createError('Leave balance not found', 404);
    }

    const totalDays = this.calculateLeaveDays(data.startDate, data.endDate, data.isHalfDay);

    if (balance.availableDays < totalDays) {
      throw createError('Insufficient leave balance', 400);
    }
  }

  private calculateLeaveDays(startDate: Date, endDate: Date, isHalfDay: boolean): number {
    if (isHalfDay) return 0.5;

    const msPerDay = 1000 * 60 * 60 * 24;
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
    if (end < start) return 0;
    const diffDays = Math.floor((end - start) / msPerDay) + 1;
    return diffDays;
  }

  private async updateLeaveBalance(
    userId: string,
    leaveType: LeaveType,
    days: number,
    action: 'pending' | 'approve' | 'reject' | 'cancel',
    year?: number // optional, to handle different years
  ) {
    try {
      const balanceYear = year || new Date().getFullYear();
      const leavePolicyId = await this.getLeavePolicyId(leaveType);

      if (!leavePolicyId) {
        logger.error(`No leave policy found for leave type: ${leaveType}`);
        return;
      }

      const balance = await prisma.leaveBalance.findUnique({
        where: {
          userId_leavePolicyId_year: {
            userId,
            leavePolicyId,
            year: balanceYear,
          },
        },
      });

      if (!balance) {
        logger.error(`Leave balance not found for user ${userId}, policy ${leavePolicyId}, year ${balanceYear}`);
        return;
      }

      let nextUsed = balance.usedDays;
      let nextPending = balance.pendingDays;
      let nextAvail = balance.availableDays;

      switch (action) {
        case 'pending':
          nextPending = balance.pendingDays + days;
          nextAvail = balance.availableDays - days;
          break;
        case 'approve':
          nextUsed = balance.usedDays + days;
          nextPending = balance.pendingDays - days;
          break;
        case 'reject':
          nextPending = balance.pendingDays - days;
          nextAvail = balance.availableDays + days;
          break;
        case 'cancel':
          nextUsed = balance.usedDays - days;
          nextAvail = balance.availableDays + days;
          break;
      }

      // Ensure no negative values
      nextUsed = Math.max(0, nextUsed);
      nextPending = Math.max(0, nextPending);
      nextAvail = Math.max(0, nextAvail);

      const updateData: Prisma.LeaveBalanceUpdateInput = {
        usedDays: nextUsed,
        pendingDays: nextPending,
        availableDays: nextAvail,
      };

      await prisma.leaveBalance.update({
        where: {
          userId_leavePolicyId_year: {
            userId,
            leavePolicyId,
            year: balanceYear,
          },
        },
        data: updateData,
      });
    } catch (error) {
      logger.error('Failed to update leave balance', error);
    }
  }

  private async getLeavePolicyId(leaveType: LeaveType): Promise<string> {
    const policy = await prisma.leavePolicy.findFirst({
      where: { leaveType, isActive: true },
    });
    return policy?.id || '';
  }

  private async sendEmailAndLog(
    opts: { to: string; subject: string; html: string },
    label: "leaveRequest" | "leaveApproved" | "leaveRejected" | "leaveSubmitted"
  ): Promise<boolean> {
    try {
      await sendEmail({ to: opts.to, subject: opts.subject, html: opts.html });
      logger.info(`✅ Email sent | ${label} | to=${opts.to}`);
      return true;
    } catch (err) {
      logger.error(`❌ Email failed | ${label} | to=${opts.to} | err=${(err as Error).message}`);
      return false;
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
      await prisma.notification.create({
        data: { userId, title, message, type, leaveId: leaveId || null },
      });
    } catch (err) {
      logger.error(
        `Failed to create notification for user=${userId} | ${title} | ${message} | ${(err as Error).message}`
      );
    }
  }
}

export const leaveController = new LeaveController();