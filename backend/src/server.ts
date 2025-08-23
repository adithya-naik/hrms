import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config/config';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './routes';
import { logger } from './utils/logger';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

const app = express();

// ---------------- Security middleware ----------------
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);

// ---------------- Rate limiting ----------------
const limiter = rateLimit({
  windowMs: 25 * 60 * 1000, // 25 minutes
  max: 2000, // limit each IP
});
app.use(limiter);

// ---------------- Logging ----------------
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// ---------------- Body parsing ----------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---------------- Serve uploaded files ----------------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ---------------- Health check ----------------
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ---------------- API routes ----------------
app.use('/api', routes);

// ---------------- Error handling ----------------
app.use(errorHandler);

// ---------------- 404 handler ----------------
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📚 Environment: ${config.NODE_ENV}`);
});

export default app;
