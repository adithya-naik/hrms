import express from "express";
import { getAllTimesheets } from "../controllers/hrController";
import { authMiddleware, authorize } from "../middleware/auth";

const router = express.Router();

// GET all timesheets for HR with filters
router.get("/timesheets", authMiddleware, authorize(["HR"]), getAllTimesheets);

export default router;
