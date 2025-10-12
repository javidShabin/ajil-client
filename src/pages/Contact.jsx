import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Have questions, feedback, or want to collaborate? Fill out the form below or reach us through the contact information provided.
        </p>
      </div>

      {/* Contact Form & Info */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="bg-gray-50 p-10 rounded-3xl shadow-lg space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-300 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-300 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-300 text-gray-900"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-orange-500 text-xl mt-1" />
            <div>
              <h4 className="text-gray-900 font-semibold mb-1">Phone</h4>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-orange-500 text-xl mt-1" />
            <div>
              <h4 className="text-gray-900 font-semibold mb-1">Email</h4>
              <p className="text-gray-600">contact@cuiluxe.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-orange-500 text-xl mt-1" />
            <div>
              <h4 className="text-gray-900 font-semibold mb-1">Address</h4>
              <p className="text-gray-600">123 Luxury Street, Gourmet City, USA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Bottom Note */}
      <p className="text-center text-gray-500 text-sm mt-16 max-w-3xl mx-auto leading-relaxed">
        We value every message and will respond promptly. Your satisfaction and experience with Cuiluxe is our top priority.
      </p>
    </section>
  );
};

export default Contact;
