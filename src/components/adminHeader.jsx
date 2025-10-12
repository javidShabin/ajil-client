import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[88%] max-w-6xl
      bg-gradient-to-r from-white/15 via-white/10 to-white/15 
      backdrop-blur-2xl border border-white/30 
      shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
      rounded-3xl px-4 sm:px-8 py-3 
      flex items-center justify-between 
      z-50 transition-all duration-300">

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
      <nav className="hidden text-black md:flex items-center space-x-8 text-white font-semibold text-base lg:text-lg">
        <Link
          to="/"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Products
        </Link>
        <Link
          to="/add-product"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Add Product
        </Link>
      </nav>

      {/* Right-side Profile Button */}
      <div className="hidden md:flex items-center gap-5">
        <Link
          to="/admin/profile"
          className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <User size={18} /> Profile
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-white cursor-pointer hover:text-orange-400 transition-colors duration-200"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[115%] left-0 w-full bg-white/95 backdrop-blur-xl border-t border-white/30 
          py-6 flex flex-col items-center space-y-6 text-gray-900 font-semibold rounded-3xl md:hidden shadow-xl animate-slide-down">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-orange-500 transition-all">Home</Link>
          <Link to="/products" onClick={() => setOpen(false)} className="hover:text-orange-500 transition-all">Products</Link>
          <Link to="/add-product" onClick={() => setOpen(false)} className="hover:text-orange-500 transition-all">Add Product</Link>
          <Link to="/profile" onClick={() => setOpen(false)} className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full font-semibold shadow-md hover:shadow-orange-500/30 transition-all flex items-center gap-2 justify-center">
            <User size={16} /> Profile
          </Link>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
