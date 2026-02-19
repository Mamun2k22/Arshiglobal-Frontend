import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaClock, 
  FaArrowRight,
  FaMoneyBillWave,
  FaBuilding,
  FaGlobeAsia,
  FaFilter,
  FaTimes
} from "react-icons/fa";
import { MdWork, MdLocationOn, MdCategory } from "react-icons/md";

export default function Jobs() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState({ search: "", country: "", category: "" });
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Count active filters for badge
  useEffect(() => {
    const count = Object.values(q).filter(val => val !== "").length;
    setActiveFilters(count);
  }, [q]);

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.search) p.set("search", q.search);
    if (q.country) p.set("country", q.country);
    if (q.category) p.set("category", q.category);
    p.set("limit", "50");
    return p.toString();
  }, [q]);

  useEffect(() => {
    api.get(`/api/jobs?${queryString}`).then(r => setItems(r.data?.items || [])).catch(()=>{});
  }, [queryString]);

  // Clear individual filter
  const clearFilter = (field) => {
    setQ(prev => ({ ...prev, [field]: "" }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setQ({ search: "", country: "", category: "" });
  };

  // Get gradient based on job index
  const getJobGradient = (index) => {
    const gradients = [
      "from-blue-600 via-indigo-600 to-purple-600",
      "from-emerald-600 via-teal-600 to-cyan-600",
      "from-amber-600 via-orange-600 to-rose-600",
      "from-violet-600 via-purple-600 to-fuchsia-600",
      "from-sky-600 via-blue-600 to-indigo-600",
      "from-rose-600 via-pink-600 to-red-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Section>
      {/* Hero Section with Background Image - ONLY THIS PART CHANGED */}
      <div className="relative text-white overflow-hidden rounded-3xl mb-12">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://careerfy.net/autojobs/wp-content/uploads/banner-twelve-1.jpg" 
            alt="Jobs banner background"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load - removes the image and shows original gradient
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-blue-900/95"></div>
        </div>

        {/* Animated Background Elements (kept for visual appeal) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              x: [0, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -45, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative px-8 py-16 md:py-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                ✦ Find Your Dream Job ✦
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Jobs
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-200 mb-8"
            >
              Search and filter jobs by country and category
            </motion.p>

            {/* Search and Filter Section - KEEPING YOUR EXISTING CODE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              {/* Filter Toggle for Mobile */}
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="md:hidden w-full flex items-center justify-between bg-white/10 rounded-xl px-4 py-3 mb-4"
              >
                <span className="flex items-center gap-2">
                  <FaFilter className="text-purple-300" />
                  <span>Filters</span>
                </span>
                <span className="relative">
                  {activeFilters > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full text-xs flex items-center justify-center">
                      {activeFilters}
                    </span>
                  )}
                  <FaArrowRight className={`transform transition-transform ${isFilterVisible ? 'rotate-90' : ''}`} />
                </span>
              </button>

              {/* Filter Inputs */}
              <div className={`grid md:grid-cols-3 gap-4 ${isFilterVisible ? 'block' : 'hidden md:grid'}`}>
                {/* Search Input */}
                <div className="relative group">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none"
                    placeholder="Search jobs..."
                    value={q.search}
                    onChange={(e) => setQ((s) => ({ ...s, search: e.target.value }))}
                  />
                  {q.search && (
                    <button
                      onClick={() => clearFilter('search')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                {/* Country Input */}
                <div className="relative group">
                  <FaGlobeAsia className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none"
                    placeholder="Country (e.g. Serbia)"
                    value={q.country}
                    onChange={(e) => setQ((s) => ({ ...s, country: e.target.value }))}
                  />
                  {q.country && (
                    <button
                      onClick={() => clearFilter('country')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                {/* Category Input */}
                <div className="relative group">
                  <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none"
                    placeholder="Category (e.g. Factory)"
                    value={q.category}
                    onChange={(e) => setQ((s) => ({ ...s, category: e.target.value }))}
                  />
                  {q.category && (
                    <button
                      onClick={() => clearFilter('category')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFilters > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex flex-wrap items-center gap-3"
                >
                  <span className="text-sm text-gray-300">Active filters:</span>
                  {Object.entries(q).map(([key, value]) => (
                    value && (
                      <span
                        key={key}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm"
                      >
                        {key}: {value}
                        <button
                          onClick={() => clearFilter(key)}
                          className="hover:text-white"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-purple-300 hover:text-purple-200 underline ml-2"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}

              {/* Results Count */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm text-gray-300 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Found <span className="font-bold text-white">{items.length}</span> jobs
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Jobs Grid Section - EVERYTHING BELOW IS EXACTLY THE SAME */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {items.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((j, index) => {
              const gradient = getJobGradient(index);
              
              return (
                <motion.div
                  key={j._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <Card>
                    <div className="relative overflow-hidden rounded-2xl bg-white">
                      
                      {/* Top Gradient Bar */}
                      <motion.div
                        className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="p-6">
                        {/* Header with Icon and Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <MdWork className="text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                              {j.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FaBuilding className="text-xs" />
                              <span>Job Opening</span>
                            </div>
                          </div>
                        </div>

                        {/* Tags/Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {j.country && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              <FaMapMarkerAlt className="text-xs" />
                              {j.country}
                            </div>
                          )}
                          {j.category && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                              <FaBriefcase className="text-xs" />
                              {j.category}
                            </div>
                          )}
                          {j.salary && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                              <FaMoneyBillWave className="text-xs" />
                              {j.salary}
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {j.description}
                        </p>

                        {/* Footer with Meta and Link */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FaClock />
                            <span>Posted recently</span>
                          </div>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="inline-block"
                          >
                            <Link
                              to={`/jobs/${j._id}`}
                              className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700`}
                            >
                              View details
                              <FaArrowRight className="text-xs" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className={`absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-r ${gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // No Results State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search criteria to find more opportunities.
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <FaFilter />
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Quick Stats Section */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: FaBriefcase, label: "Total Jobs", value: items.length },
              { icon: FaGlobeAsia, label: "Countries", value: [...new Set(items.map(j => j.country))].length },
              { icon: MdCategory, label: "Categories", value: [...new Set(items.map(j => j.category))].length },
              { icon: FaMoneyBillWave, label: "With Salary", value: items.filter(j => j.salary).length },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </Section>
  );
}