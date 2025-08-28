"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { parseISO, startOfDay } from "date-fns"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CalendarIcon, Upload, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import {
  useCreateLeaveMutation,
  useGetLeavePoliciesQuery,
  useGetLeaveBalancesQuery,
  useGetMyLeaveDatesQuery,
} from "@/store/api/leaveApi"
import { toast } from "@/components/ui/sonner"
import { format, differenceInCalendarDays } from "date-fns"

// ---------------- Schema ----------------
const leaveSchema = z
  .object({
    leaveType: z.string().min(1, "Please select a leave type"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    reason: z.string().min(10, "Reason must be at least 10 characters"),
    isHalfDay: z.boolean().default(false),
    emergencyLeave: z.boolean().default(false),
    attachments: z.array(z.string()).default([]),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  // ✅ Rule: SICK leave must start from today
  .refine(
    (data) => {
      if (data.leaveType === "SICK") {
        const today = startOfDay(new Date())
        const start = startOfDay(new Date(data.startDate))
        return start.getTime() === today.getTime()
      }
      return true
    },
    {
      message: "Sick leave must start from today",
      path: ["startDate"],
    },
  )

type LeaveFormData = z.infer<typeof leaveSchema>

// ---------------- Status Colors ----------------
const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-400 text-black",
  APPROVED: "bg-green-500 text-white",
  REJECTED: "bg-red-500 text-white",
  CANCELLED: "bg-gray-400 text-white",
}

export default function ApplyLeave() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const { data: policiesData } = useGetLeavePoliciesQuery()
  const { data: balancesData } = useGetLeaveBalancesQuery(new Date().getFullYear())
  const { data: myLeaves } = useGetMyLeaveDatesQuery()

  const [createLeave] = useCreateLeaveMutation()

  const form = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      isHalfDay: false,
      emergencyLeave: false,
      attachments: [],
    },
  })

  const watchedLeaveType = form.watch("leaveType")
  const watchedStartDate = form.watch("startDate")
  const watchedEndDate = form.watch("endDate")
  const watchedIsHalfDay = form.watch("isHalfDay")

  // Auto-set end date for sick leave when start date is selected
  useEffect(() => {
    if (watchedLeaveType === "SICK" && watchedStartDate && !watchedEndDate) {
      form.setValue("endDate", watchedStartDate)
    }
  }, [watchedLeaveType, watchedStartDate, watchedEndDate, form])

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

  // ---------------- Calculate Working Days ----------------
  const calculateDays = () => {
    if (!watchedStartDate || !watchedEndDate) return 0
    if (watchedIsHalfDay) return 0.5
    
    let count = 0
    const current = new Date(watchedStartDate)
    current.setHours(0, 0, 0, 0)
    const end = new Date(watchedEndDate)
    end.setHours(23, 59, 59, 999) // Include the entire end date
    
    // Create a new date for iteration
    const currentDate = new Date(current)
    
    // Format: YYYY-MM-DD for comparison with PUBLIC_HOLIDAYS_2025
    const formatDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    
    while (currentDate <= end) {
      const day = currentDate.getDay()
      const dateStr = formatDate(currentDate)
      
      // Only exclude Sundays (0) and public holidays
      if (day !== 0) { // Sunday check
        // Check if it's not a public holiday
        if (!PUBLIC_HOLIDAYS_2025.includes(dateStr)) {
          count++
        }
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return count || 0.5 // Return at least 0.5 days for single day leave
  }

  // ---------------- Balances & Rules ----------------
  const sickBalance = balancesData?.balances?.find((b: any) => b.leavePolicy?.leaveType === "SICK")
  const availableSick = sickBalance?.availableDays ?? 0

  const totalRequestedDays = calculateDays()
  const lopDays = watchedLeaveType === "SICK" ? Math.max(0, totalRequestedDays - availableSick) : 0
  const paidDays = totalRequestedDays - lopDays

  const isCasualLeaveTooSoon = () => {
    if (watchedLeaveType === "CASUAL" && watchedStartDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const start = new Date(watchedStartDate)
      start.setHours(0, 0, 0, 0)
      const diffDays = differenceInCalendarDays(start, today)
      return diffDays < 3
    }
    return false
  }

  // ---------------- Leave Days Processing ----------------
  const leaveDays =
    myLeaves?.map((leave: any) => ({
      date: parseISO(leave.date),
      status: leave.dayStatus,
    })) || []

  // 🔥 FIX: Only disable dates that are NOT cancelled or rejected
  // Cancelled and rejected leaves should be available for new applications
  const disabledDates = leaveDays
    .filter((ld) => ld.status === "PENDING" || ld.status === "APPROVED") // Only block pending/approved
    .map((ld) => new Date(ld.date))

  // Separate leave days by status for visual highlighting
  const pendingDays = leaveDays.filter((ld) => ld.status === "PENDING").map((ld) => new Date(ld.date))

  const approvedDays = leaveDays.filter((ld) => ld.status === "APPROVED").map((ld) => new Date(ld.date))

  const rejectedDays = leaveDays.filter((ld) => ld.status === "REJECTED").map((ld) => new Date(ld.date))

  const cancelledDays = leaveDays.filter((ld) => ld.status === "CANCELLED").map((ld) => new Date(ld.date))

  // ---------------- Submit ----------------
  const onSubmit = async (data: LeaveFormData) => {
    // ✅ check casual leave rule
    if (isCasualLeaveTooSoon()) {
      toast.error("Casual leave must be applied at least 3 days in advance.")
      return
    }

    // ✅ check sick leave rule before sending (FIXED)
    if (data.leaveType === "SICK") {
      const today = startOfDay(new Date()) // Removed subDays(1)
      const start = startOfDay(new Date(data.startDate))

      if (start.getTime() !== today.getTime()) {
        toast.error("Sick leave can only be applied for today.")
        return
      }
    }

    setIsSubmitting(true)
    try {
      // Fix timezone issue - send date in local timezone format
      const formatDateForSubmission = (date: Date) => {
        // Create a new date in local timezone at start of day
        const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        return localDate.toISOString()
      }

      const formData = new FormData()
      formData.append("leaveType", data.leaveType)
      formData.append("startDate", formatDateForSubmission(data.startDate))
      formData.append("endDate", formatDateForSubmission(data.endDate))
      formData.append("reason", data.reason)
      formData.append("isHalfDay", String(data.isHalfDay))
      formData.append("emergencyLeave", String(data.emergencyLeave))

      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput?.files) {
        Array.from(fileInput.files).forEach((file) => formData.append("attachments", file))
      }

      await createLeave(formData).unwrap()
      toast.success("Leave request submitted successfully!")
      navigate("/app/leaves")
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to submit leave request")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ---------------- File Upload ----------------
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name)
      setUploadedFiles((prev) => [...prev, ...fileNames])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatLeaveType = (type: string) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  // Helper function to check if a date is disabled due to existing leave
  const isDateDisabledByLeave = (date: Date) => {
    return disabledDates.some((d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  }

  // ---------------- UI ----------------
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/app/leaves">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leaves
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apply for Leave</h1>
          <p className="text-muted-foreground">Submit a new leave request</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Application Form</CardTitle>
          <CardDescription>
            Fill out the form below to submit your leave request. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Leave Type */}
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leave Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {policiesData?.policies?.map((policy: any) => (
                          <SelectItem key={policy.id} value={policy.leaveType}>
                            {formatLeaveType(policy.leaveType)} ({policy.annualQuota} days/year)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              // Allow today for sick leave, otherwise disable past dates
                              const today = startOfDay(new Date())
                              const dateToCheck = startOfDay(date)

                              if (watchedLeaveType === "SICK") {
                                // For sick leave, only allow today
                                return dateToCheck.getTime() !== today.getTime() || isDateDisabledByLeave(date)
                              } else {
                                // For other leave types, disable past dates (before today)
                                return dateToCheck < today || isDateDisabledByLeave(date)
                              }
                            }}
                            modifiers={{
                              pending: pendingDays,
                              approved: approvedDays,
                              rejected: rejectedDays,
                              cancelled: cancelledDays,
                            }}
                            modifiersClassNames={{
                              pending: statusColors.PENDING,
                              approved: statusColors.APPROVED,
                              rejected: statusColors.REJECTED,
                              cancelled: statusColors.CANCELLED,
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const today = startOfDay(new Date())
                              const dateToCheck = startOfDay(date)

                              if (watchedLeaveType === "SICK") {
                                const startDate = watchedStartDate ? startOfDay(watchedStartDate) : today
                                return dateToCheck < startDate || isDateDisabledByLeave(date)
                              } else {
                                // For other leave types
                                const startDate = watchedStartDate ? startOfDay(watchedStartDate) : today
                                return dateToCheck < startDate || isDateDisabledByLeave(date)
                              }
                            }}
                            modifiers={{
                              pending: pendingDays,
                              approved: approvedDays,
                              rejected: rejectedDays,
                              cancelled: cancelledDays,
                            }}
                            modifiersClassNames={{
                              pending: statusColors.PENDING,
                              approved: statusColors.APPROVED,
                              rejected: statusColors.REJECTED,
                              cancelled: statusColors.CANCELLED,
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchedStartDate && watchedEndDate && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium">
                    Total Days: <span className="text-primary">{calculateDays()}</span>
                  </p>
                </div>
              )}

              {/* Calendar Legend */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Calendar Legend:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-yellow-400"></div>
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span>Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span>Rejected (Available)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gray-400"></div>
                    <span>Cancelled (Available)</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  * You can apply for leave on rejected or cancelled dates
                </p>
              </div>

              {/* SICK LOP warning */}
              {watchedLeaveType === "SICK" && totalRequestedDays > 0 && (
                <div className="p-4 mt-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-900">
                  <p>
                    You have <b>{availableSick}</b> SICK leave day{availableSick !== 1 ? "s" : ""} left.
                    <br />
                    Your request is for <b>{totalRequestedDays}</b> day{totalRequestedDays !== 1 ? "s" : ""}.
                  </p>
                  {lopDays > 0 ? (
                    <p>
                      <b>{paidDays}</b> day{paidDays !== 1 ? "s are" : " is"} paid SICK leave, <br />
                      <b>{lopDays}</b> day{lopDays !== 1 ? "s will be" : " will be"} counted as <b>LOP (Loss of Pay)</b>
                      .
                    </p>
                  ) : (
                    <p>All days will be counted as paid SICK leave.</p>
                  )}
                </div>
              )}

              {/* Reason */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Leave *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide a detailed reason for your leave request..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Minimum 10 characters required</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Half Day + Emergency */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isHalfDay"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Half Day Leave</FormLabel>
                        <FormDescription>Check this if you're applying for a half day leave</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyLeave"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Leave</FormLabel>
                        <FormDescription>Check this if this is an emergency leave request</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                <FormLabel>Attachments (Optional)</FormLabel>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload supporting documents
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          PDF, DOC, DOCX, JPG, PNG up to 10MB
                        </span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <FormLabel>Uploaded Files</FormLabel>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{file}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Submit Leave Request"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/app/leaves">Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
