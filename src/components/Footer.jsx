import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 relative pt-16 pb-8">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400">
            Cuiluxe
          </Link>
          <p className="text-sm text-gray-400">
            Elevating your culinary experience with premium products crafted for style, performance, and elegance. Discover the perfect balance of luxury and functionality.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 transition-colors duration-300">About</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-orange-400 transition-colors duration-300">Products</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400 transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/privacy" className="hover:text-orange-400 transition-colors duration-300">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-400 transition-colors duration-300">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-orange-400 transition-colors duration-300">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12"></div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Cuiluxe. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed with ❤️ for a premium experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
