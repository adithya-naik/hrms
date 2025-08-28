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

export function LeaveBalanceCards({ balances }: LeaveBalanceCardsProps) {
  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'SICK':
        return <Calendar className="h-4 w-4 text-red-500" />;
      case 'CASUAL':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'VACATION':
      case 'WFH':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatLeaveType = (type: string) =>
    type ? type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()) : '';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {balances?.map((balance) => {
        // Use monthly quota for display; fallback to annual/12 if missing
        const monthlyTotal = balance.leavePolicy?.monthlyQuota || balance.monthlyQuota || Math.ceil(balance.totalQuota / 12);
        const monthlyUsed = balance.usedDays;
        const monthlyPending = balance.pendingDays;
        const monthlyAvailable = monthlyTotal - monthlyUsed;

        const percentageAvailable = Math.round((monthlyAvailable / monthlyTotal) * 100);

        // Dynamic color based on availability
        let progressColor = 'green-500';
        if (percentageAvailable <= 25) progressColor = 'red-500';
        else if (percentageAvailable <= 50) progressColor = 'yellow-500';

        const radius = 28;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentageAvailable / 100) * circumference;

        return (
          <Card
            key={balance.id}
            className="hover:shadow-md transition-shadow flex flex-col items-center justify-center p-3"
          >
            <CardHeader className="flex flex-col items-center space-y-1">
              {getLeaveTypeIcon(balance.leavePolicy?.leaveType || balance.leaveType)}
              <CardTitle className="text-xs font-medium text-center">
                {formatLeaveType(balance.leavePolicy?.leaveType || balance.leaveType)}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" aria-label={`${monthlyAvailable} of ${monthlyTotal} days available`}>
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                    strokeDasharray={circumference}
                    strokeDashoffset={0}
                  />
                  <circle
                    className={`stroke-current transition-all duration-500 text-${progressColor}`}
                    strokeWidth="5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-sm font-bold text-green-600">{monthlyUsed}</span>
                  <span className="text-[10px] text-muted-foreground">/{monthlyTotal}</span>
                </div>
              </div>

              {/* Used, Pending, Carry */}
              <div className="mt-2 text-[11px] text-muted-foreground space-y-0.5 text-center">
                <div>Used: {monthlyUsed}</div>
                <div>Pending: {monthlyPending}</div>
                {balance.carryForward > 0 && <div className="text-blue-600">Carry: {balance.carryForward}</div>}
                <div>Annual: {balance.totalQuota}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
