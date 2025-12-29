import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../Api/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);


  // LOGIN function
  const loginuser = async (email, password) => {
    if (!email || !password) {
      setLoginError("Please fill in both fields");
      return { success: false };
    }

    setLoading(true);
    setLoginError("");



    try {
      // FIX 1: Added await before api.post
      const response = await api.post("/Auth/Login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Login Response:", response.data); // Debug log

      if (response.data && response.data.data) {
        const userData = {
          ...response.data.data,
          email: email,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Login Successful!");

        // Check user role and redirect accordingly
        let redirectTo = "/";
        if (userData.role === "Admin" || userData.role === "admin") {
          redirectTo = "/admin/dashboard";
        }

        return {
          success: true,
          user: userData,
          redirectTo: redirectTo
        };
      } else {
        setLoginError("Invalid response from server");
        toast.error("Login failed. Please try again.");
        return { success: false };
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        const errormessage = error.response.data?.message ||
          error.response.data?.title ||
          "Login failed. Please try again.";
        setLoginError(errormessage);
        toast.error(errormessage);
      } else if (error.request) {
        setLoginError("Cannot connect to server. Please check your connection.");
        toast.error("Cannot connect to server");
      } else {
        setLoginError("Something went wrong");
        toast.error("Something went wrong");
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // REGISTER function
  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post("/Auth/Register", userData);

      if (response.status === 201) {
        toast.success("Registration successful! Please login.");
        return { success: true };
      } else {
        toast.error("Registration failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        const errorMessage = error.response.data?.message || "Registration failed";
        toast.error(errorMessage);
      } else {
        toast.error("Cannot connect to server");
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.accessToken;
  };

  // Function to get auth header for API calls
  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: `Bearer ${user.accessToken}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loginuser,
      registerUser,
      loginError,
      logout,
      loading,
      isAuthenticated,
      getAuthHeader
    }}>
      {children}
    </AuthContext.Provider>
  );
};