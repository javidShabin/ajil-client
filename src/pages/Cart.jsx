import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axiosInstance.get("/cart/get-cart");
        const items = response.data.cart.items || [];
        setCartItems(items);

        const total = items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, []);

  // Increase quantity
  const handleIncrease = async (productId) => {
    try {
      const response = await axiosInstance.put("/cart/update-cart", {
        productId: productId,
        action: "increase",
      });
      const items = response.data.cart.items || [];
      setCartItems(items);

      // Recalculate total after update
      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  // Decrease quantity
  const handleDecrease = async (productId) => {
    try {
      const response = await axiosInstance.put("/cart/update-cart", {
        productId: productId,
        action: "decrease",
      });
      const items = response.data.cart.items || [];
      setCartItems(items);

      // Recalculate total after update
      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axiosInstance.delete("/cart/remove-item", {
        data: { productId },
      });
      toast.success(response.data.message);

      // Update UI with new cart
      const items = response.data.cart.items || [];
      setCartItems(items);

      // Recalculate total
      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-1xl font-semibold text-gray-900 mb-8 text-center">
        Your Cart
      </h2>

      {/* Client Name Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Enter your name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
        />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-base">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.productId}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 ml-4">
                  <h3 className="text-md font-medium text-gray-900">
                    {item.itemName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleDecrease(
                        item.productId._id ? item.productId._id : item.productId
                      )
                    }
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrease(
                        item.productId._id ? item.productId._id : item.productId
                      )
                    }
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    handleRemove(
                      item.productId._id ? item.productId._id : item.productId
                    )
                  }
                  className="ml-4 p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg">
            <span className="text-lg font-semibold text-gray-900">
              Total: ${totalPrice.toFixed(2)}
            </span>
            <button className="mt-4 sm:mt-0 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
