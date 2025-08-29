import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CreateModuleModal from "@/components/CreateModuleModal";
import CreateTaskModal from "@/components/CreateTaskModal";
import { useGetTasksQuery } from "@/store/api/taskApi";
import { Task } from "@/types";

export default function TaskManagement() {
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const { data: tasks = [], refetch, isLoading } = useGetTasksQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  // Sort latest tasks first
  const sortedTasks = [...tasks].sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));

  const buttonClasses =
    "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition";

  const getPriorityBadge = (priority: string) => {
    const priorityStyles: Record<string, string> = {
      High: 'bg-red-100 text-red-600 border border-red-200',
      Medium: 'bg-orange-100 text-orange-600 border border-orange-200',
      Normal: 'bg-blue-100 text-blue-600 border border-blue-200',
      Low: 'bg-gray-100 text-gray-600 border border-gray-200',
    };
    return priorityStyles[priority] || 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Task Management</h1>
        <div className="flex gap-2">
          <button className={buttonClasses} onClick={() => setModuleModalOpen(true)}>
            Create Module
          </button>
          <button className={buttonClasses} onClick={() => setTaskModalOpen(true)}>
            Create Task
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading tasks...</div>
        ) : sortedTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No tasks found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Task Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Module</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Project</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assigned To</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Allocated Hours</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedTasks.map((task: Task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{task.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{task.module?.name || "-"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{task.module?.project?.projectName || "-"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {task.assignedTo ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}` : "-"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{task.description || "-"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{task.allocatedHrs || "-"}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getPriorityBadge(task.priority)}`}>
                        {task.priority || "-"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
