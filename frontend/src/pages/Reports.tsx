import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Filter, BarChart3, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function Reports() {
  const [dateRange, setDateRange] = useState('thisMonth');
  const [department, setDepartment] = useState('all');
  const [reportType, setReportType] = useState('summary');

  // Mock data - replace with actual API calls
  const summaryData = [
    { type: 'Sick Leave', approved: 45, pending: 8, rejected: 2, totalDays: 120 },
    { type: 'Casual Leave', approved: 78, pending: 12, rejected: 5, totalDays: 234 },
    { type: 'Vacation', approved: 34, pending: 6, rejected: 1, totalDays: 340 },
    { type: 'Work From Home', approved: 156, pending: 23, rejected: 8, totalDays: 312 },
  ];

  const employeeData = [
    { 
      name: 'John Doe', 
      employeeId: 'EMP001', 
      department: 'Engineering',
      totalLeaves: 15,
      sickLeave: { used: 3, available: 9 },
      casualLeave: { used: 5, available: 10 },
      vacation: { used: 7, available: 13 }
    },
    { 
      name: 'Jane Smith', 
      employeeId: 'EMP002', 
      department: 'Marketing',
      totalLeaves: 12,
      sickLeave: { used: 2, available: 10 },
      casualLeave: { used: 4, available: 11 },
      vacation: { used: 6, available: 14 }
    },
  ];

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implement export functionality
    console.log(`Exporting as ${format}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate and view comprehensive leave reports</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Leave Summary</SelectItem>
                  <SelectItem value="employee">Employee Balances</SelectItem>
                  <SelectItem value="department">Department Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button className="flex-1">
                Generate Report
              </Button>
              <Button variant="outline" onClick={() => handleExport('csv')}>
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <p className="text-xs text-muted-foreground">Awaiting manager approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Days</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2</div>
            <p className="text-xs text-muted-foreground">Per leave request</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Of allocated leave days</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Content */}
      {reportType === 'summary' && (
        <Card>
          <CardHeader>
            <CardTitle>Leave Summary Report</CardTitle>
            <CardDescription>
              Overview of leave requests by type and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Rejected</TableHead>
                  <TableHead>Total Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor('approved')}>
                        {item.approved}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor('pending')}>
                        {item.pending}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor('rejected')}>
                        {item.rejected}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {reportType === 'employee' && (
        <Card>
          <CardHeader>
            <CardTitle>Employee Leave Balances</CardTitle>
            <CardDescription>
              Current leave balances for all employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Total Leaves</TableHead>
                  <TableHead>Sick Leave</TableHead>
                  <TableHead>Casual Leave</TableHead>
                  <TableHead>Vacation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell className="font-medium">{employee.totalLeaves}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Used: {employee.sickLeave.used}</div>
                        <div className="text-muted-foreground">Available: {employee.sickLeave.available}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Used: {employee.casualLeave.used}</div>
                        <div className="text-muted-foreground">Available: {employee.casualLeave.available}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Used: {employee.vacation.used}</div>
                        <div className="text-muted-foreground">Available: {employee.vacation.available}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}