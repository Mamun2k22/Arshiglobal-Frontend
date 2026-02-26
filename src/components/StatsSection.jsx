import React from "react";

function Stat({ iconSrc, value, label }) {
  return (
    <div className="text-center text-white">
      <img
        src={iconSrc}
        alt=""
        className="mx-auto h-10 w-10 md:h-11 md:w-11 object-contain brightness-0 invert"
        loading="lazy"
      />

      <div className="mt-3 text-2xl md:text-3xl font-extrabold tracking-[0.06em]">
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
    {
      iconSrc: "https://dtora.wpengine.com/wp-content/uploads/2019/03/count1.png",
      value: "9000+",
      label: "Travel Packages",
    },
    {
      iconSrc: "https://dtora.wpengine.com/wp-content/uploads/2019/03/count2.png",
      value: "280",
      label: "Branches All Over",
    },
    {
      iconSrc: "https://dtora.wpengine.com/wp-content/uploads/2019/03/count3.png",
      value: "900+",
      label: "Expert Agents",
    },
    {
      iconSrc: "https://dtora.wpengine.com/wp-content/uploads/2019/03/count4.png",
      value: "1920",
      label: "Activities Listed",
    },
  ];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-full">
        <div className="relative overflow-hidden rounded-none">
          {/* Background map */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://dtora.wpengine.com/wp-content/uploads/2019/03/world-map.jpg')",
            }}
          />

          {/* Blue overlay (screenshot vibe) */}
          <div className="absolute inset-0 bg-[#0b3a63]/90" />

          {/* Curved dotted route line */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full opacity-40"
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
          >
            <path
              d="M50,150 C230,85 360,190 520,125 C660,70 760,180 900,118 C1040,62 1120,118 1165,92"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2.2"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>

          {/* Location pins (black circles like screenshot) */}
          {[
            { left: "26%", top: "54%" },
            { left: "50%", top: "42%" },
            { left: "73%", top: "54%" },
          ].map((p, i) => (
            <div key={i} className="absolute" style={{ left: p.left, top: p.top }}>
              <div className="h-10 w-10 rounded-full bg-black/30 grid place-items-center ring-1 ring-white/10">
                <div className="h-2.5 w-2.5 rounded-full bg-white/85" />
              </div>
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 px-6 py-12 md:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 items-center">
              {stats.map((s) => (
                <Stat
                  key={s.label}
                  iconSrc={s.iconSrc}
                  value={s.value}
                  label={s.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}