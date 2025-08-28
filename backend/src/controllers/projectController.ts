import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { UserRole } from '@prisma/client';

// GET /api/projects → list all projects
export const getProjects = async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: {
      manager: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });
  res.json(projects);
};

// POST /api/projects → create a new project
export const createProject = async (req: Request, res: Response) => {
  const { projectName, clientName, revenue, managerId, priority, allocatedHours, description } = req.body;

  if (!projectName || !clientName || !managerId) {
    return res.status(400).json({ error: 'Project Name, Client, and Manager are required' });
  }

  const project = await prisma.project.create({
    data: {
      projectName,
      clientName,
      revenue: revenue ? Number(revenue) : undefined,
      managerId,
      priority,
      allocatedHours: allocatedHours ? Number(allocatedHours) : undefined,
      description,
    },
  });

  res.status(201).json(project);
};

// GET /api/projects/managers → list all active managers
export const getManagers = async (_req: Request, res: Response) => {
  const managers = await prisma.user.findMany({
    where: { role: UserRole.MANAGER, isActive: true },
    select: { id: true, firstName: true, lastName: true, email: true },
  });

  res.json(managers);
};
