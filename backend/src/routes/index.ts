import { Router } from 'express';
import { authRoutes } from './auth';
import { userRoutes } from './users';
import { leaveRoutes } from './leaves';
import { dashboardRoutes } from './dashboard';
import { reportRoutes } from './reports';
import { holidayRoutes } from './holidays';
import { uploadRoutes } from './upload';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/leaves', leaveRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);
router.use('/holidays', holidayRoutes);
router.use('/upload', uploadRoutes);

export { router as routes };