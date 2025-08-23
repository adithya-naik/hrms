import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";

export const notificationController = {
  // Fetch logged-in user's notifications
  async getUserNotifications(req: AuthRequest, res: Response) {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "desc" },
      });
      res.json(notifications);
    } catch (err) {
      console.error("Error fetching user notifications:", err);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  },

  // Admin/HR only - fetch all notifications
  async getAllNotifications(req: AuthRequest, res: Response) {
    try {
      const notifications = await prisma.notification.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true },
      });
      res.json(notifications);
    } catch (err) {
      console.error("Error fetching all notifications:", err);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  },

  // Mark one notification as read
  async markAsRead(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const notification = await prisma.notification.findFirst({
        where: { id, userId: req.user!.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      const updated = await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });

      res.json(updated);
    } catch (err) {
      console.error("Error marking notification as read:", err);
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  },

  // Mark all notifications as read for current user
  async markAllAsRead(req: AuthRequest, res: Response) {
    try {
      const result = await prisma.notification.updateMany({
        where: { userId: req.user!.id },
        data: { isRead: true },
      });
      res.json({ count: result.count });
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
      res.status(500).json({ error: "Failed to mark all notifications as read" });
    }
  },

  // Delete a notification
  async deleteNotification(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const notification = await prisma.notification.findFirst({
        where: { id, userId: req.user!.id },
      });

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      await prisma.notification.delete({ where: { id } });

      res.json({ message: "Notification deleted", notification });
    } catch (err) {
      console.error("Error deleting notification:", err);
      res.status(500).json({ error: "Failed to delete notification" });
    }
  },
};
