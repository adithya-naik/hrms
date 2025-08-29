import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { useCreateTaskMutation, useGetModulesQuery, useGetProjectsQuery } from "../store/api/taskApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data: modules = [], isLoading: loadingModules } = useGetModulesQuery();
  const { data: projects = [], isLoading: loadingProjects } = useGetProjectsQuery(); // Get from database
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
    return modules.filter(module => module.projectId === selectedProjectId);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !moduleId || !assignedToId || !allocatedHrs) return;

    try {
      await createTask({
        taskName,
        priority,
        allocatedHrs: Number(allocatedHrs),
        moduleId,
        assignedToId,
      });
      
      // Reset form
      setTaskName("");
      setDescription("");
      setSelectedProjectId(projects[0]?.id || "");
      setModuleId("");
      setAssignedToId("");
      setPriority("MEDIUM");
      setAllocatedHrs("");
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">Create Task</h2>

          {/* Row 1: Select Project and Select Module */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Select Project</label>
              {loadingProjects ? (
                <p className="text-gray-500 p-2">Loading projects...</p>
              ) : (
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Select Module</label>
              {loadingModules ? (
                <p className="text-gray-500 p-2">Loading modules...</p>
              ) : (
                <select
                  value={moduleId}
                  onChange={(e) => setModuleId(e.target.value)}
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedProjectId || filteredModules.length === 0}
                >
                  <option value="">Choose module...</option>
                  {filteredModules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Row 2: Task Name and Select Assign To */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Task Name</label>
              <input
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Assign To</label>
              <input
                type="text"
                placeholder="Employee ID"
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                required
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3: Select Priority and Allocated Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Hours (e.g., 8)"
                value={allocatedHrs}
                onChange={(e) => setAllocatedHrs(e.target.value)}
                min="0"
                step="0.5"
                required
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Optional Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Description (Optional)</label>
            <textarea
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskName || !moduleId || !assignedToId || !allocatedHrs}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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