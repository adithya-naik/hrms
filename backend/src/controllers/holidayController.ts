import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const createHolidaySchema = z.object({
  name: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  description: z.string().optional(),
  isRecurring: z.boolean().default(false),
});

class HolidayController {
  async getHolidays(req: AuthRequest, res: Response) {
    const { year } = req.query;
    
    let where: any = { isActive: true };
    
    if (year) {
      const yearNum = parseInt(year as string);
      where.date = {
        gte: new Date(yearNum, 0, 1),
        lte: new Date(yearNum, 11, 31),
      };
    }

    const holidays = await prisma.holiday.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    res.json({ holidays });
  }

  async createHoliday(req: AuthRequest, res: Response) {
    const data = createHolidaySchema.parse(req.body);

    const holiday = await prisma.holiday.create({
      data,
    });

    res.status(201).json({ holiday });
  }

  async updateHoliday(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const data = createHolidaySchema.partial().parse(req.body);

    const holiday = await prisma.holiday.update({
      where: { id },
      data,
    });

    res.json({ holiday });
  }

  async deleteHoliday(req: AuthRequest, res: Response) {
    const { id } = req.params;

    await prisma.holiday.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'Holiday deleted successfully' });
  }
}

export const holidayController = new HolidayController();