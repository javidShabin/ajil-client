import React, { useState, useRef, useEffect, useContext } from "react";
import { Menu, X, User, LogOut, Settings, Home, PackagePlus, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { DataContext } from "../hook/AuthHook";

const AdminHeader = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(DataContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/user/user-logout");
      logout();
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
    }
  };

  return (
    <>
      {/* HEADER */}
      <header
        className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[88%] max-w-6xl
        bg-gradient-to-r from-white/15 via-white/10 to-white/15 
        backdrop-blur-2xl border border-white/30 
        shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
        rounded-3xl px-6 py-3 
        flex items-center justify-between 
        z-50 transition-all duration-300"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white select-none"
        >
          <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Cuiluxe
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-white font-semibold text-base lg:text-lg">
          <Link
            to="/"
            className={`hover:text-orange-400 transition-all duration-200 ${
              location.pathname === "/" ? "text-orange-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`hover:text-orange-400 transition-all duration-200 ${
              location.pathname === "/products" ? "text-orange-400" : ""
            }`}
          >
            Products
          </Link>
          <Link
            to="/add-product"
            className={`hover:text-orange-400 transition-all duration-200 ${
              location.pathname === "/add-product" ? "text-orange-400" : ""
            }`}
          >
            Add Product
          </Link>
        </nav>

        {/* Profile (Visible Always) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <User size={18} />
            <span className="hidden sm:inline">Profile</span>
          </button>

          {/* Profile Popup */}
          {showProfileMenu && (
            <div
              className="absolute top-14 right-0 w-52 bg-white/95 backdrop-blur-xl border border-orange-200 rounded-2xl shadow-2xl py-2 text-gray-700 font-medium animate-fade-in z-50"
            >
              <Link
                to="/admin/profile"
                className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 transition-all duration-200"
                onClick={() => setShowProfileMenu(false)}
              >
                View Profile
              </Link>
              <Link
                to="/admin/settings"
                className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 transition-all duration-200"
                onClick={() => setShowProfileMenu(false)}
              >
                <div className="flex items-center gap-2">
                  <Settings size={16} /> Settings
                </div>
              </Link>
              <hr className="my-1 border-orange-100" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE PROFILE BUTTON (Top Right Floating) */}
      {/* <div
        className="fixed top-4 right-4 z-50 md:hidden"
        ref={menuRef}
      >
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="p-3 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <User size={20} />
        </button>

        {showProfileMenu && (
          <div
            className="absolute top-12 right-0 w-48 bg-white/95 backdrop-blur-xl border border-orange-200 rounded-2xl shadow-xl py-2 text-gray-700 font-medium animate-fade-in"
          >
            <Link
              to="/admin/profile"
              className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 transition-all duration-200 text-center"
              onClick={() => setShowProfileMenu(false)}
            >
              View Profile
            </Link>
            <Link
              to="/admin/settings"
              className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 transition-all duration-200 text-center"
              onClick={() => setShowProfileMenu(false)}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings size={16} /> Settings
              </div>
            </Link>
            <hr className="my-1 border-orange-100" />
            <button
              onClick={handleLogout}
              className="w-full text-center px-4 py-2 text-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div> */}

      {/* MOBILE BOTTOM NAVBAR */}
      <div
        className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-black/90 backdrop-blur-xl border border-orange-200 shadow-lg rounded-3xl px-6 py-3 flex justify-around items-center text-gray-800 font-semibold md:hidden z-40"
      >
        <Link
          to="/"
          className={`flex flex-col items-center text-sm transition-all ${
            location.pathname === "/" ? "text-orange-500" : "text-gray-600"
          }`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          to=""
          className={`flex flex-col items-center text-sm transition-all ${
            location.pathname === "/products" ? "text-orange-500" : "text-gray-600"
          }`}
        >
          <ShoppingBag size={20} />
          <span>Products</span>
        </Link>
        <Link
          to="/add-product"
          className={`flex flex-col items-center text-sm transition-all ${
            location.pathname === "/add-product" ? "text-orange-500" : "text-gray-600"
          }`}
        >
          <PackagePlus size={20} />
          <span>Add</span>
        </Link>
      </div>
    </>
  );
};

export default AdminHeader;
