// lib/privateApi.ts
import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://api.ritterveiculos.com.br/api",
});

publicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default publicApi;
