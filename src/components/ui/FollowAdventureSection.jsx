import React from "react";
import { FaPlane } from "react-icons/fa";

export default function FollowAdventureSection() {
  const BG =
    "https://www.ibookgetway.com/Content/client-UI/IBook/images/globe-bg.jpg";

  const items = [
    {
      title: "FINE DINING",
      sub: "Exotic Dining Menu",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/plate-with-spoon.png",
    },
    {
      title: "CRUISE TRANSPORTS",
      sub: "For Entire Community",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/ship.png",
    },
    {
      title: "PRIVATE HOTELS",
      sub: "With Extra Pools",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/bulk-key.png",
      highlight: true,
    },
    {
      title: "WATER SPORTS",
      sub: "For Premium Packages",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/boat.png",
    },
    {
      title: "BEACH ACTIVITY",
      sub: "Day & Night Activities",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/umberlla.png",
    },
    {
      title: "HONEYMOON PACKS",
      sub: "Love after Marriage",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/frame.png",
      highlight: true,
    },
    {
      title: "CARAVAN TRIPS",
      sub: "For 4 Wheelers & Two Wheelers",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/van.png",
    },
    {
      title: "CAMPING ACTIVITY",
      sub: "Comes with Personal Trainers",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/tend.png",
    },
    {
      title: "ADVENTURE ACTIVITY",
      sub: "In Premium Plans",
      icon: "https://dtora.wpengine.com/wp-content/uploads/2019/03/parasuite.png",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0b3a63]/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header */}
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-yellow-400" />
            <h2 className="text-lg sm:text-xl font-extrabold tracking-[0.32em]">
              FOLLOW AN ADVENTURE
            </h2>
            <span className="h-[2px] w-10 bg-yellow-400" />
          </div>
          <p className="mt-3 text-sm sm:text-base font-semibold text-white/85">
            Anything you Like
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((it, idx) => (
            <Card key={idx} {...it} />
          ))}
        </div>
      </div>


    </section>
  );
}

function Card({ title, sub, icon }) {
  return (
    <div className="group relative bg-white shadow-md overflow-hidden h-[82px] flex items-center transition-all duration-300 hover:shadow-xl">
      
      {/* 🔥 Hover Blue Strip */}
      <div className="
        absolute left-0 top-0 bottom-0 w-[85px]
        bg-[#27c7f5]
        translate-x-[-100%]
        group-hover:translate-x-0
        transition-transform duration-300
      " />

      <div className="relative flex items-center gap-4 px-6 w-full">
        
        <div className="h-12 w-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <img
            src={icon}
            alt={title}
            className="h-9 w-9 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            loading="lazy"
          />
        </div>

        <div className="leading-tight">
          <div className="text-sm font-extrabold tracking-[0.16em] text-[#0b3a63] transition-colors duration-300 group-hover:text-[#0b3a63]">
            {title}
          </div>
          <div className="mt-1 text-xs sm:text-sm font-bold text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
            {sub}
          </div>
        </div>

      </div>
    </div>
  );
}