import React, { useState, ChangeEvent, useEffect } from 'react';
import { useGetProjectsQuery, useCreateProjectMutation, useGetManagersQuery } from '@/store/api/projectApi';
import { Project, User } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';

const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/app');
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

      setForm({
        projectName: '',
        clientName: '',
        revenue: '',
        managerId: '',
        priority: '',
        allocatedHours: '',
        description: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create project');
    }
  };

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
        <h1 className="text-2xl font-semibold text-gray-900">Project Management</h1>
      </div>

      {/* Create New Project Section */}
      <div className="bg-white rounded-lg border mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Create New Project</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Discard
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Project Name</label>
                <input
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Client Name</label>
                <input
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  placeholder="Client Name"
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Est. Revenue</label>
                <input
                  name="revenue"
                  value={form.revenue}
                  onChange={handleChange}
                  placeholder="Est. Revenue"
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Select Project Man.</label>
                <select
                  name="managerId"
                  value={form.managerId}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select Project Manager</option>
                  {managers.map((m: User) => (
                    <option key={m.id} value={m.id}>
                      {m.firstName} {m.lastName} {m.isActive ? '' : '(Inactive)'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Select Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Allocated Hours</label>
                <input
                  name="allocatedHours"
                  value={form.allocatedHours}
                  onChange={handleChange}
                  placeholder="Allocated Hours"
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {loadingProjects ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : projectsError ? (
          <div className="p-8 text-center">
            <p className="text-red-500">Error loading projects</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Project</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Client</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Est. Revenue</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Priority</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Project Manager</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Allocated Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((proj: Project) => (
                  <tr key={proj.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{proj.projectName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{proj.clientName}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{proj.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                      ${proj.revenue?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(proj.priority)}`}>
                        {proj.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {proj.manager?.firstName} {proj.manager?.lastName}
                      {proj.manager?.isActive === false && ' (Inactive)'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{proj.allocatedHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
