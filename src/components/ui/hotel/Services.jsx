import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaCar, FaSuitcase } from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: 'FLIGHT TICKETS',
    description: 'Dummy text ever since the very 1500s, when an unknown printer took.',
    icon: FaPlane,
    image: 'https://dtora.wpengine.com/wp-content/uploads/2019/03/cab.png'
  },
  {
    id: 2,
    title: 'HOTEL RESERVATION',
    description: 'A galley of type and scrambled it to make a type specimen book.',
    icon: FaHotel,
    image: 'https://dtora.wpengine.com/wp-content/uploads/2019/03/building.png'
  },
  {
    id: 3,
    title: 'FLIGHT TICKETS',
    description: 'Dummy text ever since the very 1500s, when an unknown printer took.',
    icon: FaCar,
    image: 'https://dtora.wpengine.com/wp-content/uploads/2019/03/bag.png'
  },
  {
    id: 4,
    title: 'FLIGHT TICKETS',
    description: 'A galley of type and scrambled it to make a type specimen book.',
    icon: FaSuitcase,
    image: 'https://dtora.wpengine.com/wp-content/uploads/2019/03/cab.png'
  }
];

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            OUR SERVICES
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start group"
            >
              {/* Icon/Image */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Decorative Dot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Read More Link */}
                <button className="mt-4 text-amber-500 font-semibold text-sm hover:text-amber-600 transition-colors inline-flex items-center gap-2 group">
                  Learn More
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}