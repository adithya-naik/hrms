import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { LeaveType, LeaveStatus, UserRole } from '@prisma/client';
import { sendEmail, emailTemplates } from '../lib/email';
import { logger } from '../utils/logger';

const createLeaveSchema = z.object({
  leaveType: z.nativeEnum(LeaveType),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  reason: z.string().min(1),
  isHalfDay: z.boolean().default(false),
  emergencyLeave: z.boolean().default(false),
  attachments: z.array(z.string()).default([]),
});

const approveRejectSchema = z.object({
  rejectionReason: z.string().optional(),
});

class LeaveController {
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

  async createLeave(req: AuthRequest, res: Response) {
    const data = createLeaveSchema.parse(req.body);
    const userId = req.user!.id;

    // Validate leave request
    await this.validateLeaveRequest(userId, data);

    // Calculate total days
    const totalDays = this.calculateLeaveDays(data.startDate, data.endDate, data.isHalfDay);

    const leave = await prisma.leave.create({
      data: {
        ...data,
        requesterId: userId,
        totalDays,
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

    // Update pending days in leave balance
    await this.updateLeaveBalance(userId, data.leaveType, totalDays, 'pending');

    // Send notification to manager
    if (leave.requester.manager) {
      try {
        const template = emailTemplates.leaveRequest(
          `${leave.requester.firstName} ${leave.requester.lastName}`,
          data.leaveType,
          data.startDate.toDateString(),
          data.endDate.toDateString()
        );
        
        await sendEmail({
          to: leave.requester.manager.email,
          subject: template.subject,
          html: template.html,
        });
      } catch (error) {
        logger.error('Failed to send leave request notification:', error);
      }
    }

    res.status(201).json({ leave });
  }

  async getLeaveBalances(req: AuthRequest, res: Response) {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();

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

  async approveLeave(req: AuthRequest, res: Response) {
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

    // Update leave balance
    await this.updateLeaveBalance(
      leave.requesterId,
      leave.leaveType,
      leave.totalDays,
      'approve'
    );

    // Send confirmation email
    try {
      const template = emailTemplates.leaveApproved(
        `${leave.requester.firstName} ${leave.requester.lastName}`,
        leave.leaveType,
        leave.startDate.toDateString(),
        leave.endDate.toDateString()
      );
      
      await sendEmail({
        to: leave.requester.email,
        subject: template.subject,
        html: template.html,
      });
    } catch (error) {
      logger.error('Failed to send leave approval notification:', error);
    }

    res.json({ leave: updatedLeave });
  }

  async rejectLeave(req: AuthRequest, res: Response) {
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

    // Restore pending balance
    await this.updateLeaveBalance(
      leave.requesterId,
      leave.leaveType,
      leave.totalDays,
      'reject'
    );

    // Send rejection email
    try {
      const template = emailTemplates.leaveRejected(
        `${leave.requester.firstName} ${leave.requester.lastName}`,
        leave.leaveType,
        leave.startDate.toDateString(),
        leave.endDate.toDateString(),
        rejectionReason || 'No reason provided'
      );
      
      await sendEmail({
        to: leave.requester.email,
        subject: template.subject,
        html: template.html,
      });
    } catch (error) {
      logger.error('Failed to send leave rejection notification:', error);
    }

    res.json({ leave: updatedLeave });
  }

  async cancelLeave(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    const leave = await prisma.leave.findUnique({
      where: { id },
    });

    if (!leave) {
      throw createError('Leave request not found', 404);
    }

    if (leave.requesterId !== userId) {
      throw createError('You can only cancel your own leave requests', 403);
    }

    if (leave.status !== LeaveStatus.PENDING && leave.status !== LeaveStatus.APPROVED) {
      throw createError('Cannot cancel this leave request', 400);
    }

    const updatedLeave = await prisma.leave.update({
      where: { id },
      data: { status: LeaveStatus.CANCELLED },
    });

    // Restore balance based on current status
    const balanceAction = leave.status === LeaveStatus.PENDING ? 'reject' : 'cancel';
    await this.updateLeaveBalance(
      leave.requesterId,
      leave.leaveType,
      leave.totalDays,
      balanceAction
    );

    res.json({ leave: updatedLeave });
  }

  async getTeamLeaves(req: AuthRequest, res: Response) {
    const { status, page = '1', limit = '10' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    let where: any = {};

    if (req.user!.role === UserRole.MANAGER) {
      // Get team members for this manager
      where.requester = { managerId: req.user!.id };
    }
    // HR and Admin can see all leaves

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

  private async validateLeaveRequest(userId: string, data: any) {
    // Check if start date is before end date
    if (data.startDate >= data.endDate) {
      throw createError('End date must be after start date', 400);
    }

    // Check if dates are in the future (except emergency leaves)
    if (!data.emergencyLeave && data.startDate < new Date()) {
      throw createError('Leave start date must be in the future', 400);
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

    // Check leave balance
    const balance = await prisma.leaveBalance.findUnique({
      where: {
        userId_leaveType_year: {
          userId,
          leaveType: data.leaveType,
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

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays;
  }

  private async updateLeaveBalance(
    userId: string,
    leaveType: LeaveType,
    days: number,
    action: 'pending' | 'approve' | 'reject' | 'cancel'
  ) {
    const balance = await prisma.leaveBalance.findUnique({
      where: {
        userId_leavePolicyId_year: {
          userId,
          leavePolicyId: await this.getLeavePolicyId(leaveType),
          year: new Date().getFullYear(),
        },
      },
    });

    if (!balance) return;

    let updateData: any = {};

    switch (action) {
      case 'pending':
        updateData = {
          pendingDays: balance.pendingDays + days,
          availableDays: balance.availableDays - days,
        };
        break;
      case 'approve':
        updateData = {
          usedDays: balance.usedDays + days,
          pendingDays: balance.pendingDays - days,
        };
        break;
      case 'reject':
        updateData = {
          pendingDays: balance.pendingDays - days,
          availableDays: balance.availableDays + days,
        };
        break;
      case 'cancel':
        updateData = {
          usedDays: balance.usedDays - days,
          availableDays: balance.availableDays + days,
        };
        break;
    }

    await prisma.leaveBalance.update({
      where: {
        userId_leavePolicyId_year: {
          userId,
          leavePolicyId: await this.getLeavePolicyId(leaveType),
          year: new Date().getFullYear(),
        },
      },
      data: updateData,
    });
  }

  private async getLeavePolicyId(leaveType: LeaveType): Promise<string> {
    const policy = await prisma.leavePolicy.findFirst({
      where: { leaveType, isActive: true },
    });
    return policy?.id || '';
  }
}

export const leaveController = new LeaveController();