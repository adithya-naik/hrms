import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { UserRole, LeaveStatus } from '@prisma/client';

class DashboardController {
  async getDashboardStats(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const currentYear = new Date().getFullYear();

    let stats: any = {};

    if (userRole === UserRole.EMPLOYEE) {
      // Employee dashboard stats
      const [leaveBalances, pendingLeaves, approvedLeaves] = await Promise.all([
        prisma.leaveBalance.findMany({
          where: { userId, year: currentYear },
          include: { leavePolicy: true },
        }),
        prisma.leave.count({
          where: { requesterId: userId, status: LeaveStatus.PENDING },
        }),
        prisma.leave.count({
          where: { requesterId: userId, status: LeaveStatus.APPROVED },
        }),
      ]);

      stats = {
        leaveBalances,
        pendingLeaves,
        approvedLeaves,
        totalLeaveTaken: leaveBalances.reduce((sum, balance) => sum + balance.usedDays, 0),
      };
    } else if (userRole === UserRole.MANAGER) {
      // Manager dashboard stats
      const [teamPendingLeaves, teamOnLeave, teamMembers] = await Promise.all([
        prisma.leave.count({
          where: {
            status: LeaveStatus.PENDING,
            requester: { managerId: userId },
          },
        }),
        prisma.leave.count({
          where: {
            status: LeaveStatus.APPROVED,
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
            requester: { managerId: userId },
          },
        }),
        prisma.user.count({
          where: { managerId: userId, isActive: true },
        }),
      ]);

      stats = {
        teamPendingLeaves,
        teamOnLeave,
        teamMembers,
      };
    } else {
      // HR/Admin dashboard stats
      const [totalEmployees, pendingLeaves, onLeaveToday, thisMonthLeaves] = await Promise.all([
        prisma.user.count({
          where: { isActive: true, role: UserRole.EMPLOYEE },
        }),
        prisma.leave.count({
          where: { status: LeaveStatus.PENDING },
        }),
        prisma.leave.count({
          where: {
            status: LeaveStatus.APPROVED,
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
          },
        }),
        prisma.leave.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
      ]);

      stats = {
        totalEmployees,
        pendingLeaves,
        onLeaveToday,
        thisMonthLeaves,
      };
    }

    res.json({ stats });
  }

  async getRecentLeaves(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const limit = parseInt(req.query.limit as string) || 5;

    let where: any = {};

    if (userRole === UserRole.EMPLOYEE) {
      where.requesterId = userId;
    } else if (userRole === UserRole.MANAGER) {
      where.requester = { managerId: userId };
    }
    // HR and Admin see all leaves

    const leaves = await prisma.leave.findMany({
      where,
      include: {
        requester: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        approver: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    res.json({ leaves });
  }

  async getUpcomingLeaves(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const limit = parseInt(req.query.limit as string) || 5;

    let where: any = {
      status: LeaveStatus.APPROVED,
      startDate: { gte: new Date() },
    };

    if (userRole === UserRole.EMPLOYEE) {
      where.requesterId = userId;
    } else if (userRole === UserRole.MANAGER) {
      where.requester = { managerId: userId };
    }
    // HR and Admin see all leaves

    const leaves = await prisma.leave.findMany({
      where,
      include: {
        requester: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { startDate: 'asc' },
      take: limit,
    });

    res.json({ leaves });
  }
}

export const dashboardController = new DashboardController();