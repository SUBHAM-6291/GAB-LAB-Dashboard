'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaKey, FaUser, FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/dashboard'); // Fake redirect after login/signup
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Yellow Glow Backgrounds */}
      <div className="absolute top-[-15%] left-[-15%] w-[300px] h-[300px] bg-yellow-500 opacity-20 rounded-full blur-[140px] z-0" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[300px] h-[300px] bg-yellow-300 opacity-10 rounded-full blur-[120px] z-0" />

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col md:flex-row bg-white/5 backdrop-blur-md border border-yellow-400/20 rounded-[30px] shadow-[0_8px_40px_rgba(255,255,255,0.05)] overflow-hidden w-full max-w-4xl"
      >
        {/* Left Image Panel */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full md:w-1/2 h-[280px] md:h-auto relative"
        >
          <Image
            src="/cooking.png"
            alt="Cooking Theme"
            fill
            className="object-cover hover:scale-105 hover:rotate-1 transition-all duration-500"
          />
        </motion.div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 text-white relative z-10">
          <motion.h2
            key={isSignUp ? 'SignUp' : 'Login'}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-yellow-400 text-center mb-6"
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignUp ? 'signup-form' : 'login-form'}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {isSignUp && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-yellow-400 py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-yellow-200 transition"
                  />
                  <FaUser className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-300" />
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-yellow-400 py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-yellow-200 transition"
                />
                <FaEnvelope className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-300" />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent border-b border-yellow-400 py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-yellow-200 transition"
                />
                <FaKey className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-300" />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-black font-bold text-lg shadow-lg transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Social Buttons */}
          <div className="mt-6 flex items-center gap-3 justify-center">
            <button className="bg-yellow-400/10 hover:bg-yellow-400/20 p-3 rounded-full text-yellow-200 cursor-pointer transition">
              <FaFacebookF />
            </button>
            <button className="bg-yellow-400/10 hover:bg-yellow-400/20 p-3  rounded-full cursor-pointer transition">
              <FcGoogle className="text-white" size={20} />
            </button>
            <button className="bg-yellow-400/10 hover:bg-yellow-400/20 p-3 rounded-full cursor-pointer text-yellow-200 transition">
              <FaApple />
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-6 text-center text-yellow-200 text-sm space-y-2">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="underline hover:text-yellow-100"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <>
                <p>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="underline cursor-pointer hover:text-yellow-100"
                  >
                    Sign Up
                  </button>
                </p>
                <p>
                  <a href="#" className="underline cursor-pointer hover:text-yellow-100">
                    Forgot Password?
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
