import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "../../hook/AuthHook";

const AuthRoutes = () => {
  const { isAuthenticated, loading } = useContext(DataContext);

  if (loading) return null; // or spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoutes;
