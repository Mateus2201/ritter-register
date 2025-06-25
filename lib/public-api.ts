// lib/privateApi.ts
import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://168.231.96.194:3000/api",
});

publicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default publicApi;
