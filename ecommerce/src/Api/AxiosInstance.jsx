import axios from "axios";


const api = axios.create({
  baseURL: "https://localhost:57401/api",
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


const refreshClient = axios.create({
  baseURL: "https://localhost:57401/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

   
    if (
      originalRequest.url.includes("/Auth/Login") ||
      originalRequest.url.includes("/Auth/Refresh-Token")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

    
      if (!accessToken || !refreshToken) {
        localStorage.clear();
        window.location.replace("/login");
        return Promise.reject(error);
      }

      try {
        const res = await refreshClient.post(
          "/Auth/Refresh-Token",
          { accessToken, refreshToken }
        );

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest); 
      } catch (refreshError) {
        localStorage.clear();
        window.location.replace("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
