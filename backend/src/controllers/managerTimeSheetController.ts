import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Get manager's team timesheets with filters
export const getTeamTimesheets = async (req: Request, res: Response) => {
  try {
    const managerId = (req as any).user?.id;
    if (!managerId) return res.status(401).json({ message: "Unauthorized" });

    const { projectId, moduleId, employeeId, priority, status, startDate, endDate } = req.query;

    // Identify the manager's direct team
    const team = await prisma.user.findMany({
      where: { managerId },
      select: { id: true, employeeId: true, firstName: true, lastName: true },
    });

    const teamIds = team.map(t => t.id);

    const where: any = { userId: { in: teamIds } };

    // Nested filters
    if (projectId || moduleId || priority) {
      where.task = {};
      if (priority) where.task.priority = priority;
      if (moduleId) where.task.moduleId = moduleId;
      if (projectId) where.task.module = { projectId: projectId };
    }

    if (employeeId) where.userId = employeeId;
    if (status) where.status = status;
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const timesheets = await prisma.timesheet.findMany({
      where,
      include: {
        user: true,
        project: true,
        task: { include: { module: { include: { project: true } } } },
      },
      orderBy: { date: "desc" },
    });

    const response = timesheets.map(t => ({
      ...t,
      employeeName: `${t.user.firstName} ${t.user.lastName}`,
      projectName: t.project.projectName,
      moduleName: t.task?.module?.name || "",
      taskName: t.task?.name || "",
    }));

    res.json(response);

  } catch (err: any) {
    console.error("getTeamTimesheets error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Approve a timesheet
export const approveTimesheet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.timesheet.update({
      where: { id },
      data: { status: "APPROVED" },
      include: { user: true, project: true, task: true },
    });
    res.json(updated);
  } catch (err: any) {
    console.error("approveTimesheet error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Reject a timesheet
export const rejectTimesheet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.timesheet.update({
      where: { id },
      data: { status: "REJECTED" },
      include: { user: true, project: true, task: true },
    });
    res.json(updated);
  } catch (err: any) {
    console.error("rejectTimesheet error:", err);
    res.status(500).json({ message: err.message });
  }
};
