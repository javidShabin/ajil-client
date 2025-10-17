import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCrown } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white text-gray-900 overflow-hidden mt-13">
      {/* Hero / About Us Section */}
      <section className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-2">
            <FaCrown className="text-yellow-500" /> About Us
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
          At Cuiluxe, we believe every kitchen deserves a touch of perfection. We offer a complete range of kitchen essentials, dining, and serveware designed to bring beauty, comfort, and convenience into your home. Our team personally connects with each customer, helping them choose the right products, delivering everything directly, and arranging it to perfection — so your kitchen is not just functional, but truly complete.
          From elegant dinnerware to everyday kitchen tools, Cuiluxe combines quality, style, and service to create the ultimate kitchen experience — because your kitchen deserves luxury, simplified.
          </p>
         
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1716112776995-cf224aa387b5?auto=format&fit=crop&q=70&w=1000"
              alt="Premium Cookware"
              className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 shadow">
              <FaLeaf className="text-green-600 text-xl" />
              <span className="text-gray-700 text-sm font-medium">
                Sustainable & Elegant
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: FaCrown, title: "Premium Quality", desc: "Crafted from the finest materials for lasting elegance." },
          { icon: FaLeaf, title: "Sustainable", desc: "Eco-conscious production and ethical sourcing." },
          { icon: FaCrown, title: "Innovative Design", desc: "Modern tools that elevate your kitchen experience." },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <item.icon className="mx-auto text-yellow-500 text-2xl mb-3" />
            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default About;
