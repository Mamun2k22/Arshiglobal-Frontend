import React from "react";

export default function HeroWorldSection() {
  const ROTATE_IMG =
    "https://www.ibookgetway.com/Content/client-UI/IBook/images/world-img.png";

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-9 lg:py-20">
        <div className="bg-white rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-center px-8 sm:px-10 lg:px-12 py-0 lg:py-16">
            {/* LEFT */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b3a66] leading-tight">
                Trusted Europe Visa <br className="hidden sm:block" />
                Support Starts Here
              </h2>

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Professional guidance for travel, study and work opportunities
              </p>

              <div className="mt-4 h-[2px] w-10 bg-amber-400" />

              <p className="mt-6 text-slate-600 leading-7 text-sm sm:text-base">
                Arshi Global helps you move forward with the right consultation,
                proper documentation support and legal guidance for Europe.
                Whether you are planning for a Europe tour, study visa or work
                permit, our team is here to make the process easier, clearer and
                more reliable for you.
              </p>

              <button className="mt-9 inline-flex items-center justify-center px-8 py-3 border border-[#0b3a66] text-[#0b3a66] font-semibold tracking-[0.22em] text-xs uppercase hover:bg-[#0b3a66] hover:text-white transition">
                Get Consultation
              </button>
            </div>

            {/* CENTER */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]">
                <img
                  src={ROTATE_IMG}
                  alt="Europe travel and visa support"
                  className="w-full h-full object-contain animate-world-rotate"
                  loading="lazy"
                />
              </div>

              <p className="-mt-2 text-base font-extrabold text-[#0b3a66]">
                Your journey begins with expert guidance
              </p>

              <h1 className="text-4xl md:text-7xl font-black leading-none">
                <span className="world-text">EUROPE</span>
              </h1>

              <p className="mt-3 text-[11px] sm:text-xs tracking-[0.45em] text-slate-500 font-semibold">
                VISA • STUDY • WORK
              </p>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-xl font-extrabold text-[#0b3a66]">
                Why Choose Us
              </h3>

              <p className="mt-4 text-slate-600 leading-7 text-sm sm:text-base">
                We focus on trusted consultation, transparent process and
                client-first support. Our goal is to help you understand every
                step clearly and move ahead with more confidence for your Europe
                plan.
              </p>

              <div className="mt-10 flex items-center gap-10 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0b3a66]">
                    100+
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Visa Guidance Cases
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0b3a66]">
                    Legal
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Professional Support
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0b3a66]">
                    Dhaka
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Uttara Office
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}