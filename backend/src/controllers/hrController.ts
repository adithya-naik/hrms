import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllTimesheets = async (req: Request, res: Response) => {
  try {
    const { projectId, moduleId, employeeId, priority, status, date } = req.query;

    const timesheets = await prisma.timesheet.findMany({
      where: {
        ...(employeeId ? { userId: employeeId as string } : {}),
        ...(projectId ? { projectId: projectId as string } : {}),
        ...(moduleId ? { task: { moduleId: moduleId as string } } : {}),
        ...(status ? { status: status as string } : {}),
        ...(date ? { date: new Date(date as string) } : {}),
        ...(priority ? { task: { priority: priority as string } } : {}),
      },
      include: {
        user: true,
        project: true,
        task: { include: { module: true } },
      },
      orderBy: { date: "desc" },
    });

    const formatted = timesheets.map(t => ({
      id: t.id,
      employeeName: `${t.user.firstName} ${t.user.lastName}`,
      projectName: t.project.projectName,
      moduleName: t.task.module.name,
      taskName: t.task.name,
      task: {
        name: t.task.name,
        priority: t.task.priority,
        allocatedHrs: t.task.allocatedHrs,
        description: t.task.description,
      },
      hoursWorked: t.hoursWorked,
      status: t.status,
      date: t.date,
      description: t.description,
      comments: t.comments || "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch timesheets" });
  }
};
