// src/routes/departmentRoutes.ts
import { Router } from "express";
import { departmentController } from "../controllers/departmentController";

const router = Router();

router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getById);
router.post("/", departmentController.create);
router.put("/:id", departmentController.update);
router.delete("/:id", departmentController.delete);

export default router;
export { router as departmentRoutes };  