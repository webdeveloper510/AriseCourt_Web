// src/utils/RouteGuards.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('user_access_valid_token');
  return token ? children : <Navigate to="/login" replace />;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('user_access_valid_token');
  return token ? <Navigate to="/reporting" replace /> : children;
};
