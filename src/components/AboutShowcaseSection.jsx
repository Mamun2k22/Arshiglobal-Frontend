import React from "react";
import { FiShield, FiZap, FiHeadphones, FiCheckCircle } from "react-icons/fi";

const IMG_MAIN =
  "https://themes.adnanshoukat.com/designsbridge/visapro/images/about.jpg";
const IMG_TEAM =
  "https://themes.adnanshoukat.com/designsbridge/visapro/images/about-team.jpg";

function FeatureChip({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
        <Icon />
      </span>
      <div className="text-sm font-semibold text-slate-900">{title}</div>
    </div>
  );
}

export default function AboutShowcaseSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT: images */}
          <div className="relative">
            {/* main image */}
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 shadow-sm">
              <img
                src={IMG_MAIN}
                alt="About Arshi"
                className="h-[280px] w-full object-cover md:h-[360px]"
                loading="lazy"
              />

              {/* experience badge */}
              <div className="absolute left-6 top-6 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 px-6 py-5 text-white shadow-lg">
                <div className="text-3xl font-extrabold leading-none">15+</div>
                <div className="mt-1 text-xs font-semibold opacity-95">
                  Years Experience
                </div>
              </div>
            </div>

            {/* small team image */}
            <div className="absolute -bottom-7 right-6 w-[190px] overflow-hidden rounded-2xl border-4 border-white shadow-lg">
              <img
                src={IMG_TEAM}
                alt="Team"
                className="h-[120px] w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl"
            />
          </div>

          {/* RIGHT: content */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-emerald-700">
              <span className="h-[2px] w-10 bg-emerald-600/70" />
              ABOUT US
              <span className="h-[2px] w-10 bg-emerald-600/70" />
            </div>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              We make your Europe journey simple & successful
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Arshi&apos;s Tours and Travel provides trusted guidance for{" "}
              <span className="font-semibold text-slate-900">
                Europe Tour, Study Visa
              </span>{" "}
              and{" "}
              <span className="font-semibold text-slate-900">Work Permit</span>.
              We focus on transparent steps, correct documentation, and fast
              support—so you can move forward with confidence.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Our team supports you end-to-end: counseling → document checklist →
              submission guidance → follow-up, ensuring a smooth experience.
            </p>

            {/* features */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <FeatureChip icon={FiShield} title="Trusted & Transparent Guidance" />
              <FeatureChip icon={FiZap} title="Fast Processing Support" />
              <FeatureChip icon={FiHeadphones} title="Quick Support via WhatsApp" />
              <FeatureChip icon={FiCheckCircle} title="Document Checklist & Review" />
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:from-emerald-700 hover:to-emerald-800 transition"
              >
                Talk to Expert
              </a>

              <div className="text-sm text-slate-600">
                📲 আজই অ্যাপয়েন্টমেন্ট বুক করুন
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
