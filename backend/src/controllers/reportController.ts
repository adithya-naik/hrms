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
 async getDepartmentAnalysis(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const leaves = await prisma.leave.findMany({
        where: {
          createdAt: {
            gte: startDate ? new Date(startDate as string) : new Date("2025-01-01T00:00:00.000Z"),
            lte: endDate ? new Date(endDate as string) : new Date("2025-12-31T23:59:59.999Z"),
          },
        },
        include: {
          requester: {
            select: { departmentId: true },
          },
        },
      });

      // Aggregate by departmentId
      const analysis = leaves.reduce((acc, leave) => {
        const deptId = leave.requester?.departmentId ?? "UNKNOWN";

        if (!acc[deptId]) {
          acc[deptId] = { count: 0, totalDays: 0 };
        }

        acc[deptId].count += 1;
        acc[deptId].totalDays += leave.totalDays;

        return acc;
      }, {} as Record<string, { count: number; totalDays: number }>);

      res.json({ analysis });
    } catch (error) {
      console.error("Error in getDepartmentAnalysis:", error);
      res.status(500).json({ error: "Internal server error" });
    }
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

  async export(req: AuthRequest, res: Response) {
    const { type = "leaves", format = "csv", startDate, endDate, year } = req.query;

    let headers: string[] = [];
    let data: any[] = [];

    /* ========== LEAVE SUMMARY ========== */
    if (type === "summary") {
      const where: any = {};
      if (startDate && endDate) {
        where.createdAt = {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        };
      }

      const summary = await prisma.leave.groupBy({
        by: ["leaveType", "status"],
        where,
        _count: { id: true },
        _sum: { totalDays: true },
      });

      headers = ["Leave Type", "Status", "Requests", "Total Days"];
      data = summary.map((s) => [
        s.leaveType,
        s.status,
        s._count.id,
        s._sum.totalDays || 0,
      ]);
    }

    /* ========== EMPLOYEE BALANCES ========== */
    if (type === "employee") {
      const balances = await prisma.leaveBalance.findMany({
        where: { year: Number(year) || new Date().getFullYear() },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              employeeId: true,
              department: { select: { name: true } },
            },
          },
          leavePolicy: true,
        },
      });

      headers = [
        "Employee ID",
        "Employee Name",
        "Department",
        "Leave Type",
        "Total Quota",
        "Used",
        "Available",
      ];

      data = balances.map((b) => [
        b.user.employeeId,
        `${b.user.firstName} ${b.user.lastName}`,
        b.user.department?.name || "",
        b.leavePolicy.leaveType,
        b.totalQuota,
        b.usedDays,
        b.availableDays,
      ]);
    }

    /* ========== DEPARTMENT ANALYSIS ========== */
    if (type === "department") {
      const leaves = await prisma.leave.findMany({
        where: {
          createdAt: {
            gte: startDate ? new Date(startDate as string) : new Date("2025-01-01"),
            lte: endDate ? new Date(endDate as string) : new Date("2025-12-31"),
          },
        },
        include: { requester: { select: { departmentId: true } } },
      });

      const grouped = leaves.reduce((acc, leave) => {
        const deptId = leave.requester?.departmentId ?? "UNKNOWN";
        if (!acc[deptId]) acc[deptId] = { count: 0, days: 0 };
        acc[deptId].count += 1;
        acc[deptId].days += leave.totalDays;
        return acc;
      }, {} as Record<string, { count: number; days: number }>);

      headers = ["Department", "Leave Requests", "Total Days"];
      data = Object.entries(grouped).map(([deptId, val]) => [
        deptId,
        val.count,
        val.days,
      ]);
    }

    /* ========== EXPORT HANDLER ========== */
    if (format === "csv") {
      const csvContent = [
        headers.join(","),
        ...data.map((row) => row.map((c) => `"${c}"`).join(",")),
      ].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${type}_report.csv"`
      );
      return res.send(csvContent);
    }

    if (format === "pdf") {
      const doc = new PDFDocument({ margin: 30 });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${type}_report.pdf"`
      );
      doc.pipe(res);

      doc.fontSize(18).text(`${type.toUpperCase()} REPORT`, { align: "center" });
      doc.moveDown();

      // table headers
      doc.fontSize(12).text(headers.join(" | "));
      doc.moveDown();

      // rows
      data.forEach((row) => {
        doc.text(row.join(" | "));
      });

      doc.end();
    }
  }
}

export const reportController = new ReportController();