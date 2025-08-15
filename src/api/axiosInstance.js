import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// لتحديث التوكن إذا تغير بعد الدخول
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
