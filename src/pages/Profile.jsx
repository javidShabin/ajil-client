import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera, Mail, Phone, MapPin, Shield } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Profile = () => {
  // Mock user profile data
  const mockProfile = {
    name: "Javid Shabin",
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    email: "javid@example.com",
    phone: "+91 98765 43210",
    address: "Cochin, Kerala, India",
    role: "Customer",
  };

  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: mockProfile.name,
      email: mockProfile.email,
      phone: mockProfile.phone,
      address: mockProfile.address,
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    setProfile({
      ...profile,
      ...data,
      avatar: previewImage || profile.avatar,
    });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    });
    setPreviewImage("");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500">
          Update your personal details and preferences
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-6 border border-orange-50 flex flex-col items-center"
        >
          <div className="relative w-28 h-28">
            <img
              src={previewImage || profile.avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full border border-orange-100 object-cover"
            />
            {isEditing && (
              <>
                <button
                  onClick={handleImageClick}
                  className="absolute bottom-1 right-1 p-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition-all"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </>
            )}
          </div>
          <h2 className="mt-4 text-lg font-bold text-gray-800">
            {profile.name}
          </h2>

          {/* Quick Stats */}
          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={16} /> {profile.email}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={16} /> {profile.phone}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={16} /> {profile.address}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Shield size={16} /> Verified Account
            </div>
          </div>
        </motion.div>

        {/* Editable Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow p-6 border border-orange-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Profile
            </h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                {...register("email")}
                type="email"
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                {...register("phone")}
                type="text"
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                {...register("address")}
                type="text"
                disabled={!isEditing}
                className="mt-1 w-full border border-gray-200 rounded-lg p-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {isEditing && (
              <div className="md:col-span-2 mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
