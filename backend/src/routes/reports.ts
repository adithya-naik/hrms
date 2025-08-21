import { Router } from 'express';
import { reportController } from '../controllers/reportController';
import { authMiddleware, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authMiddleware);

router.get('/leave-summary', authorize([UserRole.HR, UserRole.ADMIN]), reportController.getLeaveSummary);
router.get('/employee-balances', authorize([UserRole.HR, UserRole.ADMIN]), reportController.getEmployeeBalances);
router.get('/department-analysis', authorize([UserRole.HR, UserRole.ADMIN]), reportController.getDepartmentAnalysis);
router.get('/export/csv', authorize([UserRole.HR, UserRole.ADMIN]), reportController.exportCSV);
router.get(
  "/export",
  authorize([UserRole.HR, UserRole.ADMIN]),
  reportController.export
);

export { router as reportRoutes };
