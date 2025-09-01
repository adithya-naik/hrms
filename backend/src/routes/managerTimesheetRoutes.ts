import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/auth";
import { UserRole } from "@prisma/client";
import { getTeamTimesheets, approveTimesheet, rejectTimesheet } from "../controllers/managerTimeSheetController";

const router = Router();

// Only MANAGER role
router.use(authMiddleware);
router.use(authorize([UserRole.MANAGER]));

// GET team timesheets with filters
router.get("/", getTeamTimesheets);

// PUT → Approve a timesheet
router.put("/:id/approve", approveTimesheet);

// PUT → Reject a timesheet
router.put("/:id/reject", rejectTimesheet);

export default router;
