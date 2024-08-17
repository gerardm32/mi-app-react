import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  console.log('Auth State in ProtectedRoute:', authState); // verifica el estado de autenticacion

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
