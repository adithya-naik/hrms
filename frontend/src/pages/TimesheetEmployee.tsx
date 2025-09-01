import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  useCreateTimesheetMutation,
  useDeleteTimesheetMutation,
  useGetMyTimesheetsQuery,
  useGetMyWeeklySummaryQuery,
  useUpdateTimesheetMutation,
} from "@/store/api/timesheetApi";
import axios from "axios";
import { toast } from "sonner";

type MyTask = {
  id: string;
  name: string;
  priority: "LOW"|"MEDIUM"|"HIGH"|"CRITICAL";
  module: { id: string; name: string; project: { id: string; projectName: string } };
};

const TimesheetEmployee: React.FC = () => {
  const token = useSelector((s: RootState) => s.auth.token);
  const { data: entries = [], isLoading: loadingEntries } = useGetMyTimesheetsQuery();
  const { data: summary } = useGetMyWeeklySummaryQuery();
  const [createEntry, { isLoading: creating }] = useCreateTimesheetMutation();
  const [updateEntry] = useUpdateTimesheetMutation();
  const [deleteEntry] = useDeleteTimesheetMutation();

  const [tasks, setTasks] = useState<MyTask[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks/my-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data || []);
      } catch (e: any) {
        console.error(e);
        toast.error(e.response?.data?.message || "Failed to load tasks");
      }
    };
    load();
  }, [token]);

  const projects = useMemo(() => {
    const map = new Map<string, string>();
    tasks.forEach(t => map.set(t.module.project.id, t.module.project.projectName));
    return Array.from(map, ([id, projectName]) => ({ id, projectName }));
  }, [tasks]);

  const modulesByProject = useMemo(() => {
    const map = new Map<string, { id: string; name: string }[]>();
    tasks.forEach(t => {
      const pid = t.module.project.id;
      if (!map.has(pid)) map.set(pid, []);
      const arr = map.get(pid)!;
      if (!arr.some(m => m.id === t.module.id)) arr.push({ id: t.module.id, name: t.module.name });
    });
    return map;
  }, [tasks]);

  const tasksByModule = useMemo(() => {
    const map = new Map<string, MyTask[]>();
    tasks.forEach(t => {
      if (!map.has(t.module.id)) map.set(t.module.id, []);
      map.get(t.module.id)!.push(t);
    });
    return map;
  }, [tasks]);

  // Modal state (for Add and Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<typeof entries[0] | null>(null);

  // Form state
  const [projectId, setProjectId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [workedHrs, setWorkedHrs] = useState("");
  const [status, setStatus] = useState<"PENDING"|"IN_PROGRESS"|"COMPLETED">("PENDING");
  const [description, setDescription] = useState("");
  const [workDate, setWorkDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Reset module/task when project changes
  useEffect(() => { setModuleId(""); setTaskId(""); }, [projectId]);
  useEffect(() => { setTaskId(""); }, [moduleId]);

  // Populate form when editing
  useEffect(() => {
    if (editingEntry) {
      setProjectId(editingEntry.project?.id || "");
      setModuleId(editingEntry.task?.module?.id || "");
      setTaskId(editingEntry.task?.id || "");
      setWorkedHrs(editingEntry.hoursWorked.toString());
      setStatus(editingEntry.status);
      setDescription(editingEntry.description || "");
      setWorkDate(new Date(editingEntry.date).toISOString().split("T")[0]);
    }
  }, [editingEntry]);

  const handleDiscard = () => {
    setProjectId(""); setModuleId(""); setTaskId("");
    setWorkedHrs(""); setStatus("PENDING"); setDescription("");
    setWorkDate(new Date().toISOString().split('T')[0]);
    setEditingEntry(null);
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (!taskId || !workedHrs || !workDate) {
      toast.error("Please select task, enter worked hours, and select date");
      return;
    }
    try {
      const selectedTask = tasks.find(t => t.id === taskId);
      if (!selectedTask) { toast.error("Selected task not found"); return; }

      if (editingEntry) {
        // Update
        await updateEntry({
          id: editingEntry.id,
          data: {
            projectId: selectedTask.module.project.id,
            taskId,
            date: workDate,
            hoursWorked: Number(workedHrs),
            description,
            status,
          },
        }).unwrap();
        toast.success("Timesheet updated");
      } else {
        // Create
        await createEntry({
          projectId: selectedTask.module.project.id,
          taskId,
          date: workDate,
          hoursWorked: Number(workedHrs),
          description,
          status,
        }).unwrap();
        toast.success("Timesheet added successfully");
      }
      handleDiscard();
    } catch (e: any) {
      toast.error(e.data?.message || "Operation failed");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteEntry(id).unwrap();
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.data?.message || "Delete failed");
    }
  };

  const openAddModal = () => { setEditingEntry(null); setIsModalOpen(true); };
  const openEditModal = (entry: typeof entries[0]) => { setEditingEntry(entry); setIsModalOpen(true); };

  const statusClass = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-6 space-y-6">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Total Working Hours (This Week)</h3>
          <div className="text-3xl font-semibold mt-2">{summary ? `${summary.totalHours}/45h` : "32/45h"}</div>
          <div className="text-xs text-muted-foreground mt-1">Target: 45 hrs</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Average Hours / Day</h3>
          <div className="text-3xl font-semibold mt-2">{summary ? `${summary.avgHours}h` : "8.9h"}</div>
          <div className="text-xs text-muted-foreground mt-1">Target: 8 hrs</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Work Progress (This Week)</h3>
          <Progress value={summary?.progress ?? 0} className="mt-3" />
          <div className="text-xs text-muted-foreground mt-2">{summary?.progress ?? 20}% of weekly target</div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-end">
        <Button onClick={openAddModal}>Add New Task</Button>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-2xl shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Hours Worked</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {loadingEntries ? (
    <TableRow><TableCell colSpan={9}>Loading…</TableCell></TableRow>
  ) : entries.length === 0 ? (
    <TableRow><TableCell colSpan={9}>No entries yet</TableCell></TableRow>
  ) : (
    entries.map(e => {
      const task = tasks.find(t => t.id === e.taskId);
      return (
        <TableRow key={e.id} className="hover:bg-gray-50">
          <TableCell>{task?.module.project.projectName || "-"}</TableCell>
          <TableCell>{task?.module.name || "-"}</TableCell>
          <TableCell>{task?.name || "-"}</TableCell>
          <TableCell>{e.description || "-"}</TableCell>
          <TableCell>{task?.priority || "-"}</TableCell>
          <TableCell>{new Date(e.date).toLocaleDateString()}</TableCell>
          <TableCell>{e.hoursWorked}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded text-xs ${statusClass[e.status]}`}>{e.status}</span>
          </TableCell>
          <TableCell className="space-x-2">
            <Button variant="ghost" size="sm" onClick={() => openEditModal(e)}>Edit</Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(e.id)} className="text-red-600 hover:text-red-800">Delete</Button>
          </TableCell>
        </TableRow>
      );
    })
  )}
</TableBody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">{editingEntry ? "Edit Timesheet" : "Add New Task"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="border p-2 rounded w-full">
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
              </select>

              <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} disabled={!projectId} className="border p-2 rounded w-full disabled:opacity-50">
                <option value="">{projectId ? "Select Module" : "Select project first"}</option>
                {(modulesByProject.get(projectId) || []).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>

              <select value={taskId} onChange={(e) => setTaskId(e.target.value)} disabled={!moduleId} className="border p-2 rounded w-full disabled:opacity-50">
                <option value="">{moduleId ? "Select Task" : "Select module first"}</option>
                {(tasksByModule.get(moduleId) || []).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input type="number" value={workedHrs} onChange={(e) => setWorkedHrs(e.target.value)} placeholder="Hours Worked" min={0} step={0.5} />
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="border p-2 rounded w-full">
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <Input type="date" value={workDate} onChange={(e) => setWorkDate(e.target.value)} />
            </div>

            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleDiscard}>Cancel</Button>
              <Button onClick={handleSave}>{editingEntry ? "Save" : "Add"}</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TimesheetEmployee;
