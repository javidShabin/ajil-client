import React, { useState, useRef, useEffect, useContext } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { DataContext } from "../hook/AuthHook";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(DataContext);

  // Close popup if clicking outside
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
    } catch (error) {
      console.log(error);
      toast.error("Logout error")
    }
  };

  return (
    <header
      className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[88%] max-w-6xl
      bg-gradient-to-r from-white/15 via-white/10 to-white/15 
      backdrop-blur-2xl border border-white/30 
      shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
      rounded-3xl px-4 sm:px-8 py-3 
      flex items-center justify-between 
      z-50 transition-all duration-300"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white drop-shadow-lg select-none"
      >
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
          Cuiluxe
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8 text-white font-semibold text-base lg:text-lg">
        <Link
          to="/"
          className="hover:text-orange-400 text-gray-800 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="hover:text-orange-400 text-gray-800 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Products
        </Link>
        <Link
          to="/add-product"
          className="hover:text-orange-400 text-gray-800 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Add Product
        </Link>
      </nav>

      {/* Profile Button with Popup */}
      <div className="hidden md:flex items-center gap-5 relative" ref={menuRef}>
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <User size={18} /> Profile
        </button>

        {/* Popup Menu */}
        {showProfileMenu && (
          <div
            className="absolute top-14 right-0 w-48 bg-white/90 backdrop-blur-xl border border-orange-200 rounded-2xl shadow-xl
            py-2 text-gray-700 font-medium animate-fade-in z-50"
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

      {/* Mobile Menu Toggle */}
      <div
        className="md:hidden text-gray-800 cursor-pointer hover:text-orange-400 transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="absolute top-[115%] left-0 w-full bg-white/95 backdrop-blur-xl border-t border-white/30 
          py-6 flex flex-col items-center space-y-6 text-gray-900 font-semibold rounded-3xl md:hidden shadow-xl animate-slide-down"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            Products
          </Link>
          <Link
            to="/add-product"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            Add Product
          </Link>
          <button
            onClick={() => navigate("/admin/profile")}
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full font-semibold shadow-md hover:shadow-orange-500/30 transition-all flex items-center gap-2 justify-center"
          >
            <User size={16} /> Profile
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
