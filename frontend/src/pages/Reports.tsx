import { useState } from 'react';
import { useGetLeaveSummaryQuery, useGetEmployeeBalancesQuery, useGetDepartmentAnalysisQuery } from '@/store/api/reportApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Filter, BarChart3, Users, Clock } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('thisMonth');
  const [department, setDepartment] = useState('all');
  const [reportType, setReportType] = useState<'summary' | 'employee' | 'department'>('summary');

  // Example params (in real case you’d map dateRange → actual dates)
  const params = { startDate: '2025-01-01', endDate: '2025-12-31' };

  const { data: summaryData } = useGetLeaveSummaryQuery(params, { skip: reportType !== 'summary' });
  const { data: employeeData } = useGetEmployeeBalancesQuery({ year: 2025 }, { skip: reportType !== 'employee' });
  const { data: departmentData } = useGetDepartmentAnalysisQuery(params, { skip: reportType !== 'department' });

  const handleExport = (format: 'csv' | 'pdf') => {
    window.open(`http://localhost:5000/api/reports/export/${format}?startDate=${params.startDate}&endDate=${params.endDate}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports & Analytics</h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Report Type</label>
            <Select value={reportType} onValueChange={(v) => setReportType(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Leave Summary</SelectItem>
                <SelectItem value="employee">Employee Balances</SelectItem>
                <SelectItem value="department">Department Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" /> CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      {reportType === 'summary' && (
        <Card>
          <CardHeader>
            <CardTitle>Leave Summary</CardTitle>
            <CardDescription>Overview of requests by type and status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Total Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData?.summary?.map((item: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{item.leaveType}</TableCell>
                    <TableCell><Badge className={getStatusColor(item.status)}>{item.status}</Badge></TableCell>
                    <TableCell>{item._count.id}</TableCell>
                    <TableCell>{item._sum.totalDays}</TableCell>
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
            <CardTitle>Employee Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData?.balances?.map((bal: any) => (
                  <TableRow key={bal.user.employeeId}>
                    <TableCell>{bal.user.firstName} {bal.user.lastName} ({bal.user.employeeId})</TableCell>
                    <TableCell>{bal.user.department?.name}</TableCell>
                    <TableCell>{bal.leavePolicy?.name}</TableCell>
                    <TableCell>{bal.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {reportType === 'department' && (
        <Card>
          <CardHeader>
            <CardTitle>Department Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Total Requests</TableHead>
                  <TableHead>Total Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentData?.analysis?.map((dept: any) => (
                  <TableRow key={dept.departmentId}>
                    <TableCell>{dept.departmentName}</TableCell>
                    <TableCell>{dept._count.id}</TableCell>
                    <TableCell>{dept._sum.totalDays}</TableCell>
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
