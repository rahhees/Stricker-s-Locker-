// src/api/axios.js
// import axios from "axios";

import axios from "axios";

 const api = axios.create({
   baseURL: "https://localhost:57401/api",
  headers: { "Content-Type": "application/json" },
});

 export default api;


// const api = axios.create({
//   baseURL:'http://localhost:5000/api',
//   headers:{
//     'Content-Type':'application/json',
//   }
// });

// api.interceptors.request.use((config)=>{
//   const user = JSON.parse(localStorage.getItem('user'));
//   if(user && user.accesToken){
//     config.headers.Authorization = `Bearer ${user.accesToken}`;

//   }
//   return config;
// },
// (error)=>{
//   return Promise.reject(error);
// }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If error is 401 and we haven't tried to refresh yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Get refresh token from localStorage
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user && user.refreshToken) {
//           // Call refresh token endpoint
//           const response = await axios.post(
//             'http://localhost:5000/api/Auth/Refresh-Token',
//             {
//               accessToken: user.accessToken,
//               refreshToken: user.refreshToken,
//             }
//           );

//           const newTokens = response.data.data; // Adjust based on your response structure
          
//           // Update localStorage
//           const updatedUser = {
//             ...user,
//             accessToken: newTokens.accessToken,
//             refreshToken: newTokens.refreshToken,
//           };
//           localStorage.setItem('user', JSON.stringify(updatedUser));
          
//           // Update authorization header
//           api.defaults.headers.common['Authorization'] = `Bearer ${newTokens.accessToken}`;
//           originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
          
//           // Retry the original request
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         // If refresh fails, logout user
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

//  

