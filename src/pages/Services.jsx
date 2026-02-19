import { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaArrowRight, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaGlobe
} from "react-icons/fa";
import { MdWork, MdSchool, MdFlight, MdFamilyRestroom } from "react-icons/md";

function Badge({ children, gradient = "from-blue-600 to-purple-600" }) {
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}
    >
      {children}
    </motion.span>
  );
}

function Card({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/70 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 overflow-hidden border border-white/20"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80" />
      </motion.div>
      
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />
      
      {children}
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden shadow-xl border border-white/20">
      <div className="h-48 bg-gradient-to-r from-slate-100/80 to-slate-200/80 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-2/3 bg-gradient-to-r from-slate-100/80 to-slate-200/80 animate-pulse rounded-lg" />
        <div className="h-4 w-full bg-gradient-to-r from-slate-100/80 to-slate-200/80 animate-pulse rounded-lg" />
        <div className="h-4 w-5/6 bg-gradient-to-r from-slate-100/80 to-slate-200/80 animate-pulse rounded-lg" />
        <div className="h-10 w-28 bg-gradient-to-r from-slate-100/80 to-slate-200/80 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // loader data shape: { items, pagination }
  const loaded = useLoaderData();
  const items = loaded?.items || [];

  const [search, setSearch] = useState(params.get("search") || "");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [params]);

  const stats = useMemo(() => {
    return {
      total: loaded?.pagination?.total ?? items.length,
      showing: items.length,
    };
  }, [loaded, items]);

  const applySearch = (value) => {
    const q = new URLSearchParams();
    if (value?.trim()) q.set("search", value.trim());
    navigate({ pathname: "/services", search: q.toString() });
  };

  // Function to get icon based on service title
  const getServiceIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("work") || titleLower.includes("job")) return <MdWork className="text-3xl" />;
    if (titleLower.includes("study") || titleLower.includes("student")) return <MdSchool className="text-3xl" />;
    if (titleLower.includes("tour") || titleLower.includes("visit")) return <MdFlight className="text-3xl" />;
    if (titleLower.includes("family")) return <MdFamilyRestroom className="text-3xl" />;
    if (titleLower.includes("business")) return <FaGlobe className="text-3xl" />;
    return <FaStar className="text-3xl" />;
  };

  // Function to get gradient based on index
  const getGradient = (index) => {
    const gradients = [
      "from-blue-600 via-indigo-600 to-purple-600",
      "from-emerald-600 via-teal-600 to-cyan-600",
      "from-amber-600 via-orange-600 to-rose-600",
      "from-pink-600 via-rose-600 to-red-600",
      "from-violet-600 via-purple-600 to-fuchsia-600",
      "from-sky-600 via-blue-600 to-indigo-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Hero Section - Contact Page Style with World Map Background */}
      <section className="relative text-white overflow-hidden">
        
        {/* Background Image with Overlay - Exactly like Contact page */}
        <div className="absolute inset-0">
          <img 
            src="https://themes.adnanshoukat.com/designsbridge/visapro/images/world-globe.jpg"
            alt="World Map Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Dark overlay for better text readability - like Contact page */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
          
          {/* Animated overlay - like Contact page */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0  bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            
            {/* Breadcrumb/Badge - like Contact page's "Get in Touch" */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 text-blue-200 font-medium">
                <span className="w-8 h-0.5 bg-blue-400"></span>
                Our Premium Services
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-4"
            >
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Clear guidance, documentation, and end-to-end support
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl"
            >
              Choose a service to see details, requirements, and how we work with you step by step.
            </motion.p>

            {/* Search Section - Glass morphism style like Contact page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                  <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-purple-400' : 'text-gray-400'}`} />
                  <input
                    className="w-full rounded-xl bg-white/10 border border-white/20 pl-12 pr-4 py-4 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none"
                    placeholder="Search services (e.g. Europe Job Visa)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applySearch(search);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 font-semibold text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30"
                  onClick={() => applySearch(search)}
                >
                  Search
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl bg-white/10 px-8 py-4 font-semibold text-white hover:bg-white/20 border border-white/20"
                  onClick={() => {
                    setSearch("");
                    applySearch("");
                  }}
                >
                  Reset
                </motion.button>
              </div>

              {/* Stats with Animation */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center gap-2 text-sm text-gray-200"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Showing <span className="font-bold text-white">{stats.showing}</span> of{" "}
                <span className="font-bold text-white">{stats.total}</span> services
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade effect - like Contact page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Content Section */}
      <section className="py-16 relative">
        {/* World Map Background for Content Section */}
 

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Services Grid */}
          {Array.isArray(items) && items.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((s, index) => (
                <Card key={s._id} index={index}>
                  {/* Image Section with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    {s.image ? (
                      <>
                        <img
                          src={
                            s.image.startsWith("http")
                              ? s.image
                              : `${import.meta.env.VITE_API_URL}${s.image}`
                          }
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getGradient(index)} flex items-center justify-center`}>
                        {getServiceIcon(s.title)}
                      </div>
                    )}
                    
                    {/* Service Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge gradient={getGradient(index)}>Service</Badge>
                    </div>

                    {/* Active Status */}
                    {!s.isActive && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                          Hidden
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative z-10 bg-white/80 backdrop-blur-sm">
                    {/* Title with Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center text-white flex-shrink-0`}>
                        {getServiceIcon(s.title)}
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 line-clamp-2">
                        {s.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {s.shortDescription || s.description || "No description available"}
                    </p>

                    {/* Features Placeholder (for visual appeal) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">✓ Fast Processing</span>
                      <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">✓ Expert Guidance</span>
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full">✓ 98% Success</span>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between mt-4">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-block"
                      >
                        <Link
                          to={`/services/${s._id}`}
                          className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${getGradient(index)} px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          View Details
                          <FaArrowRight className="text-xs" />
                        </Link>
                      </motion.div>

                      {/* Quick Info */}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaClock />
                        <span>Instant</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            // No Results State with Premium Design
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-white/80 backdrop-blur-sm p-16 text-center shadow-2xl border border-gray-100"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try a different keyword or reset your search to see all available services.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl"
                onClick={() => {
                  setSearch("");
                  applySearch("");
                }}
              >
                Reset search
              </motion.button>
            </motion.div>
          )}

          {/* Help CTA with Premium Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30" />
            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 text-white overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold mb-2">Not sure which service you need?</h4>
                  <p className="text-gray-300 text-lg">
                    Contact us and we'll guide you based on your profile and requirements.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                  >
                    <FaPhone />
                    Contact us
                  </Link>
                  
                  <div className="flex items-center gap-3 px-6 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <FaMapMarkerAlt className="text-purple-400" />
                    <span>Uttara, Dhaka</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}