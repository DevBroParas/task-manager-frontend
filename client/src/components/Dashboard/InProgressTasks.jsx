import React, { useEffect, useState } from "react";
import { getAllUserTasks } from "../../services/taskService";

const InProgressTasks = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskRes = await getAllUserTasks(); // assumes populate('project') is used
        const allTasks = taskRes.data.tasks;

        // Filter tasks by 'in-progress' status
        const inProgress = allTasks.filter(task => task.status === "in-progress");

        setInProgressTasks(inProgress);
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
      <h2 className="text-lg font-semibold mb-4 text-yellow-600">🚧 In Progress Tasks</h2>
      {inProgressTasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks in progress.</p>
      ) : (
        <ul className="space-y-3">
          {inProgressTasks.map((task) => (
            <li
              key={task._id}
              className="border p-3 rounded hover:bg-yellow-50"
            >
              <h3 className="font-medium text-yellow-800">{task.title}</h3>
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

export default InProgressTasks;
