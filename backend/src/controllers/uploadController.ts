import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, cloudinary } from '../lib/cloudinary';
import { createError } from '../middleware/errorHandler';
import { prisma } from '../lib/prisma';

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

      // Update user's profile image in database
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.id },
        data: { profileImage: result.url },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
        }
      });

      res.json({
        url: result.url,
        publicId: result.publicId,
        filename: req.file.originalname,
        user: updatedUser,
      });
    } catch (error) {
      console.error('Profile picture upload error:', error);
      throw createError('Profile picture upload failed', 500);
    }
  }

  // Delete profile picture
  async deleteProfilePicture(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: { profileImage: true }
      });

      if (!user?.profileImage) {
        throw createError('No profile picture to delete', 404);
      }

      // Extract public ID from Cloudinary URL
      const urlParts = user.profileImage.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(`profile-pictures/${publicId}`);

      // Update user record to remove profile image
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.id },
        data: { profileImage: null },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
        }
      });

      res.json({
        message: 'Profile picture deleted successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Delete profile picture error:', error);
      throw createError('Profile picture deletion failed', 500);
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
