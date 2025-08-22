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
import { Search, Filter, Eye, Check, X, Calendar, Clock, User, FileText } from 'lucide-react';
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
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatLeaveType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleApproveLeave = async (leaveId: string) => {
    try {
      await approveLeave(leaveId).unwrap();
      toast.success('Leave request approved successfully');
    } catch {
      toast.error('Failed to approve leave request');
    }
  };

  const handleRejectLeave = async (leaveId: string) => {
    try {
      await rejectLeave({ id: leaveId, rejectionReason }).unwrap();
      toast.success('Leave request rejected');
      setRejectionReason('');
    } catch {
      toast.error('Failed to reject leave request');
    }
  };

  const canApproveReject = (leave: any) => leave.status === 'PENDING';

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );

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
                  <TableHead>Attachments</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leavesData?.leaves?.map((leave: any) => (
                  <TableRow key={leave.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{leave.requester.firstName} {leave.requester.lastName}</div>
                        <div className="text-sm text-muted-foreground">{leave.requester.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatLeaveType(leave.leaveType)}</TableCell>
                    <TableCell>{format(new Date(leave.startDate), 'MMM dd, yyyy')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{leave.totalDays}</TableCell>
                    <TableCell>{format(new Date(leave.appliedDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(leave.status)}>{leave.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {leave.attachments?.length > 0 ? (
                        <ul className="space-y-1">
                          {leave.attachments.map((file: string, idx: number) => (
                            <li key={idx}>
                              <a
  href={`http://localhost:5000/${file.replace(/\\/g, '/')}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 underline flex items-center gap-1"
>
  <FileText className="h-4 w-4" /> {file.split(/[/\\]/).pop()}
</a>

                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm text-muted-foreground">No files</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* Dialog for Details */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedLeave(leave)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Leave Request Details</DialogTitle>
                              <DialogDescription>Review complete information about this leave request</DialogDescription>
                            </DialogHeader>
                            {selectedLeave && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Employee</label>
                                  <p className="text-sm text-muted-foreground">{selectedLeave.requester.firstName} {selectedLeave.requester.lastName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Leave Type</label>
                                  <p className="text-sm text-muted-foreground">{formatLeaveType(selectedLeave.leaveType)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Duration</label>
                                  <p className="text-sm text-muted-foreground">{format(new Date(selectedLeave.startDate), 'MMMM dd, yyyy')} - {format(new Date(selectedLeave.endDate), 'MMMM dd, yyyy')}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Reason</label>
                                  <p className="text-sm text-muted-foreground">{selectedLeave.reason}</p>
                                </div>
                                {selectedLeave.attachments?.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Attachments</label>
                                    <ul className="mt-1 space-y-1">
                                      {selectedLeave.attachments.map((file: string, idx: number) => (
                                        <li key={idx}>
                                          <a
                                            href={`http://localhost:5000${file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline flex items-center gap-1"
                                          >
                                            <FileText className="h-4 w-4" /> {file.split('/').pop()}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {canApproveReject(selectedLeave) && (
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button onClick={() => handleApproveLeave(selectedLeave.id)} className="flex-1"><Check className="h-4 w-4 mr-2" />Approve</Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="flex-1"><X className="h-4 w-4 mr-2" />Reject</Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                                          <AlertDialogDescription>Please provide a reason for rejecting this leave request.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <Textarea placeholder="Enter rejection reason..." value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleRejectLeave(selectedLeave.id)} disabled={!rejectionReason.trim()}>Reject Leave</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
                <CardContent>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{leave.requester.firstName} {leave.requester.lastName}</span>
                      </div>
                      <h3 className="font-medium">{formatLeaveType(leave.leaveType)}</h3>
                      <p className="text-sm text-muted-foreground">{format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}</p>
                    </div>
                    <Badge className={getStatusColor(leave.status)}>{leave.status}</Badge>
                  </div>

                  {/* Attachments */}
                  {leave.attachments?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {leave.attachments.map((file: string, idx: number) => (
                        <li key={idx}>
                          <a
                            href={`http://localhost:5000${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4" /> {file.split('/').pop()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {leave.totalDays} days</div>
                      <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {format(new Date(leave.appliedDate), 'MMM dd')}</div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLeave(leave)}><Eye className="h-4 w-4" /></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Leave Request Details</DialogTitle></DialogHeader>
                        {selectedLeave && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Employee</label>
                              <p className="text-sm text-muted-foreground">{selectedLeave.requester.firstName} {selectedLeave.requester.lastName}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Leave Type</label>
                              <p className="text-sm text-muted-foreground">{formatLeaveType(selectedLeave.leaveType)}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Duration</label>
                              <p className="text-sm text-muted-foreground">{format(new Date(selectedLeave.startDate), 'MMMM dd, yyyy')} - {format(new Date(selectedLeave.endDate), 'MMMM dd, yyyy')}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Reason</label>
                              <p className="text-sm text-muted-foreground">{selectedLeave.reason}</p>
                            </div>
                            {selectedLeave.attachments?.length > 0 && (
                              <div>
                                <label className="text-sm font-medium">Attachments</label>
                                <ul className="mt-1 space-y-1">
                                  {selectedLeave.attachments.map((file: string, idx: number) => (
                                    <li key={idx}>
                                      <a href={`http://localhost:5000${file}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                                        <FileText className="h-4 w-4" /> {file.split('/').pop()}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
