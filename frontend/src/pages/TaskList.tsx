import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Task } from "@/types"; // Optional: define your Task type
import { toast } from "sonner";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useSelector((state: RootState) => state.auth); // JWT token

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks/my-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        toast.error(err.response?.data?.message || "Failed to load tasks");
      }
    };

    fetchTasks();
  }, [token]);

  if (tasks.length === 0) {
    return <p className="p-4">No tasks assigned yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Task Name</th>
              <th className="border px-4 py-2 text-left">Project</th>
              <th className="border px-4 py-2 text-left">Module</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Priority</th>
              <th className="border px-4 py-2 text-left">Hours</th>
              <th className="border px-4 py-2 text-left">Assigned On</th>
              <th className="border px-4 py-2 text-left">Status</th> {/* 🔹 new column */}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border px-4 py-2">{task.name}</td>
                <td className="border px-4 py-2">{task.module?.project?.projectName || "-"}</td>
                <td className="border px-4 py-2">{task.module?.name || "-"}</td>
                <td className="border px-4 py-2">{task.description || "-"}</td>
                <td className="border px-4 py-2">{task.priority}</td>
                <td className="border px-4 py-2">{task.allocatedHrs}</td>
                <td className="border px-4 py-2">
                  {new Date(task.createdAt).toLocaleDateString()} {/* 🔹 Assigned On */}
                </td>
                <td className="border px-4 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
