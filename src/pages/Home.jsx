import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Section from "../components/Section";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import ProcessSection from "../components/sections/ProcessSection";
import Hero from "../components/Hero";
import { Stars } from "lucide-react";
import StatsSection from "../components/StatsSection";
import PremiumMarquee from "../components/MarqueeRtl";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutSection from "../components/AboutSection";
import AboutShowcaseSection from "../components/AboutShowcaseSection";
import ServicesThreeCards from "../components/ui/ServicesThreeCards";
import ChooseCountry from "../components/ChooseCountry";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaGlobe,
  FaPassport,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdWork, MdFlight, MdSchool, MdFamilyRestroom } from "react-icons/md";
import TrustedHeroSection from "../components/ui/HomeBanner/TrustedHeroSection";
import HeroSlider from "../components/HomeHero/HomeCarowselBanner";
import FlightHotelServices from "../components/New/FlightHotelServices";
import TourismHero from "../components/ui/TourismHero";
import HomeCarowselBanner from "../components/HomeHero/HomeCarowselBanner";
import FollowAdventureSection from "../components/ui/FollowAdventureSection";
import AboutVideo from "../components/ui/AboutVideo";
import BrowseLocations from "../components/ui/BrowseLocations";
import AroundTheWorld from "../components/ui/AroundTheWorld";
import PromoBanner from "../components/PromoBanner";
import ServicesCarouselSection from "../components/ui/ServicesCarouselSection";
import HowItWorks from "../components/ui/HowItWorks";
import ServicesSection from "../components/ui/ServicesSection";
import Contact from "./Contact";

export default function Home() {
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api
      .get("/api/services?limit=6")
      .then((r) => setServices(r.data?.items || []))
      .catch(() => {});
    api
      .get("/api/jobs?limit=6")
      .then((r) => setJobs(r.data?.items || []))
      .catch(() => {});
    api
      .get("/api/faqs")
      .then((r) => setFaqs(r.data?.items || []))
      .catch(() => {});
  }, []);

  // Helper functions for services
  const getServiceIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (
      titleLower.includes("work") ||
      titleLower.includes("job") ||
      titleLower.includes("permit")
    )
      return <MdWork className="text-2xl" />;
    if (titleLower.includes("europe") || titleLower.includes("schengen"))
      return <FaGlobe className="text-2xl" />;
    if (titleLower.includes("study") || titleLower.includes("student"))
      return <MdSchool className="text-2xl" />;
    if (titleLower.includes("tour") || titleLower.includes("visit"))
      return <MdFlight className="text-2xl" />;
    if (titleLower.includes("family"))
      return <MdFamilyRestroom className="text-2xl" />;
    return <FaPassport className="text-2xl" />;
  };

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

 function FaqAccordion({ items = [] }) {
  const [openId, setOpenId] = useState(items?.[0]?._id || null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Content */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl overflow-hidden bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] border border-slate-200">
            <div className="relative h-[260px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80"
                alt="Client support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-emerald-500/90 px-3 py-1 rounded-full mb-3">
                  Need Help?
                </span>
                <h3 className="text-2xl font-bold leading-snug">
                  We answer the most common client questions clearly.
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                From visa processing to consultation and destination support,
                here are the answers clients usually ask before getting started.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      Trusted Guidance
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Clear answers for student, work, and visit visa queries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      Professional Support
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Better presentation makes your brand feel more reliable.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      Quick Access
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Users can scan key information faster without feeling overwhelmed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Accordion */}
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {items.map((f, idx) => {
              const isOpen = openId === f._id;

              return (
                <div
                  key={f._id}
                  className={`group rounded-2xl border bg-white transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-emerald-500 shadow-[0_10px_35px_rgba(16,185,129,0.12)]"
                      : "border-slate-200 hover:border-slate-300 shadow-[0_8px_25px_rgba(15,23,42,0.06)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(f._id)}
                    className="w-full flex items-start gap-4 px-5 md:px-6 py-5 text-left"
                  >
                    <div
                      className={`mt-0.5 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isOpen
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <FaCheckCircle className="text-lg" />
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`text-base md:text-lg font-semibold transition-colors ${
                          isOpen ? "text-emerald-700" : "text-slate-900"
                        }`}
                      >
                        {f.question}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Click to view the answer
                      </p>
                    </div>

                    <div
                      className={`mt-1 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-600" : "text-slate-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[16px] h-[16px] fill-current"
                        viewBox="0 0 451.847 451.847"
                      >
                        <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-6 pl-[84px]">
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-sm md:text-[15px] leading-7 text-slate-600">
                            {f.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div>
      <HomeCarowselBanner />
      {/* <BrowseLocations /> */}
      <TourismHero />
      {/* <FlightHotelServices /> */}
      <ServicesSection />
      {/* <ServicesCarouselSection services={services} /> */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                ✦ What We Offer ✦
              </span>
            </motion.div> */}

            {/* <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                Services
              </span>
            </h2> */}
{/* 
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core services to support your visa and job process.
            </p> */}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const gradient = getGradient(index);
              const lightBg = getLightBg(index);

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 ${lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <motion.div
                      className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="relative mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300`}
                      >
                        {getServiceIcon(service.title)}
                      </div>

                      {index < 2 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                            <FaStar className="text-white text-xs" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {service.shortDescription ||
                          service.description ||
                          "Professional visa and job processing support with expert guidance."}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center gap-1">
                          <FaCheckCircle className="text-[10px]" />
                          Fast Processing
                        </span>
                        <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full flex items-center gap-1">
                          <FaShieldAlt className="text-[10px]" />
                          100% Legal
                        </span>
                      </div>

                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          to={`/services/${service._id}`}
                          className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        >
                          View details
                          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group"
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
        </div>
      </section>
      <HowItWorks />
      <WhyChooseUs />
      <FollowAdventureSection />
      <AroundTheWorld />
      <AboutVideo />
      <StatsSection />
      {/* <ServicesThreeCards /> */}
      {/* <AboutSection /> */}

      {/* FAQ Section */}
   <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
  <div className="max-w-7xl mx-auto px-4 text-center mb-10">
    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-4 py-1.5 text-sm font-semibold mb-4">
      Frequently Asked Questions
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
      Got Questions? We’ve Got Answers
    </h2>
    <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
      Common questions from clients about our services, consultation, and visa support process.
    </p>
  </div>

  <FaqAccordion items={faqs} />
</section>
      <Contact />
    </div>
  );
}
