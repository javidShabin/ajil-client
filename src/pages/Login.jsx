import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        const resposne = await axiosInstance.post("/user/user-login",data )
        toast.success(resposne.data.message)
        
    } catch (error) {
        console.log(error)
        toast.error("Login failed")
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute w-80 h-80 bg-orange-200/40 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] sm:w-[400px] bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-3xl p-8 text-center relative z-10"
      >
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          Please login to your{" "}
          <span className="text-orange-500 font-semibold">Cuiluxe</span> account
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 text-left"
        >
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full bg-white text-gray-900 pl-12 pr-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-orange-200"
              } focus:ring-2 focus:ring-orange-400 outline-none placeholder-gray-400 transition-all duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className={`w-full bg-white text-gray-900 pl-12 pr-4 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-orange-200"
              } focus:ring-2 focus:ring-orange-400 outline-none placeholder-gray-400 transition-all duration-200`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-orange-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 hover:underline hover:text-orange-600 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
