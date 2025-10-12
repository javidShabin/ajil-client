import React, { createContext, useState } from "react";

export const DataContext = createContext();

const AuthHook = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default AuthHook;
