import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = ({ roles = [], requireAuth = true, children }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log("ProtectedRoute Debug:");
  console.log("Current path:", location.pathname);
  console.log("User from context:", user);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("Allowed roles:", roles);
  console.log("Require Auth:", requireAuth);

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Store the intended destination
    const from = location.pathname + location.search;
    localStorage.setItem('redirectAfterLogin', from);
    
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If roles are specified, check if user has required role
  if (roles && roles.length > 0) {
    const userRole = user?.role?.toLowerCase() || '';
    const hasRequiredRole = roles.some(requiredRole => 
      requiredRole.toLowerCase() === userRole
    );

    console.log("User role:", userRole);
    console.log("Has required role:", hasRequiredRole);

    if (!hasRequiredRole) {
      // Redirect admin to admin dashboard, users to home
      if (userRole === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  // If using nested routes with Outlet
  if (children === undefined) {
    return <Outlet />;
  }

  // If using as wrapper around single component
  return children;
};

export default ProtectedRoute;