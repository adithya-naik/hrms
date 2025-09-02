import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface LeaveBalance {
  id: string;
  leaveType: string;
  totalQuota: number;      // Annual total
  monthlyQuota?: number;   // Optional monthly quota
  usedDays: number;        // Monthly used
  pendingDays: number;     // Monthly pending
  availableDays: number;   // Monthly available
  carryForward: number;
  leavePolicy?: {
    leaveType: string;
    monthlyQuota?: number;
  };
}

interface LeaveBalanceCardsProps {
  balances: LeaveBalance[];
}

const getLeaveTypeColor = (type: string) => {
  switch (type) {
    case 'SICK':
      return 'bg-red-500';
    case 'CASUAL':
      return 'bg-blue-500';
    case 'VACATION':
      return 'bg-green-500';
    case 'WFH':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const formatLeaveType = (type: string) =>
  type ? type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()) : '';

export function LeaveBalanceCards({ balances }: LeaveBalanceCardsProps) {
  // Calculate available days for each leave type
  const leaveTypeData = balances.map(balance => {
    const monthlyTotal = balance.leavePolicy?.monthlyQuota || balance.monthlyQuota || Math.ceil(balance.totalQuota / 12);
    const monthlyUsed = balance.usedDays;
    const monthlyAvailable = Math.max(0, monthlyTotal - monthlyUsed);
    
    return {
      type: balance.leavePolicy?.leaveType || balance.leaveType,
      total: monthlyTotal,
      used: monthlyUsed,
      available: monthlyAvailable,
      color: getLeaveTypeColor(balance.leavePolicy?.leaveType || balance.leaveType)
    };
  });
  
  // Filter out leave types with zero total quota to avoid division by zero
  const validLeaveTypes = leaveTypeData.filter(leave => leave.total > 0);
  
  // Calculate total available leaves across all types
  const totalAvailable = validLeaveTypes.reduce((sum, leave) => sum + leave.available, 0);
  
  // Calculate percentages based on remaining leaves
  const leaveSegments = validLeaveTypes.map(leave => ({
    ...leave,
    percentage: totalAvailable > 0 ? (leave.available / totalAvailable) * 100 : 0,
    usedPercentage: leave.total > 0 ? (leave.used / leave.total) * 100 : 0
  }));

  return (
    <div className="w-full space-y-3 px-4">
      {/* Progress Bar */}
      <div className="h-8 w-full rounded-full overflow-hidden flex bg-gray-200">
        {leaveSegments.map((data, index) => (
          <div 
            key={index}
            className={`h-full ${data.color} relative`}
            style={{ width: `${data.percentage}%` }}
            title={`${data.available} ${data.type} days remaining (${data.percentage.toFixed(1)}%)`}
          >
            {/* Optional: Show a subtle separator between segments */}
            {index > 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/50"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Numbers below the bar - positioned absolutely to align with segments */}
      <div className="relative w-full h-12">
        {leaveSegments.map((data, index) => {
          // Calculate left position based on previous segments' percentages
          const left = leaveSegments
            .slice(0, index)
            .reduce((sum, segment) => sum + segment.percentage, 0);
            
          return (
            <div 
              key={index}
              className="absolute top-0 text-center transform -translate-x-1/2"
              style={{
                left: `${left + (data.percentage / 2)}%`,
                minWidth: '2.5rem',
              }}
            >
              <div className="font-medium">{data.available}</div>
            </div>
          );
        })}
      </div>
      
      {/* Color legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {leaveSegments.map((data, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
            <span className="text-xs text-gray-600">
              {formatLeaveType(data.type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
