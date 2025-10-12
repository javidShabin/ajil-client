import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/product/get-all-products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const confirmDelete = (id) => setDeleteId(id);

  const handleRemove = async () => {
    try {
      await axiosInstance.delete(`/product/delete-product/${deleteId}`);
      setProducts(products.filter((p) => p._id !== deleteId));
      toast.success("Product removed successfully");
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    reset(product);
  };

  const submitEdit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title); // Make sure title is updated
      formData.append("category", data.category);
      formData.append("types", data.types);
      formData.append("sku", data.sku);
      formData.append("price", data.price);
      if (data.image?.[0]) formData.append("image", data.image[0]);

      const res = await axiosInstance.put(
        `/product/update-product/${editProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update the product in local state
      setProducts(
        products.map((p) =>
          p._id === editProduct._id ? { ...p, ...res.data } : p
        )
      );
      toast.success("Product updated successfully");
      setEditProduct(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  const handleAddMenu = () => navigate("/admin/add-product");

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 mt-24 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Product Management</h2>
        <button
          onClick={handleAddMenu}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium"
        >
          <FaPlus className="text-white" /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg font-medium animate-pulse">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-4 flex flex-col justify-between border border-gray-100 hover:-translate-y-1"
            >
              <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900 truncate">{product.title}</h3>
                <p className="text-xs text-gray-500 truncate">
                  Category: <span className="text-gray-700 font-medium">{product.category}</span>
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Type: <span className="text-gray-700 font-medium">{product.types}</span>
                </p>
                <p className="text-xs text-gray-500 truncate">
                  SKU: <span className="text-gray-700 font-medium">{product.sku}</span>
                </p>
                <p className="text-orange-600 font-semibold text-sm mt-1">${product.price}</p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1.5 rounded-lg hover:shadow-md transition-all duration-300 text-xs font-medium"
                >
                  <FaEdit size={12} /> Edit
                </button>
                <button
                  onClick={() => confirmDelete(product._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1.5 rounded-lg hover:shadow-md transition-all duration-300 ml-2 text-xs font-medium"
                >
                  <FaTrash size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-80 p-6 text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRemove}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editProduct && (
          <motion.div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-96 p-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Product</h3>
              <form onSubmit={handleSubmit(submitEdit)} className="space-y-4">
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Product Name"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  {...register("category")}
                  placeholder="Category"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  {...register("types")}
                  placeholder="Type"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  {...register("sku")}
                  placeholder="SKU"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  {...register("price")}
                  placeholder="Price"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-col items-center gap-2">
                  <label className="text-sm text-gray-600">Product Image</label>
                  <img
                    src={editProduct.imagePreview || editProduct.image || "https://via.placeholder.com/150"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl border border-gray-300"
                  />
                  <input
                    type="file"
                    {...register("image")}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEditProduct((prev) => ({
                          ...prev,
                          imagePreview: URL.createObjectURL(file),
                        }));
                      }
                    }}
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductList;
