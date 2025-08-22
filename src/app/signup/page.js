"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side (branding / purple bg) */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-purple-600 to-purple-800 text-white items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          Welcome Back 👋
        </motion.h1>
      </div>

      {/* Right Side (auth card) */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white"
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <AnimatePresence mode="wait">
            {isSignup ? (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                  Sign Up
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signin"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                  Sign In
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
          <button className="flex items-center justify-center w-full p-3 border rounded-lg hover:bg-gray-100 transition-all duration-300">
            <FaGoogle className="mr-2 text-red-500" /> Sign in with Google
          </button>
          <button className="flex items-center justify-center w-full p-3 border rounded-lg hover:bg-gray-100 transition-all duration-300">
            <FaApple className="mr-2 text-black" /> Sign in with Apple
          </button>
          <button className="flex items-center justify-center w-full p-3 border rounded-lg hover:bg-gray-100 transition-all duration-300">
            <FaFacebook className="mr-2 text-blue-600" /> Sign in with Facebook
          </button>
        </div>

          {/* Toggle between signup & signin */}
          <p className="mt-6 text-center text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-purple-600 font-medium hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-purple-600 font-medium hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
