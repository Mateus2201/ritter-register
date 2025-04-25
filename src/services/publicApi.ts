// lib/privateApi.ts
import axios from "axios";

const privateApi = axios.create({
    baseURL: "http://localhost:3001/api",
});

export default privateApi;
