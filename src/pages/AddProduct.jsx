import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null); // ✅ store selected file
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Product image is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("sku", data.sku);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("types", data.types);
      formData.append("image", file); // ✅ file from state

      const response = await axiosInstance.post(
        "/product/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data?.message || "Product added successfully");
      reset();
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New <span className="text-orange-500">Product</span>
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              {...register("sku", { required: "SKU is required" })}
              className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter SKU code"
            />
            {errors.sku && (
              <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="e.g. Electronics, Fashion"
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Types */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Type
            </label>
            <select
              {...register("types", { required: "Type is required" })}
              className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="cookware">Cookwares</option> {/* ✅ fixed typo */}
              <option value="dining">Dining</option>
            </select>
            {errors.types && (
              <p className="text-red-500 text-xs mt-1">{errors.types.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/60 hover:bg-white/80 transition-all duration-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={(e) => {
                  setFile(e.target.files[0]); // ✅ store file in state
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center text-gray-600 cursor-pointer"
              >
                <FaCloudUploadAlt size={40} className="text-orange-500 mb-2" />
                <span className="font-semibold text-sm">
                  Click to upload or drag file
                </span>
              </label>
            </div>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl shadow-md border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-orange-400/30 transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default AddProduct;
