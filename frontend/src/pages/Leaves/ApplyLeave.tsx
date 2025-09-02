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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { parseISO, startOfDay, format } from "date-fns"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CalendarIcon, Upload, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import {
  useCreateLeaveMutation,
  useGetLeavePoliciesQuery,
  useGetLeaveBalancesQuery,
  useGetMyLeaveDatesQuery,
} from "@/store/api/leaveApi"
import { toast } from "sonner"

// ---------------- Schema ----------------
const leaveSchema = z
  .object({
    leaveType: z.string().min(1, "Please select a leave type"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    reason: z.string().min(10, "Reason must be at least 10 characters"),
    isHalfDayStart: z.boolean().default(false),
    isHalfDayEnd: z.boolean().default(false),
    attachments: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true
      return startOfDay(data.endDate).getTime() >= startOfDay(data.startDate).getTime()
    },
    {
      message: "End date must be today or after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.leaveType === "SICK") {
        const today = startOfDay(new Date())
        return startOfDay(data.startDate).getTime() === today.getTime()
      }
      return true
    },
    {
      message: "Sick leave must start from today",
      path: ["startDate"],
    }
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
      isHalfDayStart: false,
      isHalfDayEnd: false,
      attachments: [],
    },
  })

  const watchedLeaveType = form.watch("leaveType")
  const watchedStartDate = form.watch("startDate")
  const watchedEndDate = form.watch("endDate")
  const watchedHalfDayStart = form.watch("isHalfDayStart")
  const watchedHalfDayEnd = form.watch("isHalfDayEnd")

  // Auto-set end date for sick leave
  useEffect(() => {
    if (watchedLeaveType === "SICK" && watchedStartDate && !watchedEndDate) {
      form.setValue("endDate", watchedStartDate)
    }
  }, [watchedLeaveType, watchedStartDate, watchedEndDate, form])

  // Public holidays
  const HOLIDAYS_2025 = [
    "2025-01-01",
    "2025-01-14",
    "2025-02-26",
    "2025-03-14",
    "2025-08-15",
    "2025-08-27",
    "2025-10-02",
    "2025-10-20",
    "2025-10-21",
    "2025-12-25",
  ]

  const formatDate = (date: Date): string => date.toISOString().split("T")[0]
  const isHoliday = (date: Date) => HOLIDAYS_2025.includes(formatDate(date))
  const isSunday = (date: Date) => date.getDay() === 0

  // Calculate leave days
  const calculateDays = () => {
    if (!watchedStartDate || !watchedEndDate) return 0
    let workingDays = 0
    const currentDate = new Date(watchedStartDate)
    const endDate = new Date(watchedEndDate)
    while (currentDate <= endDate) {
      if (!isSunday(currentDate) && !isHoliday(currentDate)) workingDays++
      currentDate.setDate(currentDate.getDate() + 1)
    }

    let total = workingDays
    if (watchedHalfDayStart) total -= 0.5
    if (watchedHalfDayEnd) total -= 0.5
    return total
  }

  const totalRequestedDays = calculateDays()

  // Disable dates
  const leaveDays = myLeaves?.map((leave: any) => ({
    date: parseISO(leave.date),
    status: leave.dayStatus,
  })) || []

  const disabledDates = leaveDays
    .filter((ld) => ld.status === "PENDING" || ld.status === "APPROVED")
    .map((ld) => new Date(ld.date))

  const isDateDisabledByLeave = (date: Date) => disabledDates.some((d) => d.toDateString() === date.toDateString())

  const onSubmit = async (data: LeaveFormData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("leaveType", data.leaveType)
      formData.append("startDate", data.startDate.toISOString())
      formData.append("endDate", data.endDate.toISOString())
      formData.append("reason", data.reason)
      formData.append("isHalfDayStart", String(data.isHalfDayStart))
      formData.append("isHalfDayEnd", String(data.isHalfDayEnd))

      if (data.leaveType === "SICK") {
        const fileInput = document.getElementById("file-upload") as HTMLInputElement
        if (fileInput?.files) {
          Array.from(fileInput.files).forEach((file) => formData.append("attachments", file))
        }
      }

      await createLeave(formData).unwrap()
      toast.success("Leave request submitted successfully!")
      navigate("/app") // ✅ fixed navigation
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
          <Link to="/app">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apply for Leave</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Application Form</CardTitle>
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
                    <FormLabel>Leave Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {policiesData?.policies
                          ?.filter((p: any) => p.leaveType !== "WFH")
                          .map((policy: any) => (
                            <SelectItem key={policy.id} value={policy.leaveType}>
                              {policy.leaveType.charAt(0) + policy.leaveType.slice(1).toLowerCase()}
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
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
                              return dateToCheck < today || isDateDisabledByLeave(dateToCheck)
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      {field.value && (
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={!watchedHalfDayStart}
                              onChange={() => form.setValue("isHalfDayStart", false)}
                            />
                            Full Day
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={watchedHalfDayStart}
                              onChange={() => form.setValue("isHalfDayStart", true)}
                            />
                            Half Day
                          </label>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                {/* End Date */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
                              //if (watchedLeaveType === "SICK") return dateToCheck.getTime() !== startDate.getTime()
                              return dateToCheck < startDate || isDateDisabledByLeave(dateToCheck)
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      {field.value && (
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={!watchedHalfDayEnd}
                              onChange={() => form.setValue("isHalfDayEnd", false)}
                            />
                            Full Day
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={watchedHalfDayEnd}
                              onChange={() => form.setValue("isHalfDayEnd", true)}
                            />
                            First Half
                          </label>
                        </div>
                      )}
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
                    <FormLabel>Reason for Leave</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Please provide reason..." className="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attachments (only sick leave) */}
              {watchedLeaveType === "SICK" && (
                <div className="space-y-4">
                  <FormLabel>Attachments (Optional)</FormLabel>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <label htmlFor="file-upload" className="cursor-pointer block mt-2">
                      Upload supporting documents (PDF, DOC, DOCX, JPG, PNG up to 10MB)
                    </label>
                    <input id="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
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
              )}

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Submit Leave Request"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/app">Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
