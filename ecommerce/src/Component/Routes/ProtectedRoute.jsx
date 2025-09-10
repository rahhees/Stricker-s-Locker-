// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check roles if roles prop is provided
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />; // redirect if user is not allowed
  }

  // User is logged in and allowed
  return <Outlet />;
};

export default ProtectedRoute;
