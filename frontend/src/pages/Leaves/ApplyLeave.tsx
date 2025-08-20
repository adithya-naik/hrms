import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon, Upload, X, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateLeaveMutation, useGetLeavePoliciesQuery } from '@/store/api/leaveApi';
import { toast } from '@/components/ui/sonner';

const leaveSchema = z.object({
  leaveType: z.string().min(1, 'Please select a leave type'),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  isHalfDay: z.boolean().default(false),
  emergencyLeave: z.boolean().default(false),
  attachments: z.array(z.string()).default([]),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type LeaveFormData = z.infer<typeof leaveSchema>;

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const { data: policiesData } = useGetLeavePoliciesQuery(undefined);
  const [createLeave] = useCreateLeaveMutation();

  const form = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      isHalfDay: false,
      emergencyLeave: false,
      attachments: [],
    },
  });

  const watchedStartDate = form.watch('startDate');
  const watchedEndDate = form.watch('endDate');
  const watchedIsHalfDay = form.watch('isHalfDay');

  const calculateDays = () => {
    if (!watchedStartDate || !watchedEndDate) return 0;
    if (watchedIsHalfDay) return 0.5;
    
    const diffTime = Math.abs(watchedEndDate.getTime() - watchedStartDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const onSubmit = async (data: LeaveFormData) => {
    setIsSubmitting(true);
    try {
      await createLeave({
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        attachments: uploadedFiles,
      }).unwrap();

      toast.success('Leave request submitted successfully!');
      navigate('/leaves');
    } catch (error: any) {
      toast.error(error?.data?.error || 'Failed to submit leave request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these files to your server
      // For now, we'll just simulate the upload
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatLeaveType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/leaves">
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
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
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
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < (watchedStartDate || new Date())}
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
                    <FormDescription>
                      Minimum 10 characters required
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isHalfDay"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Half Day Leave</FormLabel>
                        <FormDescription>
                          Check this if you're applying for a half day leave
                        </FormDescription>
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
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Emergency Leave</FormLabel>
                        <FormDescription>
                          Check this if this is an emergency leave request
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

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
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/leaves">Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}