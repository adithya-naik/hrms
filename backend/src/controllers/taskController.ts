import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Create a new task
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
        priority,      // Should match TaskPriority enum: LOW, MEDIUM, HIGH, CRITICAL
        allocatedHrs,  // hours allocated
        moduleId,
        assignedToId,
      },
    });

    res.status(201).json(newTask);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks with joins
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
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
