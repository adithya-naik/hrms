import { Router } from "express";
import { createModule, getModules } from "../controllers/moduleController";

const router = Router();

// POST - create a module
router.post("/", createModule);

// ✅ GET - fetch all modules
router.get("/", getModules);

export default router;
