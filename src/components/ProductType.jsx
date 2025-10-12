import React from "react";
import premium from "../public/images/permium.jpeg";
import normal from "../public/images/normal.jpeg";
import { Link } from "react-router-dom";

const ProductTypes = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Section Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
        Select Your Choice
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Premium Product Card */}

        <div
          className="relative rounded-3xl overflow-hidden h-72 shadow-xl group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
          style={{
            backgroundImage: `url(${premium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>

          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            <h3 className="text-2xl font-semibold mb-2">Premium Products</h3>
            <p className="text-sm sm:text-base mb-4">
              Experience luxury with our top-tier, high-quality products crafted
              for perfection.
            </p>
            <Link to={"/premium-product"}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-2xl text-sm font-medium w-max transition-all duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        {/* Normal Product Card */}
        <div
          className="relative rounded-3xl overflow-hidden h-72 shadow-xl group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
          style={{
            backgroundImage: `url(${normal})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>

          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            <h3 className="text-2xl font-semibold mb-2">Normal Products</h3>
            <p className="text-sm sm:text-base mb-4">
              High-quality, reliable products for everyday use at an affordable
              price.
            </p>
            <Link to={"/normal-product"}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-2xl text-sm font-medium w-max transition-all duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Longer Paragraph at the bottom */}
      <p className="text-center text-gray-700 text-sm sm:text-base mt-12 max-w-3xl mx-auto leading-relaxed">
        Explore our carefully curated product types designed to meet every need
        and preference. Whether you are looking for luxurious premium items that
        elevate your lifestyle or dependable normal products that offer
        exceptional value, our collection provides the perfect solution. Each
        product is crafted with attention to detail, quality materials, and a
        focus on your satisfaction, ensuring that every purchase is an
        investment in both style and functionality.
      </p>
    </div>
  );
};

export default ProductTypes;
