import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loginError, setLoginError] = useState("");

  // LOGIN function
  
  const loginuser = async (loginEmail, loginPassword) => {
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in both fields ❌");
      return { success: false };
    }

    try {
      const response = await axios.get(
        `http://localhost:5008/users?email=${loginEmail.trim()}&password=${loginPassword.trim()}`
      );

      if (response.data.length > 0) {
        const loggedUser = response.data[0];
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser.id));
        setLoginError("");
        return { success: true };
      } else {
        setLoginError("Invalid credentials ❌");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong ❌");
      return { success: false };
    }
  };

  //  LOGOUT function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    
  };

  return (
    <AuthContext.Provider value={{ user, loginuser, loginError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
