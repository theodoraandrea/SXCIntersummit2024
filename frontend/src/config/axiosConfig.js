import axios from "axios";
import { API_URL } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("set bearer token ", token);
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
