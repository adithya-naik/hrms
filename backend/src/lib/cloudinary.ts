import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/config';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const uploadToCloudinary = async (
  buffer: Buffer,
  filename: string,
  folder: string
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder,
        public_id: filename,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        } else {
          reject(new Error('Upload failed'));
        }
      }
    ).end(buffer);
  });
};
