import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { TbBalloon } from "react-icons/tb";

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="text-center text-white">
      <div className="mx-auto grid h-14 w-14 place-items-center">
        <Icon className="text-[34px]" />
      </div>

      <div className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
        {value}
      </div>

      <div className="mt-1 text-sm md:text-base font-semibold text-white/90">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { icon: FaPlaneDeparture, value: "9000+", label: "Travel Packages" },
    { icon: HiOutlineGlobeAlt, value: "280", label: "Branches All Over" },
    { icon: FiUsers, value: "900+", label: "Expert Agents" },
    { icon: TbBalloon, value: "1920", label: "Activities Listed" },
  ];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-full px-4">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background map */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://dtora.wpengine.com/wp-content/uploads/2019/03/world-map.jpg')",
            }}
          />

          {/* Blue overlay */}
          <div className="absolute inset-0 bg-[#0b3a63]/85" />

          {/* Route dotted line */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,.35) 1px, transparent 1.8px)",
              backgroundSize: "18px 18px",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          />

          {/* Curved path 느낌 (light line) */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full opacity-35"
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
          >
            <path
              d="M40,150 C220,80 360,190 520,130 C650,80 760,180 900,120 C1020,70 1100,110 1160,90"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="6 10"
            />
          </svg>

          {/* Location pins */}
          {[
            { left: "28%", top: "52%" },
            { left: "48%", top: "40%" },
            { left: "68%", top: "52%" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: p.left, top: p.top }}
            >
              <div className="h-9 w-9 rounded-full bg-black/30 grid place-items-center ring-1 ring-white/15">
                <span className="h-2 w-2 rounded-full bg-white/90" />
              </div>
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 px-6 py-10 md:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 items-center">
              {stats.map((s) => (
                <Stat key={s.label} icon={s.icon} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
