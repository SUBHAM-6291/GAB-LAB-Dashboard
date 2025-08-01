// app/components/Login.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  // Redirect to dashboard on button click
  const handleRedirect = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-gray-950 rounded-xl p-10 w-full max-w-lg shadow-lg transition-all duration-500 hover:shadow-xl">
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo.avif"
            alt=""
            width={100}
            height={100}
            className="object-contain"
          />

        </div>

        <div className="flex justify-center gap-2 mb-8 bg-gray-900 rounded-full p-1">
          <button
            className={`flex-1 py-2 px-6 text-sm font-semibold rounded-full transition-all duration-300 ${
              !isSignUp ? 'bg-yellow-300 text-gray-950' : 'bg-transparent text-gray-300'
            } hover:bg-yellow-400 hover:text-gray-950`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 px-6 text-sm font-semibold rounded-full transition-all duration-300 ${
              isSignUp ? 'bg-yellow-300 text-gray-950' : 'bg-transparent text-gray-300'
            } hover:bg-yellow-400 hover:text-gray-950`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {isSignUp ? (
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-white text-center">Create Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300/50 transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300/50 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300/50 transition-all"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300/50 transition-all"
            />
            <button
              onClick={handleRedirect}
              className="w-full p-3 bg-yellow-300 text-gray-950 font-semibold rounded-lg hover:bg-yellow-400 active:scale-95 transition-all"
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-white text-center">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300/50 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300/50 transition-all"
            />
            <div className="text-right">
              <a href="#" className="text-yellow-300 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              onClick={handleRedirect}
              className="w-full p-3 bg-yellow-300 text-gray-950 font-semibold rounded-lg hover:bg-yellow-400 active:scale-95 transition-all"
            >
              Sign In
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Or continue with</p>
          <div className="flex gap-3 justify-center">
            <button className="flex-1 p-3 bg-gray-900 border border-gray-800 text-white rounded-lg hover:bg-gray-800 transition-all">
              Google
            </button>
            <button className="flex-1 p-3 bg-gray-900 border border-gray-800 text-white rounded-lg hover:bg-gray-800 transition-all">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;