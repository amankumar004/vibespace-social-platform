import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach token to every request if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers = req.headers || {};
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// simple 401 handling
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
  }
}

export default API;
