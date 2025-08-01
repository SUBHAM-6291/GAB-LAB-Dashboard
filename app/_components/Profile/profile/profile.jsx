"use client";

import Image from "next/image";
import {
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaCopy,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Topbar from "../../Utilites/Topbar";

export default function UserProfilePage() {
  const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userId: "",
    avatar: "",
  };

  const [formData, setFormData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setIsEditingId] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const fileInputRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("userProfileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userProfileData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedData = localStorage.getItem("userProfileData");
    setFormData(savedData ? JSON.parse(savedData) : defaultData);
    setIsEditing(false);
  };

  const handleUserIdSave = () => {
    setIsEditingId(false);
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, avatar: fileUrl }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!currentPassword) newErrors.current = "Current password is required";
    if (!newPassword) newErrors.new = "New password is required";
    else if (newPassword.length < 6) newErrors.new = "Minimum 6 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password changed successfully!");
    }
  };

  return (
    <>
      <Topbar />

      {/* Main content with padding to offset Topbar height */}
      <main className="pt-[64px] w-full max-w-screen-xl mx-auto translate-y-20 px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile section shifted right with ml-6 */}
          <div className="space-y-4 ml-6">
            <div className="flex items-center gap-4">
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
                    {formData.firstName.charAt(0).toUpperCase()}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-white border p-1 rounded-full shadow text-gray-600"
                >
                  <FaEdit size={12} />
                </button>
              </div>
              <div>
                <div className="font-semibold">{formData.email}</div>
                <div className="text-sm text-gray-500">Last sign in: 4 mins ago</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Current Password</label>
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(defaultData)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
