import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useGetLeaveSummaryQuery,
  useGetEmployeeBalancesQuery,
  useGetDepartmentAnalysisQuery,
} from "../store/api/reportApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type ReportType = "summary" | "employee" | "department";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

export default function Reports() {
  const [reportType, setReportType] = useState<ReportType>("summary");
  const [params, setParams] = useState({
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    year: "2025",
  });

  // Filters
  const [summaryFilter, setSummaryFilter] = useState({
    leaveType: "all",
    status: "all",
  });
  const [employeeFilter, setEmployeeFilter] = useState({
    department: "all",
    leaveType: "all",
  });
  const [departmentFilter, setDepartmentFilter] = useState({
    department: "all",
  });

  const token = useSelector((state: RootState) => state.auth.token);

  // RTK Query hooks
  const { data: summaryData } = useGetLeaveSummaryQuery({
    startDate: params.startDate,
    endDate: params.endDate,
  });
  const { data: balancesData } = useGetEmployeeBalancesQuery({
    year: params.year,
  });
  const { data: departmentData } = useGetDepartmentAnalysisQuery({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const handleExport = async (format: "csv" | "pdf") => {
    try {
      const url = `/api/reports/export?type=${reportType}&format=${format}&startDate=${params.startDate}&endDate=${params.endDate}&year=${params.year}`;
      const res = await fetch(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to export report");
      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${reportType}_report.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Export failed", err);
      alert("Export failed. Check console for details.");
    }
  };

  let content = null;

  // ================= SUMMARY SECTION =================
  if (reportType === "summary") {
    const filtered = summaryData?.summary?.filter((s: any) => {
      return (
        (summaryFilter.leaveType === "all" ||
          s.leaveType === summaryFilter.leaveType) &&
        (summaryFilter.status === "all" || s.status === summaryFilter.status)
      );
    });

    const chartData =
      filtered?.map((s: any) => ({
        name: `${s.leaveType} (${s.status})`,
        value: s._sum.totalDays || 0,
      })) || [];

    content = (
      <>
        {/* Filters + Export Buttons Side by Side */}
        <div className="flex gap-4 mb-4 items-center">
          <Select
            onValueChange={(val) =>
              setSummaryFilter({ ...summaryFilter, leaveType: val })
            }
            value={summaryFilter.leaveType}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leave Types</SelectItem>
              <SelectItem value="SICK">Sick</SelectItem>
              <SelectItem value="CASUAL">Casual</SelectItem>
              <SelectItem value="VACATION">Vacation</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) =>
              setSummaryFilter({ ...summaryFilter, status: val })
            }
            value={summaryFilter.status}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button onClick={() => handleExport("csv")}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Leave Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Leave Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requests</TableHead>
              <TableHead>Total Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered?.map((s: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{s.leaveType}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell>{s._count.id}</TableCell>
                <TableCell>{s._sum.totalDays || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  // ================= EMPLOYEE BALANCES =================
  if (reportType === "employee") {
    const filtered = balancesData?.balances?.filter((b: any) => {
      return (
        (employeeFilter.department === "all" ||
          b.user.department?.name === employeeFilter.department) &&
        (employeeFilter.leaveType === "all" ||
          b.leavePolicy.leaveType === employeeFilter.leaveType)
      );
    });

    const chartData =
      filtered?.map((b: any) => ({
        name: b.user.firstName,
        Quota: b.totalQuota,
        Used: b.usedDays,
      })) || [];

    content = (
      <>
        {/* Filters + Export Buttons Side by Side */}
        <div className="flex gap-4 mb-4 items-center">
          <Select
            onValueChange={(val) =>
              setEmployeeFilter({ ...employeeFilter, department: val })
            }
            value={employeeFilter.department}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {Array.from(
                new Set(
                  balancesData?.balances
                    ?.map((b: any) => b.user.department?.name)
                    .filter(Boolean)
                )
              ).map((dept: any, idx: number) => (
                <SelectItem key={idx} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) =>
              setEmployeeFilter({ ...employeeFilter, leaveType: val })
            }
            value={employeeFilter.leaveType}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leave Types</SelectItem>
              <SelectItem value="SICK">Sick</SelectItem>
              <SelectItem value="CASUAL">Casual</SelectItem>
              <SelectItem value="VACATION">Vacation</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button onClick={() => handleExport("csv")}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Employee Quota vs Used</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Quota" fill="#8884d8" />
                <Bar dataKey="Used" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Quota</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered?.map((b: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{b.user.employeeId}</TableCell>
                <TableCell>
                  {b.user.firstName} {b.user.lastName}
                </TableCell>
                <TableCell>{b.user.department?.name}</TableCell>
                <TableCell>{b.leavePolicy.leaveType}</TableCell>
                <TableCell>{b.totalQuota}</TableCell>
                <TableCell>{b.usedDays}</TableCell>
                <TableCell>{b.availableDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  // ================= DEPARTMENT ANALYSIS =================
  if (reportType === "department") {
    const analysis = departmentData?.analysis ?? {};
    const entries = Object.entries(analysis).filter(
      ([deptName]) =>
        departmentFilter.department === "all" ||
        deptName === departmentFilter.department
    );
    const chartData = entries.map(([name, val]: any) => ({
      name,
      value: val.totalDays,
    }));

    content = (
      <>
        {/* Filter + Export Buttons Side by Side */}
        <div className="flex gap-4 mb-4 items-center">
          <Select
            onValueChange={(val) => setDepartmentFilter({ department: val })}
            value={departmentFilter.department}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {Object.keys(analysis).map((dept, idx) => (
                <SelectItem key={idx} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button onClick={() => handleExport("csv")}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Leave Days by Department</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Leave Requests</TableHead>
              <TableHead>Total Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map(([deptName, val]: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{deptName}</TableCell>
                <TableCell>{val.count}</TableCell>
                <TableCell>{val.totalDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  return (
    <div className="py-2">
      <h1 className="text-4xl font-bold mb-4">Reports</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 items-center">
        <div>
          <label className="block text-sm">Start Date</label>
          <Input
            type="date"
            value={params.startDate}
            onChange={(e) =>
              setParams({ ...params, startDate: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm">End Date</label>
          <Input
            type="date"
            value={params.endDate}
            onChange={(e) => setParams({ ...params, endDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm">Year</label>
          <Input
            type="number"
            value={params.year}
            onChange={(e) => setParams({ ...params, year: e.target.value })}
          />
        </div>
      </div>

      {/* Report type selector */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={reportType === "summary" ? "default" : "outline"}
          onClick={() => setReportType("summary")}
        >
          Leave Summary
        </Button>
        <Button
          variant={reportType === "employee" ? "default" : "outline"}
          onClick={() => setReportType("employee")}
        >
          Employee Balances
        </Button>
        <Button
          variant={reportType === "department" ? "default" : "outline"}
          onClick={() => setReportType("department")}
        >
          Department Analysis
        </Button>
      </div>

      {/* Data table & charts */}
      {content}
    </div>
  );
}
