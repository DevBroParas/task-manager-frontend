import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../../services/taskService";

const TaskForm = ({ projectId, onClose, onTaskCreated, onTaskUpdated, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status };

    try {
      let response;
      if (task) {
        // Update the task if editing
        response = await updateTask(task._id, newTask);
        onTaskUpdated(response.data.task); // Update the parent component
      } else {
        // Create the task if new
        response = await createTask(projectId, newTask);
        onTaskCreated(response.data.task); // Update the parent component
      }
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
