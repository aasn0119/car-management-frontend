import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication status from Redux
  const loading = useSelector((state) => state.auth.loading); // Get loading state from Redux
  const location = useLocation(); // Get the current location (used for redirecting after login)

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner while checking authentication
  }

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login page and save the location
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  // If user is authenticated, render children or the Outlet for nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
