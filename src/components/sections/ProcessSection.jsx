// components/sections/ProcessSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Auto-play only on desktop
      if (window.innerWidth > 768) {
        const interval = setInterval(() => {
          setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
      }
    }
  }, [isInView, controls]);

  const steps = [
    {
      id: 1,
      title: "কাউন্সেলিং",
      titleEn: "Counseling",
      icon: "💬",
      iconBg: "from-blue-500 to-cyan-500",
      description:
        "প্রতিটি আবেদনকারীর প্রয়োজন ও যোগ্যতা অনুযায়ী ব্যক্তিগত কাউন্সেলিং প্রদান করা হয়।",
      details:
        "আমাদের দক্ষ টিম আপনার সাথে বসে সঠিক দিকনির্দেশনা দেয়। প্রসেসিংয়ের পূর্ণ দায়িত্ব আমরা গ্রহণ করি।",
    },
    {
      id: 2,
      title: "নির্গলাইজেশন",
      titleEn: "Validation",
      icon: "✓",
      iconBg: "from-purple-500 to-pink-500",
      description:
        "ওয়ার্কার সিলেকশন থেকে শুরু করে সকল কাজের কাগজপত্রের নির্ভুলতা যাচাই করা হয়।",
      details: "সকল ডকুমেন্ট সঠিকভাবে যাচাই করে ত্রুটিমুক্ত করা হয়।",
    },
    {
      id: 3,
      title: "প্রাথমিক কার্যক্রম",
      titleEn: "Documentation",
      icon: "📄",
      iconBg: "from-emerald-500 to-teal-500",
      description:
        "শিক্ষাগত যোগ্যতা, কর্মক্ষেত্র ও প্রোফাইল অনুযায়ী প্রয়োজনীয় ডকুমেন্ট প্রস্তুত করা হয়।",
      details:
        "সমস্ত ডকুমেন্ট প্রস্তুত করে সরাসরি নিযোগকর্তার কাছে প্রেরণ করা হয়।",
    },
    {
      id: 4,
      title: "ওয়ার্ক পারমিট সাবমিশন",
      titleEn: "Work Permit",
      icon: "📮",
      iconBg: "from-orange-500 to-red-500",
      description:
        "আইনগত প্রক্রিয়া অনুসরণ করে নির্ধারিত কর্তৃপক্ষের কাছে ওয়ার্ক পারমিট আবেদন জমা দেওয়া হয়।",
      details:
        "সকল আইনি প্রক্রিয়া সঠিকভাবে অনুসরণ করে আবেদন জমা দেওয়া হয়।",
    },
    {
      id: 5,
      title: "অনুমোদন",
      titleEn: "Approval",
      icon: "✅",
      iconBg: "from-green-500 to-emerald-500",
      description:
        "স্থানীয় কর্তৃপক্ষের সিদ্ধান্ত অনুযায়ী আবেদনকারীর ওয়ার্ক পারমিট অনুমোদিত হয়।",
      details: "অনুমোদন পাওয়ার পর ভিসা ও টিকিটের ব্যবস্থা করা হয়।",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 10 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background blobs + pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-56 md:w-96 h-56 md:h-96 bg-emerald-100 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob" />
        <div className="absolute -top-10 -right-10 w-56 md:w-96 h-56 md:h-96 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="hidden md:block absolute -bottom-10 left-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-14"
        >
          <div className="inline-block">
            <span className="bg-emerald-100 text-emerald-800 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              আমাদের প্রক্রিয়া
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-slate-900">
            কাজের <span className="text-emerald-600">পদ্ধতি</span>
          </h2>

          <p className="text-sm md:text-lg text-slate-600 mt-3 max-w-2xl mx-auto px-4">
            আমরা একটি নির্ভরযোগ্য ও স্বচ্ছ প্রক্রিয়া অনুসরণ করি, যা আপনার সফলতা
            নিশ্চিত করে
          </p>

          {/* subtle underline glow */}
          <div className="mt-5 flex justify-center">
            <div className="h-[2px] w-40 md:w-56 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* MOBILE */}
        <div className="block md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                onClick={() => setActiveStep(step.id)}
                className={`relative bg-white/85 backdrop-blur rounded-2xl p-5 shadow-lg border transition-all ${
                  activeStep === step.id
                    ? "border-emerald-200 shadow-2xl"
                    : "border-slate-100"
                }`}
              >
                {/* top glow */}
                {activeStep === step.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                )}

                <div className="relative flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.iconBg} flex items-center justify-center text-2xl text-white shrink-0 shadow-md`}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-600">
                        Step {step.id}/5
                      </span>
                      <span className="text-xs text-slate-400">
                        {step.titleEn}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {step.description}
                    </p>
                  </div>

                  {activeStep === step.id && (
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow" />
                  )}
                </div>

                {activeStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="relative mt-4 pt-4 border-t border-slate-100"
                  >
                    <p className="text-sm text-slate-700">{step.details}</p>

                    <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.iconBg}`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step.id / 5) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block relative">
          {/* Step Counter */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-10"
          >
            <div className="bg-white/85 backdrop-blur rounded-full shadow-lg px-8 py-3 inline-flex items-center gap-4 border border-slate-100">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 text-base ${
                    activeStep === step.id
                      ? `bg-gradient-to-r ${step.iconBg} text-white scale-110 shadow-lg`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {step.id}
                  {activeStep === step.id && (
                    <span className="absolute -bottom-8 text-xs font-normal text-emerald-600 whitespace-nowrap">
                      {step.titleEn}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Connecting Line (kept) */}
          <div className="absolute top-24 left-0 w-full h-1 hidden lg:block">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-emerald-200 to-slate-200 opacity-80" />
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: `${(activeStep - 1) * 25}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-4 mt-8"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="relative group cursor-pointer"
                onClick={() => setActiveStep(step.id)}
              >
                {/* ambient glow behind active */}
                {activeStep === step.id && (
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-transparent to-blue-500/20 blur-xl opacity-90" />
                )}

                <div
                  className={`relative overflow-hidden rounded-2xl p-5 lg:p-6 transition-all duration-500 border backdrop-blur
                  ${
                    activeStep === step.id
                      ? "bg-white/90 shadow-2xl scale-[1.04] border-emerald-200"
                      : "bg-white/80 shadow-md border-slate-100 hover:shadow-2xl hover:-translate-y-1"
                  }`}
                >
                  {/* shimmer effect on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer" />
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 lg:w-16 lg:h-16 mx-auto rounded-2xl bg-gradient-to-r ${step.iconBg} p-0.5 mb-4 transform group-hover:rotate-6 transition-transform duration-300 shadow-md`}
                  >
                    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-2xl">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 text-center mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-emerald-600 text-center mb-2 font-medium">
                    {step.titleEn}
                  </p>
                  <p className="text-xs text-slate-600 text-center line-clamp-2">
                    {step.description}
                  </p>

                  {/* active accent line (no ring) */}
                  {activeStep === step.id && (
                    <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Details Panel (more premium) */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden"
          >
            {/* panel glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-start gap-6">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${
                  steps[activeStep - 1].iconBg
                } p-0.5 shrink-0`}
              >
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-4xl">
                  {steps[activeStep - 1].icon}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold">
                    {steps[activeStep - 1].title}
                  </h3>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                    Step {activeStep}/5
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-200 rounded-full text-xs border border-emerald-500/20">
                    {steps[activeStep - 1].titleEn}
                  </span>
                </div>

                <p className="text-slate-300 mb-3">
                  {steps[activeStep - 1].description}
                </p>
                <p className="text-emerald-300 font-medium">
                  {steps[activeStep - 1].details}
                </p>

                {/* Progress */}
                <div className="mt-6 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${
                      steps[activeStep - 1].iconBg
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(activeStep / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes shimmer {
          0% { transform: translateX(-120%) rotate(12deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(220%) rotate(12deg); opacity: 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
