import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

class SettingsController {
  async getSettings(req: Request, res: Response) {
    try {
      let settings = await prisma.setting.findFirst();

      // If no settings exist, create default one
      if (!settings) {
        settings = await prisma.setting.create({
          data: {
            companyName: "My Company",
            timezone: "UTC",
            currency: "USD",
            dateFormat: "DD/MM/YYYY",
            timeFormat: "24h",
            language: "en",
          },
        });
      }

      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      const data = req.body;

      const settings = await prisma.setting.upsert({
        where: { id: data.id || "default-id" }, // single row
        update: data,
        create: data,
      });

      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update settings" });
    }
  }
}

export const settingsController = new SettingsController();
