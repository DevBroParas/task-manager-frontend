import API from "./api";

export const getAllUserTasks = () => API.get("/api/v1/task/tasks");

export const createTask = (projectId, taskData) =>
    API.post(`/api/v1/task/tasks/project/${projectId}`, taskData);

export const getTasks = (projectId) =>
    API.get(`/api/v1/task/tasks/project/${projectId}`);

export const updateTask = (taskId, taskData) =>
    API.patch(`/api/v1/task/tasks/${taskId}`, taskData);

export const deleteTask = (taskId) =>
    API.delete(`/api/v1/task/tasks/${taskId}`);
