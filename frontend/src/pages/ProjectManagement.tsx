import React, { useState, ChangeEvent, useEffect } from 'react';
import { useGetProjectsQuery, useCreateProjectMutation, useGetManagersQuery } from '@/store/api/projectApi';
import { Project, User } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';

const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // 🔹 Admin-only access check
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/app'); // redirect non-admins
    }
  }, [user, navigate]);
  const { data: projects = [], isLoading: loadingProjects, error: projectsError } = useGetProjectsQuery();
  const { data: managers = [], isLoading: loadingManagers } = useGetManagersQuery();
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();

  const [form, setForm] = useState({
    projectName: '',
    clientName: '',
    revenue: '',
    managerId: '',
    priority: '',
    allocatedHours: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.projectName || !form.clientName || !form.managerId) {
      alert('Please fill all required fields (Project Name, Client, Manager)');
      return;
    }
    try {
      await createProject({
        ...form,
        revenue: form.revenue ? parseFloat(form.revenue) : undefined,
        allocatedHours: form.allocatedHours ? parseInt(form.allocatedHours) : undefined,
      }).unwrap();

      // Reset form
      setForm({
        projectName: '',
        clientName: '',
        revenue: '',
        managerId: '',
        priority: '',
        allocatedHours: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create project');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>

      {/* Create Project Form */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Project Name</label>
            <input
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              placeholder="Project Name"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Client Name</label>
            <input
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Estimated Revenue</label>
            <input
              name="revenue"
              value={form.revenue}
              onChange={handleChange}
              placeholder="Estimated Revenue"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Manager</label>
            <select
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Manager</option>
              {managers.map((m: User) => (
                <option key={m.id} value={m.id}>
                  {m.firstName} {m.lastName} {m.isActive ? '' : '(Inactive)'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Allocated Hours</label>
            <input
              name="allocatedHours"
              value={form.allocatedHours}
              onChange={handleChange}
              placeholder="Allocated Hours"
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded mt-1"
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {creating ? 'Creating...' : 'Create Project'}
        </button>
      </div>

      {/* Projects Table */}
      {loadingProjects ? (
        <p>Loading projects...</p>
      ) : projectsError ? (
        <p>Error loading projects</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Project Name</th>
              <th className="border p-2">Client Name</th>
              <th className="border p-2">Revenue</th>
              <th className="border p-2">Manager</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Allocated Hours</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj: Project) => (
              <tr key={proj.id}>
                <td className="border p-2">{proj.projectName}</td>
                <td className="border p-2">{proj.clientName}</td>
                <td className="border p-2">{proj.revenue}</td>
                <td className="border p-2">
                  {proj.manager?.firstName} {proj.manager?.lastName} {proj.manager?.isActive === false ? '(Inactive)' : ''}
                </td>
                <td className="border p-2">{proj.priority}</td>
                <td className="border p-2">{proj.allocatedHours}</td>
                <td className="border p-2">{proj.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectManagement;
