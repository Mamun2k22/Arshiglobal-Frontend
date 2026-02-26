import React from "react";

export default function AroundTheWorld() {
  const items = [
    {
      name: "AFRICA",
      count: "1505 Locations",
      img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/africa.png",
    },
    {
      name: "ASIA",
      count: "7535 Locations",
      img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/asia.png",
    },
    {
      name: "NORTH AMERICA",
      count: "3335 Locations",
      img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/north-america.png",
    },
    {
      name: "AUSTRALIA",
      count: "1973 Locations",
      img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/Australia.png",
    },
    {
      name: "EUROPE",
      count: "3633 Locations",
      img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/Europe.png",
    },
    {
      name: "SOUTH AMERICA",
      count: "1117 Locations",
      img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/asia.png", // ✅ যদি না থাকে, আপনার correct link বসান
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-5">
            <span className="h-[2px] w-12 bg-orange-500/90" />
            <h2 className="text-[#0b3a63] font-extrabold tracking-[0.38em] text-base sm:text-lg uppercase">
              AROUND THE WORLD WITH US
            </h2>
            <span className="h-[2px] w-12 bg-orange-500/90" />
          </div>

          <p className="mt-3 text-sm sm:text-base text-slate-500">
            The World is not Enough. Travel around with us.
          </p>
        </div>

        {/* maps + dotted curve */}
        <div className="relative mt-12 md:mt-14">
          {/* dotted curve line (like screenshot) */}
          <svg
            aria-hidden
            className="absolute left-0 right-0 top-[52%] w-full h-20 opacity-60"
            viewBox="0 0 1200 140"
            preserveAspectRatio="none"
          >
            <path
              d="M20,90 C170,55 270,125 420,92 C560,60 650,120 800,92 C940,62 1030,105 1180,78"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 relative z-10">
            {items.map((it) => (
              <div key={it.name} className="text-center">
                <div className="mx-auto h-24 w-28 grid place-items-center">
                  <img
                    src={it.img}
                    alt={it.name}
                    className="h-20 w-auto object-contain opacity-45"
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 text-[#0b3a63] font-extrabold tracking-wide uppercase">
                  {it.name}
                </div>
                <div className="mt-1 text-slate-500 text-sm">{it.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}