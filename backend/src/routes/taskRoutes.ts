import { Router } from "express";
import { createTask, getTasks, getMyTasks } from "../controllers/taskController";
import { authMiddleware } from "../middleware/auth"; // ✅ use authMiddleware

const router = Router();

// Manager/Admin creates a task
router.post("/", authMiddleware, createTask);

// Manager/Admin fetches all tasks
router.get("/", authMiddleware, getTasks);

// Employee fetches only their own tasks
router.get("/my-tasks", authMiddleware, getMyTasks);

export default router;
