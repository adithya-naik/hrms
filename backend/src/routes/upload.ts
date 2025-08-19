import { Router } from 'express';
import multer from 'multer';
import { uploadController } from '@/controllers/uploadController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, PDF, DOC, and DOCX files are allowed.'));
    }
  },
});

router.use(authMiddleware);

router.post('/document', upload.single('file'), uploadController.uploadDocument);
router.delete('/document/:publicId', uploadController.deleteDocument);

export { router as uploadRoutes };