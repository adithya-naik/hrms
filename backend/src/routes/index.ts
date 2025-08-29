import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./users";
import { leaveRoutes } from "./leaves";
import { dashboardRoutes } from "./dashboard";
import { reportRoutes } from "./reports";
import { holidayRoutes } from "./holidays";
import { uploadRoutes } from "./upload";
import { departmentRoutes } from "./departments";
import { settingsRoutes } from "./settings";
import { notificationRoutes } from "./notification";
import { profileRoutes } from "./profile";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/leaves", leaveRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/reports", reportRoutes);
router.use("/holidays", holidayRoutes);
router.use("/upload", uploadRoutes);
router.use("/departments", departmentRoutes);
router.use("/settings", settingsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/profile", profileRoutes);

export { router as routes };
