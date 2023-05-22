import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const protectedRoute = ({ children }) => {
  let islogged = true;
  const location = useLocation();
  if (!localStorage.getItem('token')) {
    islogged = false;
  }

  if (!islogged) {
    return <Navigate to="/doctor/login" state={{ from: location }} replace />;
  }

  return children;
};

export default protectedRoute;
