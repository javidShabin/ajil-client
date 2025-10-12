import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const AuthHook = ({ children }) => {
  // Set initial state based on localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("userEmail"));
  const [loading, setLoading] = useState(true); // loading state to prevent flash redirect

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("userEmail"));
    setLoading(false); // finished checking auth status
  }, []);

  const login = (email) => {
    localStorage.setItem("userEmail", email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
  };

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading, // pass loading to prevent redirect until ready
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default AuthHook;
