"use client"

import * as React from "react"
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
import { parseISO, startOfDay, differenceInCalendarDays, format } from "date-fns"
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
    defaultValues: { isHalfDay: false, emergencyLeave: false, attachments: [] },
  })

  const watchedLeaveType = form.watch("leaveType")
  const watchedStartDate = form.watch("startDate")
  const watchedEndDate = form.watch("endDate")
  const watchedIsHalfDay = form.watch("isHalfDay")

  // Auto-set end date for sick leave
  useEffect(() => {
    if (watchedLeaveType === "SICK" && watchedStartDate && !watchedEndDate) {
      form.setValue("endDate", watchedStartDate)
    }
  }, [watchedLeaveType, watchedStartDate, watchedEndDate, form])

  // Hardcoded list of public holidays for 2025 (format: 'YYYY-MM-DD')
  const HOLIDAYS_2025 = [
    '2025-01-01', // New Year Day
    '2025-01-14', // Sankranti
    '2025-02-26', // Maha Shivaratri
    '2025-03-14', // Holi
    '2025-08-15', // Independence Day
    '2025-08-27', // Ganesh Chaturthi
    '2025-10-02', // Dussera
    '2025-10-20', // Deepavali
    '2025-10-21', // Govardhan Puja
    '2025-12-25'  // Christmas
  ];

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isHoliday = (date: Date): boolean => {
    return HOLIDAYS_2025.includes(formatDate(date));
  };

  const isSunday = (date: Date): boolean => {
    return date.getDay() === 0; // 0 = Sunday
  };

  // ---------------- Calculate Days ----------------
  const calculateDays = () => {
    if (!watchedStartDate || !watchedEndDate) return 0;
    
    let workingDays = 0;
    const currentDate = new Date(watchedStartDate);
    const endDate = new Date(watchedEndDate);
    
    // Count working days (excluding Sundays and holidays)
    while (currentDate <= endDate) {
      if (!isSunday(currentDate) && !isHoliday(currentDate)) {
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // If it's a half day, return 0.5, otherwise return the count of working days
    return watchedIsHalfDay ? 0.5 : workingDays;
  };

  const totalRequestedDays = calculateDays()

  // ---------------- Sick LOP ----------------
  const sickBalance = balancesData?.balances?.find((b: any) => b.leavePolicy?.leaveType === "SICK")
  const availableSick = sickBalance?.availableDays ?? 0
  const lopDays = watchedLeaveType === "SICK" ? Math.max(0, totalRequestedDays - availableSick) : 0
  const paidDays = totalRequestedDays - lopDays

  // ---------------- Disable dates ----------------
  const leaveDays =
    myLeaves?.map((leave: any) => ({
      date: parseISO(leave.date),
      status: leave.dayStatus,
    })) || []

  const disabledDates = leaveDays
    .filter((ld) => ld.status === "PENDING" || ld.status === "APPROVED")
    .map((ld) => new Date(ld.date))

  const pendingDays = leaveDays.filter((ld) => ld.status === "PENDING").map((ld) => new Date(ld.date))
  const approvedDays = leaveDays.filter((ld) => ld.status === "APPROVED").map((ld) => new Date(ld.date))
  const rejectedDays = leaveDays.filter((ld) => ld.status === "REJECTED").map((ld) => new Date(ld.date))
  const cancelledDays = leaveDays.filter((ld) => ld.status === "CANCELLED").map((ld) => new Date(ld.date))

  const isDateDisabledByLeave = (date: Date) => {
    return disabledDates.some((d) => d.toDateString() === date.toDateString())
  }

  const formatLeaveType = (type: string) =>
    type.replace("_", " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())

  // ---------------- Submit ----------------
  const onSubmit = async (data: LeaveFormData) => {
    setIsSubmitting(true)
    try {
      const formatDateForSubmission = (date: Date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()

      const formData = new FormData()
      formData.append("leaveType", data.leaveType)
      formData.append("startDate", formatDateForSubmission(data.startDate))
      formData.append("endDate", formatDateForSubmission(data.endDate))
      formData.append("reason", data.reason)
      formData.append("isHalfDay", String(data.isHalfDay))
      formData.append("emergencyLeave", String(data.emergencyLeave))

      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput?.files) Array.from(fileInput.files).forEach((file) => formData.append("attachments", file))

      await createLeave(formData).unwrap()
      toast.success("Leave request submitted successfully!")
      navigate("/app/leaves")
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to submit leave request")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) setUploadedFiles((prev) => [...prev, ...Array.from(files).map((f) => f.name)])
  }

  const removeFile = (index: number) => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))

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
                        {policiesData?.policies?.map((policy: any) => {
                          const monthlyQuota = policy.monthlyQuota ?? Math.ceil(policy.annualQuota / 12)
                          return (
                            <SelectItem key={policy.id} value={policy.leaveType}>
                              {formatLeaveType(policy.leaveType)} ({monthlyQuota} days/month)
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
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
              const today = startOfDay(new Date())
              const dateToCheck = startOfDay(date)

              // Sick leave: only today
              if (watchedLeaveType === "SICK") {
                return dateToCheck.getTime() !== today.getTime() || isDateDisabledByLeave(dateToCheck)
              }

              // Other leave types: disable past dates
              return dateToCheck < today || isDateDisabledByLeave(dateToCheck)
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


                {/* End Date */}
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
              const startDate = watchedStartDate ? startOfDay(watchedStartDate) : startOfDay(new Date())
              const dateToCheck = startOfDay(date)

              // Sick leave: only today (or start date)
              if (watchedLeaveType === "SICK") {
                return dateToCheck.getTime() !== startDate.getTime() || isDateDisabledByLeave(dateToCheck)
              }

              // Other leave types: cannot select before start date
              return dateToCheck < startDate || isDateDisabledByLeave(dateToCheck)
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
                    Total Days: <span className="text-primary">{totalRequestedDays}</span>
                  </p>
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
                      <Textarea {...field} placeholder="Please provide reason..." className="min-h-[100px]" />
                    </FormControl>
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
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Half Day Leave</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyLeave"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Emergency Leave</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                <FormLabel>Attachments (Optional)</FormLabel>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <label htmlFor="file-upload" className="cursor-pointer block mt-2">
                    Upload supporting documents (PDF, DOC, DOCX, JPG, PNG up to 10MB)
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileUpload}
                  />
                </div>

                {uploadedFiles.length > 0 &&
                  uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{file}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
