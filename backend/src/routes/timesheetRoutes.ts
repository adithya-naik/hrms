import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/auth";
import { UserRole } from "@prisma/client";
import { 
  createTimesheet,
  getMyTimesheets,
  getMyTimesheetSummary,
  updateTimesheet,
  deleteTimesheet,
} from "../controllers/timesheetController";

const router = Router();

// Apply authentication middleware to all timesheet routes
router.use(authMiddleware);

// Routes accessible to EMPLOYEE and MANAGER
const allowedRoles = [UserRole.EMPLOYEE, UserRole.MANAGER];

// Create a new timesheet
router.post("/", authorize(allowedRoles), createTimesheet);

// Get logged-in employee's timesheets
router.get("/mine", authorize(allowedRoles), getMyTimesheets);

// Get weekly summary
router.get("/mine/summary", authorize(allowedRoles), getMyTimesheetSummary);

// Update timesheet entry
router.put("/:id", authorize(allowedRoles), updateTimesheet);

// Delete timesheet entry
router.delete("/:id", authorize(allowedRoles), deleteTimesheet);

export default router;
