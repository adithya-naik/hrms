import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// ✅ Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { taskName, description, priority, allocatedHrs, moduleId, assignedToId } = req.body;

    if (!taskName || !moduleId || !assignedToId) {
      return res.status(400).json({ message: "taskName, moduleId, and assignedToId are required" });
    }

    const newTask = await prisma.task.create({
      data: {
        name: taskName,
        description,
        priority,      // Must match TaskPriority enum: LOW, MEDIUM, HIGH, CRITICAL
        allocatedHrs,  // hours allocated
        moduleId,
        assignedToId,
      },
    });

    res.status(201).json(newTask);
  } catch (err: any) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all tasks (for managers/admins)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        module: {
          include: {
            project: true,
          },
        },
        assignedTo: true,
      },
    });

    res.status(200).json(tasks);
  } catch (err: any) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get tasks assigned to the logged-in employee
// ✅ Get tasks assigned to the logged-in employee (latest first)
export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // assuming `authenticate` middleware attaches user

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. No user found." });
    }

    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
      include: {
        module: {
          include: {
            project: true,
          },
        },
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc", // 🔹 newest tasks first
      },
    });

    res.status(200).json(tasks);
  } catch (err: any) {
    console.error("Error fetching employee tasks:", err);
    res.status(500).json({ message: err.message });
  }
};
