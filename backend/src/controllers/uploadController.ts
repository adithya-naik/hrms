import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, cloudinary } from '../lib/cloudinary';
import { createError } from '../middleware/errorHandler';

class UploadController {
  // Upload leave documents (PDF, DOC, DOCX, JPG, PNG)
  async uploadDocument(req: AuthRequest, res: Response) {
    if (!req.file) {
      throw createError('No file provided', 400);
    }

    try {
      const filename = `${req.user!.id}_${Date.now()}_${req.file.originalname}`;
      const result = await uploadToCloudinary(req.file.buffer, filename, 'leave-documents');

      res.json({
        url: result.url,
        publicId: result.publicId,
        filename: req.file.originalname,
      });
    } catch (error) {
      console.error('Upload error:', error);
      throw createError('File upload failed', 500);
    }
  }

  // Upload profile picture (only image formats allowed)
  async uploadProfilePicture(req: AuthRequest, res: Response) {
    if (!req.file) {
      throw createError('No file provided', 400);
    }

    try {
      const filename = `profile_${req.user!.id}_${Date.now()}`;
      const result = await uploadToCloudinary(req.file.buffer, filename, 'profile-pictures');

      // ⚠️ If you want to update user's profile in DB, do it here
      // e.g., await prisma.user.update({ where: { id: req.user!.id }, data: { profilePicture: result.url } });

      res.json({
        url: result.url,
        publicId: result.publicId,
        filename: req.file.originalname,
      });
    } catch (error) {
      console.error('Profile picture upload error:', error);
      throw createError('Profile picture upload failed', 500);
    }
  }

  async deleteDocument(req: AuthRequest, res: Response) {
    const { publicId } = req.params;

    try {
      await cloudinary.uploader.destroy(publicId);
      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      throw createError('File deletion failed', 500);
    }
  }
}

export const uploadController = new UploadController();
