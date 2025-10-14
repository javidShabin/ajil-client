import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { X } from "lucide-react"; // for close button
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // <-- for fullscreen image

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/product/get-all-products");
      setProducts(res.data);
      const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      setSelectedCategory(category);
      setLoading(true);
      const res = await axiosInstance.get(
        `/product/filter-product?category=${encodeURIComponent(category)}`
      );
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const addToCart = async (productId, image, itemName, price) => {
    const item = { productId, image, itemName, price, quantity: 1 };
    try {
      const response = await axiosInstance.post("/cart/add-to-cart", {
        items: [item],
      });
      if (response.data) toast.success("Item added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
        Our Collection
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        <button
          onClick={() => fetchProducts()}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            selectedCategory === ""
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => fetchProductsByCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <motion.div
            key={product._id || product.sku}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 18px 30px rgba(0,0,0,0.12)",
            }}
            className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col transition-transform duration-300 cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative group perspective">
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full h-40 sm:h-44 md:h-46 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                onClick={() => setSelectedImage(product.image)} // <-- open fullscreen
              />
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  <span className="font-medium">Code:</span> {product.sku}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">
                    &#8377;{product.price}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                      product.types === "premium"
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {product.types.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex justify-end mt-3">
                <motion.button
                  onClick={() =>
                    addToCart(
                      product._id,
                      product.image,
                      product.title,
                      product.price
                    )
                  }
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-1.5 px-3 cursor-pointer rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all text-xs sm:text-sm flex items-center gap-1.5"
                >
                  <FaShoppingBag /> Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-2 hover:bg-black transition"
          >
            <X size={24} />
          </button>
          <motion.img
            src={selectedImage}
            alt="Fullscreen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
};

export default ProductSection;
