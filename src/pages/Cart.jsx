import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

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
        const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalPrice(total);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);

  const handleIncrease = async (productId) => {
    try {
      const response = await axiosInstance.put("/cart/update-cart", {
        productId,
        action: "increase",
      });
      const items = response.data.cart.items || [];
      setCartItems(items);
      setTotalPrice(items.reduce((acc, i) => acc + i.quantity * i.price, 0));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      const response = await axiosInstance.put("/cart/update-cart", {
        productId,
        action: "decrease",
      });
      const items = response.data.cart.items || [];
      setCartItems(items);
      setTotalPrice(items.reduce((acc, i) => acc + i.quantity * i.price, 0));
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
      const items = response.data.cart.items || [];
      setCartItems(items);
      setTotalPrice(items.reduce((acc, i) => acc + i.quantity * i.price, 0));
    } catch (error) {
      console.log(error);
    }
  };
  

const handleCheckout = () => {
  if (!clientName) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Name',
      text: 'Please enter your name before generating the invoice.',
      confirmButtonColor: '#f97316', // orange
    });
    return;
  }

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(249, 115, 22);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("LuxuryStore Invoice", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text("Your trusted premium store", pageWidth / 2, 30, { align: "center" });

  // Client info
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(14, 50, pageWidth - 28, 25, 3, 3, "F");
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(12);
  doc.text(`Client Name: ${clientName}`, 20, 60);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 68);

  // Prepare table
  const tableColumns = ["#", "Item", "Price", "Qty", "Total"];
  const tableRows = cartItems.map((item, index) => [
    index + 1,
    item.itemName,
    `$${item.price.toFixed(2)}`,
    item.quantity,
    `$${(item.price * item.quantity).toFixed(2)}`
  ]);

  doc.autoTable({
    startY: 85,
    head: [tableColumns],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [249, 115, 22],
      textColor: [255, 255, 255],
      halign: "center",
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [60, 60, 60],
      fontSize: 10,
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(249, 115, 22);
  doc.text(`Grand Total: $${totalPrice.toFixed(2)}`, 14, finalY);

  doc.save("LuxuryStore_Invoice.pdf");
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
        <p className="text-center text-gray-500 text-base">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.productId}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.itemName} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 ml-4">
                  <h3 className="text-md font-medium text-gray-900">{item.itemName}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(item.productId._id ? item.productId._id : item.productId)}
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.productId._id ? item.productId._id : item.productId)}
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.productId._id ? item.productId._id : item.productId)}
                  className="ml-4 p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg">
            <span className="text-lg font-semibold text-gray-900">
              Total: ${totalPrice.toFixed(2)}
            </span>
            <button
              onClick={handleCheckout}
              className="mt-4 sm:mt-0 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
