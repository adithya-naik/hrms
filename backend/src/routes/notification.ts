// src/routes/notificationRoutes.ts
import { Router } from "express";
import { notificationController } from "../controllers/notificationController";
import { authMiddleware, authorize } from "../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.use(authMiddleware);

// get user notifications
router.get(
  "/",
  authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  notificationController.getUserNotifications
);

// IMPORTANT: static route first
router.put(
  "/mark-all/read",
  authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  notificationController.markAllAsRead
);

// then the param route
router.put(
  "/:id/read",
  authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  notificationController.markAsRead
);

router.delete(
  "/:id",
  authorize([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]),
  notificationController.deleteNotification
);

// optional admin
router.get(
  "/all",
  authorize([UserRole.ADMIN]),
  notificationController.getAllNotifications
);

export { router as notificationRoutes };
