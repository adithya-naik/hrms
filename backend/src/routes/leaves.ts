import { Router } from 'express';
import { leaveController } from '../controllers/leaveController';
import { authMiddleware, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Employee routes
router.get('/', leaveController.getLeaves);
router.post('/', leaveController.createLeave);
router.get('/balances', leaveController.getLeaveBalances);
router.put('/:id/cancel', leaveController.cancelLeave);

// Manager/HR routes
router.put('/:id/approve', authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]), leaveController.approveLeave);
router.put('/:id/reject', authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]), leaveController.rejectLeave);
router.get('/team', authorize([UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]), leaveController.getTeamLeaves);

// Admin/HR routes
router.get('/policies', authorize([UserRole.HR, UserRole.EMPLOYEE,UserRole.ADMIN]), leaveController.getLeavePolicies);
router.post('/policies', authorize([UserRole.ADMIN]), leaveController.createLeavePolicy);
router.put('/policies/:id', authorize([UserRole.ADMIN]), leaveController.updateLeavePolicy);

export { router as leaveRoutes };