import API from "./api";

export const register = (data) =>
    API.post("api/v1/user/register", data, { withCredentials: true });

export const login = (data) =>
    API.post("api/v1/user/login", data, { withCredentials: true });

export const logout = () =>
    API.post("api/v1/user/logout", null, { withCredentials: true });

export const me = () => API.get("api/v1/user/me", { withCredentials: true });
