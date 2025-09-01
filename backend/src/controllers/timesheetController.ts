import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// ✅ Create a new timesheet entry
export const createTimesheet = async (req: Request, res: Response) => {
  console.log("=== TIMESHEET CREATE START ===");
  
  try {
    console.log("1. Checking user authentication...");
    const userId = (req as any).user?.id;
    console.log("User ID found:", userId);
    
    if (!userId) {
      console.log("EARLY RETURN: No user ID");
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("2. Extracting request body...");
    console.log("Raw request body:", JSON.stringify(req.body, null, 2));
    
    const { projectId, taskId, date, hoursWorked, description, status } = req.body;
    console.log("Extracted data:", { projectId, taskId, date, hoursWorked, description, status });

    console.log("3. Validating required fields...");
    if (!projectId || !date || !hoursWorked) {
      console.log("EARLY RETURN: Missing required fields");
      return res.status(400).json({ message: "projectId, date and hoursWorked are required" });
    }

    console.log("4. About to call Prisma create...");
    console.log("Creating with data:", {
      userId,
      projectId,
      taskId,
      date: new Date(date),
      hoursWorked: Number(hoursWorked),
      description,
      status,
    });

    const entry = await prisma.timesheet.create({
      data: {
        userId,
        projectId,
        taskId,
        date: new Date(date),
        hoursWorked: Number(hoursWorked),
        description,
        status,
      },
      include: {
        project: true,
        task: true,
      },
    });

    console.log("5. Prisma create successful, entry ID:", entry.id);
    console.log("6. Sending response...");
    
    res.status(201).json(entry);
    console.log("7. Response sent successfully");
    
  } catch (err: any) {
    console.error("=== TIMESHEET CREATE ERROR ===");
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Error stack:", err.stack);
    console.error("Full error:", err);
    
    res.status(500).json({ message: err.message });
    console.log("Error response sent");
  }
  
  console.log("=== TIMESHEET CREATE END ===");
};


// ✅ Get logged-in employee's timesheets
export const getMyTimesheets = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const entries = await prisma.timesheet.findMany({
      where: { userId },
      include: {
        project: true,
        task: true,
      },
      orderBy: { date: "desc" },
    });

    res.json(entries);
  } catch (err: any) {
    console.error("getMyTimesheets error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Weekly summary (total hrs, avg per day, % progress)
export const getMyTimesheetSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

    const entries = await prisma.timesheet.findMany({
      where: {
        userId,
        date: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });

    const totalHours = entries.reduce((sum, e) => sum + e.hoursWorked, 0);
    const avgHours = totalHours / (entries.length || 1);
    const progress = Math.min((totalHours / 45) * 100, 100);

    res.json({
      totalHours,
      avgHours: Number(avgHours.toFixed(2)),
      progress: Number(progress.toFixed(2)),
    });
  } catch (err: any) {
    console.error("getMyTimesheetSummary error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a timesheet entry
export const updateTimesheet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { projectId, taskId, date, hoursWorked, description, status } = req.body;

    // Build the update object dynamically
    const updateData: any = {};

    if (projectId !== undefined) updateData.projectId = projectId;
    if (taskId !== undefined) updateData.taskId = taskId;
    if (date !== undefined) updateData.date = new Date(date);
    if (hoursWorked !== undefined) updateData.hoursWorked = Number(hoursWorked);
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    // Use update instead of updateMany if id is unique
    const entry = await prisma.timesheet.update({
      where: { id },
      data: updateData,
    });

    res.json({ message: "Timesheet updated successfully", entry });
  } catch (err: any) {
    console.error("updateTimesheet error:", err);
    if (err.code === 'P2025') { // Record not found
      return res.status(404).json({ message: "Timesheet not found" });
    }
    res.status(500).json({ message: err.message });
  }
};


// ✅ Delete a timesheet entry
export const deleteTimesheet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const entry = await prisma.timesheet.deleteMany({
      where: { id, userId },
    });

    if (entry.count === 0) return res.status(404).json({ message: "Timesheet not found" });

    res.json({ message: "Timesheet deleted successfully" });
  } catch (err: any) {
    console.error("deleteTimesheet error:", err);
    res.status(500).json({ message: err.message });
  }
};
