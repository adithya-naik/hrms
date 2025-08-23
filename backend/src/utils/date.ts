import { logger } from "./logger";

export function safeDate(d: Date | string | null | undefined): Date {
  if (!d) {
    logger.warn("safeDate received null/undefined, returning current date");
    return new Date();
  }
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) {
    logger.error(`Invalid date input: ${d}`);
    return new Date(); // Fallback to current date
  }
  return date;
}

export function formatDate(d: Date | string | null | undefined): string {
  const date = safeDate(d);
  if (isNaN(date.getTime())) {
    logger.error(`Cannot format invalid date: ${d}`);
    return new Date().toDateString(); // Fallback
  }
  return date.toDateString();
}