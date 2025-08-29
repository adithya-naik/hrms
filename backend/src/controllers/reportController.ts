import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";
import PDFDocument from "pdfkit";
import { Parser } from "json2csv";
import PDFTable from "pdfkit-table";

class ReportController {
  async getLeaveSummary(req: AuthRequest, res: Response) {
    const { startDate, endDate, departmentId } = req.query;
    const where: any = {};

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
      by: ["leaveType", "status"],
      where,
      _count: { id: true },
      _sum: { totalDays: true },
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
            department: { select: { name: true } },
          },
        },
        leavePolicy: true,
      },
      orderBy: { user: { firstName: "asc" } },
    });

    res.json({ balances });
  }

async getDepartmentAnalysis(req: AuthRequest, res: Response) {
  try {
    const { startDate, endDate } = req.query;

    const leaves = await prisma.leave.findMany({
      where: {
        createdAt: {
          gte: startDate ? new Date(startDate as string) : new Date("2025-01-01"),
          lte: endDate ? new Date(endDate as string) : new Date("2025-12-31"),
        },
      },
      include: {
        requester: {
          select: {
            department: { select: { id: true, name: true } },
          },
        },
      },
    });

    const analysis = leaves.reduce((acc, leave) => {
      const deptName = leave.requester?.department?.name ?? "UNKNOWN";

      if (!acc[deptName]) {
        acc[deptName] = { count: 0, totalDays: 0 };
      }

      acc[deptName].count += 1;
      acc[deptName].totalDays += leave.totalDays;

      return acc;
    }, {} as Record<string, { count: number; totalDays: number }>);

    res.json({ analysis });
  } catch (error) {
    console.error("Error in getDepartmentAnalysis:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



private async export(req: AuthRequest, res: Response) {
  const { type = "leaves", format = "csv", startDate, endDate, year } = req.query;

  let headers: string[] = [];
  let data: any[] = [];

  /* === SUMMARY === */
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

  /* === EMPLOYEE BALANCES === */
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

    headers = ["Employee ID", "Employee Name", "Department", "Leave Type", "Total Quota", "Used", "Available"];
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

  /* === DEPARTMENT === */
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
    data = Object.entries(grouped).map(([deptId, val]) => [deptId, val.count, val.days]);
  }

  /* === EXPORT: CSV === */
  if (format === "csv") {
    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.map((c) => `"${c}"`).join(",")),
    ].join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${type}_report.csv"`);
    return res.send(csvContent);
  }

  /* === EXPORT: PDF (manual table rendering) === */
  if (format === "pdf") {
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${type}_report.pdf"`);
    doc.pipe(res);

    // Title
    doc.fontSize(18).text(`${String(type).toUpperCase()} REPORT`, { align: "center" });
    doc.moveDown(2);

    if (headers.length && data.length) {
      const startX = 50;
      let y = doc.y;

      // Render headers
      doc.font("Helvetica-Bold").fontSize(12);
      headers.forEach((header, i) => {
        doc.text(header, startX + i * 100, y, { width: 90 });
      });

      y += 20;
      doc.font("Helvetica").fontSize(10);

      // Render rows
      data.forEach((row) => {
        row.forEach((cell, i) => {
          doc.text(String(cell), startX + i * 100, y, { width: 90 });
        });
        y += 20;

        // Page break if content goes beyond A4
        if (y > 750) {
          doc.addPage();
          y = 50;
        }
      });
    } else {
      doc.fontSize(12).text("No data available for this report.", { align: "center" });
    }

    doc.end();
    return;
  }
}
}

export const reportController = new ReportController();
