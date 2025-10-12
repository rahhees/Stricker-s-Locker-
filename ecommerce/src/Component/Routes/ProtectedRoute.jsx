import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useContext(AuthContext); // assume you track loading state
  const location = useLocation();

  const role = user?.role || localStorage.getItem("role");

  console.log("ProtectedRoute Debug:");
  console.log("Current path:", location.pathname);
  console.log("User from context:", user);
  console.log("Role:", role);
  console.log("Allowed roles prop:", roles);

  // If user data is still loading, show fallback (e.g., Home)
  if (loading) {
    return <div>Loading...</div>; // or <Home /> component
  }

  // User is not logged in
  if (!user) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace state={{ from: location }} />;
    } else {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }

  // User is logged in but roles are restricted
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // User is allowed
  return <Outlet />;
};

export default ProtectedRoute;
