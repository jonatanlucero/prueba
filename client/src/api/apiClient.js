// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // podés configurar esto con una variable de entorno
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
