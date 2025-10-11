import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[88%] max-w-5xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl px-4 sm:px-8 py-2.5 flex items-center justify-between z-50 transition-all duration-300">
      {/* Logo Section */}
      <div
        className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-widest select-none drop-shadow-lg"
        style={{ letterSpacing: "0.11em" }}
      >
        <span className="text-white">Cuiluxe</span>
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex space-x-7 text-gray-500 font-semibold text-base lg:text-lg">
        <Link
          to={"/"}
          className="hover:text-orange-400 transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Home
        </Link>
        <Link
          to={"/about"}
         className="hover:text-orange-400 transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          About
        </Link>
        <Link
          to={"/products"}
          className="hover:text-orange-400 transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Products
        </Link>

        <a
          href="#contact"
          className="hover:text-teal-300 transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Contact
        </a>
      </nav>

      {/* Right Side: Cart Icon */}
      <Link to={"/cart"}>
        <div className="hidden md:flex items-center gap-4">
          <ShoppingCart
            size={28}
            className="text-gray-800 hover:text-teal-300 cursor-pointer transition-colors duration-200"
          />
        </div>
      </Link>

      {/* Mobile Menu Toggle */}
      <div
        className="md:hidden text-white cursor-pointer transition-colors duration-200 hover:text-teal-400"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[120%] left-0 w-full bg-white/90 backdrop-blur-xl border-t border-white/30 py-6 flex flex-col items-center space-y-5 text-gray-900 font-semibold rounded-b-3xl md:hidden shadow-xl animate-fade-in-down">
          <a
            href="#home"
            className="hover:text-teal-500 transition px-2 py-1 rounded-md w-full text-center"
            onClick={() => setOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-teal-500 transition px-2 py-1 rounded-md w-full text-center"
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href="#products"
            className="hover:text-teal-500 transition px-2 py-1 rounded-md w-full text-center"
            onClick={() => setOpen(false)}
          >
            Products
          </a>
          <button
            onClick={() => setOpen(false)}
            className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold px-8 py-2 rounded-full shadow-lg hover:from-teal-500 hover:to-emerald-600 transition-all duration-200 w-fit"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
