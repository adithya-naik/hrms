"use client"

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { toast } from "sonner"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { FileText, Eye, Check, X, Search, Filter, Calendar } from 'lucide-react'

import { useGetTeamLeavesQuery, useApproveLeaveMutation, useRejectLeaveMutation } from '@/store/api/leaveApi'
import DayWiseReject from '@/components/DayWiseReject'
import DayWiseApproval from '@/components/DayWiseApproval'

type UserType = {
  firstName: string
  lastName: string
  employeeId?: string
}

type LeaveDayStatus = {
  date: string
  status: string
}

type LeaveType = {
  id: string
  leaveType: string
  startDate: string
  endDate: string
  totalDays: number
  status: string
  appliedDate: string
  attachments?: string[]
  reason?: string
  requester: UserType
  dayStatuses?: LeaveDayStatus[]
  isLOP?: boolean
  rejectionReason?: string
}

export default function TeamLeaves() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')

  const filterStatus = status === 'all' ? undefined : status

  const { data: leavesData, isLoading, refetch } = useGetTeamLeavesQuery({
    page,
    limit: 10,
    status: filterStatus,
    search,
  })

  const [approveLeave] = useApproveLeaveMutation()
  const [rejectLeave] = useRejectLeaveMutation()

  const leaves: LeaveType[] = leavesData?.leaves || []

  const selectedLeave = useMemo(
    () => leaves.find(l => l.id === selectedLeaveId) || null,
    [selectedLeaveId, leaves]
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'PARTIAL': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatLeaveType = (type: string, isLOP?: boolean) => {
    const formatted = type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
    return isLOP ? `${formatted} (LOP)` : formatted
  }

  const canApproveReject = (leave: LeaveType) => leave.status === 'PENDING'

  const handleApproveLeave = async (leaveId: string) => {
    try {
      await approveLeave(leaveId).unwrap()
      toast.success('Leave request approved successfully')
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to approve leave request')
    }
  }

  const handleRejectLeave = async (leaveId: string) => {
    if (!rejectionReason.trim()) return
    try {
      await rejectLeave({ id: leaveId, rejectionReason }).unwrap()
      toast.success('Leave request rejected')
      setRejectionReason('')
      setSelectedLeaveId(null)
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to reject leave request')
    }
  }

  const handleDayWiseUpdate = () => {
    refetch()
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  )

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
                <SelectItem value="PARTIAL">Partial</SelectItem>
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
                {leaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{leave.requester.firstName} {leave.requester.lastName}</div>
                        <div className="text-sm text-muted-foreground">{leave.requester.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatLeaveType(leave.leaveType, leave.isLOP)}</TableCell>
                    <TableCell>{format(new Date(leave.startDate), 'MMM dd, yyyy')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{leave.totalDays}</TableCell>
                    <TableCell>{format(new Date(leave.appliedDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell><Badge className={getStatusColor(leave.status)}>{leave.status}</Badge></TableCell>
                    <TableCell>
                      {leave.attachments?.length ? (
                        <ul className="space-y-1">
                          {leave.attachments.map((file) => (
                            <li key={file}>
                              <a href={`http://localhost:5000${file}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                                <FileText className="h-4 w-4" /> {file.split(/[/\\]/).pop()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : <span className="text-sm text-muted-foreground">No files</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* View Details Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedLeaveId(leave.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Leave Request Details</DialogTitle>
                            </DialogHeader>
                            {selectedLeave && selectedLeave.id === leave.id && (
                              <div className="space-y-4">
                                <div><strong>Employee:</strong> {selectedLeave.requester.firstName} {selectedLeave.requester.lastName}</div>
                                <div><strong>Leave Type:</strong> {formatLeaveType(selectedLeave.leaveType, selectedLeave.isLOP)}</div>
                                <div><strong>Duration:</strong> {format(new Date(selectedLeave.startDate), 'MMM dd, yyyy')} - {format(new Date(selectedLeave.endDate), 'MMM dd, yyyy')}</div>
                                <div><strong>Reason:</strong> {selectedLeave.reason}</div>

                                {selectedLeave.attachments?.length && (
                                  <div>
                                    <strong>Attachments:</strong>
                                    <ul>
                                      {selectedLeave.attachments.map(file => (
                                        <li key={file}>
                                          <a href={`http://localhost:5000${file}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                                            <FileText className="h-4 w-4" /> {file.split(/[/\\]/).pop()}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {selectedLeave.rejectionReason && (
                                  <p className="text-red-600"><strong>Rejection Reason:</strong> {selectedLeave.rejectionReason}</p>
                                )}

                                {canApproveReject(selectedLeave) && (
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button onClick={() => handleApproveLeave(selectedLeave.id)} className="flex-1">
                                      <Check className="h-4 w-4 mr-2" />Approve
                                    </Button>

                                    {selectedLeave.dayStatuses && selectedLeave.dayStatuses.length > 0 ? (
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="destructive" className="flex-1">
                                            <X className="h-4 w-4 mr-2" />Reject Days
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-lg">
                                          <DayWiseReject leave={selectedLeave} onUpdate={handleDayWiseUpdate} />
                                        </DialogContent>
                                      </Dialog>
                                    ) : (
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="destructive" className="flex-1">
                                            <X className="h-4 w-4 mr-2" />Reject
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                                            <p>Please provide a reason for rejecting this leave request.</p>
                                          </AlertDialogHeader>
                                          <Textarea placeholder="Enter rejection reason..." value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} />
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleRejectLeave(selectedLeave.id)} disabled={!rejectionReason.trim()}>
                                              Reject Leave
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* Day-wise Calendar Modal */}
                        {canApproveReject(leave) && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" title="Day-wise Approval">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Day-wise Approval - {leave.requester.firstName} {leave.requester.lastName}</DialogTitle>
                              </DialogHeader>
                              <DayWiseApproval leave={leave} onUpdate={handleDayWiseUpdate} />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
