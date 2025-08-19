import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, TrendingUp, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  useGetDashboardStatsQuery, 
  useGetRecentLeavesQuery, 
  useGetUpcomingLeavesQuery 
} from '@/store/api/dashboardApi';
import { useGetLeaveBalancesQuery } from '@/store/api/leaveApi';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery(undefined);
  const { data: recentLeaves } = useGetRecentLeavesQuery(5);
  const { data: upcomingLeaves } = useGetUpcomingLeavesQuery(5);
  const { data: leaveBalances } = useGetLeaveBalancesQuery(new Date().getFullYear());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderEmployeeDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link to="/leaves/new">
            <Plus className="mr-2 h-4 w-4" />
            Apply for Leave
          </Link>
        </Button>
      </div>

      {/* Leave Balances */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leaveBalances?.balances?.map((balance: any) => (
          <Card key={balance.leaveType}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {balance.leaveType.replace('_', ' ')}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance.availableDays}</div>
              <p className="text-xs text-muted-foreground">
                Available of {balance.totalQuota} days
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.pendingLeaves || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Leaves</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.approvedLeaves || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Days Taken</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.totalLeaveTaken || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leaves */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
            <CardDescription>Your recent leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaves?.leaves?.slice(0, 5).map((leave: any) => (
                <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{leave.leaveType.replace('_', ' ')}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(leave.status)}>
                    {leave.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Leaves</CardTitle>
            <CardDescription>Your approved upcoming leaves</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLeaves?.leaves?.slice(0, 5).map((leave: any) => (
                <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{leave.leaveType.replace('_', ' ')}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {leave.totalDays} days
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderManagerDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.teamPendingLeaves || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team On Leave</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.teamOnLeave || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.teamMembers || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Team Requests</CardTitle>
          <CardDescription>Recent leave requests from your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeaves?.leaves?.slice(0, 5).map((leave: any) => (
              <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{leave.requester?.firstName} {leave.requester?.lastName}</p>
                  <p className="text-sm text-muted-foreground">
                    {leave.leaveType.replace('_', ' ')} - {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getStatusColor(leave.status)}>
                  {leave.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHRDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.totalEmployees || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.pendingLeaves || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.onLeaveToday || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stats?.thisMonthLeaves || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leave Requests</CardTitle>
          <CardDescription>All recent leave requests across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeaves?.leaves?.slice(0, 8).map((leave: any) => (
              <div key={leave.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{leave.requester?.firstName} {leave.requester?.lastName}</p>
                  <p className="text-sm text-muted-foreground">
                    {leave.leaveType.replace('_', ' ')} - {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getStatusColor(leave.status)}>
                  {leave.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'MANAGER':
        return renderManagerDashboard();
      case 'HR':
      case 'ADMIN':
        return renderHRDashboard();
      default:
        return renderEmployeeDashboard();
    }
  };

  if (statsLoading) {
    return <div>Loading...</div>;
  }

  return renderDashboard();
}