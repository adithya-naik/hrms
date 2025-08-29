import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Filter,
  Eye,
  X,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetLeavesQuery,
  useCancelLeaveMutation,
} from "@/store/api/leaveApi";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";

export default function MyLeaves() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<any>(null);

  const { data: leavesData, isLoading } = useGetLeavesQuery({
    page,
    limit: 10,
    status: status === "ALL" ? undefined : status,
  });

  const [cancelLeave] = useCancelLeaveMutation();

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


  const canCancelLeave = (leave: any) =>
    leave.status === "PENDING" || leave.status === "APPROVED";

  const handleCancelLeave = async (leaveId: string) => {
    try {
      await cancelLeave(leaveId).unwrap();
      toast.success("Leave request cancelled successfully");
    } catch {
      toast.error("Failed to cancel leave request");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Apply search filter (by formatted leave type + LOP)
  const filteredLeaves =
    leavesData?.leaves?.filter((leave: any) =>
      search
        ? formatLeaveType(leave.leaveType, leave.isLOP)
            .toLowerCase()
            .includes(search.toLowerCase())
        : true
    ) ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Leaves</h1>
          <p className="text-muted-foreground">
            Manage your leave requests and view history
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/app/leaves/new">
            <Plus className="mr-2 h-4 w-4" />
            Apply for Leave
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>
            View and manage all your leave applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
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

          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave: any) => (
                    <TableRow key={leave.id}>
                      <TableCell>{formatLeaveType(leave.leaveType, leave.isLOP)}</TableCell>
                      <TableCell>
                        {format(new Date(leave.startDate), "MMM dd, yyyy")} -{" "}
                        {format(new Date(leave.endDate), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>{leave.totalDays}</TableCell>
                      <TableCell>
                        {format(new Date(leave.appliedDate), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(leave.status)}>
                          {leave.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* View */}
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
                              </DialogHeader>
                              {selectedLeave && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Leave Type</label>
                                      <p className="text-sm text-muted-foreground">
                                        {formatLeaveType(selectedLeave.leaveType, selectedLeave.isLOP)}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <Badge className={getStatusColor(selectedLeave.status)}>
                                        {selectedLeave.status}
                                      </Badge>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Start Date</label>
                                      <p className="text-sm text-muted-foreground">
                                        {format(new Date(selectedLeave.startDate), "MMMM dd, yyyy")}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">End Date</label>
                                      <p className="text-sm text-muted-foreground">
                                        {format(new Date(selectedLeave.endDate), "MMMM dd, yyyy")}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Total Days</label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedLeave.totalDays} days
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Applied Date</label>
                                      <p className="text-sm text-muted-foreground">
                                        {format(new Date(selectedLeave.appliedDate), "MMMM dd, yyyy")}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">Reason</label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {selectedLeave.reason}
                                    </p>
                                  </div>

                                  {/* Attachments */}
                                  {selectedLeave.attachments?.length > 0 && (
                                    <div>
                                      <label className="text-sm font-medium">Attachments</label>
                                      <ul className="mt-1 space-y-1">
                                        {selectedLeave.attachments.map((file: string, idx: number) => (
                                          <li key={idx}>
                                            <a
                                              href={`http://localhost:5000${file.replace(/\\/g, "/")}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 underline flex items-center gap-1"
                                            >
                                              <FileText className="h-4 w-4" /> {file.split(/[/\\]/).pop()}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {selectedLeave.rejectionReason && (
                                    <div>
                                      <label className="text-sm font-medium text-red-600">Rejection Reason</label>
                                      <p className="text-sm text-red-600 mt-1">
                                        {selectedLeave.rejectionReason}
                                      </p>
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
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {/* Cancel */}
                          {canCancelLeave(leave) && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <X className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Leave Request</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this leave request?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelLeave(leave.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Confirm
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No leave requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredLeaves.map((leave: any) => (
              <Card key={leave.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{formatLeaveType(leave.leaveType, leave.isLOP)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(leave.startDate), "MMM dd")} -{" "}
                        {format(new Date(leave.endDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <Badge className={getStatusColor(leave.status)}>{leave.status}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {leave.totalDays} days
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(leave.appliedDate), "MMM dd")}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View */}
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
                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Leave Type</label>
                                  <p className="text-sm text-muted-foreground">
                                    {formatLeaveType(selectedLeave.leaveType, selectedLeave.isLOP)}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Duration</label>
                                  <p className="text-sm text-muted-foreground">
                                    {format(new Date(selectedLeave.startDate), "MMMM dd, yyyy")} -{" "}
                                    {format(new Date(selectedLeave.endDate), "MMMM dd, yyyy")}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Reason</label>
                                  <p className="text-sm text-muted-foreground">{selectedLeave.reason}</p>
                                </div>
                                {/* Attachments */}
                                {selectedLeave.attachments?.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Attachments</label>
                                    <ul className="mt-1 space-y-1">
                                      {selectedLeave.attachments.map((file: string, idx: number) => (
                                        <li key={idx}>
                                          <a
                                            href={`http://localhost:5000${file.replace(/\\/g, "/")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                          >
                                            {file.split(/[/\\]/).pop()}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {/* Cancel */}
                      {canCancelLeave(leave) && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Leave Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this leave request?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelLeave(leave.id)}>
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                Showing {(leavesData.pagination.page - 1) * leavesData.pagination.limit + 1} to{" "}
                {Math.min(
                  leavesData.pagination.page * leavesData.pagination.limit,
                  leavesData.pagination.total
                )}{" "}
                of {leavesData.pagination.total} results
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

         
        </CardContent>
      </Card>
    </div>
  );

}
