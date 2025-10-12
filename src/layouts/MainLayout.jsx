import React from "react";
import Header from "../components/Header";
import AdminHeader from "../components/adminHeader";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // Check if current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
