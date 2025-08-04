'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';

export default function Profile() {
  const defaultImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [image, setImage] = useState(defaultImage);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-yellow-400 px-6 py-16 lg:pl-64">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className="max-w-5xl mx-auto w-full bg-white/5 backdrop-blur-lg border border-yellow-600/40 rounded-3xl p-10 shadow-xl"
      >
        <h1 className="text-4xl font-bold mb-10 text-yellow-300 tracking-tight">
          Edit Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Profile Image Upload */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <label className="relative w-40 h-40 cursor-pointer group">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg">
                <Image
                  src={image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-black text-xs font-semibold bg-yellow-400 px-2 py-1 rounded-full shadow">
                  Change Photo
                </span>
              </div>
              <div className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full group-hover:bg-yellow-600 transition">
                <FaCamera className="text-black text-sm" />
              </div>
            </label>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-1 w-full"
          >
            <form className="grid grid-cols-1 gap-10">
              {/* Personal Info */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-yellow-300">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-xl border border-yellow-500 bg-white/10 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-xl border border-yellow-500 bg-white/10 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-yellow-500 bg-white/10 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter Your Number"
                      className="w-full px-4 py-3 rounded-xl border border-yellow-500 bg-white/10 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-yellow-300">
                  Change Password
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      className="w-full px-4 py-3 rounded-xl border border-yellow-500 bg-white/10 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter Your New Password"
                      className="w-full px-4 py-3 rounded-xl border border-yellow-500 bg-white/10 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-5 py-2 bg-yellow-500 text-black text-sm font-semibold rounded-lg hover:bg-yellow-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
