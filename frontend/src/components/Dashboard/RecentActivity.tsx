import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface RecentActivityProps {
  recentLeaves: any[];
  upcomingLeaves: any[];
  userRole: string;
}

export function RecentActivity({ recentLeaves, upcomingLeaves, userRole }: RecentActivityProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatLeaveType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Requests
            </CardTitle>
            <CardDescription>
              {userRole === 'EMPLOYEE' ? 'Your recent leave applications' : 'Recent leave requests'}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/leaves">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeaves?.length > 0 ? (
              recentLeaves.slice(0, 5).map((leave: any) => (
                <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    {userRole !== 'EMPLOYEE' && leave.requester && (
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {leave.requester.firstName} {leave.requester.lastName}
                        </span>
                      </div>
                    )}
                    <p className="font-medium">{formatLeaveType(leave.leaveType)}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd')}</span>
                      <span>{leave.totalDays} day{leave.totalDays !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(leave.status)}>
                    {leave.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent leave requests</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Leaves
            </CardTitle>
            <CardDescription>
              {userRole === 'EMPLOYEE' ? 'Your approved upcoming leaves' : 'Team upcoming leaves'}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/leaves?status=APPROVED">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingLeaves?.length > 0 ? (
              upcomingLeaves.slice(0, 5).map((leave: any) => (
                <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    {userRole !== 'EMPLOYEE' && leave.requester && (
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {leave.requester.firstName} {leave.requester.lastName}
                        </span>
                      </div>
                    )}
                    <p className="font-medium">{formatLeaveType(leave.leaveType)}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd')}</span>
                      <span>{leave.totalDays} day{leave.totalDays !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">Approved</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.ceil((new Date(leave.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming leaves</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}