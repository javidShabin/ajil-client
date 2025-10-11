import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCrown } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 flex items-center gap-3">
            <FaCrown className="text-yellow-500 flex-shrink-0" />{" "}
            <span>Our Legacy of Excellence</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-gray-900">Luxura Kitchenware</span>, where timeless craftsmanship meets modern innovation. Our products blend beauty, durability, and functionality for the discerning chef.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            From precision-engineered utensils to elegant cookware, every piece elevates your cooking experience and adds sophistication to your kitchen.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative order-1 md:order-2"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
            <motion.img
              src="https://plus.unsplash.com/premium_photo-1716112776995-cf224aa387b5?auto=format&fit=crop&q=70&w=1000"
              alt="Premium Cookware"
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-64 sm:h-72 md:h-80 lg:h-96 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-3 sm:p-4 flex items-center gap-3">
              <FaLeaf className="text-green-600 text-xl sm:text-2xl flex-shrink-0" />
              <p className="text-gray-700 text-xs sm:text-sm font-medium">
                Sustainable. Ethical. Beautifully Designed.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            To inspire home chefs and culinary artists by providing premium kitchenware that combines timeless aesthetics with superior performance. Cooking is an art, and we provide tools of excellence.
          </motion.p>
        </div>
      </section>

      {/* Features / Values Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {[
            { icon: FaCrown, title: "Premium Quality", desc: "Crafted from the finest materials to ensure lasting performance and elegance." },
            { icon: FaLeaf, title: "Sustainable Design", desc: "Eco-conscious production with ethical sourcing and minimal environmental impact." },
            { icon: FaCrown, title: "Innovative Craftsmanship", desc: "Modern designs that elevate your kitchen experience and cooking rituals." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
            >
              <item.icon className="mx-auto text-yellow-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
