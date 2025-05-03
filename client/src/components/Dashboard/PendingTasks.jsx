import React, { useEffect, useState } from "react";
import { getAllUserTasks } from "../../services/taskService";

const PendingTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskRes = await getAllUserTasks(); // This uses populate('project')
        const allTasks = taskRes.data.tasks;

        // Filter tasks by 'pending' status
        const pending = allTasks.filter(task => task.status === "pending");

        setPendingTasks(pending);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="text-center">Loading tasks...</div>;

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">🕒 Pending Tasks</h2>
      {pendingTasks.length === 0 ? (
        <p className="text-sm text-gray-500">No pending tasks.</p>
      ) : (
        <ul className="space-y-3">
          {pendingTasks.map((task) => (
            <li
              key={task._id}
              className="border p-3 rounded hover:bg-gray-50"
            >
              <h3 className="font-medium text-blue-700">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-400 italic">
                Project: {task.project?.name || "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingTasks;
