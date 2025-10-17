import React, { useContext, useState } from "react";
import { Menu, X, ShoppingCart, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { DataContext } from "../hook/AuthHook";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useContext(DataContext);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[88%] max-w-6xl 
      bg-gradient-to-r from-white/15 via-white/10 to-white/15 
      backdrop-blur-2xl border border-white/30 
      shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
      rounded-3xl px-4 sm:px-8 py-3 
      flex items-center justify-between 
      z-50 transition-all duration-300">
      
      {/* Logo Section */}
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white drop-shadow-lg select-none"
      >
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
          Cuiluxe
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8 text-gray-900 font-semibold text-base lg:text-lg">
        <Link
          to="/"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          About
        </Link>
        <Link
          to="/products"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          All products
        </Link>
        <Link
          to="/contact"
          className="hover:text-orange-400 transition-all duration-200 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all"
        >
          Contact
        </Link>
      </nav>

      {/* Right Buttons */}
      <div className="hidden md:flex items-center gap-5">
        {/* Admin Button */}
        <Link
          to="/admin"
          className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <UserCog size={18} /> Admin
        </Link>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative text-black hover:text-orange-400 transition-transform hover:scale-110"
        >
          <ShoppingCart size={28} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-black cursor-pointer hover:text-orange-400 transition-colors duration-200"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[115%] left-0 w-full bg-white/95 backdrop-blur-xl border-t border-white/30 
          py-6 flex flex-col items-center space-y-6 
          text-gray-900 font-semibold rounded-3xl md:hidden shadow-xl animate-slide-down">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            About
          </Link>
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-all"
          >
            Contact
          </Link>

          {/* Admin + Cart (Mobile) */}
          <div className="flex gap-4 mt-4">
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full font-semibold shadow-md hover:shadow-orange-500/30 transition-all"
            >
              Admin
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="text-black hover:scale-110 transition-transform"
            >
              <ShoppingCart size={26} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
