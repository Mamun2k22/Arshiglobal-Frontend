// components/sections/ProcessSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Auto-play animation for steps
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isInView, controls]);

  const steps = [
    {
      id: 1,
      title: "কাউন্সেলিং",
      titleEn: "Counseling",
      icon: "/icons/counseling.svg",
      iconBg: "from-blue-500 to-cyan-500",
      description: "প্রতিটি আবেদনকারীর প্রয়োজন ও যোগ্যতা অনুযায়ী ব্যক্তিগত কাউন্সেলিং প্রদান করা হয়। আমাদের দক্ষ টিম আপনার সাথে বসে সঠিক দিকনির্দেশনা দেয়।",
      details: "এগার গের দর সম্মতি ও প্রত্যুত্তর ভিত্তিতে প্রসেসিংয়ের পূর্ণ দায়িত্ব আমরা গ্রহণ করি।"
    },
    {
      id: 2,
      title: "নির্গলাইজেশন",
      titleEn: "Validation",
      icon: "/icons/validation.svg",
      iconBg: "from-purple-500 to-pink-500",
      description: "ওয়ার্কার সিলেকশন থেকে শুরু করে সকল কাজের কাগজপত্রের নির্ভুলতা যাচাই করা হয়।",
      details: "সকল ডকুমেন্ট সঠিকভাবে যাচাই করে ত্রুটিমুক্ত করা হয়।"
    },
    {
      id: 3,
      title: "প্রাথমিক কার্যক্রম",
      titleEn: "Documentation",
      icon: "/icons/documentation.svg",
      iconBg: "from-emerald-500 to-teal-500",
      description: "শিক্ষাগত যোগ্যতা, কর্মক্ষেত্র ও সামগ্রিক প্রোফাইল অনুযায়ী প্রয়োজনীয় ডকুমেন্ট প্রস্তুত করা হয়।",
      details: "সমস্ত ডকুমেন্ট প্রস্তুত করে সরাসরি নিযোগকর্তার কাছে প্রেরণ করা হয়।"
    },
    {
      id: 4,
      title: "ওয়ার্ক পারমিট সাবমিশন",
      titleEn: "Work Permit Submission",
      icon: "/icons/submit.svg",
      iconBg: "from-orange-500 to-red-500",
      description: "আইনগত প্রক্রিয়া অনুসরণ করে নির্ধারিত কর্তৃপক্ষের কাছে ওয়ার্ক পারমিট আবেদন জমা দেওয়া হয়।",
      details: "সকল আইনি প্রক্রিয়া সঠিকভাবে অনুসরণ করে আবেদন জমা দেওয়া হয়।"
    },
    {
      id: 5,
      title: "ওয়ার্ক পারমিট অনুমোদন",
      titleEn: "Approval",
      icon: "/icons/approved.svg",
      iconBg: "from-green-500 to-emerald-500",
      description: "স্থানীয় কর্তৃপক্ষের সিদ্ধান্ত অনুযায়ী আবেদনকারীর ওয়ার্ক পারমিট অনুমোদিত হয়।",
      details: "অনুমোদন পাওয়ার পর ভিসা ও টিকিটের ব্যবস্থা করা হয়।"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              আমাদের প্রক্রিয়া
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-slate-900">
            কাজের <span className="text-emerald-600">পদ্ধতি</span>
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
            আমরা একটি নির্ভরযোগ্য ও স্বচ্ছ প্রক্রিয়া অনুসরণ করি, যা আপনার সফলতা নিশ্চিত করে
          </p>
        </motion.div>

        {/* Steps Counter */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full shadow-lg px-8 py-3 inline-flex items-center gap-4">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  activeStep === step.id
                    ? `bg-gradient-to-r ${step.iconBg} text-white scale-110 shadow-lg`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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

        {/* Main Process Flow */}
        <div className="relative">
          {/* Connecting Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-1">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-emerald-200 to-slate-200"></div>
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: `${(activeStep - 1) * 25}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-5 gap-4 mt-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative group cursor-pointer`}
                onClick={() => setActiveStep(step.id)}
              >
                {/* Step Card */}
                <div className={`bg-white rounded-2xl p-6 shadow-xl transition-all duration-500 ${
                  activeStep === step.id 
                    ? 'ring-2 ring-emerald-500 shadow-2xl scale-105' 
                    : 'hover:shadow-2xl'
                }`}>
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.iconBg} p-0.5 mb-4 transform group-hover:rotate-6 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">
                        {step.id === 1 && "💬"}
                        {step.id === 2 && "✓"}
                        {step.id === 3 && "📄"}
                        {step.id === 4 && "📮"}
                        {step.id === 5 && "✅"}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 text-center mb-2">
                    {step.title}
                  </h3>
                  
                  {/* English Title */}
                  <p className="text-xs text-emerald-600 text-center mb-3 font-medium">
                    {step.titleEn}
                  </p>

                  {/* Description - Short */}
                  <p className="text-sm text-slate-600 text-center line-clamp-2">
                    {step.description}
                  </p>

                  {/* Active Indicator */}
                  {activeStep === step.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-emerald-500 rounded-full"
                    />
                  )}
                </div>

                {/* Pulse Effect for Active Step */}
                {activeStep === step.id && (
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl animate-ping bg-emerald-400 opacity-20"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Description for Active Step */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white"
          >
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${
                steps[activeStep - 1].iconBg
              } p-0.5 shrink-0`}>
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">
                    {activeStep === 1 && "💬"}
                    {activeStep === 2 && "✓"}
                    {activeStep === 3 && "📄"}
                    {activeStep === 4 && "📮"}
                    {activeStep === 5 && "✅"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold">{steps[activeStep - 1].title}</h3>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    Step {activeStep}/5
                  </span>
                </div>
                
                <p className="text-slate-300 text-lg mb-4">
                  {steps[activeStep - 1].description}
                </p>
                
                <p className="text-emerald-400 font-medium">
                  {steps[activeStep - 1].details}
                </p>

                {/* Progress Bar */}
                <div className="mt-6 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${steps[activeStep - 1].iconBg}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(activeStep / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { label: "সফল আবেদন", value: "১০০০+", icon: "✅" },
              { label: "অনুমোদন রেট", value: "৯৫%", icon: "📊" },
              { label: "অভিজ্ঞতা", value: "৮+ বছর", icon: "⭐" },
              { label: "দেশ", value: "২০+", icon: "🌍" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow-lg text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}