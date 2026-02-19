import React from "react";
import { motion } from "framer-motion";
import { 
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

const countries = [
  {
    name: "Europe",
    flag: "🇪🇺",
    flagStyle: "bg-gradient-to-b from-blue-600 to-yellow-400",
    tagline: "Gateway to 27 Countries",
    description: "Experience the rich cultural heritage, world-class education, and unlimited opportunities across the Schengen Area.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    lightBg: "bg-blue-50",
    features: ["Schengen Visa", "Work Permit", "Study Abroad", "Family Reunion"],
    popular: true,
  },
  {
    name: "Malta",
    flag: "🇲🇹",
    flagStyle: "bg-gradient-to-r from-white to-red-600",
    tagline: "Mediterranean Pearl",
    description: "Sunny islands, English-speaking nation, and fast-growing economy with excellent residency programs.",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    lightBg: "bg-amber-50",
    features: ["Permanent Residency", "Citizenship", "Business Setup", "Tax Benefits"],
    popular: true,
  },
  {
    name: "Bulgaria",
    flag: "🇧🇬",
    flagStyle: "bg-gradient-to-b from-white via-green-600 to-red-600",
    tagline: "Eastern European Gem",
    description: "Affordable living, growing IT sector, and strategic location with the fastest residency by investment.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    lightBg: "bg-emerald-50",
    features: ["Residency by Investment", "Real Estate", "Business Visa", "EU Citizenship"],
    popular: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -15,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function ChooseCountry() {
  const [activeCountry, setActiveCountry] = React.useState(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-200/30 via-orange-200/30 to-rose-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          {/* Decorative badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-600/30">
              ✦ Your Global Immigration Partner ✦
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            className="text-3xl md:text-5xl font-black mb-6"
            animate={{
              textShadow: [
                "0 0 30px rgba(37,99,235,0.2)",
                "0 0 50px rgba(37,99,235,0.4)",
                "0 0 30px rgba(37,99,235,0.2)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
              CHOOSE COUNTRY
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-700 font-light max-w-3xl mx-auto"
          >
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Countries we support for immigration
            </span>
          </motion.p>
        </motion.div>

        {/* Countries Grid - 3 Cards with Flags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 justify-center"
        >
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setActiveCountry(index)}
              onHoverEnd={() => setActiveCountry(null)}
              className="relative group"
            >
              {/* Premium Card Design */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-gray-300/30 border border-gray-100 overflow-hidden h-full">
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${country.gradient} opacity-5`} />
                </div>

                {/* Top Accent Line */}
                <motion.div
                  animate={{
                    width: activeCountry === index ? "100%" : "0%",
                    left: activeCountry === index ? "0%" : "50%",
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute top-0 left-0 h-1.5 bg-gradient-to-r ${country.gradient}`}
                />

                {/* Country Flag - Pataka Style */}
                <div className="relative mb-8 flex justify-center">
                  <motion.div
                    animate={{
                      y: activeCountry === index ? [-5, 5, -5] : 0,
                      scale: activeCountry === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Flag Container - Like in your image */}
                    <div className="relative w-40 h-40 mx-auto">
                      {/* Flag Pole */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-2 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-lg" />
                      
                      {/* Actual Flag - Waving effect */}
                      <motion.div
                        animate={{
                          skewY: activeCountry === index ? [0, -2, 2, 0] : 0,
                          rotateY: activeCountry === index ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 ${country.flagStyle}`}
                      >
                        {/* Flag Stripes/Design */}
                        {country.name === "Europe" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full relative">
                              <div className="absolute inset-0 bg-gradient-to-b from-[#003399] to-[#003399] opacity-90" />
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                                <div className="w-full h-full relative">
                                  {[...Array(12)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-1 h-3 bg-yellow-400"
                                      style={{
                                        left: '50%',
                                        top: '50%',
                                        transform: `rotate(${i * 30}deg) translateY(-8px)`,
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {country.name === "Malta" && (
                          <div className="absolute inset-0 flex">
                            <div className="w-1/2 h-full bg-white" />
                            <div className="w-1/2 h-full bg-red-600" />
                            {/* George Cross */}
                            <div className="absolute top-2 left-2 w-6 h-6 bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                              +
                            </div>
                          </div>
                        )}
                        
                        {country.name === "Bulgaria" && (
                          <div className="absolute inset-0 flex flex-col">
                            <div className="w-full h-1/3 bg-white" />
                            <div className="w-full h-1/3 bg-green-600" />
                            <div className="w-full h-1/3 bg-red-600" />
                          </div>
                        )}
                      </motion.div>

                      {/* Flag Waving Shadow */}
                      <motion.div
                        animate={{
                          x: activeCountry === index ? [5, 10, 5] : 5,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -right-4 top-2 w-4 h-32 bg-gradient-to-l from-black/20 to-transparent blur-sm"
                      />
                    </div>

                    {/* Country Name under flag - Like in image */}
                    <motion.h3 
                      className={`text-3xl font-bold mt-6 text-center bg-gradient-to-r ${country.gradient} bg-clip-text text-transparent`}
                    >
                      {country.name}
                    </motion.h3>
                    
                    {/* Popular Badge */}
                    {country.popular && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-3 -right-3"
                      >
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                            <FaStar className="text-white text-sm" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Country Details */}
                <div className="text-center relative z-10">
                  {/* Tagline - Like in image */}
                  <motion.p 
                    className="text-sm font-semibold text-gray-500 mb-4"
                    animate={{ y: activeCountry === index ? -5 : 0 }}
                  >
                    {country.tagline}
                  </motion.p>

                  {/* Description - Like in image */}
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed mb-6 px-2"
                    animate={{ y: activeCountry === index ? -5 : 0 }}
                  >
                    {country.description}
                  </motion.p>

                  {/* Features - Like demoralized in image */}
                  <div className="space-y-2 mb-6">
                    {country.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg"
                      >
                        <FaCheckCircle className={`text-xs text-transparent bg-clip-text bg-gradient-to-r ${country.gradient}`} />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${country.gradient} text-white font-semibold flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <span>Learn More</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Bottom Glow Effect */}
                <motion.div
                  animate={{
                    opacity: activeCountry === index ? 0.3 : 0,
                  }}
                  className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r ${country.gradient} rounded-full blur-3xl -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <FaPhone className="text-xl text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call/WhatsApp</p>
                  <p className="text-xl font-bold">01316889944</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt className="text-xl text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-xl font-bold">Uttara, Dhaka</p>
                </div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold"
              >
                ✦ Free Consultation ✦
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}