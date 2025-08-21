import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

class ReportController {
  async getLeaveSummary(req: AuthRequest, res: Response) {
    const { startDate, endDate, departmentId } = req.query;

    let where: any = {};

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    if (departmentId) {
      where.requester = { departmentId };
    }

    const summary = await prisma.leave.groupBy({
      by: ['leaveType', 'status'],
      where,
      _count: {
        id: true,
      },
      _sum: {
        totalDays: true,
      },
    });

    res.json({ summary });
  }

  async getEmployeeBalances(req: AuthRequest, res: Response) {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();

    const balances = await prisma.leaveBalance.findMany({
      where: { year },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            employeeId: true,
            email: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
        leavePolicy: true,
      },
      orderBy: {
        user: {
          firstName: 'asc',
        },
      },
    });

    res.json({ balances });
  }
  async getDepartmentAnalysis(req: AuthRequest, res: Response) {
    const { startDate, endDate } = req.query;

    let where: any = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const analysis = await prisma.leave.groupBy({
      by: ['departmentId'],
      where,
      _count: { id: true },
      _sum: { totalDays: true },
    });

    const enriched = await Promise.all(
      analysis.map(async (a) => {
        const dept = await prisma.department.findUnique({
          where: { id: a.departmentId },
          select: { name: true },
        });
        return { ...a, departmentName: dept?.name || 'Unknown' };
      })
    );

    res.json({ analysis: enriched });
  }

  async exportCSV(req: AuthRequest, res: Response) {
    const { type = 'leaves', startDate, endDate } = req.query;

    let data: any[] = [];
    let headers: string[] = [];

    if (type === 'leaves') {
      let where: any = {};

      if (startDate && endDate) {
        where.createdAt = {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        };
      }

      const leaves = await prisma.leave.findMany({
        where,
        include: {
          requester: {
            select: {
              firstName: true,
              lastName: true,
              employeeId: true,
              email: true,
              department: {
                select: {
                  name: true,
                },
              },
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
      });

      headers = [
        'Employee ID',
        'Employee Name',
        'Department',
        'Leave Type',
        'Start Date',
        'End Date',
        'Total Days',
        'Status',
        'Applied Date',
        'Approved Date',
        'Approver',
        'Reason',
      ];

      data = leaves.map((leave) => [
        leave.requester.employeeId,
        `${leave.requester.firstName} ${leave.requester.lastName}`,
        leave.requester.department?.name || '',
        leave.leaveType,
        leave.startDate.toISOString().split('T')[0],
        leave.endDate.toISOString().split('T')[0],
        leave.totalDays,
        leave.status,
        leave.appliedDate.toISOString().split('T')[0],
        leave.approvedDate?.toISOString().split('T')[0] || '',
        leave.approver ? `${leave.approver.firstName} ${leave.approver.lastName}` : '',
        leave.reason,
      ]);
    }

    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...data.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${type}_report.csv"`);
    res.send(csvContent);
  }
}

export const reportController = new ReportController();