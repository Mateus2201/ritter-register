import axios from "axios";

const privateApi = axios.create({
    baseURL: "http://192.168.0.108:3001",
});

// Interceptor para adicionar o token automaticamente nas requisições privadas
privateApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("Tentativa de acesso sem token!");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default privateApi;
