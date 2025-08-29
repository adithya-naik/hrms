// src/components/DayWiseReject.tsx
"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { X } from 'lucide-react'
import { useDayWiseUpdateLeaveMutation } from '@/store/api/leaveApi'

interface DayWiseRejectProps {
  leave: any // Use your LeaveType here
  onUpdate?: () => void
}

// Move getDateRange function outside the component to avoid hoisting issues
const getDateRange = (startDate: string, endDate: string) => {
  const dates = []
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(format(date, 'yyyy-MM-dd'))
  }
  return dates
}

export default function DayWiseReject({ leave, onUpdate }: DayWiseRejectProps) {
  const [dayStatuses, setDayStatuses] = useState(() => {
    // Initialize day statuses from existing data or create new ones
    const dateRange = getDateRange(leave.startDate, leave.endDate)
    return dateRange.map(date => {
      const existing = leave.dayStatuses?.find((ds: any) => 
        format(new Date(ds.date), 'yyyy-MM-dd') === date
      )
      return {
        date,
        status: existing?.status || 'PENDING',
        rejectedReason: existing?.reason || ''
      }
    })
  })

  const [rejectDialog, setRejectDialog] = useState<{
    show: boolean
    date: string | null
    reason: string
  }>({ show: false, date: null, reason: '' })

  const [dayWiseUpdate] = useDayWiseUpdateLeaveMutation()

  const handleDayReject = (date: string) => {
    setRejectDialog({ show: true, date, reason: '' })
  }

  const handleRejectConfirm = () => {
    if (!rejectDialog.date || !rejectDialog.reason.trim()) return

    setDayStatuses(prev => prev.map(day => 
      day.date === rejectDialog.date 
        ? { ...day, status: 'REJECTED', rejectedReason: rejectDialog.reason }
        : day
    ))

    setRejectDialog({ show: false, date: null, reason: '' })
  }

  const handleSave = async () => {
    try {
      const formattedDayStatuses = dayStatuses.map(day => ({
        date: day.date,
        status: day.status,
        rejectedReason: day.status === 'REJECTED' ? day.rejectedReason : undefined
      }))

      await dayWiseUpdate({
        id: leave.id,
        dayStatuses: formattedDayStatuses
      }).unwrap()

      toast.success('Day-wise rejection updated successfully')
      onUpdate?.()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update day-wise status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* Leave Info */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Reject Leave Days</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Employee:</strong> {leave.requester?.firstName} {leave.requester?.lastName}</div>
          <div><strong>Type:</strong> {leave.leaveType}</div>
          <div><strong>Duration:</strong> {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}</div>
          <div><strong>Total Days:</strong> {leave.totalDays}</div>
        </div>
      </div>

      {/* Day-wise Grid */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dayStatuses.map((day) => {
              const dateObj = new Date(day.date)
              
              return (
                <TableRow key={day.date}>
                  <TableCell className="font-medium">
                    {format(dateObj, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {format(dateObj, 'EEEE')}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={day.status === 'REJECTED' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleDayReject(day.date)}
                      disabled={day.status === 'REJECTED'}
                    >
                      <X className="h-4 w-4" />
                      {day.status === 'REJECTED' ? 'Rejected' : 'Reject'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(day.status)}>
                      {day.status}
                    </Badge>
                    {day.rejectedReason && (
                      <div className="text-xs text-gray-500 mt-1" title={day.rejectedReason}>
                        {day.rejectedReason.length > 30 
                          ? `${day.rejectedReason.substring(0, 30)}...` 
                          : day.rejectedReason
                        }
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave} className="px-6">
          Save Rejections
        </Button>
      </div>

      {/* Reject Reason Dialog */}
      <AlertDialog open={rejectDialog.show} onOpenChange={(open) => 
        !open && setRejectDialog({ show: false, date: null, reason: '' })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Leave for {rejectDialog.date && format(new Date(rejectDialog.date), 'MMM dd, yyyy')}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-3">
              Please provide a reason for rejecting this day:
            </p>
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectDialog.reason}
              onChange={(e) => setRejectDialog(prev => ({ ...prev, reason: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRejectConfirm}
              disabled={!rejectDialog.reason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject Day
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}