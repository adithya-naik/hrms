import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authMiddleware);

router.get('/', authorize([UserRole.HR, UserRole.ADMIN]), userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', authorize([UserRole.HR, UserRole.ADMIN]), userController.updateUser);
router.delete('/:id', authorize([UserRole.ADMIN]), userController.deleteUser);

export { router as userRoutes };