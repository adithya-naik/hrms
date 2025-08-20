import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  useGetDashboardStatsQuery, 
  useGetRecentLeavesQuery, 
  useGetUpcomingLeavesQuery 
} from '@/store/api/dashboardApi';
import { useGetLeaveBalancesQuery } from '@/store/api/leaveApi';
import { Link } from 'react-router-dom';
import { StatsCards } from '@/components/Dashboard/StatsCards';
import { LeaveBalanceCards } from '@/components/Dashboard/LeaveBalanceCards';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery(undefined);
  const { data: recentLeaves } = useGetRecentLeavesQuery(10);
  const { data: upcomingLeaves } = useGetUpcomingLeavesQuery(10);
  const { data: leaveBalances } = useGetLeaveBalancesQuery(new Date().getFullYear());

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {user?.role === 'MANAGER' ? 'Manager Dashboard' : 
             user?.role === 'HR' || user?.role === 'ADMIN' ? 'HR Dashboard' : 
             'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName}! Here's your leave management overview.
          </p>
        </div>
        {user?.role === 'EMPLOYEE' && (
          <Button asChild size="lg">
            <Link to="/leaves/new">
              <Plus className="mr-2 h-4 w-4" />
              Apply for Leave
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats?.stats} userRole={user?.role || 'EMPLOYEE'} />

      {/* Leave Balances for Employees */}
      {user?.role === 'EMPLOYEE' && leaveBalances?.balances && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Leave Balances</h2>
          <LeaveBalanceCards balances={leaveBalances.balances} />
        </div>
      )}

      {/* Recent Activity */}
      <RecentActivity 
        recentLeaves={recentLeaves?.leaves || []} 
        upcomingLeaves={upcomingLeaves?.leaves || []}
        userRole={user?.role || 'EMPLOYEE'}
      />
    </div>
  );
}