import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaArrowRight, 
  FaGlobe, 
  FaPassport,
  FaBriefcase,
  FaWhatsapp,
  FaStar,
  FaShieldAlt,
  FaClock
} from "react-icons/fa";
import { MdWork, MdFlight, MdSchool, MdFamilyRestroom } from "react-icons/md";

const Hero = () => {
    return (
        <div>
            <section className="relative overflow-hidden  bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-emerald-500/40 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-blue-500/35 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                {/* ✅ গ্লোব ব্যাকগ্রাউন্ড */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
                    <div className="relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] animate-spin-slow">
                        <img 
                            src="https://dtora.wpengine.com/wp-content/uploads/2019/03/world-img.png"
                            alt=""
                            className="w-full h-full object-contain opacity-95"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" />
                        <div className="absolute inset-[10%] rounded-full border border-white/10" />
                    </div>
                </div>

                {/* ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট ওভারলে */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80 pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="py-16 md:py-24 lg:py-28">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                            
                            {/* Left Column - Main Content */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="order-2 lg:order-1"
                            >
                                {/* Badge - Mobile Friendly */}
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-white/10 mb-4">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium">🌍 Overseas Opportunities</span>
                                </div>

                                {/* Main Heading - Mobile Optimized */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                    Find overseas jobs with{" "}
                                    <span className="text-emerald-400">guided documentation</span>{" "}
                                    <span className="whitespace-nowrap">& processing</span>
                                </h1>

                                {/* Features Grid - Mobile Friendly Cards */}
                                <div className="grid grid-cols-2 gap-3 my-6">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <div className="flex items-start gap-2">
                                            <FaCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Process</h4>
                                                <p className="text-xs text-gray-300">Step-by-step guidance</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <div className="flex items-start gap-2">
                                            <FaShieldAlt className="text-emerald-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Support</h4>
                                                <p className="text-xs text-gray-300">Dedicated help</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <div className="flex items-start gap-2">
                                            <FaWhatsapp className="text-emerald-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Fast</h4>
                                                <p className="text-xs text-gray-300">WhatsApp support</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <div className="flex items-start gap-2">
                                            <FaBriefcase className="text-emerald-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Document</h4>
                                                <p className="text-xs text-gray-300">Reduce mistakes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-200 text-base mb-6">
                                    Start your journey today with our trusted overseas job processing support.
                                </p>

                                {/* Stats Row - Mobile Friendly */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-emerald-400">20+</span>
                                        <span className="text-xs text-gray-300">Countries</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/20"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-emerald-400">50+</span>
                                        <span className="text-xs text-gray-300">Partners</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/20"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-emerald-400">24/7</span>
                                        <span className="text-xs text-gray-300">Support</span>
                                    </div>
                                </div>

                                {/* CTA Buttons - Mobile Optimized */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        to="/jobs"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30"
                                    >
                                        <span>🔍 Browse Jobs</span>
                                        <FaArrowRight className="text-sm" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur text-white font-semibold hover:bg-white/15 transition border border-white/15"
                                    >
                                        📞 Contact Us
                                    </Link>
                                </div>

                                {/* Trust Indicators */}
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-emerald-500/20 border border-white/20 flex items-center justify-center text-xs backdrop-blur-sm"
                                            >
                                                ✓
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        <span className="font-bold text-white">500+</span> successful placements
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        <span className="font-bold text-white">8+</span> years experience
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column - Services Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="order-1 lg:order-2"
                            >
                                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 shadow-2xl">
                                    
                                    {/* Services Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white">
                                            <FaBriefcase className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">Our Services</h3>
                                            <p className="text-xs text-gray-300">Complete visa & job support</p>
                                        </div>
                                    </div>

                                    {/* Services Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {/* Service 1 - Europe Job Visa */}
                                        <div className="group bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs">
                                                    🇪🇺
                                                </div>
                                                <span className="font-semibold text-sm">Europe</span>
                                            </div>
                                            <p className="text-[10px] text-gray-300 line-clamp-2">Job visa processing support</p>
                                            <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
                                                View details <FaArrowRight className="text-[8px]" />
                                            </div>
                                        </div>

                                        {/* Service 2 - Middle East */}
                                        <div className="group bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white text-xs">
                                                    🌏
                                                </div>
                                                <span className="font-semibold text-sm">Middle East</span>
                                            </div>
                                            <p className="text-[10px] text-gray-300 line-clamp-2">Work permit & visa support</p>
                                            <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
                                                View details <FaArrowRight className="text-[8px]" />
                                            </div>
                                        </div>

                                        {/* Service 3 - Study Visa */}
                                        <div className="group bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs">
                                                    🎓
                                                </div>
                                                <span className="font-semibold text-sm">Study</span>
                                            </div>
                                            <p className="text-[10px] text-gray-300 line-clamp-2">Student visa guidance</p>
                                            <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
                                                View details <FaArrowRight className="text-[8px]" />
                                            </div>
                                        </div>

                                        {/* Service 4 - Family Sponsorship */}
                                        <div className="group bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-red-600 flex items-center justify-center text-white text-xs">
                                                    👪
                                                </div>
                                                <span className="font-semibold text-sm">Family</span>
                                            </div>
                                            <p className="text-[10px] text-gray-300 line-clamp-2">Family sponsorship</p>
                                            <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
                                                View details <FaArrowRight className="text-[8px]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-400">98%</div>
                                            <div className="text-[10px] text-gray-400">Success Rate</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-400">15+</div>
                                            <div className="text-[10px] text-gray-400">Years Exp</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-400">24/7</div>
                                            <div className="text-[10px] text-gray-400">Support</div>
                                        </div>
                                    </div>

                                    {/* View All Services Link */}
                                    <Link 
                                        to="/services"
                                        className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                                    >
                                        View all services <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;