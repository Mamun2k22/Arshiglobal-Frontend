import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar, FaShieldAlt, FaCheckCircle, FaPassport } from "react-icons/fa";
import { MdWork, MdFlight, MdSchool, MdFamilyRestroom } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";

export default function ServicesCarouselSection({ services = [] }) {
  const getServiceIcon = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes("work") || t.includes("job") || t.includes("permit")) return <MdWork className="text-2xl" />;
    if (t.includes("europe") || t.includes("schengen")) return <FaGlobe className="text-2xl" />;
    if (t.includes("study") || t.includes("student")) return <MdSchool className="text-2xl" />;
    if (t.includes("tour") || t.includes("visit")) return <MdFlight className="text-2xl" />;
    if (t.includes("family")) return <MdFamilyRestroom className="text-2xl" />;
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
    const bgColors = ["bg-blue-50", "bg-emerald-50", "bg-amber-50", "bg-violet-50", "bg-sky-50", "bg-pink-50"];
    return bgColors[index % bgColors.length];
  };

  if (!services?.length) return null;

  // smooth loop: duplicate
  const items = [...services, ...services];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
            ✦ What We Offer ✦
          </span>

          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our core services to support your visa and job process.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="marquee relative overflow-hidden">
          <div className="marquee__track">
            {items.map((service, index) => {
              const realIndex = index % services.length;
              const gradient = getGradient(realIndex);
              const lightBg = getLightBg(realIndex);

              return (
                <div
                  key={`${service._id}-${index}`}
                  className="
                    marquee__item group relative flex-shrink-0
                    w-full
                    sm:w-[calc((100%-24px)/2)]
                    md:w-[calc((100%-48px)/3)]
                    lg:w-[calc((100%-72px)/4)]
                  "
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full overflow-hidden">
                    <div className={`absolute inset-0 ${lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${gradient}`} />

                    <div className="relative mb-4 flex items-start justify-between">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300`}
                      >
                        {getServiceIcon(service.title)}
                      </div>

                      {realIndex < 2 && (
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                          <FaStar className="text-white text-xs" />
                        </div>
                      )}
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>

                      {/* line-clamp dependency বাদ: fixed height + overflow hidden */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 max-h-[4.5rem] overflow-hidden">
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

                      <Link
                        to={`/services/${service._id}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                      >
                        View details
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group"
          >
            <span>View All Services</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* CSS marquee */}
      <style>{`
        .marquee { width: 100%; }
        .marquee__track {
          display: flex;
          gap: 24px; /* gap-6 */
          width: max-content;
          animation: marquee-left 18s linear infinite;
          will-change: transform;
        }
        /* hover করলে pause */
        .marquee:hover .marquee__track { animation-play-state: paused; }

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}