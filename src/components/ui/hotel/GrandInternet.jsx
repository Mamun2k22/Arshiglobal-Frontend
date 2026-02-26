import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCrown } from 'react-icons/fa';

export default function GrandInternet() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Grand Internet Title */}
          <div className="inline-block mb-6">
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em]">EXCLUSIVE</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            GRAND INTERNET
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-16 h-0.5 bg-amber-400" />
            <FaCrown className="text-amber-400 text-2xl" />
            <div className="w-16 h-0.5 bg-amber-400" />
          </div>

          {/* Main Text */}
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            GET TREATED ROYALLY —
          </h3>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We provide the best custom packages & help you travel with your friends at best rates. 
            Have a word with us.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-4 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold rounded-full transition-colors duration-300 shadow-xl"
          >
            TALK TO US TODAY
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}