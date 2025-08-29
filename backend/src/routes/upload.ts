import { Router } from 'express';
import multer from 'multer';
import { uploadController } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Middleware applied to all routes
router.use(authMiddleware);

// Leave documents upload (PDF, DOC, DOCX, JPG, PNG)
router.post('/document', 
  upload.single('file'), 
  uploadController.uploadDocument
);

// Profile picture upload (only JPG/PNG allowed)
router.post(
  '/profile-picture',
  upload.single('file'),
  (req, res, next) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (req.file && !allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only JPG and PNG allowed.' });
    }
    next();
  },
  uploadController.uploadProfilePicture
);

// Delete by publicId
router.delete('/document/:publicId', uploadController.deleteDocument);

export { router as uploadRoutes };
