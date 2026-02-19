import React from "react";
import { motion } from "framer-motion";
import { 
  FaPassport, 
  FaGlobeAmericas, 
  FaUserTie,
  FaUsers,
  FaBriefcase,
  FaUmbrellaBeach,
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaAward,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaBuilding,
  FaSuitcase
} from "react-icons/fa";
import { MdFlight, MdSchool, MdWork, MdFamilyRestroom } from "react-icons/md";
import { GiCommercialAirplane, GiPassport } from "react-icons/gi";

const services = [
    {
    title: "Europe Tour",
    desc: "We strongly support best practice sharing across immigration & visa processes with cutting-edge technology",
    Icon: MdFlight,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    lightBg: "bg-blue-50",
    badge: "Tour Package",
  },
  {
    title: "Study Visa",
    desc: "We strongly support best practice sharing across immigration & visa processes with seamless digital solutions",
    Icon: MdSchool,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    lightBg: "bg-emerald-50",
    badge: "Student Visa",
  },
  {
    title: "Work Permit",
    desc: "We strongly support best practice sharing across immigration & visa processes with experienced professionals",
    Icon: MdWork,
    gradient: "from-amber-600 via-orange-600 to-rose-600",
    lightBg: "bg-amber-50",
    badge: "Work Visa",
  },
  {
    title: "Family Sponsorship",
    desc: "We strongly support best practice sharing across immigration & visa processes with cutting-edge technology",
    Icon: MdFamilyRestroom,
    gradient: "from-pink-600 via-rose-600 to-red-600",
    lightBg: "bg-pink-50",
    badge: "Family Visa",
  },
  {
    title: "Business Visa",
    desc: "We strongly support best practice sharing across immigration & visa processes with seamless digital solutions",
    Icon: FaBriefcase,
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    lightBg: "bg-violet-50",
    badge: "Business Travel",
  },
  {
    title: "Tourist & Visitor",
    desc: "We strongly support best practice sharing across immigration & visa processes with experienced professionals",
    Icon: FaUmbrellaBeach,
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    lightBg: "bg-sky-50",
    badge: "Tourist Visa",
  },

];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  hover: {
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function ArshiToursServices() {
  const [activeCard, setActiveCard] = React.useState(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200/20 via-teal-200/20 to-cyan-200/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            animate={{
              textShadow: [
                "0 0 30px rgba(59,130,246,0.3)",
                "0 0 50px rgba(59,130,246,0.5)",
                "0 0 30px rgba(59,130,246,0.3)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Arshi Tours
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-2xl md:text-3xl font-semibold text-gray-800">
              Your Trusted Gateway to Europe
            </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Legal & Professional Guidance
          </motion.p>
        </motion.div>

        {/* Cards Grid - Now 6 services */}
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="relative group"
            >
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden backdrop-blur-sm h-full">
                
                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    scale: activeCard === index ? 1.2 : 1,
                    rotate: activeCard === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${service.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Top Glow Line */}
                <motion.div
                  animate={{
                    width: activeCard === index ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${service.gradient}`}
                />

                {/* Icon Container */}
                <div className="relative mb-8 flex justify-center">
                  <motion.div
                    animate={{
                      rotateY: activeCard === index ? 180 : 0,
                      scale: activeCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.7 }}
                    className={`relative w-28 h-28 flex items-center justify-center rounded-3xl bg-gradient-to-br ${service.gradient} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <service.Icon className="text-5xl" />
                    
                    {/* Inner Glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-3xl bg-white opacity-20 blur-md"
                    />
                  </motion.div>

                  {/* Orbiting Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-3xl border-2 border-dashed border-gray-300"
                  />
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="inline-block mb-3"
                  >
                    <span className={`px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
                      {service.badge}
                    </span>
                  </motion.div>

                  {/* Title - Large and Bold */}
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    animate={{ scale: activeCard === index ? 1.05 : 1 }}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p 
                    className="text-gray-600 leading-relaxed mb-6 px-2"
                    animate={{ y: activeCard === index ? -5 : 0 }}
                  >
                    {service.desc}
                  </motion.p>

                  {/* Visa Tag */}
                  <div className="flex justify-center mb-4">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 border border-gray-200">
                      VISA
                    </span>
                  </div>
                </div>

                {/* Bottom Glow */}
                <motion.div
                  animate={{
                    opacity: activeCard === index ? 0.6 : 0,
                    scale: activeCard === index ? 1 : 0.8,
                  }}
                  className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r ${service.gradient} rounded-full blur-2xl -z-10`}
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient} opacity-20 blur-sm`}
              />
            </motion.div>
          ))}
        </div>

        {/* Contact Information - From your image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Call/WhatsApp</p>
                <p className="text-xl font-bold">01316889944</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Location</p>
                <p className="text-xl font-bold">Uttara, Dhaka</p>
              </div>
            </div>

            {/* Trust Badge */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
            >
              <span className="font-semibold">✓ Legal & Professional</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        />
      </div>
    </section>
  );
}