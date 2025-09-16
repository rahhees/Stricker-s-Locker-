// src/Component/Routes/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = ({ roles }) => {


  const { user } = useContext(AuthContext);
  const location = useLocation();
  const role=localStorage.getItem("role")

  console.log("ProtectedRoute Debug:");
  console.log("Current path:", location.pathname);
  console.log("User from context:", user);
  console.log("Role from localStorage:", role);
  console.log("Allowed roles prop:", roles);


  // Not logged in
  if (!user) {
    if (location.pathname.startsWith("/admin")) {
      console.log("redirecting to admin login");
      
      return <Navigate to="/admin/login" replace />;
    }
    console.log("redirecting to login");
    
    // return <Navigate to="/login" replace />;
  }
  
  // if (roles && !user.role) {
  //   console.log("User has no role, redirecting to home.");
  //   return <Navigate to="/" replace />;
  // }

  // if (roles && !roles.includes(user.role)) {
  //   console.log("Redirecting → / (role mismatch)");
  //   return <Navigate to="/" replace />; // redirect to home if role mismatch
  // }




  
  // Allowed
  return <Outlet />;
};

export default ProtectedRoute;
