import React from "react";
import { FiCheckCircle, FiZap, FiClock, FiShield } from "react-icons/fi";

export default function AboutSection() {
  const features = [
    { icon: FiCheckCircle, label: "Ethical & Transparent Counseling" },
    { icon: FiZap, label: "Fast Admission & Visa Processing Support" },
    { icon: FiClock, label: "End-to-End Guidance (Start to Finish)" },
    { icon: FiShield, label: "Accurate Documentation & File Review" },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* soft bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
      <span
        aria-hidden
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-sky-200/50 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-indigo-200/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT: Images */}
          <div className="relative">
            {/* main image */}
            <div className="relative overflow-hidden rounded-[28px] shadow-[0_25px_60px_-35px_rgba(15,23,42,.55)] ring-1 ring-slate-200">
              <img
                src="https://themes.adnanshoukat.com/designsbridge/visapro/images/about.jpg"
                alt="About Arshi Global Education"
                className="h-[280px] w-full object-cover sm:h-[340px] md:h-[380px]"
                loading="lazy"
              />
            </div>

            {/* years badge */}
            <div className="absolute -left-2 top-8 sm:-left-6">
              <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 px-7 py-6 text-white shadow-xl">
                <div className="text-4xl font-extrabold leading-none">10+</div>
                <div className="mt-2 text-sm font-semibold opacity-95">
                  Years Experience
                </div>
              </div>
            </div>

            {/* team image overlay */}
            <div className="absolute -bottom-6 right-4 sm:right-10">
              <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                <img
                  src="https://themes.adnanshoukat.com/designsbridge/visapro/images/about-team.jpg"
                  alt="Team"
                  className="h-24 w-40 rounded-xl object-cover sm:h-28 sm:w-48"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-sky-500" />
              <div className="text-xs font-extrabold tracking-[0.24em] text-sky-600">
                ABOUT US
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Arshi Global Education — Your Trusted Partner for Global Education
              & Migration Guidance
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Arshi Global Education is a professional education consultancy firm
              dedicated to supporting students and professionals who want to study,
              work, or settle abroad. We provide end-to-end support — from course
              and country selection to visa processing and pre-departure preparation.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Our approach is student-first and ethical. Instead of promoting random
              options, we focus on realistic pathways based on academic profile,
              career goals, and financial capacity — so you can make confident decisions.
            </p>

            {/* feature list */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                    <f.icon className="text-sky-600" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-white font-bold shadow-lg shadow-sky-600/20 hover:opacity-95"
              >
                Talk to Expert
              </a>

              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50"
              >
                View Services
              </a>
            </div>

            {/* small note */}
            <div className="mt-6 text-xs text-slate-500">
              We support destinations like UK, Canada, Australia, Europe, and Asia —
              based on your profile & eligibility.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
