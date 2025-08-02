// app/dashboard/profile/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaTrash, FaEye, FaEyeSlash, FaEdit, FaCheck, FaTimes, FaCopy } from 'react-icons/fa';
import { toast } from 'sonner';
import SideBar from '../../../_components/Side-Bar/SideBar'; // Adjust path to match your project structure

// Default profile data structure
const defaultData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  userId: '',
  avatar: '',
};

// Profile page component
export default function Profile() {
  // State for form data, editing modes, and password visibility
  const [formData, setFormData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false); // Controls general editing mode
  const [isEditingId, setIsEditingId] = useState(false); // Controls user ID editing
  const [showImagePopup, setShowImagePopup] = useState(false); // Controls image preview popup
  const [showTooltip, setShowTooltip] = useState(false); // Controls copy tooltip
  const [currentPassword, setCurrentPassword] = useState(''); // Current password input
  const [newPassword, setNewPassword] = useState(''); // New password input
  const [showCurrent, setShowCurrent] = useState(false); // Toggle current password visibility
  const [showNew, setShowNew] = useState(false); // Toggle new password visibility
  const [errors, setErrors] = useState({}); // Form validation errors
  const fileInputRef = useRef(null); // Reference to file input for avatar upload

  // Load saved profile data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('userProfileData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfileData', JSON.stringify(formData));
  }, [formData]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save profile changes and exit editing mode
  const handleSave = () => {
    setIsEditing(false);
  };

  // Cancel editing and revert to saved data
  const handleCancel = () => {
    const savedData = localStorage.getItem('userProfileData');
    setFormData(savedData ? JSON.parse(savedData) : defaultData);
    setIsEditing(false);
  };

  // Save user ID changes
  const handleUserIdSave = () => {
    setIsEditingId(false);
  };

  // Handle avatar image upload
  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, avatar: fileUrl }));
    }
  };

  // Remove avatar image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, avatar: '' }));
  };

  // Handle password change form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!currentPassword) newErrors.current = 'Current password is required';
    if (!newPassword) newErrors.new = 'New password is required';
    else if (newPassword.length < 6) newErrors.new = 'Minimum 6 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setCurrentPassword('');
      setNewPassword('');
      toast.success('Password changed successfully!');
    }
  };

  return (
    <>
      {/* Sidebar with integrated top bar */}
      <SideBar topbarText="Profile" />

      {/* Main content: Profile form and avatar */}
      <main className="flex-1 main-container">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Avatar Section */}
            <div className="space-y-4 md:ml-6">
              <div className="flex items-center gap-4">
                {/* Avatar Display */}
                <div className="relative w-[80px] h-[80px]">
                  {formData.avatar ? (
                    <Image
                      src={formData.avatar}
                      width={80}
                      height={80}
                      alt="User Avatar"
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
                      {formData.firstName.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  {/* File input for avatar upload */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                  {/* Edit avatar button */}
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white border p-1 rounded-full shadow text-gray-600"
                    aria-label="Edit profile picture"
                  >
                    <FaEdit size={12} />
                  </button>
                </div>
                {/* User Info */}
                <div>
                  <div className="font-semibold text-white">{formData.email || 'user@example.com'}</div>
                  <div className="text-sm text-gray-400">Last sign in: 4 mins ago</div>
                </div>
              </div>
              {/* Remove Avatar Button */}
              {formData.avatar && (
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  aria-label="Remove profile picture"
                >
                  <FaTrash size={12} />
                  Remove Image
                </button>
              )}
            </div>

            {/* Profile Form Section */}
            <div className="space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-white">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded bg-zinc-700 text-white disabled:bg-zinc-800 disabled:text-gray-400"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-white">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded bg-zinc-700 text-white disabled:bg-zinc-800 disabled:text-gray-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded bg-zinc-700 text-white disabled:bg-zinc-800 disabled:text-gray-400"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded bg-zinc-700 text-white disabled:bg-zinc-800 disabled:text-gray-400"
                  />
                </div>

                {/* Editing Controls */}
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      aria-label="Save profile changes"
                    >
                      <FaCheck size={12} /> Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      aria-label="Cancel editing"
                    >
                      <FaTimes size={12} /> Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    aria-label="Edit profile"
                  >
                    <FaEdit size= {12} /> Edit Profile
                  </button>
                )}

                {/* Password Change Section */}
                <div className="pt-4">
                  <label className="block text-sm font-medium text-white">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded bg-zinc-700 text-white"
                      aria-label="Current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                      aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                    >
                      {showCurrent ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                  {errors.current && <p className="text-red-500 text-sm mt-1">{errors.current}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded bg-zinc-700 text-white"
                      aria-label="New password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                      aria-label={showNew ? 'Hide new password' : 'Show new password'}
                    >
                      {showNew ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                  {errors.new && <p className="text-red-500 text-sm mt-1">{errors.new}</p>}
                </div>

                {/* Password Change Button */}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    aria-label="Change password"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(defaultData)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    aria-label="Reset form"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}