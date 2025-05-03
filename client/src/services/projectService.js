import API from "./api";

export const getProjects = () => API.get("api/v1/project/projects");

export const getSingleProject = (id) =>
    API.get(`api/v1/project/projects/${id}`);

export const createProject = (data) =>
    API.post("api/v1/project/projects", data);
