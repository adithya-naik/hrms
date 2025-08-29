import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useCreateModuleMutation, useGetProjectsQuery } from "../store/api/taskApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModuleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [moduleName, setModuleName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { data: projects = [], isLoading, error } = useGetProjectsQuery();
  const [createModule] = useCreateModuleMutation();

  // default to first project when projects load
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleName || !selectedProjectId) return;

    try {
      await createModule({ moduleName, projectId: selectedProjectId });
      setModuleName("");
      onClose();
    } catch (err) {
      console.error("Error creating module:", err);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Create Module</h2>

          {/* Select Project first */}
          <div className="flex flex-col">
            <label htmlFor="project" className="mb-1 font-medium">
              Select Project
            </label>
            {isLoading ? (
              <p className="text-gray-500">Loading projects...</p>
            ) : error ? (
              <div className="text-red-500">
                <p>Error loading projects:</p>
                <pre className="text-xs mt-1 bg-red-50 p-2 rounded overflow-auto">
                  {JSON.stringify(error, null, 2)}
                </pre>
              </div>
            ) : projects?.length === 0 ? (
              <p className="text-orange-500">No projects available. Please create a project first.</p>
            ) : (
              <select
                id="project"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                required
               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
>
                <option value="">Select a project...</option>
                {projects.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName || project.name || `Project ${project.id}`}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Module Name */}
          <input
            type="text"
            placeholder="Module Name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!moduleName || !selectedProjectId || projects?.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateModuleModal;
