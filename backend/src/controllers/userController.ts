import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  role: z.nativeEnum(UserRole).optional(),
  managerId: z.string().optional(),
  departmentId: z.string().optional(),
  isActive: z.boolean().optional(),
});

class UserController {
  async getUsers(req: AuthRequest, res: Response) {
    const { page = '1', limit = '10', search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    let where: any = {};
    if (search) {
      where = {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { employeeId: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          employeeId: true,
          role: true,
          isActive: true,
          joinDate: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  }

  async getUserById(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
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
        employees: {
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

  async updateUser(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const data = updateUserSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id },
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

  async deleteUser(req: AuthRequest, res: Response) {
    const { id } = req.params;

    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'User deactivated successfully' });
  }
}

export const userController = new UserController();