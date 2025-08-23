import { Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import { LeaveType, LeaveStatus, UserRole, Prisma } from "@prisma/client";
import { sendEmail, emailTemplates } from "../lib/email";
import { logger } from "../utils/logger";
import { safeDate, formatDate } from "../utils/date";

const createLeaveSchema = z.object({
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
  isHalfDay: z.boolean().default(false),
  emergencyLeave: z.boolean().default(false),
  attachments: z.array(z.string()).default([]),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be on or after start date",
  path: ["endDate"],
});

const approveRejectSchema = z.object({
  rejectionReason: z.string().optional(),
});

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
  async createLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      logger.info(`Received payload: ${JSON.stringify(req.body)}`);
      const parsed = createLeaveSchema.parse(req.body);
      const userId = req.user!.id;

      logger.info(`Parsed startDate: ${parsed.startDate}, endDate: ${parsed.endDate}`);
      logger.info(`startDate instanceof Date: ${parsed.startDate instanceof Date}`);
      logger.info(`endDate instanceof Date: ${parsed.endDate instanceof Date}`);
      logger.info(`startDate valid: ${!isNaN(parsed.startDate.getTime())}`);
      logger.info(`endDate valid: ${!isNaN(parsed.endDate.getTime())}`);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { manager: true, hr: true },
      });
      if (!user) throw createError("User not found", 404);

      await this.validateLeaveRequest(userId, parsed);

      const totalDays = this.calculateLeaveDays(
        parsed.startDate,
        parsed.endDate,
        parsed.isHalfDay
      );

      const leave = await prisma.leave.create({
        data: {
          requesterId: userId,
          leaveType: parsed.leaveType,
          startDate: parsed.startDate,
          endDate: parsed.endDate,
          totalDays,
          reason: parsed.reason,
          status: LeaveStatus.PENDING,
          isHalfDay: parsed.isHalfDay,
          emergencyLeave: parsed.emergencyLeave,
          attachments: parsed.attachments,
        },
        include: { requester: true },
      });

      await this.updateLeaveBalance(
        userId,
        parsed.leaveType,
        totalDays,
        "pending",
        parsed.startDate.getFullYear()
      );

      const company = await this.getCompanyInfo();

      const p = {
        requesterName: `${user.firstName} ${user.lastName}`,
        leaveType: parsed.leaveType,
        startDate: parsed.startDate,
        endDate: parsed.endDate,
        totalDays,
        reason: parsed.reason,
      };

      logger.info(`Email data: ${JSON.stringify(p)}`);

      const tpl = emailTemplates.leaveRequest(company, p);

      if (user.manager?.email) {
        const ok = await this.sendEmailAndLog(
          { to: user.manager.email, ...tpl },
          "leaveRequest"
        );
        await this.sendAppNotification(
          user.manager.id,
          "New Leave Request",
          `${user.firstName} ${user.lastName} requested ${totalDays} day(s) of ${parsed.leaveType}.`,
          ok ? "info" : "error",
          leave.id
        );
      }

      if (user.hr?.email) {
        const ok = await this.sendEmailAndLog(
          { to: user.hr.email, ...tpl },
          "leaveRequest"
        );
        await this.sendAppNotification(
          user.hr.id,
          "New Leave Request",
          `${user.firstName} ${user.lastName} requested ${totalDays} day(s) of ${parsed.leaveType}.`,
          ok ? "info" : "error",
          leave.id
        );
      }

      const submittedTpl = emailTemplates.leaveSubmitted(company, p);
      const okSubmitted = await this.sendEmailAndLog(
        { to: user.email, ...submittedTpl },
        "leaveSubmitted"
      );
      await this.sendAppNotification(
        user.id,
        "Leave Submitted",
        `Your ${parsed.leaveType} leave (${totalDays} day${totalDays === 1 ? "" : "s"}) is pending approval.`,
        okSubmitted ? "info" : "error",
        leave.id
      );

      res.status(201).json({ message: "Leave request created successfully", leave });
    } catch (error) {
      next(error);
    }
  }

  async getLeaves(req: AuthRequest, res: Response) {
    const { status, page = "1", limit = "10" } = req.query;
    const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

    const where: any = { requesterId: req.user!.id };
    if (status) where.status = status;

    const [leaves, total] = await Promise.all([
      prisma.leave.findMany({
        where,
        include: {
          approver: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit as string, 10),
      }),
      prisma.leave.count({ where }),
    ]);

    res.json({
      leaves,
      pagination: {
        total,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        totalPages: Math.ceil(total / parseInt(limit as string, 10)),
      },
    });
  }

  async getLeaveBalances(req: AuthRequest, res: Response) {
    const year = parseInt(req.query.year as string, 10) || new Date().getFullYear();

    const balances = await prisma.leaveBalance.findMany({
      where: { userId: req.user!.id, year },
      include: { leavePolicy: true },
    });

    res.json({ balances });
  }

  async approveLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const leaveId = (req.params as any).leaveId || (req.params as any).id;
      const approverId = req.user!.id;

      if (![UserRole.MANAGER, UserRole.HR, UserRole.ADMIN].includes(req.user!.role)) {
        throw createError("Not authorized to approve leaves", 403);
      }

      const current = await prisma.leave.findUnique({
        where: { id: leaveId },
        include: { requester: { select: { managerId: true, firstName: true, lastName: true, email: true } } },
      });
      if (!current) throw createError("Leave not found", 404);
      if (current.status !== LeaveStatus.PENDING) {
        throw createError("Only pending requests can be approved", 400);
      }
      if (req.user!.role === UserRole.MANAGER && current.requester.managerId !== req.user!.id) {
        throw createError("You can only approve your direct reports", 403);
      }

      const leave = await prisma.leave.update({
        where: { id: leaveId },
        data: { status: LeaveStatus.APPROVED, approverId, approvedDate: new Date() },
        include: { requester: true },
      });

      await this.updateLeaveBalance(
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        "approve",
        leave.startDate.getFullYear()
      );

      const company = await this.getCompanyInfo();

      const p = {
        requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        totalDays: leave.totalDays,
      };

      const tpl = emailTemplates.leaveApproved(company, p);

      const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...tpl }, "leaveApproved");
      await this.sendAppNotification(
        leave.requesterId,
        "Leave Approved",
        `Your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"}) was approved.`,
        ok ? "success" : "info",
        leave.id
      );

      res.json({ message: "Leave approved successfully", leave });
    } catch (error) {
      next(error);
    }
  }

  async rejectLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const leaveId = (req.params as any).leaveId || (req.params as any).id;
      const approverId = req.user!.id;
      const { rejectionReason } = approveRejectSchema.parse(req.body);

      if (![UserRole.MANAGER, UserRole.HR, UserRole.ADMIN].includes(req.user!.role)) {
        throw createError("Not authorized to reject leaves", 403);
      }

      const current = await prisma.leave.findUnique({
        where: { id: leaveId },
        include: { requester: { select: { managerId: true, firstName: true, lastName: true, email: true } } },
      });
      if (!current) throw createError("Leave not found", 404);
      if (current.status !== LeaveStatus.PENDING) {
        throw createError("Only pending requests can be rejected", 400);
      }
      if (req.user!.role === UserRole.MANAGER && current.requester.managerId !== req.user!.id) {
        throw createError("You can only reject your direct reports", 403);
      }

      const leave = await prisma.leave.update({
        where: { id: leaveId },
        data: { status: LeaveStatus.REJECTED, approverId, rejectionReason: rejectionReason || null },
        include: { requester: true },
      });

      await this.updateLeaveBalance(
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        "reject",
        leave.startDate.getFullYear()
      );

      const company = await this.getCompanyInfo();

      const p = {
        requesterName: `${leave.requester.firstName} ${leave.requester.lastName}`,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        totalDays: leave.totalDays,
        reason: rejectionReason || "Not specified",
      };

      const tpl = emailTemplates.leaveRejected(company, p);

      const ok = await this.sendEmailAndLog({ to: leave.requester.email, ...tpl }, "leaveRejected");
      await this.sendAppNotification(
        leave.requesterId,
        "Leave Rejected",
        `Your ${leave.leaveType} leave was rejected.${rejectionReason ? ` Reason: ${rejectionReason}` : ""}`,
        ok ? "error" : "info",
        leave.id
      );

      res.json({ message: "Leave rejected successfully", leave });
    } catch (error) {
      next(error);
    }
  }

  async cancelLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const leaveId = (req.params as any).leaveId || (req.params as any).id;
      const userId = req.user!.id;

      const leave = await prisma.leave.findUnique({ where: { id: leaveId } });
      if (!leave) throw createError("Leave not found", 404);
      if (leave.requesterId !== userId) throw createError("You can only cancel your own requests", 403);
      if (![LeaveStatus.PENDING, LeaveStatus.APPROVED].includes(leave.status)) {
        throw createError("Cannot cancel this leave request", 400);
      }

      const updated = await prisma.leave.update({
        where: { id: leaveId },
        data: { status: LeaveStatus.CANCELLED },
      });

      const action = leave.status === LeaveStatus.PENDING ? "reject" : "cancel";
      await this.updateLeaveBalance(
        leave.requesterId,
        leave.leaveType,
        leave.totalDays,
        action,
        leave.startDate.getFullYear()
      );

      await this.sendAppNotification(
        userId,
        "Leave Cancelled",
        `You cancelled your ${leave.leaveType} leave (${leave.totalDays} day${leave.totalDays === 1 ? "" : "s"}).`,
        "info",
        leave.id
      );

      res.json({ message: "Leave cancelled successfully", leave: updated });
    } catch (error) {
      next(error);
    }
  }

  async getTeamLeaves(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, page = "1", limit = "10" } = req.query;
      const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

      const role = req.user!.role;
      let where: any = {};

      if (role === UserRole.MANAGER) {
        where.requester = { managerId: req.user!.id };
      } else if (role === UserRole.HR || role === UserRole.ADMIN) {
      } else {
        return next(createError("Not authorized to view team leaves", 403));
      }

      if (status) where.status = status;

      const [leaves, total] = await Promise.all([
        prisma.leave.findMany({
          where,
          include: {
            requester: {
              select: { id: true, firstName: true, lastName: true, email: true, employeeId: true, department: true },
            },
            approver: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: parseInt(limit as string, 10),
        }),
        prisma.leave.count({ where }),
      ]);

      res.json({
        leaves,
        pagination: {
          total,
          page: parseInt(page as string, 10),
          limit: parseInt(limit as string, 10),
          totalPages: Math.ceil(total / parseInt(limit as string, 10)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getLeavePolicies(req: AuthRequest, res: Response) {
    const policies = await prisma.leavePolicy.findMany({
      where: { isActive: true },
      orderBy: { leaveType: "asc" },
    });
    res.json({ policies });
  }

  async createLeavePolicy(req: AuthRequest, res: Response) {
    const policy = await prisma.leavePolicy.create({ data: req.body });
    res.status(201).json({ policy });
  }

  async updateLeavePolicy(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const policy = await prisma.leavePolicy.update({ where: { id }, data: req.body });
    res.json({ policy });
  }

  async deleteLeavePolicy(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.leaveBalance.deleteMany({ where: { leavePolicyId: id } });
      await prisma.leavePolicy.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      logger.error("Failed to delete leave policy:", error);
      next(createError("Unable to delete leave policy. It may still be in use.", 400));
    }
  }

  private async validateLeaveRequest(
    userId: string,
    data: z.infer<typeof createLeaveSchema>
  ) {
    if (data.endDate < data.startDate) {
      throw createError("End date must be on or after start date", 400);
    }

    if (!data.emergencyLeave) {
      const today = new Date();
      const start = new Date(data.startDate.getFullYear(), data.startDate.getMonth(), data.startDate.getDate());
      const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (start < now) {
        throw createError("Leave start date must be today or in the future", 400);
      }
    }

    const overlapping = await prisma.leave.findFirst({
      where: {
        requesterId: userId,
        status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
        startDate: { lte: data.endDate },
        endDate: { gte: data.startDate },
      },
    });
    if (overlapping) throw createError("You have overlapping leave requests", 400);

    const leavePolicyId = await this.getLeavePolicyId(data.leaveType);
    if (!leavePolicyId) throw createError("No active leave policy for this type", 404);

    const balance = await prisma.leaveBalance.findUnique({
      where: {
        userId_leavePolicyId_year: {
          userId,
          leavePolicyId,
          year: data.startDate.getFullYear(),
        },
      },
    });
    if (!balance) throw createError("Leave balance not found", 404);

    const totalDays = this.calculateLeaveDays(data.startDate, data.endDate, data.isHalfDay);
    if (balance.availableDays < totalDays) throw createError("Insufficient leave balance", 400);
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

  private async getLeavePolicyId(leaveType: LeaveType): Promise<string> {
    const policy = await prisma.leavePolicy.findFirst({
      where: { leaveType, isActive: true },
    });
    return policy?.id || "";
  }

  private async updateLeaveBalance(
    userId: string,
    leaveType: LeaveType,
    days: number,
    action: "pending" | "approve" | "reject" | "cancel",
    year?: number
  ) {
    try {
      const balanceYear = year || new Date().getFullYear();
      const leavePolicyId = await this.getLeavePolicyId(leaveType);
      if (!leavePolicyId) {
        logger.error(`No leave policy found for leave type: ${leaveType}`);
        return;
      }

      const balance = await prisma.leaveBalance.findUnique({
        where: { userId_leavePolicyId_year: { userId, leavePolicyId, year: balanceYear } },
      });
      if (!balance) {
        logger.error(
          `Leave balance not found for user ${userId}, policy ${leavePolicyId}, year ${balanceYear}`
        );
        return;
      }

      let nextUsed = balance.usedDays;
      let nextPending = balance.pendingDays;
      let nextAvail = balance.availableDays;

      switch (action) {
        case "pending":
          nextPending = balance.pendingDays + days;
          nextAvail = balance.availableDays - days;
          break;
        case "approve":
          nextUsed = balance.usedDays + days;
          nextPending = balance.pendingDays - days;
          break;
        case "reject":
          nextPending = balance.pendingDays - days;
          nextAvail = balance.availableDays + days;
          break;
        case "cancel":
          nextUsed = balance.usedDays - days;
          nextAvail = balance.availableDays + days;
          break;
      }

      nextUsed = Math.max(0, nextUsed);
      nextPending = Math.max(0, nextPending);
      nextAvail = Math.max(0, nextAvail);

      const data: Prisma.LeaveBalanceUpdateInput = {
        usedDays: nextUsed,
        pendingDays: nextPending,
        availableDays: nextAvail,
      };

      await prisma.leaveBalance.update({
        where: { userId_leavePolicyId_year: { userId, leavePolicyId, year: balanceYear } },
        data,
      });
    } catch (error) {
      logger.error("Failed to update leave balance", error);
    }
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