import axios from "axios";

const privateApi = axios.create({
  baseURL: "http://localhost:3001",
});

// privateApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default privateApi;
