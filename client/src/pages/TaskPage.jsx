import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../services/taskService";
import { CopyPlus, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import TaskForm from "../components/Tasks/TaskForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskPage() {
  const { id: projectId } = useParams();
  const navigate = useNavigate(); // Initialize navigate hook
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    (async () => {
      try {
        const res = await getTasks(projectId);
        setTasks(res.data.tasks);
        setFilteredTasks(res.data.tasks);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [projectId]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(
        tasks.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setShowModal(false);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 tracking-wide">
        📝 Tasks for Project
      </h1>

      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)} // Navigate back to previous page
          className="bg-transparent hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-transform transform hover:scale-105 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search tasks by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-full shadow-lg focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 placeholder-gray-500 transition-all duration-300"
          />
          <div className="absolute top-3 right-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 10 8 8 8 8 0 00-8-8zm4.243 12.243a6 6 0 111.414-1.414l4.242 4.243a1 1 0 01-1.414 1.415l-4.242-4.243z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Create Task Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-200 flex items-center gap-3"
        >
          <CopyPlus className="w-5 h-5" /> Create Task
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-3xl font-bold text-gray-500 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <TaskForm
              projectId={projectId}
              onClose={() => setShowModal(false)}
              onTaskCreated={handleTaskCreated}
              onTaskUpdated={handleTaskUpdated}
              task={editingTask}
            />
          </div>
        </div>
      )}

      {/* Task Table */}
      <div className="overflow-y-auto max-h-[500px] shadow-lg rounded-xl border bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs bg-gray-200 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No tasks found.
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr
                  key={task._id}
                  className="bg-white border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{task.title}</td>
                  <td className="px-6 py-4 text-gray-600">{task.description}</td>
                  <td className="px-6 py-4 text-gray-500 capitalize flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></span>
                    {task.status}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-500 hover:text-gray-800 p-2 rounded-md">
                          <EllipsisVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(task)}
                          className="text-blue-600"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(task._id)}
                          className="text-red-600 focus:bg-red-600 focus:text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
