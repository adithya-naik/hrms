import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  
  // Auth0
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN!,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID!,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET!,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE!,
  
  // Server
  PORT: parseInt(process.env.PORT || '5000'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  FROM_EMAIL: process.env.FROM_EMAIL!,
  FROM_NAME: process.env.FROM_NAME!,
  
  // Application
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
};

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'AUTH0_DOMAIN',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
  'AUTH0_AUDIENCE'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}