import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaArrowRight, 
  FaBriefcase, 
  FaGlobe, 
  FaPassport,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";
import { MdWork, MdFlight, MdSchool, MdFamilyRestroom } from "react-icons/md";

// Services Section Component
export default function HomeServices({ services }) {
  
  // Function to get icon based on service title
  const getServiceIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("work") || titleLower.includes("job") || titleLower.includes("permit")) 
      return <MdWork className="text-2xl" />;
    if (titleLower.includes("europe") || titleLower.includes("schengen")) 
      return <FaGlobe className="text-2xl" />;
    if (titleLower.includes("middle") || titleLower.includes("east")) 
      return <FaBriefcase className="text-2xl" />;
    if (titleLower.includes("study") || titleLower.includes("student")) 
      return <MdSchool className="text-2xl" />;
    if (titleLower.includes("tour") || titleLower.includes("visit")) 
      return <MdFlight className="text-2xl" />;
    if (titleLower.includes("family")) 
      return <MdFamilyRestroom className="text-2xl" />;
    return <FaPassport className="text-2xl" />;
  };

  // Function to get gradient based on index
  const getGradient = (index) => {
    const gradients = [
      "from-blue-600 to-purple-600",
      "from-emerald-600 to-teal-600",
      "from-amber-600 to-rose-600",
      "from-violet-600 to-fuchsia-600",
      "from-sky-600 to-indigo-600",
      "from-pink-600 to-red-600",
    ];
    return gradients[index % gradients.length];
  };

  // Function to get light background color
  const getLightBg = (index) => {
    const bgColors = [
      "bg-blue-50",
      "bg-emerald-50",
      "bg-amber-50",
      "bg-violet-50",
      "bg-sky-50",
      "bg-pink-50",
    ];
    return bgColors[index % bgColors.length];
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200/30 via-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-600/30">
              ✦ What We Offer ✦
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Our core services to support your visa and job process.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const gradient = getGradient(index);
            const lightBg = getLightBg(index);
            
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/70 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 border border-gray-100 h-full overflow-hidden">
                  
                  {/* Animated Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 ${lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Top Gradient Line */}
                  <motion.div
                    className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {getServiceIcon(service.title)}
                    </div>
                    
                    {/* Floating Badge for Popular Services */}
                    {index < 2 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-2 -right-2"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                            <FaStar className="text-white text-xs" />
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 bg-yellow-400 rounded-full opacity-30 blur-md"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.shortDescription || service.description || "Professional visa and job processing support with expert guidance."}
                    </p>

                    {/* Features Tags (for visual appeal) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center gap-1">
                        <FaCheckCircle className="text-[10px]" />
                        Fast Processing
                      </span>
                      <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full flex items-center gap-1">
                        <FaShieldAlt className="text-[10px]" />
                        100% Legal
                      </span>
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full flex items-center gap-1">
                        <FaClock className="text-[10px]" />
                        Quick Support
                      </span>
                    </div>

                    {/* View Details Link */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-block"
                    >
                      <Link
                        to={`/services/${service._id}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700`}
                      >
                        View details
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-2xl`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-purple-600/40 transition-all group"
          >
            <span>View All Services</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight />
            </motion.span>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: "500+", label: "Happy Clients", icon: "😊" },
            { number: "98%", label: "Success Rate", icon: "✅" },
            { number: "15+", label: "Years Experience", icon: "⭐" },
            { number: "24/7", label: "Support", icon: "🕐" },
          ].map((item, idx) => (
            <div key={idx} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xl font-bold text-gray-900">{item.number}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}