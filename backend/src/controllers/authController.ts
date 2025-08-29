import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'), // can be username OR email
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  departmentId: z.string().optional(),
  managerId: z.string().optional(),
  joinDate: z.string().transform((str) => new Date(str)).optional(),
});

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  profileImage: z.string().optional(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async login(req: Request, res: Response) {
    const { username, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
        isActive: true,
      },
      include: {
        department: true,
        manager: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    if (!user) throw createError('Invalid credentials', 401);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw createError('Invalid credentials', 401);

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      user,
      token,
      refreshToken,
    });
  }

  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }, { employeeId: data.employeeId }],
      },
    });

    if (existingUser) {
      if (existingUser.username === data.username) throw createError('Username already exists', 409);
      if (existingUser.email === data.email) throw createError('Email already exists', 409);
      if (existingUser.employeeId === data.employeeId) throw createError('Employee ID already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
      include: {
        department: true,
        manager: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    await this.initializeLeaveBalances(user.id);

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(201).json({ user, token });
  }

async getProfile(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      department: true,
      manager: { 
        select: { 
          id: true, 
          firstName: true, 
          lastName: true, 
          email: true 
        } 
      },
      hr: {  // 👈 Include HR details
        select: { 
          id: true, 
          firstName: true, 
          lastName: true, 
          email: true 
        }
      },
      leaveBalances: { 
        where: { year: new Date().getFullYear() }, 
        include: { leavePolicy: true } 
      },
    },
  });

  if (!user) throw createError('User not found', 404);

  res.json({ user });
}

  async updateProfile(req: AuthRequest, res: Response) {
    const data = updateProfileSchema.parse(req.body);

    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: { email: data.email, id: { not: req.user!.id } },
      });
      if (existingUser) throw createError('Email already exists', 409);
    }

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
      include: {
        department: true,
        manager: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    res.json({ user });
  }

  async changePassword(req: AuthRequest, res: Response) {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) throw createError('User not found', 404);

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) throw createError('Current password is incorrect', 400);

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: req.user!.id }, data: { password: hashedPassword } });

    res.json({ message: 'Password updated successfully' });
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError('Refresh token is required', 400);

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!) as any;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          department: true,
          manager: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      });

      if (!user || !user.isActive) throw createError('Invalid refresh token', 401);

      const newToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({ user, token: newToken });
    } catch {
      throw createError('Invalid refresh token', 401);
    }
  }

 private async initializeLeaveBalances(userId: string) {
  const currentYear = new Date().getFullYear();
  const policies = await prisma.leavePolicy.findMany({ where: { isActive: true } });
  if (!policies.length) return;

  const data: any[] = [];

  for (const policy of policies) {
    if (policy.monthlyQuota && policy.monthlyQuota > 0) {
      // Monthly leave: create 12 entries
      for (let month = 1; month <= 12; month++) {
        data.push({
          userId,
          leavePolicyId: policy.id,
          year: currentYear,
          month,
          totalQuota: policy.monthlyQuota,
          availableDays: policy.monthlyQuota,
          resetDate: new Date(currentYear, month - 1, policy.quotaResetDay ?? 1),
        });
      }
    } else {
      // Annual leave: create a single entry
      data.push({
        userId,
        leavePolicyId: policy.id,
        year: currentYear,
        month: null, // no month for annual leave
        totalQuota: policy.annualQuota,
        availableDays: policy.annualQuota,
        resetDate: new Date(currentYear, 0, policy.quotaResetDay ?? 1),
      });
    }
  }

  await prisma.leaveBalance.createMany({
    data,
    skipDuplicates: true,
  });
}

}

export const authController = new AuthController();