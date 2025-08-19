import { Router } from 'express';
import { authController } from '@/controllers/authController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);

export { router as authRoutes };