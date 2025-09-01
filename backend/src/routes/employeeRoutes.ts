import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/auth";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";

const router = Router();

// Authenticated users only
router.use(authMiddleware);

// Get all employees of the logged-in manager
router.get("/", authorize([UserRole.MANAGER, UserRole.HR]), async (req, res) => {
  try {
    const managerId = (req as any).user?.id;
    if (!managerId) return res.status(401).json({ message: "Unauthorized" });

    const employees = await prisma.user.findMany({
      where: { managerId },
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
      },
    });

    res.json(employees);
  } catch (err: any) {
    console.error("getEmployees error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
