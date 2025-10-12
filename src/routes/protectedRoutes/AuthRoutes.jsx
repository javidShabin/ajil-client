import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { DataContext } from "../../hook/AuthHook"; // adjust the path if needed

const AuthRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(DataContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, show protected content
  return isAuthenticated ? <Outlet /> : null;
};

export default AuthRoutes;
