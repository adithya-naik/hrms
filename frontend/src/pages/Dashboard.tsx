import { Button } from '@/components/ui/button';
import { Plus, Eye, X, Calendar, Clock, User, Search, Filter, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  useGetDashboardStatsQuery, 
  useGetRecentLeavesQuery, 
  useGetUpcomingLeavesQuery 
} from '@/store/api/dashboardApi';
import { useGetLeaveBalancesQuery, useCancelLeaveMutation } from '@/store/api/leaveApi';
import { Link } from 'react-router-dom';
import { StatsCards } from '@/components/Dashboard/StatsCards';
import { LeaveBalanceCards } from '@/components/Dashboard/LeaveBalanceCards';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProfileQuery } from '@/store/api/authApi';

// Format leave type with LOP suffix
const formatLeaveType = (type: string, isLOP?: boolean) => {
  const formatted = type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return isLOP ? `${formatted} (LOP)` : formatted;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 hover:text-green-900";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 hover:text-yellow-900";
    case "REJECTED":
      return "bg-red-100 text-red-800 border border-red-300 hover:bg-red-200 hover:text-red-900";
    case "CANCELLED":
      return "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-900";
    default:
      return "bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 hover:text-slate-900";
  }
};

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [cancelLeave] = useCancelLeaveMutation();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery(undefined);
  const { data: recentLeaves } = useGetRecentLeavesQuery(10);
  const { data: upcomingLeaves } = useGetUpcomingLeavesQuery(10);
  const { data: leaveBalances } = useGetLeaveBalancesQuery(new Date().getFullYear());

  // Apply search and status filter
  const filteredLeaves = recentLeaves?.leaves
    ? recentLeaves.leaves.filter((leave: any) => {
        const matchesSearch = search
          ? formatLeaveType(leave.leaveType, leave.isLOP)
              .toLowerCase()
              .includes(search.toLowerCase())
          : true;
        const matchesStatus = status === 'ALL' ? true : leave.status === status;
        return matchesSearch && matchesStatus;
      })
    : [];

  const canCancelLeave = (status: string) => {
    return status === "PENDING" || status === "APPROVED";
  };

  const handleCancelLeave = async (leaveId: string) => {
    try {
      await cancelLeave(leaveId).unwrap();
      toast.success("Leave request cancelled successfully");
    } catch {
      toast.error("Failed to cancel leave request");
    }
  };

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
        </div>
        {user?.role === 'EMPLOYEE' && (
          <Button asChild size="lg">
            <Link to="/app/leaves/new">
              <Plus className="mr-2 h-4 w-4" />
              Apply for Leave
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats?.stats} userRole={user?.role || 'EMPLOYEE'} />

      {/* Leave Balances and Table for Employees */}
      {user?.role === 'EMPLOYEE' && (
        <div className="space-y-6">
          {/* Leave Balances */}
          {leaveBalances?.balances && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Leave Balances</h2>
              <LeaveBalanceCards balances={leaveBalances.balances} />
            </div>
          )}

          {/* Leaves Table */}
          <Card>
            <CardHeader>
              <CardTitle>My Leave Requests</CardTitle>
              <CardDescription>View and manage your leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search leave types..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Days</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeaves.length > 0 ? (
                      filteredLeaves.map((leave: any) => (
                        <TableRow key={leave.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {formatLeaveType(leave.leaveType, leave.isLOP)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {format(new Date(leave.startDate), 'MMM dd, yyyy')} -{' '}
                                {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{leave.totalDays}</TableCell>
                          <TableCell>
                            {format(new Date(leave.createdAt), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(leave.status)}>
                              {leave.status.charAt(0) + leave.status.slice(1).toLowerCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                asChild
                              >
                                <Link to={`/app/leaves/${leave.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              {canCancelLeave(leave.status) && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive/90" 
                                  onClick={() => handleCancelLeave(leave.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">No leave requests found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}