import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Create a new module
export const createModule = async (req: Request, res: Response) => {
  try {
    const { moduleName, projectId } = req.body;

    if (!moduleName || !projectId) {
      return res.status(400).json({ message: "moduleName and projectId are required" });
    }

    const newModule = await prisma.module.create({
      data: {
        name: moduleName,
        projectId,
      },
    });

    res.status(201).json(newModule);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Fetch all modules
export const getModules = async (req: Request, res: Response) => {
  try {
    const modules = await prisma.module.findMany();
    res.status(200).json(modules);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
