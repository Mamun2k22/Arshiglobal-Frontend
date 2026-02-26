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
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
      setOpenId((prev) => (prev === id ? null : id));
    };

    return (
      <div className="p-0">
        <div className="space-y-4 max-w-7xl mx-auto mt-4">
          {items.map((f, idx) => {
            const isOpen = openId === f._id;
            const accent =
              idx === 0
                ? "border-emerald-600 text-emerald-700"
                : "border-slate-900 text-slate-900";

            return (
              <div
                key={f._id}
                className={`[box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-lg border-l-8 ${accent} bg-white`}
                role="accordion"
              >
                <button
                  type="button"
                  onClick={() => toggle(f._id)}
                  className={`cursor-pointer w-full text-[15px] font-medium text-left py-5 px-6 flex items-center ${
                    idx === 0 ? "text-emerald-700" : "text-slate-900"
                  }`}
                >
                  {/* left icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current w-8 mr-4 shrink-0"
                    viewBox="0 0 532 532.001"
                  >
                    <path d="M521.893 197.182V117.17c-.037-31.46-25.533-56.956-56.993-56.992h-15.008V51.18c-.13-25.532-20.864-46.154-46.394-46.154s-46.26 20.621-46.397 46.154v8.998H189.483V51.18c-.13-25.533-20.866-46.155-46.395-46.155S96.83 25.646 96.691 51.179v8.998H81.68c-31.458.037-56.954 25.533-56.99 56.993v349.562c.037 31.46 25.532 56.957 56.99 56.993H464.9c31.46-.036 56.956-25.532 56.992-56.992V205.407a12.844 12.844 0 0 0 0-8.226zM403.499 30.729c11.285.015 20.43 9.157 20.442 20.45v27.324c-.085 11.225-9.217 20.28-20.45 20.28-11.23 0-20.357-9.055-20.447-20.28V51.18c.013-11.294 9.162-20.438 20.455-20.45zm-280.867 20.45c.09-11.232 9.219-20.288 20.447-20.288 11.233 0 20.358 9.055 20.451 20.288v27.324c-.093 11.225-9.218 20.28-20.45 20.28-11.229 0-20.358-9.055-20.447-20.28zM81.68 86.124h15.644c3.73 22.369 23.08 38.765 45.757 38.765 22.68 0 42.03-16.396 45.76-38.765h168.898c3.73 22.369 23.083 38.765 45.76 38.765s42.03-16.396 45.756-38.765H464.9c17.139.021 31.025 13.907 31.046 31.046v71.147H50.638v-71.143c.016-17.139 13.91-31.029 31.041-31.05zM464.9 497.777H81.68c-17.132-.02-31.022-13.905-31.042-31.044v-252.47h445.308v252.47c-.021 17.14-13.907 31.025-31.046 31.046zm0 0" />
                    <path d="m337.836 296.383-85.173 83.164-43.242-42.221c-5.095-4.978-13.244-4.92-18.265.125-5.021 5.05-5.038 13.2-.04 18.265l.178.17 52.31 51.078c5.037 4.92 13.084 4.92 18.122 0l94.242-92.007c5.082-4.997 5.183-13.163.228-18.285-4.965-5.119-13.127-5.273-18.286-.353l-.072.068zm0 0" />
                  </svg>

                  <span className="mr-4">
                    {f.question}
                    <span className="text-xs text-slate-600 mt-0.5 block font-normal">
                      Click to view the answer
                    </span>
                  </span>

                  {/* arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-[14px] h-[14px] fill-current ml-auto shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 451.847 451.847"
                  >
                    <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                  </svg>
                </button>

                {/* content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <div className="pb-5 px-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
     
      <HomeCarowselBanner />
      <BrowseLocations />
      <TourismHero />
      <FlightHotelServices />
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
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                ✦ What We Offer ✦
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                Services
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core services to support your visa and job process.
            </p>
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
 <WhyChooseUs />
    <FollowAdventureSection />
      <AroundTheWorld />
       <AboutVideo />
      <StatsSection />
     
   
    
     
      {/* <ServicesThreeCards /> */}
      {/* <AboutSection /> */}

      {/* Jobs Section - Redesigned */}
      {/* <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -45, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200/30 via-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-semibold shadow-lg">
                ✦ Opportunities ✦
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                Latest Jobs
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse latest opportunities and apply with confidence.
            </p>
          </motion.div>

 
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                  
               
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="flex items-start justify-between gap-4">
        
                    <div className="flex-1">
            
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white">
                          <FaBriefcase className="text-lg" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {job.title}
                        </h3>
                      </div>

       
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.country && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            <FaMapMarkerAlt className="text-[10px]" />
                            {job.country}
                          </span>
                        )}
                        {job.category && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                            <FaBriefcase className="text-[10px]" />
                            {job.category}
                          </span>
                        )}
                        {job.salary && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                            <FaMoneyBillWave className="text-[10px]" />
                            {job.salary}
                          </span>
                        )}
                      </div>

         
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {job.description}
                      </p>

              
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock />
                          Posted recently
                        </span>
                      </div>
                    </div>

          
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        to={`/jobs/${job._id}`}
                        className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                      >
                        Details
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group"
            >
              <span>See all jobs</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <Section title="FAQ" subtitle="Common questions from clients.">
        <FaqAccordion items={faqs} />
      </Section>
    </div>
  );
}
