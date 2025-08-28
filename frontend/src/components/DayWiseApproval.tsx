// src/components/DayWiseApproval.tsx
"use client"

import { useState } from 'react'
import { format, addDays, isSunday } from 'date-fns'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Check, X } from 'lucide-react'
import { useDayWiseUpdateLeaveMutation } from '@/store/api/leaveApi'

interface DayWiseApprovalProps {
  leave: any // Use your LeaveType here
  onUpdate?: () => void
}

// List of public holidays for 2025 (YYYY-MM-DD format)
const PUBLIC_HOLIDAYS_2025 = [
  '2025-01-01', // New Year's Day
  '2025-01-14', // Makar Sankranti
  '2025-02-26', // Maha Shivaratri
  '2025-03-14', // Holi
  '2025-08-15', // Independence Day
  '2025-08-27', // Ganesh Chaturthi
  '2025-10-02', // Gandhi Jayanti
  '2025-10-20', // Dussehra
  '2025-10-21', // Maha Navami
  '2025-12-25', // Christmas
]

// Get date range excluding Sundays and public holidays
const getDateRange = (startDate: string, endDate: string) => {
  const dates: string[] = []
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dateStr = format(date, 'yyyy-MM-dd')
    const day = date.getDay()
    
    // Skip Sundays (0) and public holidays
    if (day !== 0 && !PUBLIC_HOLIDAYS_2025.includes(dateStr)) {
      dates.push(dateStr)
    }
  }
  
  return dates
}

export default function DayWiseApproval({ leave, onUpdate }: DayWiseApprovalProps) {
  const [dayStatuses, setDayStatuses] = useState(() => {
    // Get only working days (exclude Sundays and public holidays)
    const workingDays = getDateRange(leave.startDate, leave.endDate)
    
    return workingDays.map(date => {
      // Find if this date has an existing status
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

  const handleDayAction = (date: string, action: 'APPROVED' | 'REJECTED') => {
    if (action === 'REJECTED') {
      setRejectDialog({ show: true, date, reason: '' })
    } else {
      setDayStatuses(prev => prev.map(day => 
        day.date === date 
          ? { ...day, status: 'APPROVED', rejectedReason: '' }
          : day
      ))
    }
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

      toast.success('Day-wise status updated successfully')
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
        <h3 className="font-semibold mb-2">Leave Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Type:</strong> {leave.leaveType}</div>
          <div><strong>Duration:</strong> {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}</div>
          <div><strong>Working Days:</strong> {dayStatuses.length} (Excluding Sundays and holidays)</div>
          <div><strong>Reason:</strong> {leave.reason}</div>
        </div>
      </div>

      {/* Day-wise Grid */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead className="text-center">Approve</TableHead>
              <TableHead className="text-center">Reject</TableHead>
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
                      variant={day.status === 'APPROVED' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleDayAction(day.date, 'APPROVED')}
                      disabled={day.status === 'APPROVED'}
                      className={day.status === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={day.status === 'REJECTED' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleDayAction(day.date, 'REJECTED')}
                      disabled={day.status === 'REJECTED'}
                    >
                      <X className="h-4 w-4" />
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
          Save Changes
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