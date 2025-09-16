import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loginError, setLoginError] = useState("");
  

  // LOGIN function
  
  const loginuser = async (loginEmail, loginPassword) => {
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in both fields ");
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
        setLoginError("Invalid credentials ");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong ");
      return { success: false };
    }
  };


  // login admin
  const loginAdmin = (adminData) =>{
    setUser(adminData);
    localStorage.setitem("User",JSON.stringify(adminData))
  }

  //  LOGOUT function

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logout Successfully...")
    
  };

  return (
    <AuthContext.Provider value={{ user,setUser, loginuser, loginError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
