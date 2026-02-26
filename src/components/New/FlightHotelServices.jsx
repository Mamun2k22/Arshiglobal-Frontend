import React from "react";

export default function ServicesSection() {
  const BG_IMG =
    "https://www.ibookgetway.com/Content/client-UI/IBook/images/fullwidth-bg.jpg";

  const items = [
    {
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/flight.png",
      title: "FLIGHT TICKETS",
      text: "Dummy text ever since the very 1500s, when an unknown printer took.",
    },
    {
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/bed.png",
      title: "HOTEL RESERVATION",
      text: "A galley of type and scrambled it to make a type specimen book it to make.",
    },
    {
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/watch.png",
      title: "FLIGHT TICKETS",
      text: "Dummy text ever since the very 1500s, when an unknown printer took.",
    },
    {
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/man.png",
      title: "FLIGHT TICKETS",
      text: "A galley of type and scrambled it to make a type specimen book it to make.",
    },
  ];

  return (
    <section
      className="
        relative w-full overflow-hidden
        h-auto lg:h-[300px]
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={BG_IMG}
          alt="Services background"
          className="w-full h-full object-cover"
          style={{ objectPosition: "85% 55%" }}
        />
        <div className="absolute inset-0 bg-white/25" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:h-[300px]">
          {items.map((it, idx) => (
            <div
              key={idx}
              className={`
                relative
                px-6 sm:px-8 lg:px-10
                py-8 sm:py-10 lg:py-0
                flex items-start lg:items-center
                ${idx !== items.length - 1 ? "lg:services-divider" : ""}
              `}
            >
              <div className="flex flex-col items-start">
                <img
                  src={it.icon}
                  alt={it.title}
                  className="w-10 h-10 object-contain mb-5 sm:mb-6 opacity-95"
                  loading="lazy"
                />

                <h3 className="text-sm font-extrabold tracking-[0.28em] text-[#0b3a66]">
                  {it.title}
                </h3>

                <p className="mt-3 sm:mt-4 text-sm leading-6 text-slate-800 max-w-[260px] font-bold">
                  {it.text}
                </p>
              </div>

              {/* Mobile divider */}
              {idx !== items.length - 1 && (
                <div className="absolute bottom-0 left-6 sm:left-8 right-6 sm:right-8 h-px bg-[#0b3a66]/15 lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .services-divider::after {
            content: "";
            position: absolute;
            top: 26px;
            bottom: 26px;
            right: 0;
            width: 2px;
            background: rgba(11, 58, 102, 0.30);
          }
        }
      `}</style>
    </section>
  );
}