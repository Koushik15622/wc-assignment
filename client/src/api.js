import axios from "axios";

const instance = axios.create({
  baseURL: "https://wc-assignment.vercel.app",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
