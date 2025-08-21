import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Plus, Edit, Trash2, Calendar, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/components/ui/use-toast";

import {
  useGetLeavePoliciesQuery,
  useCreateLeavePolicyMutation,
  useUpdateLeavePolicyMutation,
  useDeleteLeavePolicyMutation,
} from "../store/api/leaveApi";

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
import Departments from '@/components/Departments';
import GeneralSettings from '@/components/GeneralSettings';

const leavePolicySchema = z.object({
  leaveType: z.enum(['SICK', 'CASUAL', 'VACATION', 'ACADEMIC', 'COMP_OFF', 'WFH']),
  annualQuota: z.number().min(1, 'Annual quota must be at least 1'),
  maxConsecutiveDays: z.number().optional(),
  minDaysNotice: z.number().min(0, 'Minimum days notice cannot be negative'),
  requiresApproval: z.boolean(),
  requiresDocument: z.boolean(),
  carryForwardAllowed: z.boolean(),
  maxCarryForward: z.number().optional(),
});

type LeavePolicyFormData = z.infer<typeof leavePolicySchema>;

export default function Settings() {
  const { toast } = useToast();
  const [isCreatePolicyDialogOpen, setIsCreatePolicyDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const form = useForm<LeavePolicyFormData>({
    resolver: zodResolver(leavePolicySchema),
    defaultValues: {
      leaveType: "SICK",
      annualQuota: 12,
      minDaysNotice: 1,
      requiresApproval: true,
      requiresDocument: false,
      carryForwardAllowed: false,
    },
  });

  const { data, isLoading } = useGetLeavePoliciesQuery();
  const leavePolicies = data?.policies ?? [];
  const [createLeavePolicy] = useCreateLeavePolicyMutation();
  const [updateLeavePolicy] = useUpdateLeavePolicyMutation();
  const [deleteLeavePolicy] = useDeleteLeavePolicyMutation();

  const formatLeaveType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const onSubmit = async (data: LeavePolicyFormData) => {
    try {
      if (selectedPolicy) {
        await updateLeavePolicy({ id: selectedPolicy.id, body: data }).unwrap();
        toast({
          title: "Policy updated",
          description: `${formatLeaveType(data.leaveType)} updated successfully.`,
        });
      } else {
        await createLeavePolicy(data).unwrap();
        toast({
          title: "Policy created",
          description: `${formatLeaveType(data.leaveType)} created successfully.`,
        });
      }
      setIsCreatePolicyDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while saving the policy.",
      });
      console.error("Error saving policy:", error);
    }
  };

  const handleEditPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    form.reset({
      leaveType: policy.leaveType,
      annualQuota: policy.annualQuota,
      maxConsecutiveDays: policy.maxConsecutiveDays,
      minDaysNotice: policy.minDaysNotice,
      requiresApproval: policy.requiresApproval,
      requiresDocument: policy.requiresDocument,
      carryForwardAllowed: policy.carryForwardAllowed,
      maxCarryForward: policy.maxCarryForward,
    });
    setIsCreatePolicyDialogOpen(true);
  };

  const handleDeletePolicy = async (policyId: string) => {
    try {
      // ✅ Fix: wrap in object since mutation expects { id }
      await deleteLeavePolicy({ id: policyId }).unwrap();
      toast({
        title: "Policy deleted",
        description: "The leave policy was deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the leave policy.",
      });
      console.error("Error deleting policy:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and configurations</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="leave-policies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="leave-policies" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Leave Policies
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Leave Policies Tab */}
        <TabsContent value="leave-policies">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Leave Policies</CardTitle>
                <CardDescription>
                  Configure leave types, quotas, and approval requirements
                </CardDescription>
              </div>
              <Dialog open={isCreatePolicyDialogOpen} onOpenChange={setIsCreatePolicyDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setSelectedPolicy(null);
                    form.reset();
                  }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Policy
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedPolicy ? 'Edit Leave Policy' : 'Create Leave Policy'}
                    </DialogTitle>
                    <DialogDescription>
                      Configure the rules and quotas for this leave type
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Leave Type + Annual Quota */}
                      <div className="grid grid-cols-2 gap-4">
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
                                  <SelectItem value="SICK">Sick Leave</SelectItem>
                                  <SelectItem value="CASUAL">Casual Leave</SelectItem>
                                  <SelectItem value="VACATION">Vacation</SelectItem>
                                  <SelectItem value="ACADEMIC">Academic Leave</SelectItem>
                                  <SelectItem value="COMP_OFF">Comp Off</SelectItem>
                                  <SelectItem value="WFH">Work From Home</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="annualQuota"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Quota (Days)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Max Consecutive + Min Notice */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="maxConsecutiveDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Consecutive Days (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="minDaysNotice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Days Notice</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Switches */}
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="requiresApproval"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Requires Approval</FormLabel>
                                <FormDescription>
                                  Leave requests need manager approval
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="requiresDocument"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Requires Document</FormLabel>
                                <FormDescription>
                                  Supporting documents must be attached
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="carryForwardAllowed"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Allow Carry Forward</FormLabel>
                                <FormDescription>
                                  Unused days can be carried to next year
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {form.watch('carryForwardAllowed') && (
                          <FormField
                            control={form.control}
                            name="maxCarryForward"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Carry Forward Days</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter maximum days"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsCreatePolicyDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {selectedPolicy ? 'Update Policy' : 'Create Policy'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>

            {/* Table */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Annual Quota</TableHead>
                    <TableHead>Max Consecutive</TableHead>
                    <TableHead>Min Notice</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Carry Forward</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leavePolicies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">
                        {formatLeaveType(policy.leaveType)}
                      </TableCell>
                      <TableCell>{policy.annualQuota} days</TableCell>
                      <TableCell>{policy.maxConsecutiveDays || 'N/A'}</TableCell>
                      <TableCell>{policy.minDaysNotice} days</TableCell>
                      <TableCell>
                        <span className={policy.requiresApproval ? 'text-green-600' : 'text-red-600'}>
                          {policy.requiresApproval ? 'Yes' : 'No'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={policy.requiresDocument ? 'text-green-600' : 'text-red-600'}>
                          {policy.requiresDocument ? 'Yes' : 'No'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {policy.carryForwardAllowed ? (
                          <span className="text-green-600">
                            {policy.maxCarryForward ? `${policy.maxCarryForward} days` : 'Yes'}
                          </span>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPolicy(policy)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Leave Policy
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete <b>{formatLeaveType(policy.leaveType)}</b>?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePolicy(policy.id)}
                                  className="bg-red-600 text-white hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>
                Manage organizational departments and their settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Departments />
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure global system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='p-6 space-y-4 text-gray-900 bg-white'>
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
