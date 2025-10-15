import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaBars, FaThLarge } from "react-icons/fa";
import { X, Image as LucideImage, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

const sidebarIcon = {
  All: <FaThLarge className="inline-block mr-2" />,
  Default: <Layers className="inline-block mr-2" size={18} />,
};

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/product/get-all-products");
      setProducts(res.data);
      setTypes([...new Set(res.data.map((p) => p.types))]);
      setCategories([...new Set(res.data.map((p) => p.category))]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const fetchProductsByType = async (type) => {
    try {
      setSelectedType(type);
      setSelectedCategory("");
      setLoading(true);

      const res =
        type === ""
          ? await axiosInstance.get("/product/get-all-products")
          : await axiosInstance.get(
              `/product/filter-type?type=${encodeURIComponent(type)}`
            );

      setProducts(res.data);
      setCategories([...new Set(res.data.map((p) => p.category))]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products by type");
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      setSelectedCategory(category);
      setLoading(true);

      let url = "/product/get-all-products";
      if (selectedType && selectedType !== "") {
        url = `/product/filter-type?type=${encodeURIComponent(selectedType)}`;
      }

      const res = await axiosInstance.get(url);
      let filteredProducts = res.data;

      if (category && category !== "") {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === category
        );
      }

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const addToCart = async (productId, image, itemName, price) => {
    try {
      const response = await axiosInstance.post("/cart/add-to-cart", {
        items: [{ productId, image, itemName, price, quantity: 1 }],
      });
      if (response.data) toast.success("Item added to cart");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add item");
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
    <section className="max-w-[95%] mx-auto py-12 mt-3 flex flex-col md:flex-row gap-8">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition w-full justify-center sm:w-auto sm:justify-start"
        >
          {sidebarOpen ? <X size={20} /> : <FaBars size={20} />}
          Categories
        </button>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-full md:w-66 bg-white flex-shrink-0 flex flex-col gap-4 mb-4 md:mb-0 sticky top-28 self-start p-6 rounded-2xl shadow-xl z-[999] md:z-auto max-h-[80vh] overflow-y-auto">
          <h3 className="font-bold text-xl mb-4 text-orange-600 border-b pb-3 text-center md:text-left">
            Product Categories
          </h3>
          <button
            onClick={() => fetchProductsByCategory("")}
            className={`w-full text-left px-4 py-2 flex items-center justify-center md:justify-start rounded-lg font-medium transition group ${
              selectedCategory === ""
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg border-l-4 border-orange-700"
                : "bg-gray-50 text-gray-800 hover:bg-gray-100"
            }`}
          >
            {sidebarIcon.All}
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => fetchProductsByCategory(cat)}
              className={`w-full text-left px-4 py-2 flex items-center justify-center md:justify-start rounded-lg font-medium transition group ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg border-l-4 border-orange-700"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {sidebarIcon.Default}
              {cat}
            </button>
          ))}
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Types Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-10 mt-8">
          <button
            onClick={() => fetchProductsByType("")}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-bold transition shadow flex items-center gap-2 text-sm sm:text-base ${
              selectedType === ""
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <Layers size={17} />
            All Types
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => fetchProductsByType(type)}
              className={`px-4 sm:px-5 py-2.5 rounded-full font-bold transition shadow flex items-center gap-2 text-sm sm:text-base ${
                selectedType === type
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              <Layers size={17} />
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product._id || product.sku}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 12px 32px rgba(255,140,0,0.10)",
                borderColor: "#fb923c",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-transparent flex flex-col transition-all duration-300 cursor-pointer"
            >
              <div className="relative group overflow-hidden rounded-t-2xl">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 sm:h-52 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                  onClick={() => setSelectedImage(product.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <LucideImage size={32} className="text-white opacity-80" />
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 text-center sm:text-left">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1 text-center sm:text-left">
                    <span className="font-semibold text-gray-700">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p className="text-xs text-gray-400 mb-2 text-center sm:text-left">
                    <span className="font-medium">Code:</span> {product.sku}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-3 gap-2 sm:gap-0">
                    <span className="text-orange-600 font-bold text-lg">
                      &#8377;{product.price}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        product.types === "premium"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {product.types.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center sm:justify-end mt-5">
                  <motion.button
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.image,
                        product.title,
                        product.price
                      )
                    }
                    whileTap={{ scale: 0.96 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 sm:px-5 cursor-pointer rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all font-bold text-sm sm:text-base flex items-center gap-2"
                  >
                    <FaShoppingBag /> Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-3 hover:bg-black transition"
              >
                <X size={28} />
              </button>
              <motion.img
                src={selectedImage}
                alt="Fullscreen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductSection;
