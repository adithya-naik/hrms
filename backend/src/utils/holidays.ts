import { format, parseISO } from 'date-fns';

type Holiday = {
  name: string;
  date: Date;
};

// List of public holidays for 2025
const PUBLIC_HOLIDAYS_2025: Holiday[] = [
  { name: 'New Year Day', date: new Date('2025-01-01') },
  { name: 'Sankranti', date: new Date('2025-01-14') },
  { name: 'Maha Shivaratri', date: new Date('2025-02-26') },
  { name: 'Holi', date: new Date('2025-03-14') },
  { name: 'Independence Day', date: new Date('2025-08-15') },
  { name: 'Ganesh Chaturthi', date: new Date('2025-08-27') },
  { name: 'Dussera', date: new Date('2025-10-02') },
  { name: 'Deepavali', date: new Date('2025-10-20') },
  { name: 'Govardhan Puja', date: new Date('2025-10-21') },
  { name: 'Christmas', date: new Date('2025-12-25') },
];

/**
 * Checks if a given date is a public holiday
 */
function isPublicHoliday(date: Date): boolean {
  return PUBLIC_HOLIDAYS_2025.some(holiday => 
    format(holiday.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
}

/**
 * Checks if a date is a working day (not Sunday and not a public holiday)
 */
function isWorkingDay(date: Date): boolean {
  return !isSunday(date) && !isPublicHoliday(date);
}

/**
 * Calculates working days between two dates (inclusive)
 * Excludes Sundays and public holidays
 */
function getWorkingDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);
  
  // Set time to noon to avoid DST issues
  current.setHours(12, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(12, 0, 0, 0);

  while (current <= end) {
    if (isWorkingDay(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

/**
 * Checks if a date is a Sunday (weekly off)
 */
function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

/**
 * Gets all dates between start and end dates (inclusive)
 */
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

/**
 * Calculates sandwich leave days (Sundays between two working days of leave)
 */
function getSandwichLeaveDays(startDate: Date, endDate: Date): number {
  const dates = getDatesInRange(startDate, endDate);
  let sandwichDays = 0;

  for (let i = 1; i < dates.length - 1; i++) {
    const current = dates[i];
    const prev = dates[i - 1];
    const next = dates[i + 1];

    // Check if current day is Sunday and not a public holiday
    if (isSunday(current) && !isPublicHoliday(current)) {
      // Check if previous and next days are working days
      const prevIsWorking = isWorkingDay(prev) || isSunday(prev);
      const nextIsWorking = isWorkingDay(next) || isSunday(next);
      
      if (prevIsWorking && nextIsWorking) {
        sandwichDays++;
      }
    }
  }

  return sandwichDays;
}

export { isPublicHoliday, isWorkingDay, getWorkingDays, getSandwichLeaveDays };
