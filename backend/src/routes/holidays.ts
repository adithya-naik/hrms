import { Router } from 'express';
import { holidayController } from '../controllers/holidayController';
import { authMiddleware, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authMiddleware);

router.get('/', holidayController.getHolidays);
router.post('/', authorize([UserRole.HR, UserRole.ADMIN]), holidayController.createHoliday);
router.put('/:id', authorize([UserRole.HR, UserRole.ADMIN]), holidayController.updateHoliday);
router.delete('/:id', authorize([UserRole.ADMIN]), holidayController.deleteHoliday);

export { router as holidayRoutes };