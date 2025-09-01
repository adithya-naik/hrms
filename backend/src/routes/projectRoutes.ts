import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, authorize, AuthRequest } from "../middleware/auth";

const router = Router();

// -------------------- Get all projects --------------------
router.get("/", authMiddleware, authorize(["ADMIN", "MANAGER", "HR"]), async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// -------------------- Create new project --------------------
router.post("/", authMiddleware, authorize(["ADMIN", "MANAGER"]), async (req: AuthRequest, res: Response) => {
  try {
    const {
      projectName,
      clientName,
      revenue,
      managerId,
      priority,
      allocatedHours,
      description,
    } = req.body as {
      projectName: string;
      clientName: string;
      revenue?: number;
      managerId: string;
      priority?: string;
      allocatedHours?: number;
      description?: string;
    };

    const project = await prisma.project.create({
      data: {
        projectName,
        clientName,
        revenue: revenue ?? null,
        managerId,
        priority: priority ?? null,
        allocatedHours: allocatedHours ?? null,
        description: description ?? null,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// -------------------- Get all managers --------------------

// GET /api/projects/managers → list all managers (active + inactive) for admin
// GET /projects/managers
router.get("/managers", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "ADMIN";

    const managers = await prisma.user.findMany({
      where: {
        role: "MANAGER",
        ...(isAdmin ? {} : { isActive: true }), // admins see all
      },
      select: { id: true, firstName: true, lastName: true, email: true, isActive: true },
    });

    res.json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch managers" });
  }
});


export default router;
