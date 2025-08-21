import React, { useState } from "react";
import {
  useGetLeaveSummaryQuery,
  useGetEmployeeBalancesQuery,
  useGetDepartmentAnalysisQuery,
} from "@/store/api/reportApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, PieChart, BarChart3, Users, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart as RePieChart,
  Cell,
} from "recharts";

const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"];

export default function Reports() {
  const [reportType, setReportType] = useState<"summary" | "employee" | "department">("summary");
  const params = { startDate: "2025-01-01", endDate: "2025-12-31" };

  const { data: summaryData } = useGetLeaveSummaryQuery(params, {
    skip: reportType !== "summary",
  });
  const { data: employeeData } = useGetEmployeeBalancesQuery(
    { year: 2025 },
    { skip: reportType !== "employee" }
  );
  const { data: departmentData } = useGetDepartmentAnalysisQuery(params, {
    skip: reportType !== "department",
  });

  // Export handler
  const handleExport = (format: "csv" | "pdf") => {
    window.open(
      `http://localhost:5000/api/reports/export/${format}?startDate=${params.startDate}&endDate=${params.endDate}`,
      "_blank"
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-gray-200 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const pieData =
    summaryData?.summary?.map((item: any) => ({
      name: `${item.leaveType} (${item.status})`,
      value: item._count.id,
    })) || [];

  const deptChartData =
    departmentData?.analysis
      ? Object.entries(departmentData.analysis).map(([deptId, info]: [string, any]) => ({
          department: info.departmentName || deptId,
          requests: info.count || 0,
          days: info.totalDays || 0,
        }))
      : [];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Reports &amp; Analytics</h1>

      {/* Tabs + Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Tabs value={reportType} onValueChange={(v) => setReportType(v as any)}>
              <TabsList>
                <TabsTrigger value="summary">Leave Summary</TabsTrigger>
                <TabsTrigger value="employee">Employee Balances</TabsTrigger>
                <TabsTrigger value="department">Department Analysis</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handleExport("csv")}>
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </Button>
              <Button variant="outline" onClick={() => handleExport("pdf")}>
                <Download className="h-4 w-4 mr-1" /> Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs value={reportType} onValueChange={(v) => setReportType(v as any)}>
        {/* Leave Summary */}
        <TabsContent value="summary">
          {summaryData && (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Users className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Requests</p>
                      <p className="text-xl font-bold">
                        {summaryData.summary.reduce((acc: number, i: any) => acc + i._count.id, 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <BarChart3 className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Approved Leaves</p>
                      <p className="text-xl font-bold">
                        {summaryData.summary
                          .filter((s: any) => s.status === "APPROVED")
                          .reduce((acc: number, i: any) => acc + i._count.id, 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <PieChart className="text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pending Requests</p>
                      <p className="text-xl font-bold">
                        {summaryData.summary
                          .filter((s: any) => s.status === "PENDING")
                          .reduce((acc: number, i: any) => acc + i._count.id, 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Leave Distribution</CardTitle>
                  <CardDescription>Breakdown by leave type and status</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie data={pieData} dataKey="value" outerRadius={110} label>
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Table */}
              <Card>
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
                      {summaryData.summary.map((item: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{item.leaveType}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          </TableCell>
                          <TableCell>{item._count.id}</TableCell>
                          <TableCell>{item._sum.totalDays}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Employee Balances */}
        <TabsContent value="employee">
          {employeeData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Employees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{employeeData.balances.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Available Leaves</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {employeeData.balances.reduce((sum: number, bal: any) => sum + bal.availableDays, 0)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Pending Leaves</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {employeeData.balances.reduce((sum: number, bal: any) => sum + bal.pendingDays, 0)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Employee Leave Balances</CardTitle>
                  <CardDescription>Leave availability per employee</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Leave Type</TableHead>
                        <TableHead>Total Quota</TableHead>
                        <TableHead>Used Days</TableHead>
                        <TableHead>Pending Days</TableHead>
                        <TableHead>Available Days</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employeeData.balances.map((bal: any) => (
                        <TableRow key={bal.id}>
                          <TableCell>
                            {bal.user.firstName} {bal.user.lastName}
                          </TableCell>
                          <TableCell>{bal.user.department?.name || "-"}</TableCell>
                          <TableCell>{bal.leavePolicy.leaveType}</TableCell>
                          <TableCell>{bal.totalQuota}</TableCell>
                          <TableCell>{bal.usedDays}</TableCell>
                          <TableCell>{bal.pendingDays}</TableCell>
                          <TableCell>{bal.availableDays}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Department Analysis */}
        <TabsContent value="department">
          {departmentData && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Department Analysis</CardTitle>
                  <CardDescription>Requests and total days by department</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deptChartData}>
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="requests" fill="#4CAF50" name="Requests" />
                      <Bar dataKey="days" fill="#2196F3" name="Total Days" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Request Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Number of Requests</TableHead>
                        <TableHead>Total Days Requested</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(departmentData.analysis).map(([deptId, info]: [string, any]) => (
                        <TableRow key={deptId}>
                          <TableCell>{info.departmentName || deptId}</TableCell>
                          <TableCell>{info.count || 0}</TableCell>
                          <TableCell>{info.totalDays || 0}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
