import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();

  if (!authState.token) {
    // If no token exists, redirect to the /login page
    return <Navigate to="/login" />;
  }

  // If a token exists, render the child components (the protected page)
  return children;
};

export default ProtectedRoute;