import { format, parseISO, isSunday } from 'date-fns';

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

export { isPublicHoliday, isWorkingDay, getWorkingDays };
