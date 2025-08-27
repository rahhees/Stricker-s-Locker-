// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend base URL
  timeout: 10000, // optional: 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
