import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axiosInstance.get("/product/get-all-products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products");
        setLoading(false);
      }
    };
    getApi();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
        Our Premium Collection
      </h2>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <motion.div
            key={product._id || product.sku}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.12)" }}
            className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative group">
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                  <span className="font-medium">Category:</span> {product.category}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  <span className="font-medium">Code:</span> {product.sku}
                </p>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">${product.price}</p>
              </div>

              {/* Add to Cart Button bottom-right */}
              <div className="flex justify-end mt-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="bg-orange-500 text-white py-1 px-3 rounded-md shadow hover:bg-orange-600 transition text-xs sm:text-sm flex items-center gap-1"
                >
                  <FaShoppingBag className="inline" /> Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
