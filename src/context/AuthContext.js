import React, { createContext, useState, useContext } from 'react';

// crear el contexto de autenticacion
const AuthContext = createContext(); 

// provee el contexto de autenticacion
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const setAuthToken = (token) => {
    setAuthState((prevState) => ({
      ...prevState,
      token,
    }));
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;