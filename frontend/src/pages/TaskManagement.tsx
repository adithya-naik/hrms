// src/pages/TaskManagement.tsx
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateModuleModal from "@/components/CreateModuleModal";
import CreateTaskModal from "@/components/CreateTaskModal";
import { useGetTasksQuery } from "@/store/api/taskApi"; // adjust import according to your setup
import { Task } from "@/types";

export default function TaskManagement() {
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const { data: tasks = [], refetch, isLoading } = useGetTasksQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleModuleCreated = () => {
    setModuleModalOpen(false);
    refetch();
  };

  const handleTaskCreated = () => {
    setTaskModalOpen(false);
    refetch();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => setModuleModalOpen(true)}>Create Module</Button>
          <Button onClick={() => setTaskModalOpen(true)}>Create Task</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Allocated Hours</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No tasks found</TableCell>
              </TableRow>
            ) : (
              tasks.map((task: Task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.module?.name}</TableCell>
                  <TableCell>{task.module?.project?.projectName}</TableCell>
                  <TableCell>{task.assignedTo?.firstName} {task.assignedTo?.lastName}</TableCell>
                  <TableCell>{task.description || "-"}</TableCell>
                  <TableCell>{task.allocatedHrs}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <CreateModuleModal
        isOpen={moduleModalOpen}
        onClose={() => setModuleModalOpen(false)}
        projectId="your-project-id"
      />

      <CreateTaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onCreated={() => refetch()}
      />
    </div>
  );
}
