import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`/product/delete-product/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    }
  };

  const handleEdit = (id) => {
    console.log("Edit product", id);
  };

  const handleAddMenu = () => {
    console.log("Add new product");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Product Management
        </h2>
        <button
          onClick={handleAddMenu}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium"
        >
          <FaPlus className="text-white" /> Add Product
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg font-medium animate-pulse">
          Loading products...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-4 flex flex-col justify-between border border-gray-100 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.itemName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {product.itemName}
                </h3>

                <p className="text-xs text-gray-500 truncate">
                  Category:{" "}
                  <span className="text-gray-700 font-medium">
                    {product.category}
                  </span>
                </p>

                <p className="text-xs text-gray-500 truncate">
                  Type:{" "}
                  <span className="text-gray-700 font-medium">
                    {product.types}
                  </span>
                </p>

                <p className="text-xs text-gray-500 truncate">
                  SKU:{" "}
                  <span className="text-gray-700 font-medium">{product.sku}</span>
                </p>

                <p className="text-orange-600 font-semibold text-sm mt-1">
                  ${product.price}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1.5 rounded-lg hover:shadow-md transition-all duration-300 text-xs font-medium"
                >
                  <FaEdit size={12} /> Edit
                </button>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1.5 rounded-lg hover:shadow-md transition-all duration-300 ml-2 text-xs font-medium"
                >
                  <FaTrash size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
