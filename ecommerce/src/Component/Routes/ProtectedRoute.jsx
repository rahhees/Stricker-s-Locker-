
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import  {AuthContext}  from "../../Context/AuthContext";  

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
