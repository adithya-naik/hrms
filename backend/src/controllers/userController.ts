import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

// ================== Validation Schema ==================
const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(), // optional, defaults to username
  employeeId: z.string().min(1),
  role: z.nativeEnum(UserRole).default("EMPLOYEE"),
  departmentId: z.string().optional(),
  managerId: z.string().optional(),
  profileImage: z.string().optional(),
});

// ================== Controller ==================
export const userController = {
  // Create new user
  async createUser(req: AuthRequest, res: Response) {
    try {
      const data = createUserSchema.parse(req.body);

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { username: data.username },
            { employeeId: data.employeeId },
          ],
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "User with this email, username, or employeeId already exists" });
      }

      const hashedPassword = await bcrypt.hash(data.password ?? data.username, 10);

      const user = await prisma.user.create({
        data: { ...data, password: hashedPassword },
        include: {
          department: true,
          manager: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      });

      // ✅ Initialize leave balances for the new user
      await userController.initializeLeaveBalances(user.id);

      return res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async getUsers(req: AuthRequest, res: Response) {
  try {
    const requester = req.user; // set by authMiddleware
    let users;

    if (requester.role === UserRole.MANAGER) {
      // Manager: only their employees
      users = await prisma.user.findMany({
        where: { role: UserRole.EMPLOYEE, managerId: requester.id, isActive: true },
        select: { id: true, firstName: true, lastName: true, employeeId: true },
      });
    } else if (requester.role === UserRole.HR || requester.role === UserRole.ADMIN) {
      // HR/Admin: all employees
      users = await prisma.user.findMany({
        where: { role: UserRole.EMPLOYEE, isActive: true },
        select: { id: true, firstName: true, lastName: true, employeeId: true },
      });
    } else {
      // Other roles: forbidden
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(users);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
},

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          department: true,
          manager: { select: { id: true, firstName: true, lastName: true, email: true } },
          leaveBalances: { where: { year: new Date().getFullYear() }, include: { leavePolicy: true } },
        },
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data,
        include: {
          department: true,
          manager: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      });

      return res.json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id } });
      return res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  // ✅ Helper function: Initialize leave balances
  async initializeLeaveBalances(userId: string) {
    const currentYear = new Date().getFullYear();
    const policies = await prisma.leavePolicy.findMany({ where: { isActive: true } });

    if (policies.length === 0) return;

    await prisma.leaveBalance.createMany({
      data: policies.map((policy) => ({
        userId,
        leavePolicyId: policy.id,
        year: currentYear,
        totalQuota: policy.annualQuota,
        availableDays: policy.annualQuota,
      })),
      skipDuplicates: true,
    });
  },
};
