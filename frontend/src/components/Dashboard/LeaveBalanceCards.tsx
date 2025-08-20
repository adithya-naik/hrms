import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface LeaveBalanceCardsProps {
  balances: any[];
}

export function LeaveBalanceCards({ balances }: LeaveBalanceCardsProps) {
  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'SICK':
        return <Calendar className="h-4 w-4 text-red-500" />;
      case 'CASUAL':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'VACATION':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatLeaveType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {balances?.map((balance: any) => {
        const usagePercentage = ((balance.totalQuota - balance.availableDays) / balance.totalQuota) * 100;
        
        return (
          <Card key={balance.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {formatLeaveType(balance.leavePolicy?.leaveType || balance.leaveType)}
              </CardTitle>
              {getLeaveTypeIcon(balance.leavePolicy?.leaveType || balance.leaveType)}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-green-600">
                  {balance.availableDays}
                </div>
                <div className="text-sm text-muted-foreground">
                  of {balance.totalQuota} days
                </div>
              </div>
              
              <Progress value={100 - usagePercentage} className="h-2" />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used: {balance.usedDays}</span>
                <span>Pending: {balance.pendingDays}</span>
              </div>
              
              {balance.carryForward > 0 && (
                <div className="text-xs text-blue-600">
                  Carry Forward: {balance.carryForward} days
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}