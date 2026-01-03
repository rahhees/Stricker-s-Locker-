// import React, { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import api from "../Api/AxiosInstance";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {


//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });




//   const [loginError, setLoginError] = useState("");
//   const [loading, setLoading] = useState(false);

  

//     const isAuth = !!user;

//   // LOGIN function
//   const loginuser = async (email, password) => {

//     setLoading(true);


//     try {
//       // FIX 1: Added await before api.post
//       const response = await api.post("/Auth/Login", {
//         email: email.trim(),
//         password: password.trim(),
//       });

//       console.log("Login Response:", response.data); // Debug log

//       if (response.data && response.data.data) {
//         const userData = {
//           ...response.data.data,
//           email: email,
//         };

//         //store token 

//         localStorage.setItem("accessToken",userData.accessToken);
//         localStorage.setItem("refreshToken",userData.refreshToken);

//         localStorage.setItem("user",JSON.stringify(userData));

//         setUser(userData);
        

//         toast.success("Login Successful!");

//         // Check user role and redirect accordingly
//         let redirectTo = "/";
//         if (userData.role === "Admin" || userData.role === "admin") {
//           redirectTo = "/admin/dashboard";
//         }

//         return {
//           success: true,
//           user: userData,
//           redirectTo
//         };
//       } else {
//         setLoginError("Invalid response from server");
//         toast.error("Login failed. Please try again.");
//         return { success: false };
//       }
//     } catch (error) {
//       console.error("Login Error:", error);

//       if (error.response) {
//         const errormessage = error.response.data?.message ||
//           error.response.data?.title ||
//           "Login failed. Please try again.";
//         setLoginError(errormessage);
//         toast.error(errormessage);
//       } else if (error.request) {
//         setLoginError("Cannot connect to server. Please check your connection.");
//         toast.error("Cannot connect to server");
//       } else {
//         setLoginError("Something went wrong");
//         toast.error("Something went wrong");
//       }

//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // REGISTER function
//   const registerUser = async (userData) => {
//     setLoading(true);
//     try {
//       const response = await api.post("/Auth/Register", userData);

//       if (response.status === 201) {
//         toast.success("Registration successful! Please login.");
//         return { success: true };
//       } else {
//         toast.error("Registration failed");
//         return { success: false };
//       }
//     } catch (error) {
//       console.error("Registration Error:", error);

//       if (error.response) {
//         const errorMessage = error.response.data?.message || "Registration failed";
//         toast.error(errorMessage);
//       } else {
//         toast.error("Cannot connect to server");
//       }

//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // LOGOUT function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     toast.info("Logged out successfully");
//   };

//   // Function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!localStorage.getItem("accessToken");
//   };

//   // Function to get auth header for API calls
//   const getAuthHeader = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.accessToken) {
//       return { Authorization: `Bearer ${user.accessToken}` };
//     }
//     return {};
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       setUser,
//       loginuser,
//       registerUser,
//       loginError,
//       logout,
//       loading,
//       isAuthenticated,
//       getAuthHeader
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../Api/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ FIX 1: Initialize user directly from localStorage so it doesn't start as null on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // ✅ FIX 2: Check if user exists. This is now a BOOLEAN, not a function.
  const isAuthenticated = !!user; 

  const loginuser = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/Auth/Login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data && response.data.data) {
        const userData = { ...response.data.data, email: email };

        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        toast.success("Login Successful!");

        let redirectTo = "/";
        if (userData.role?.toLowerCase() === "admin") {
          redirectTo = "/admin/dashboard";
        }

        return { success: true, user: userData, redirectTo };
      } else {
        toast.error("Login failed.");
        return { success: false };
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); 
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginuser,
        logout,
        loading,
        isAuthenticated, // This is now a true/false value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};