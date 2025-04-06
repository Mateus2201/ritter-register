import axios from "axios";

const publicApi = axios.create({
    baseURL: "http://localhost:3001/api", // Altere para sua URL real
});

export default publicApi;
