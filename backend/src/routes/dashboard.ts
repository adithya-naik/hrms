import { Router } from 'express';
import { dashboardController } from '@/controllers/dashboardController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/stats', dashboardController.getDashboardStats);
router.get('/recent-leaves', dashboardController.getRecentLeaves);
router.get('/upcoming-leaves', dashboardController.getUpcomingLeaves);

export { router as dashboardRoutes };