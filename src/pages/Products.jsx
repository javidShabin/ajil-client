import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaBars, FaThLarge } from "react-icons/fa";
import { X, Layers } from "lucide-react";
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
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Show sidebar by default on desktop screens and handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
        setIsMobile(false);
      } else {
        setSidebarOpen(false);
        setIsMobile(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/product/get-all-products?page=${page}&limit=${itemsPerPage}`);
      const data = res.data;
      
      setProducts(data.products);
      setTotalProducts(data.pagination.totalProducts);
      setTotalPages(data.pagination.totalPages);
      setCurrentPage(page);
      
      // For categories and types, we need to fetch all products without pagination
      const allRes = await axiosInstance.get("/product/get-all-products?page=1&limit=1000");
      const allProductsData = allRes.data.products;
      setAllProducts(allProductsData);
      setTypes([...new Set(allProductsData.map((p) => p.types))]);
      setCategories([...new Set(allProductsData.map((p) => p.category))]);
      
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

      if (type === "") {
        // Reset to show all products with pagination
        fetchProducts(1);
        return;
      }

      const res = await axiosInstance.get(
        `/product/filter-type?type=${encodeURIComponent(type)}`
      );

      const filteredProducts = res.data;
      setAllProducts(filteredProducts);
      setTotalProducts(filteredProducts.length);
      setCategories([...new Set(filteredProducts.map((p) => p.category))]);
      
      // Reset to first page and apply pagination
      const startIndex = 0;
      const endIndex = itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      setProducts(paginatedProducts);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
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

      if (category === "") {
        // Reset to show all products with pagination
        fetchProducts(1);
        return;
      }

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

      setAllProducts(filteredProducts);
      setTotalProducts(filteredProducts.length);
      
      // Reset to first page and apply pagination
      const startIndex = 0;
      const endIndex = itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      setProducts(paginatedProducts);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setLoading(false);
      
      // Close sidebar on mobile after category selection
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
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

  const openImageModal = (image, title) => {
    setSelectedImage({ image, title });
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  // Pagination functions
  const goToPage = (page) => {
    if (selectedType === "" && selectedCategory === "") {
      // Use server-side pagination for all products
      fetchProducts(page);
    } else {
      // Use client-side pagination for filtered results
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
      setProducts(paginatedProducts);
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
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
    <>
      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#000000b8] bg-opacity-90 backdrop-blur-md z-[9999] flex items-center justify-center"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage.image}
                alt=""
                className="w-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="max-w-[95%] mx-auto py-12 mt-3 flex flex-col md:flex-row gap-8">
        {/* Mobile Toggle Button */}
        <div className="md:hidden flex justify-start items-center mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition"
          >
            <FaBars size={20} />
            Categories
          </button>
        </div>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0000] bg-opacity-50 backdrop-blur-sm z-[998] md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 md:w-66 bg-white flex-shrink-0 flex flex-col gap-4 mb-4 md:mb-0 fixed md:top-28 left-0 md:left-auto md:sticky p-6 rounded-r-2xl md:rounded-2xl shadow-xl z-[999] max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-orange-600 border-b pb-3 text-center md:text-left flex-1">
                  Product Categories
                </h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>
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
            </motion.aside>
          )}
        </AnimatePresence>

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
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-transparent flex flex-col transition-all duration-300"
              >
                <div className="relative group overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-60 sm:h-64 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110 brightness-105 contrast-110 cursor-pointer"
                    onClick={() => openImageModal(product.image, product.title)}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer"
                    onClick={() => openImageModal(product.image, product.title)}
                  >
                    <FaThLarge size={32} className="text-white opacity-80" />
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 text-center sm:text-left">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1 text-center sm:text-left">
                      <span className="font-semibold text-gray-700">
                        Category:
                      </span>{" "}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-12 mb-8 gap-4 sm:gap-6">
              {/* Pagination Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg"
                  }`}
                >
                  <span className="hidden xs:inline">Previous</span>
                  <span className="xs:hidden">Prev</span>
                </button>

                {/* Page Numbers - Responsive display */}
                <div className="flex items-center gap-1">
                  {/* Show fewer page numbers on mobile */}
                  {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
                    let pageNum;
                    const maxPages = isMobile ? 3 : 5;
                    
                    if (totalPages <= maxPages) {
                      pageNum = i + 1;
                    } else if (currentPage <= Math.ceil(maxPages / 2)) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - Math.floor(maxPages / 2)) {
                      pageNum = totalPages - maxPages + 1 + i;
                    } else {
                      pageNum = currentPage - Math.floor(maxPages / 2) + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition text-sm sm:text-base min-w-[36px] sm:min-w-[40px] ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg"
                  }`}
                >
                  <span className="hidden xs:inline">Next</span>
                  <span className="xs:hidden">Next</span>
                </button>
              </div>

              {/* Page Info - Responsive text */}
              <div className="text-xs sm:text-sm text-gray-600 text-center px-4">
                <span className="hidden sm:inline">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} products
                </span>
                <span className="sm:hidden">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductSection;
