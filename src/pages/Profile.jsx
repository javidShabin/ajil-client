import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../config/axiosInstance";
import { Mail, Phone, User, Calendar, Shield } from "lucide-react";

export const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const response = await axiosInstance.get("/profile/user-profile");
        setProfile(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileDetails();
  }, []);

  if (!profile) {
    return (
      <section className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-4xl">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-neutral-200 animate-pulse" />
                <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-200 rounded animate-pulse" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <div className="h-12 bg-neutral-200 rounded animate-pulse" />
                <div className="h-12 bg-neutral-200 rounded animate-pulse" />
                <div className="h-12 bg-neutral-200 rounded animate-pulse" />
                <div className="h-12 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-4xl"
      >
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "U")}\u0026background=0f172a\u0026color=fff`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-1 ring-neutral-200"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "U")}\u0026background=0f172a\u0026color=fff`;
                  }}
                />
                <h2 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900 capitalize">
                  {profile.name}
                </h2>
                <span className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="capitalize">{profile.role}</span>
                </span>
                <p className="mt-1 text-neutral-500 text-sm">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="mt-6 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-neutral-800 transition"
                >
                  Edit Profile
                </motion.button>
                <button className="w-full px-4 py-2.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 font-medium hover:bg-neutral-50 transition">
                  Update password
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2">
              <div className="rounded-xl border border-neutral-200 overflow-hidden">
                <dl className="divide-y divide-neutral-200">
                  <div className="grid grid-cols-[160px,1fr] items-center p-4">
                    <dt className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Email</dt>
                    <dd className="flex items-center gap-2 text-neutral-900 truncate">
                      <Mail className="w-4 h-4 text-neutral-500" />
                      <span className="truncate">{profile.email}</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[160px,1fr] items-center p-4">
                    <dt className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Phone</dt>
                    <dd className="flex items-center gap-2 text-neutral-900 truncate">
                      <Phone className="w-4 h-4 text-neutral-500" />
                      <span className="truncate">{profile.phone || "Not provided"}</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[160px,1fr] items-center p-4">
                    <dt className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Username</dt>
                    <dd className="flex items-center gap-2 text-neutral-900 truncate capitalize">
                      <User className="w-4 h-4 text-neutral-500" />
                      <span className="truncate">{profile.name}</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[160px,1fr] items-center p-4">
                    <dt className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Joined</dt>
                    <dd className="flex items-center gap-2 text-neutral-900 truncate">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span className="truncate">{new Date(profile.createdAt).toLocaleString()}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
