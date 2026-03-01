import React from "react";
import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { HiCheck } from "react-icons/hi";
import { Shield, Target, Eye, Globe, Award, Users } from "lucide-react";

const ABOUT_BG =
  "https://themes.adnanshoukat.com/designsbridge/visapro/images/about.jpg";

export default function AboutPageArshiGlobal() {
  return (
    <section className="w-full bg-[#f6f9fc]">
      {/* ================= HERO / BANNER ================= */}
      <div
        className="relative h-[260px] sm:h-[320px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${ABOUT_BG})` }}
      >
        {/* dark overlay like screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/30" />

        {/* content */}
        <div className="relative mx-auto max-w-6xl px-4 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white">
              About Us
            </h1>
            <div className="mt-4 text-sm text-white/80">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-sky-300 font-medium">About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHO WE ARE ================= */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        {/* small label */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-10 bg-sky-500/70" />
          <p className="text-[11px] font-semibold tracking-[0.28em] text-sky-600">
            WHO WE ARE
          </p>
          <span className="h-[2px] w-10 bg-sky-500/70" />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* left image card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-[0_16px_50px_-35px_rgba(15,23,42,0.7)]">
              {/* you can replace this image with your own */}
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop"
                alt="Arshi Global"
                className="w-full h-[320px] sm:h-[360px] object-cover"
                loading="lazy"
              />
            </div>

            {/* badge like screenshot */}
            <div className="absolute left-6 top-6 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white px-6 py-5 shadow-lg">
              <div className="text-3xl font-extrabold leading-none">2020</div>
              <div className="mt-1 text-sm opacity-95">Since</div>
            </div>
          </div>
       {/* right content */}
<div className="max-w-xl">
  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 leading-snug">
    Committed to Your Global Success
  </h2>

  {/* first paragraph */}
  <p className="mt-3 text-slate-600 leading-6 text-[14.5px]">
    <span className="font-semibold text-slate-900">
      Arshi Global
    </span>{" "}
    — Your Premier Partner for{" "}
    <span className="font-semibold text-emerald-600">
      Visa, Job &amp; Travel
    </span>{" "}
    assistance firm based in Uttara, Dhaka. We provide comprehensive
    support for tourism, education, and overseas employment.
  </p>

  {/* second paragraph */}
  <p className="mt-3 text-slate-600 leading-6 text-[14.5px]">
    What sets us apart is our commitment to{" "}
    <span className="font-medium text-slate-900">
      transparency, integrity, and personalized service
    </span>
    . Every client receives tailored guidance based on their unique
    goals and eligibility.
  </p>

  {/* subtle divider */}
  <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full" />

  {/* features */}
  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
    <Feature text="Certified Consultants" />
    <Feature text="Global Network" />
    <Feature text="Personalized Service" />
    <Feature text="Transparent Process" />
  </div>
</div>
        </div>

        {/* divider */}
        <div className="mt-12 sm:mt-14 h-px bg-slate-200" />

        {/* ================= Mission / Vision cards ================= */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Our Mission"
            icon={<Target className="w-5 h-5 text-sky-600" strokeWidth={2.2} />}
            iconBg="bg-sky-100"
            content={
              <>
                আমরা বিশ্বস্ততা, সঠিক দিকনির্দেশনা ও পেশাদার সহায়তায় আপনার
                স্বপ্ন পূরণে পাশে থাকি।{" "}
                <span className="font-semibold">Arshi Global</span> এর লক্ষ্য—
                ভিসা, জব ও ট্রাভেলে স্বচ্ছ, নির্ভরযোগ্য এবং রেজাল্ট-ভিত্তিক
                সাপোর্ট প্রদান করা।
              </>
            }
          />

          <InfoCard
            title="Our Vision"
            icon={<Eye className="w-5 h-5 text-indigo-600" strokeWidth={2.2} />}
            iconBg="bg-indigo-100"
            content={
              <>
                বাংলাদেশ থেকে বিশ্বজুড়ে ভিসা, জব ও ট্রাভেল সল্যুশনে একটি
                বিশ্বস্ত গ্লোবাল ব্র্যান্ড হওয়া—যেখানে প্রতিটি ক্লায়েন্ট পায়
                দ্রুত সার্ভিস, পূর্ণ স্বচ্ছতা এবং সফল রেজাল্ট।
              </>
            }
          />
        </div>
      </div>
      {/* ================= NEW: ABOUT DETAILS / WHY CHOOSE US ================= */}
      <div className="mt-12 sm:mt-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-10 bg-sky-500/70" />
          <p className="text-[11px] font-semibold tracking-[0.28em] text-sky-600">
            WHY ARSHI GLOBAL
          </p>
          <span className="h-[2px] w-10 bg-sky-500/70" />
        </div>

        <h3 className="mt-4 text-center font-serif text-3xl sm:text-4xl font-semibold text-slate-900">
          A Smarter, Safer Way to Plan Your Visa, Job & Travel
        </h3>

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm sm:text-base leading-7 text-slate-600">
          <span className="font-semibold text-slate-900">Arshi Global</span> কাজ
          করে একটাই লক্ষ্য নিয়ে—আপনার আবেদন/প্রসেস যেন হয়{" "}
          <span className="font-semibold text-emerald-600">
            সঠিক, স্বচ্ছ এবং সময়মতো
          </span>
          । আমরা প্রতিটি ক্লায়েন্টের প্রোফাইল বুঝে “one-size-fits-all” না করে{" "}
          <span className="font-semibold text-slate-900">
            personalized guidance
          </span>{" "}
          দিই, যাতে ভুল কমে, রেজাল্ট ভালো হয় এবং সিদ্ধান্ত নিতে সহজ হয়।
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: What we do */}
          <div className="group rounded-2xl bg-white/80 backdrop-blur p-8 ring-1 ring-slate-200 shadow-[0_16px_55px_-38px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-42px_rgba(15,23,42,0.65)]">
            {/* top accent */}
            <div className="h-[3px] w-14 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />

            <div className="mt-5 flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                {/* icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M7 4h10M7 20h10M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h4 className="font-serif text-2xl font-semibold text-slate-900">
                  What We Do
                </h4>
                <p className="mt-3 text-sm sm:text-[15px] leading-7 text-slate-600">
                  Visa, Job &amp; Travel—এই তিনটি সল্যুশনে আমরা end-to-end
                  সাপোর্ট দিই। ডকুমেন্ট রেডি করা, প্রোফাইল রিভিউ, প্রসেসিং
                  গাইডলাইন, এবং প্রয়োজনীয় কনসাল্টেশন—সবকিছু একসাথে, এক জায়গায়।
                </p>

                {/* bullets */}
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  <Bullet text="Profile evaluation & eligibility guidance" />
                  <Bullet text="Document checklist & preparation support" />
                  <Bullet text="Application guidance with transparency" />
                  <Bullet text="Post-approval assistance & next steps" />
                </ul>

                <div className="mt-7">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition"
                  >
                    Talk to a Consultant <span className="text-base">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Process (timeline style) */}
          <div className="group rounded-2xl bg-white/80 backdrop-blur p-8 ring-1 ring-slate-200 shadow-[0_16px_55px_-38px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-42px_rgba(15,23,42,0.65)]">
            {/* top accent */}
            <div className="h-[3px] w-14 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />

            <div className="mt-5 flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                {/* icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 6v6l4 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h4 className="font-serif text-2xl font-semibold text-slate-900">
                  Simple Working Process
                </h4>
                <p className="mt-3 text-sm sm:text-[15px] leading-7 text-slate-600">
                  আপনার জন্য পুরো প্রসেসটাকে আমরা ছোট ছোট স্টেপে সাজাই—যাতে
                  confusion কমে, সময় বাঁচে এবং সিদ্ধান্ত নেওয়া সহজ হয়।
                </p>

                {/* timeline */}
                <div className="mt-7 relative">
                  {/* line */}
                  <div className="absolute left-[18px] top-2 bottom-2 w-px bg-slate-200" />

                  <div className="space-y-6">
                    <TimelineStep
                      no="01"
                      title="Consultation"
                      desc="আপনার লক্ষ্য ও প্রোফাইল বুঝে একটি পরিষ্কার রোডম্যাপ।"
                      color="sky"
                    />
                    <TimelineStep
                      no="02"
                      title="Document Review"
                      desc="Checklist + verification—যাতে ভুল কমে এবং প্রস্তুতি strong হয়।"
                      color="indigo"
                    />
                    <TimelineStep
                      no="03"
                      title="Application Guidance"
                      desc="সঠিকভাবে apply/submit করার step-by-step গাইডলাইন।"
                      color="emerald"
                    />
                    <TimelineStep
                      no="04"
                      title="Follow-up Support"
                      desc="পরবর্তী স্টেপ, প্রয়োজনীয় কাগজ এবং আপডেট—সবসময় পাশে থাকা।"
                      color="violet"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stat highlight (optional, adds credibility) */}
      {/* <div className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 rounded-xl">
              <div className="text-left">
                <p className="text-2xl font-bold">5000+</p>
                <p className="text-xs opacity-90">Successful visas</p>
              </div>
              <div className="h-8 w-px bg-white/30"></div>
              <div className="text-left">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs opacity-90">Client satisfaction</p>
              </div>
              <div className="h-8 w-px bg-white/30"></div>
              <div className="text-left">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-xs opacity-90">Years experience</p>
              </div>
            </div> */}
    </section>
  );
}
function TimelineStep({ no, title, desc, color = "sky" }) {
  const colorMap = {
    sky: "bg-sky-600",
    indigo: "bg-indigo-600",
    emerald: "bg-emerald-600",
    violet: "bg-violet-600",
  };

  return (
    <div className="relative flex gap-4">
      <div
        className={`h-9 w-9 flex-shrink-0 rounded-xl ${colorMap[color]} text-white font-extrabold flex items-center justify-center shadow`}
      >
        {no}
      </div>
      <div className="pt-0.5">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600 leading-6">{desc}</p>
      </div>
    </div>
  );
}
function Feature({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 ">
      <div className="h-7 w-7 rounded-xl bg-sky-100 flex items-center justify-center">
        <HiCheck className="text-sky-600 text-lg" />
      </div>
      <p className="text-sm font-semibold text-slate-800">{text}</p>
    </div>
  );
}
function Bullet({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm text-slate-700">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
        <HiCheck className="text-white text-[14px]" />
      </span>
      <span className="leading-6">{text}</span>
    </li>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-white/70">{value}</p>
      <p className="mt-1 text-lg font-bold">{label}</p>
    </div>
  );
}

function StepRow({ no, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-sky-100 text-sky-700 font-extrabold flex items-center justify-center">
        {no}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600 leading-6">{desc}</p>
      </div>
    </div>
  );
}
function InfoCard({ title, content, icon, iconBg }) {
  return (
    <div className="rounded-2xl bg-white p-7 ring-1 ring-slate-200 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.45)] hover:-translate-y-1 transition">
      <div className="flex items-center gap-3">
        <div
          className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3 className="font-serif text-xl font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{content}</p>
    </div>
  );
}
