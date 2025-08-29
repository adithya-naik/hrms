// src/components/CreateTaskModal.tsx
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { 
  useCreateTaskMutation, 
  useGetModulesQuery, 
  useGetProjectsQuery 
} from "../store/api/taskApi";

// We'll add a getUsersQuery in taskApi
import { useGetUsersQuery } from "../store/api/taskApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void; // refresh table
}

const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose, onCreated }) => {
  const { data: modules = [], isLoading: loadingModules } = useGetModulesQuery();
  const { data: projects = [], isLoading: loadingProjects } = useGetProjectsQuery();
  const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery();

  const [createTask] = useCreateTaskMutation();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [allocatedHrs, setAllocatedHrs] = useState("");

  // Filter modules based on selected project
  const filteredModules = useMemo(() => {
    if (!selectedProjectId) return modules;
    return modules.filter((m) => m.projectId === selectedProjectId);
  }, [modules, selectedProjectId]);

  // Default selections
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects]);

  useEffect(() => {
    if (filteredModules.length > 0 && !moduleId) {
      setModuleId(filteredModules[0].id);
    }
  }, [filteredModules]);

  useEffect(() => {
    if (users.length > 0 && !assignedToId) {
      setAssignedToId(users[0].id);
    }
  }, [users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !moduleId || !assignedToId) return;

    try {
      await createTask({
        taskName,
        moduleId,
        assignedToId,
        description,
        priority,
        allocatedHrs: Number(allocatedHrs) || 0,
      }).unwrap();

      // Reset form
      setTaskName("");
      setDescription("");
      setSelectedProjectId(projects[0]?.id || "");
      setModuleId("");
      setAssignedToId(users[0]?.id || "");
      setPriority("MEDIUM");
      setAllocatedHrs("");

      onCreated(); // refresh table
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">Create Task</h2>

          {/* Project & Module */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Select Project</label>
              {loadingProjects ? (
                <p>Loading projects...</p>
              ) : (
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option value="">Choose project...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.projectName}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Select Module</label>
              {loadingModules ? (
                <p>Loading modules...</p>
              ) : (
                <select
                  value={moduleId}
                  onChange={(e) => setModuleId(e.target.value)}
                  required
                  disabled={!selectedProjectId || filteredModules.length === 0}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option value="">Choose module...</option>
                  {filteredModules.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Task Name & Assign To */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Task Name</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task name"
                required
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Assign To</label>
              {loadingUsers ? (
                <p>Loading users...</p>
              ) : (
                <select
                  value={assignedToId}
                  onChange={(e) => setAssignedToId(e.target.value)}
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option value="">Select Employee</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName} ({u.employeeId})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Priority & Allocated Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Allocated Hours</label>
              <input
                type="number"
                value={allocatedHrs}
                onChange={(e) => setAllocatedHrs(e.target.value)}
                placeholder="Hours"
                min="0"
                step="0.5"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskName || !moduleId || !assignedToId}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateTaskModal;
