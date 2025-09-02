// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5008",
  headers: { "Content-Type": "application/json" },
});

export default api;