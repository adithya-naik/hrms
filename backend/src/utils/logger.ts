import winston from 'winston';
import { config } from '../config/config';

const separator = '\n\n\n================ QUERY SEPARATOR ================\n\n\n';

// Custom format that prefixes each message with separator line
const separatorFormat = winston.format((info) => {
  // You can either prepend or append the separator line in the message
  info.message = `${separator}\n${info.message}\n${separator}`;
  return info;
});

const logger = winston.createLogger({
  level: config.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    separatorFormat(),  // Add separator format before others
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'leave-management-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});


if (config.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      separatorFormat(),
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export { logger };
