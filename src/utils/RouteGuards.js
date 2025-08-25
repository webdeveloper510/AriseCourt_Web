import React from "react";
import { Navigate } from "react-router-dom";

// Superadmin private routes
export const SuperAdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("user_access_valid_token");
  const role = localStorage.getItem("role");
  return token && role === "superadmin"
    ? children
    : <Navigate to="/" replace />;
};


export const SuperAdminPublicRoute = ({ children }) => {
  const token = localStorage.getItem("user_access_valid_token");
  const role = localStorage.getItem("role");
  return token && role === "superadmin"
    ? <Navigate to="/reporting" replace />
    : children;
};

export const UserPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("user_access_valid_token");
  const role = localStorage.getItem("role");
  return token && role === "user"
    ? children
    : <Navigate to="/" replace />;
};

// User public routes
export const UserPublicRoute = ({ children }) => {
  const token = localStorage.getItem("user_access_valid_token");
  const role = localStorage.getItem("role");
  return token && role === "user"
    ? <Navigate to="/user-book-court" replace />
    : children;
};
