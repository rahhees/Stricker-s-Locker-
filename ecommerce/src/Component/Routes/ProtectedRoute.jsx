// src/Context/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import  {AuthContext}  from "../../Context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  // If the user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Else render the protected page
  return <Outlet />;
};

export default ProtectedRoute;
