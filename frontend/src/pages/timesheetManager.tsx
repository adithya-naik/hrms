import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Employee = { id: string; employeeId: string; firstName: string; lastName: string };
type Project = { id: string; projectName: string };
type Module = { id: string; name: string; projectId: string };
type Task = { id: string; name: string; priority: string; allocatedHrs: number; description: string };
type Timesheet = {
  id: string;
  employeeName: string;
  projectName: string;
  moduleName: string;
  taskName: string;
  task: Task;
  hoursWorked: number;
  status: string;
  date: string;
  description: string;
  comments?: string;
};

const TimesheetManager: React.FC = () => {
  const token = useSelector((s: RootState) => s.auth.token);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
  const [comment, setComment] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, employeesRes, modulesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5000/api/employees", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5000/api/modules", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setProjects(projectsRes.data);
        setEmployees(employeesRes.data);
        setModules(modulesRes.data);
      } catch (err) {
        toast.error("Failed to load initial data");
      }
    };
    fetchData();
  }, [token]);

  const fetchTimesheets = async () => {
    setLoading(true);
    try {
      const params: any = {
        projectId: selectedProject,
        moduleId: selectedModule,
        employeeId: selectedEmployee,
        priority: selectedPriority,
        status: selectedStatus,
        date,
      };
      const res = await axios.get("http://localhost:5000/api/manager/timesheets", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setTimesheets(res.data);
    } catch (err) {
      toast.error("Failed to fetch timesheets");
    }
    setLoading(false);
  };

  const handleDiscard = () => {
    setSelectedProject(""); setSelectedModule(""); setSelectedEmployee("");
    setSelectedPriority(""); setSelectedStatus(""); setDate("");
    setTimesheets([]);
  };

  const handleExport = () => {
    const header = ["EMPLOYEE", "Project", "Module", "Task", "Priority", "Status", "Allocated Hours", "Worked Hours", "Description", "Comments"];
    const rows = timesheets.map(t => [
      t.employeeName,
      t.projectName,
      t.moduleName,
      t.taskName,
      t.task.priority,
      t.status,
      t.task.allocatedHrs,
      t.hoursWorked,
      t.description || "",
      t.comments || ""
    ]);
    const csv = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manager_timesheet_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

const handleTimesheetStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
  try {
    const endpoint =
      status === "APPROVED"
        ? `http://localhost:5000/api/manager/timesheets/${id}/approve`
        : `http://localhost:5000/api/manager/timesheets/${id}/reject`;

    await axios.put(
      endpoint,
      { comments: comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success(`Timesheet ${status.toLowerCase()} successfully`);
    setSelectedTimesheet(null);
    setComment("");
    fetchTimesheets();
  } catch (err) {
    toast.error("Failed to update timesheet");
  }
};


  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "LOW": return "text-green-600";
      case "MEDIUM": return "text-blue-600";
      case "HIGH": return "text-orange-600";
      case "CRITICAL": return "text-red-600";
      default: return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "PENDING": return "text-yellow-600";
      case "IN_PROGRESS": return "text-blue-600";
      case "COMPLETED": return "text-green-600";
      case "APPROVED": return "text-green-700";
      case "REJECTED": return "text-red-600";
      default: return "";
    }
  };

  return (
    <div className="p-6 space-y-6 flex">
      <div className="flex-1 space-y-6">
        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleDiscard}>Discard</Button>
            <Button onClick={handleExport}>Export Report</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} className="border p-2 rounded">
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
            </select>

            <select value={selectedModule} onChange={e => setSelectedModule(e.target.value)} className="border p-2 rounded">
              <option value="">Select Module</option>
              {modules.filter(m => !selectedProject || m.projectId === selectedProject).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>

            <select value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)} className="border p-2 rounded">
              <option value="">Select Employee</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.employeeId} - {emp.firstName} {emp.lastName}</option>)}
            </select>

            <select value={selectedPriority} onChange={e => setSelectedPriority(e.target.value)} className="border p-2 rounded">
              <option value="">Select Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>

            <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="border p-2 rounded">
              <option value="">Select Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded" />

            <Button onClick={fetchTimesheets} className="col-span-1 md:col-span-3 mt-2 py-3 text-lg font-medium">Search</Button>
          </div>
        </div>

        {/* Timesheet Table */}
        <div className="bg-white p-4 rounded-2xl shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Overview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={9}>Loading...</TableCell></TableRow>
              ) : timesheets.length === 0 ? (
                <TableRow><TableCell colSpan={9}>No records found</TableCell></TableRow>
              ) : (
                timesheets.map(ts => (
                  <TableRow key={ts.id}>
                    <TableCell>{ts.employeeName}</TableCell>
                    <TableCell>{ts.projectName}</TableCell>
                    <TableCell>{ts.moduleName}</TableCell>
                    <TableCell>{ts.taskName}</TableCell>
                    <TableCell className={getPriorityColor(ts.task.priority)}>{ts.task.priority}</TableCell>
                    <TableCell>{ts.hoursWorked}</TableCell>
                    <TableCell className={getStatusColor(ts.status)}>{ts.status}</TableCell>
                    <TableCell>{new Date(ts.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => { setSelectedTimesheet(ts); setComment(ts.comments || ""); }}>Overview</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 transition-transform ${selectedTimesheet ? "translate-x-0" : "translate-x-full"} z-50 overflow-y-auto`}>
        {selectedTimesheet && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Timesheet Overview</h2>
            <p><strong>Project:</strong> {selectedTimesheet.projectName}</p>
            <p><strong>Module:</strong> {selectedTimesheet.moduleName}</p>
            <p><strong>Priority:</strong> <span className={getPriorityColor(selectedTimesheet.task.priority)}>{selectedTimesheet.task.priority}</span></p>
            <p><strong>Status:</strong> <span className={getStatusColor(selectedTimesheet.status)}>{selectedTimesheet.status}</span></p>
            <p><strong>Assigned On:</strong> {new Date(selectedTimesheet.date).toLocaleDateString()}</p>
            <p><strong>Allocated Hours:</strong> {selectedTimesheet.task.allocatedHrs}</p>
            <p><strong>Worked Hours:</strong> {selectedTimesheet.hoursWorked}</p>
            <p><strong>Description:</strong> {selectedTimesheet.description || "-"}</p>

           <div>
              <strong>Comments:</strong>
              <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter comments here" />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <Button variant="destructive" onClick={() => handleTimesheetStatus(selectedTimesheet.id, "REJECTED")}>Reject</Button>
              <Button onClick={() => handleTimesheetStatus(selectedTimesheet.id, "APPROVED")}>Approve</Button>
            </div>

            <Button variant="outline" className="mt-2 w-full" onClick={() => setSelectedTimesheet(null)}>Close</Button>
          </div> 
        )}
      </div>
    </div>
  );
};

export default TimesheetManager;
