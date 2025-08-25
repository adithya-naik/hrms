// src/routes/leaveRoutes.ts
import { Router } from "express";
import { leaveController, upload } from "../controllers/leaveController";
import { authMiddleware, authorize } from "../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// 🔒 All routes require authentication
router.use(authMiddleware);

// ---------------- Employee Routes ----------------
router.get("/", leaveController.getLeaves);
router.post("/", upload.array("attachments"), leaveController.createLeave);
router.get("/balances", leaveController.getLeaveBalances);

router.put(
  "/:id/cancel",
  authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.HR]), // exclude ADMIN
  leaveController.cancelLeave
);

// ---------------- Day-wise Updates ----------------
router.patch(
  "/:id/day-status",
  authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  leaveController.updateDayStatuses
);

// ---------------- Manager / HR Routes ----------------
router.put(
  "/:id/approve",
  authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  leaveController.approveLeave
);
router.put(
  "/:id/reject",
  authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  leaveController.rejectLeave
);
router.get(
  "/team",
  authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  leaveController.getTeamLeaves
);

// Get logged-in user's leave dates (calendar use)
router.get(
  "/my-dates",
  authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  leaveController.getMyLeaveDates
);


// ---------------- Admin / HR Routes ----------------
router.get(
  "/policies",
  authorize([UserRole.HR, UserRole.EMPLOYEE, UserRole.MANAGER,UserRole.ADMIN]),
  leaveController.getLeavePolicies
);
router.post(
  "/policies",
  authorize([UserRole.ADMIN]),
  leaveController.createLeavePolicy
);
router.put(
  "/policies/:id",
  authorize([UserRole.ADMIN]),
  leaveController.updateLeavePolicy
);
router.delete(
  "/policies/:id",
  authorize([UserRole.ADMIN]),
  leaveController.deleteLeavePolicy
);

export { router as leaveRoutes };
