import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const loginSchema = z.object({
  auth0Id: z.string(),
  email: z.string().email(),
});

const registerSchema = z.object({
  auth0Id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  employeeId: z.string().min(1),
  departmentId: z.string().optional(),
  managerId: z.string().optional(),
  joinDate: z.string().transform((str) => new Date(str)),
});

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  profileImage: z.string().optional(),
});

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async login(req: Request, res: Response) {
    const { auth0Id, email } = loginSchema.parse(req.body);

    // Try to find user by auth0Id
    let user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        department: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // If not found by auth0Id, try to find by email to avoid duplicates
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email },
        include: {
          department: true,
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // If found by email but no auth0Id, update user with auth0Id
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { auth0Id },
          include: {
            department: true,
            manager: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        });
      }
    }

    // If no user found, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id,
          email,
          firstName: 'New',
          lastName: 'User',
          employeeId: 'EMP' + Math.floor(Math.random() * 100000),
          role: 'EMPLOYEE',
          joinDate: new Date(),
          isActive: true,
        },
        include: {
          department: true,
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      await this.initializeLeaveBalances(user.id);
    }

    if (!user.isActive) {
      throw createError('Account is deactivated', 403);
    }
console.log('\n\n\nUser found or created in backemd :\n\n\n\n', user);
    res.json({
      user: {
        id: user.id,
        auth0Id: user.auth0Id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId,
        role: user.role,
        department: user.department,
        manager: user.manager,
        profileImage: user.profileImage,
        joinDate: user.joinDate,
      },
    });
  }

  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { auth0Id: data.auth0Id },
          { email: data.email },
          { employeeId: data.employeeId },
        ],
      },
    });

    if (existingUser) {
      throw createError('User already exists', 409);
    }

    const user = await prisma.user.create({
      data,
      include: {
        department: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    await this.initializeLeaveBalances(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        auth0Id: user.auth0Id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId,
        role: user.role,
        department: user.department,
        manager: user.manager,
        profileImage: user.profileImage,
        joinDate: user.joinDate,
      },
    });
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
            email: true,
          },
        },
        leaveBalances: {
          where: { year: new Date().getFullYear() },
          include: { leavePolicy: true },
        },
      },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    res.json({ user });
  }

  async updateProfile(req: AuthRequest, res: Response) {
    const data = updateProfileSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
      include: {
        department: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.json({ user });
  }

  private async initializeLeaveBalances(userId: string) {
    const currentYear = new Date().getFullYear();
    const policies = await prisma.leavePolicy.findMany({
      where: { isActive: true },
    });

    const balances = policies.map((policy) => ({
      userId,
      leaveType: policy.leaveType,
      year: currentYear,
      totalQuota: policy.annualQuota,
      availableDays: policy.annualQuota,
    }));

    await prisma.leaveBalance.createMany({
      data: balances,
    });
  }
}

export const authController = new AuthController();
