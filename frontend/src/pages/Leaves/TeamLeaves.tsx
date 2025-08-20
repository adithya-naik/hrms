import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter, Eye, Check, X, Calendar, Clock, User } from 'lucide-react';
import { useGetTeamLeavesQuery, useApproveLeaveMutation, useRejectLeaveMutation } from '@/store/api/leaveApi';
import { format } from 'date-fns';
import { toast } from '@/components/ui/sonner';

export default function TeamLeaves() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const filterStatus = status === 'all' ? undefined : status;
  const { data: leavesData, isLoading } = useGetTeamLeavesQuery({
    page,
    limit: 10,
    status: filterStatus,
  });

  const [approveLeave] = useApproveLeaveMutation();
  const [rejectLeave] = useRejectLeaveMutation();

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

  const handleApproveLeave = async (leaveId: string) => {
    try {
      await approveLeave(leaveId).unwrap();
      toast.success('Leave request approved successfully');
    } catch (error) {
      toast.error('Failed to approve leave request');
    }
  };

  const handleRejectLeave = async (leaveId: string) => {
    try {
      await rejectLeave({ id: leaveId, rejectionReason }).unwrap();
      toast.success('Leave request rejected');
      setRejectionReason('');
    } catch (error) {
      toast.error('Failed to reject leave request');
    }
  };

  const canApproveReject = (leave: any) => {
    return leave.status === 'PENDING';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Leaves</h1>
        <p className="text-muted-foreground">Review and manage leave requests from your team members</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Leave Requests</CardTitle>
          <CardDescription>View and approve leave requests from your team</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by employee name..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leavesData?.leaves?.map((leave: any) => (
                  <TableRow key={leave.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {leave.requester.firstName} {leave.requester.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {leave.requester.employeeId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatLeaveType(leave.leaveType)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(leave.startDate), 'MMM dd, yyyy')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{leave.totalDays}</TableCell>
                    <TableCell>{format(new Date(leave.appliedDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(leave.status)}>
                        {leave.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedLeave(leave)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Leave Request Details</DialogTitle>
                              <DialogDescription>
                                Review complete information about this leave request
                              </DialogDescription>
                            </DialogHeader>
                            {selectedLeave && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Employee</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedLeave.requester.firstName} {selectedLeave.requester.lastName}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Employee ID</label>
                                    <p className="text-sm text-muted-foreground">{selectedLeave.requester.employeeId}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Leave Type</label>
                                    <p className="text-sm text-muted-foreground">{formatLeaveType(selectedLeave.leaveType)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="mt-1">
                                      <Badge className={getStatusColor(selectedLeave.status)}>
                                        {selectedLeave.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Start Date</label>
                                    <p className="text-sm text-muted-foreground">{format(new Date(selectedLeave.startDate), 'MMMM dd, yyyy')}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">End Date</label>
                                    <p className="text-sm text-muted-foreground">{format(new Date(selectedLeave.endDate), 'MMMM dd, yyyy')}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Total Days</label>
                                    <p className="text-sm text-muted-foreground">{selectedLeave.totalDays} days</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Applied Date</label>
                                    <p className="text-sm text-muted-foreground">{format(new Date(selectedLeave.appliedDate), 'MMMM dd, yyyy')}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Reason</label>
                                  <p className="text-sm text-muted-foreground mt-1">{selectedLeave.reason}</p>
                                </div>
                                {selectedLeave.rejectionReason && (
                                  <div>
                                    <label className="text-sm font-medium text-red-600">Rejection Reason</label>
                                    <p className="text-sm text-red-600 mt-1">{selectedLeave.rejectionReason}</p>
                                  </div>
                                )}
                                {selectedLeave.approver && (
                                  <div>
                                    <label className="text-sm font-medium">Approved By</label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {selectedLeave.approver.firstName} {selectedLeave.approver.lastName}
                                    </p>
                                  </div>
                                )}

                                {canApproveReject(selectedLeave) && (
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button
                                      onClick={() => handleApproveLeave(selectedLeave.id)}
                                      className="flex-1"
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="flex-1">
                                          <X className="h-4 w-4 mr-2" />
                                          Reject
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Please provide a reason for rejecting this leave request.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <Textarea
                                          placeholder="Enter rejection reason..."
                                          value={rejectionReason}
                                          onChange={(e) => setRejectionReason(e.target.value)}
                                        />
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => handleRejectLeave(selectedLeave.id)}
                                            disabled={!rejectionReason.trim()}
                                          >
                                            Reject Leave
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {canApproveReject(leave) && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveLeave(leave.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <X className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Please provide a reason for rejecting this leave request.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <Textarea
                                  placeholder="Enter rejection reason..."
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                />
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRejectLeave(leave.id)}
                                    disabled={!rejectionReason.trim()}
                                  >
                                    Reject Leave
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {leavesData?.leaves?.map((leave: any) => (
              <Card key={leave.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {leave.requester.firstName} {leave.requester.lastName}
                        </span>
                      </div>
                      <h3 className="font-medium">{formatLeaveType(leave.leaveType)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <Badge className={getStatusColor(leave.status)}>
                      {leave.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {leave.totalDays} days
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(leave.appliedDate), 'MMM dd')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLeave(leave)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Leave Request Details</DialogTitle>
                          </DialogHeader>
                          {selectedLeave && (
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Employee</label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedLeave.requester.firstName} {selectedLeave.requester.lastName}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Leave Type</label>
                                <p className="text-sm text-muted-foreground">{formatLeaveType(selectedLeave.leaveType)}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Duration</label>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(selectedLeave.startDate), 'MMMM dd, yyyy')} - {format(new Date(selectedLeave.endDate), 'MMMM dd, yyyy')}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Reason</label>
                                <p className="text-sm text-muted-foreground">{selectedLeave.reason}</p>
                              </div>

                              {canApproveReject(selectedLeave) && (
                                <div className="flex gap-2 pt-4 border-t">
                                  <Button
                                    onClick={() => handleApproveLeave(selectedLeave.id)}
                                    className="flex-1"
                                  >
                                    Approve
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" className="flex-1">
                                        Reject
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Please provide a reason for rejecting this leave request.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <Textarea
                                        placeholder="Enter rejection reason..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                      />
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleRejectLeave(selectedLeave.id)}
                                          disabled={!rejectionReason.trim()}
                                        >
                                          Reject Leave
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {canApproveReject(leave) && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveLeave(leave.id)}
                            className="text-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <X className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please provide a reason for rejecting this leave request.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <Textarea
                                placeholder="Enter rejection reason..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRejectLeave(leave.id)}
                                  disabled={!rejectionReason.trim()}
                                >
                                  Reject Leave
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {leavesData?.pagination && leavesData.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {((leavesData.pagination.page - 1) * leavesData.pagination.limit) + 1} to{' '}
                {Math.min(leavesData.pagination.page * leavesData.pagination.limit, leavesData.pagination.total)} of{' '}
                {leavesData.pagination.total} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === leavesData.pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {leavesData?.leaves?.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No team leave requests found</h3>
              <p className="text-muted-foreground">Your team members haven't submitted any leave requests yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}