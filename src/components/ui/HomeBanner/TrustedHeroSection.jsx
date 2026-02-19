import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaStar, 
  FaCheckCircle, 
  FaArrowRight,
  FaGlobe,
  FaUsers,
  FaRocket,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const TrustedHeroSection = () => {
    // Array for carousel images - REPLACE THESE WITH YOUR ACTUAL IMAGE PATHS
    const carouselImages = [
        {
            id: 1,
            url: "https://themes.adnanshoukat.com/designsbridge/visapro/images/world-globe.jpg", // Replace with your actual image path, e.g., "/assets/hero-01.jpg"
            alt: "Happy client with visa approval",
            country: "Canada",
            visaType: "Express Entry"
        },
        {
            id: 2,
            url: "https://themes.adnanshoukat.com/designsbridge/visapro/images/hero-01.jpg", // Replace with your actual image path
            alt: "Successful immigration story",
            country: "Australia",
            visaType: "Skilled Independent Visa"
        },
        {
            id: 3,
            url: "https://themes.adnanshoukat.com/designsbridge/visapro/images/hero-02.jpg", // If you have a third image, add it here
            alt: "Family celebrating visa success",
            country: "UK",
            visaType: "Health & Care Worker"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden min-h-screen flex items-center">
            
            {/* Background Image - world-globe.jpg */}
            <div className="absolute inset-0">
                <img 
                    src="/images/world-globe.jpg" // REPLACE with your actual world-globe image path
                    alt="World Map Background"
                    className="w-full h-full object-cover opacity-20"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            {/* Gradient Overlay (kept to ensure text readability) */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-blue-900/95"></div>

            {/* Rest of the code (Animated Background Elements, Left Column, etc.) remains the same as before */}
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -45, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column - Text Content (Keep your existing code here) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-block mb-6"
                        >
                            <span className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20 flex items-center gap-2">
                                <FaUsers className="text-blue-400" />
                                Trusted by 50,000+ Happy Clients
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Your Gateway
                            </span>
                            <br />
                            <span className="text-white">to Global Opportunities</span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-300 mb-8 max-w-lg">
                            Expert visa and immigration consultancy with a 98% success rate. 
                            Let us turn your dreams of living abroad into reality.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link
                                to="/services"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-purple-600/40 transition-all overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <FaRocket />
                                    Start Your Journey
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>

                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                            >
                                <FaGlobe />
                                Explore Services
                                <FaArrowRight className="text-sm" />
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-white flex items-center justify-center text-xs font-bold">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-300">
                                <span className="font-bold text-white">500+</span> successful placements
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Image Carousel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden">
                            
                            {/* Carousel Header */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold border border-emerald-500/30 flex items-center gap-2">
                                    <FaQuoteLeft className="text-xs" />
                                    Success Stories
                                </span>

                                {/* Navigation Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
                                    >
                                        <FaChevronLeft className="text-sm" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
                                    >
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            {/* Carousel Slides */}
                            <div className="relative min-h-[400px]">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <div className="flex flex-col h-full">
                                            {/* Image Container */}
                                            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
                                                <img
                                                    src={carouselImages[currentIndex].url}
                                                    alt={carouselImages[currentIndex].alt}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                                    }}
                                                />
                                                {/* Gradient Overlay for Text */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                                
                                                {/* Image Caption */}
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                                                        {carouselImages[currentIndex].country} - {carouselImages[currentIndex].visaType}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Success Story Text Content (Keep your existing success story details) */}
                                            <div className="mt-2">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl">
                                                        {currentIndex === 0 ? '🇨🇦' : currentIndex === 1 ? '🇦🇺' : '🇬🇧'}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold">Visa Approved!</h3>
                                                        <p className="text-emerald-400">{carouselImages[currentIndex].visaType}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-sm text-gray-300">
                                                    <div className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-emerald-500" />
                                                        <span>12 days processing time</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-emerald-500" />
                                                        <span> Permanent Residency</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-emerald-500" />
                                                        <span>Family included in application</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex justify-center gap-2 mt-4">
                                {carouselImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > currentIndex ? 1 : -1);
                                            setCurrentIndex(idx);
                                        }}
                                        className={`h-2 rounded-full transition-all ${
                                            idx === currentIndex 
                                                ? 'w-8 bg-emerald-500' 
                                                : 'w-2 bg-white/30 hover:bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrustedHeroSection;