import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

class DepartmentController {
  async getAll(req: Request, res: Response) {
    try {
      const departments = await prisma.department.findMany({
        include: { users: true }, // if relation exists
        orderBy: { createdAt: "desc" },
      });
      res.json({ departments });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const department = await prisma.department.findUnique({
        where: { id },
        include: { users: true },
      });

      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }

      res.json({ department });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch department" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, headId } = req.body;
      const department = await prisma.department.create({
        data: { name, description, headId },
      });
      res.status(201).json({ department });
    } catch (error) {
      res.status(500).json({ error: "Failed to create department" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, headId, isActive } = req.body;

      const department = await prisma.department.update({
        where: { id },
        data: { name, description, headId, isActive },
      });

      res.json({ department });
    } catch (error) {
      res.status(500).json({ error: "Failed to update department" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.department.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete department" });
    }
  }
}

export const departmentController = new DepartmentController();
