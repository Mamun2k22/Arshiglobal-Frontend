import React from "react";

const IMAGES = {
  top: "https://immipress.themejunction.net/wp-content/uploads/2024/02/about-h3-img.jpg",
  badge: "https://immipress.themejunction.net/wp-content/uploads/2024/02/certified.png",
  left: "https://immipress.themejunction.net/wp-content/uploads/2024/02/about-h3-left-img.jpg",
  right: "https://immipress.themejunction.net/wp-content/uploads/2024/02/about-h3-right-img.jpg",
};

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT: Collage */}
          <div className="relative">
            {/* Collage container */}
            <div className="relative grid grid-cols-2 gap-5 md:gap-6">
              {/* Top big image (span 2 cols) */}
              <div className="col-span-2 overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.top}
                  alt="About top"
                  className="w-full h-[210px] sm:h-[260px] md:h-[300px] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Bottom left */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.left}
                  alt="About left"
                  className="w-full h-[210px] sm:h-[240px] md:h-[260px] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Bottom right */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.right}
                  alt="About right"
                  className="w-full h-[210px] sm:h-[240px] md:h-[260px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Center badge */}
            <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
              <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full bg-white shadow-xl flex items-center justify-center">
                <img
                  src={IMAGES.badge}
                  alt="Certified badge"
                  className="w-[78px] md:w-[88px] h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div>
            <p className="text-rose-500 font-semibold tracking-wide">Why Choose Us</p>

            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Experienced Lawyers Provide <br className="hidden sm:block" />
              Immigration Services.
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
              Quisque dignissim enim diam, eget pulvinar ex viverra id. Nulla a
              lobortis lectus, id volutpat magna. Morbi consequat porttitor
              fermentum. Nulla vestibulum tincidunt viverra. Vestibulum accumsan
              molestie lorem, non laoreet massa.
            </p>

            {/* Mission/Vision + side image */}
            <div className="mt-7 grid md:grid-cols-[1fr_220px] gap-6 items-start">
              {/* Left: cards */}
              <div className="space-y-4">
                <div className="flex gap-4 rounded-2xl bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] border border-slate-100 p-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    {/* simple inline icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-rose-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2l2.5 7H22l-6 4.2L18.5 21 12 16.8 5.5 21 8 13.2 2 9h7.5L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Mission</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Lorem ipsum is simply velit anod ips aliquet eneqa quis.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] border border-slate-100 p-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-rose-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20l9-16H3l9 16z" />
                      <path d="M12 20V4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Vision</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Lorem ipsum is simply velit anod ips aliquet eneqa quis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: small image */}
              <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)]">
                <img
                  src={IMAGES.top}
                  alt="Small"
                  className="w-full h-[170px] md:h-[190px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Button */}
            <div className="mt-7">
              <button className="px-7 py-3 rounded-lg bg-rose-500 hover:bg-rose-600 transition text-white font-semibold shadow-md">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
