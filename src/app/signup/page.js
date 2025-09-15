"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const router = useRouter();

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to waitlist page after form submission
    router.push('/waitlist');
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)] relative">
      {/* Left Side branding */}
      <div className="hidden md:flex flex-1 items-center justify-center relative">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-extrabold tracking-tight text-black text-center">
            DewBloom
          </h1>
          <p className="mt-3 text-gray-600 text-center max-w-sm">
            Learn DBT with Happy through playful lessons and supportive chats.
          </p>
        </motion.div>
      </div>

      {/* Right Side (auth card) */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 rounded-2xl card-surface"
        >
          <h2 className="text-3xl font-extrabold text-black mb-6 text-center">
            {isSignup ? "Join the Waitlist" : "Welcome Back"}
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
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full btn-primary py-3 rounded-lg transition">
                  Join Waitlist
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
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full btn-primary py-3 rounded-lg transition">
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
            <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-50 transition-all duration-300">
              <FaGoogle className="mr-2 text-red-500" /> Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-50 transition-all duration-300">
              <FaApple className="mr-2 text-black" /> Sign in with Apple
            </button>
            <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-50 transition-all duration-300">
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
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-purple-600 font-medium hover:underline"
                >
                  Join Waitlist
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
