import React from "react";

const steps = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "Book a free consultation to discuss your goals and eligibility.",
    gradient: "from-sky-400 to-indigo-600",
    ring: "border-sky-200",
  },
  {
    num: "02",
    title: "Document Review",
    desc: "We review your documents and create a customized strategy.",
    gradient: "from-orange-400 to-rose-500",
    ring: "border-rose-200",
  },
  {
    num: "03",
    title: "Application Filing",
    desc: "We prepare and submit your application with precision.",
    gradient: "from-emerald-400 to-green-600",
    ring: "border-emerald-200",
  },
  {
    num: "04",
    title: "Visa Approved!",
    desc: "Celebrate your success with post-approval guidance.",
    gradient: "from-violet-500 to-purple-600",
    ring: "border-violet-200",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {/* Top label */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-10 bg-sky-500/70" />
          <p className="text-[11px] font-semibold tracking-[0.28em] text-sky-600">
            HOW IT WORKS
          </p>
          <span className="h-[2px] w-10 bg-sky-500/70" />
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center font-serif text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Simple 4-Step Process
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-500 sm:text-base">
          Our streamlined process ensures a smooth and stress-free
          <br className="hidden sm:block" />
          immigration experience.
        </p>

        {/* Steps */}
        <div className="relative mt-14 sm:mt-16">
          {/* Connecting line (behind circles) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-[2px] bg-slate-200 sm:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-10">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center">
                {/* Circle */}
                <div className="relative">
                  {/* dotted outer ring */}
                  <div
                    className={`absolute -inset-[10px] rounded-full border border-dashed ${s.ring}`}
                  />
                  {/* subtle outer ring */}
                  <div className="absolute -inset-[16px] rounded-full border border-slate-100" />

                  <div
                    className={`h-24 w-24 rounded-full bg-gradient-to-br ${s.gradient} shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]`}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-3xl font-extrabold tracking-wide text-white">
                        {s.num}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title + desc */}
                <h3 className="mt-7 font-serif text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}