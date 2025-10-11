import React from "react";
import { motion } from "framer-motion";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center font-cooper text-white overflow-hidden">
      {/* Background Image with subtle blur */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Kitchenware"
          className="w-full h-full object-cover scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Frosted Glass Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center ">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl lg:text-[65px] font-extrabold leading-tight"
        >
          Elevate Your Cooking  
          <span className="block text-white/90 mt-2">With Premium Tools</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl"
        >
          Luxura Kitchenware combines elegance, precision, and lasting performance.  
          Experience the art of cooking with tools designed for masters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-5 justify-center"
        >
          <button className="flex items-center gap-2 bg-white text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            <FaShoppingBag /> Shop Now
          </button>
          <button className="flex items-center gap-2 border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition duration-300">
            Learn More <FaArrowRight />
          </button>
        </motion.div>
      </div>

      {/* Glow Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
