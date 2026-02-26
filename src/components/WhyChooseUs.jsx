import React from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdOutlineLuggage } from "react-icons/md";
import { FaPassport, FaPlane } from "react-icons/fa";

export default function WhyChooseUsSection() {
  const BG =
    "https://www.ibookgetway.com/Content/client-UI/IBook/images/globe-bg.jpg";
  const GIRL =
    "https://dtora.wpengine.com/wp-content/uploads/2019/04/why-us-img-new-540x718.png";

  const features = [
    {
      icon: HiOutlineGlobeAlt,
      title: "All Around the World Tours",
      desc: "Dummy text ever since the 1500s, when an unknown printer took. A galley of type and scrambled it to make a type.",
    },
    {
      icon: MdOutlineLuggage,
      title: "Private & Customized Tours",
      desc: "Dummy text ever since the 1500s, when an unknown printer took. A galley of type and scrambled it to make a type.",
    },
    {
      icon: FaPassport,
      title: "Immigration & Passport Help",
      desc: "Dummy text ever since the 1500s, when an unknown printer took. A galley of type and scrambled it to make a type.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG} alt="" className="w-full h-full object-cover" />
        {/* teal overlay like screenshot */}
        <div className="absolute inset-0 bg-[#46c7d2]/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="text-white">
            {/* heading */}
            <div className="flex items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.25em]">
                WHY US?
              </h2>
              <span className="h-[2px] w-10 bg-white/70" />
            </div>

            <p className="mt-3 text-sm sm:text-base font-semibold text-white/90">
              We make all the process easy
            </p>

            <div className="mt-10 space-y-10">
              {features.map((f) => (
                <FeatureRow
                  key={f.title}
                  Icon={f.icon}
                  title={f.title}
                  desc={f.desc}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            {/* white frame */}
            <div className="absolute right-2 sm:right-6 lg:right-10 top-6 sm:top-10 w-[290px] sm:w-[360px] lg:w-[420px] h-[420px] sm:h-[520px] lg:h-[580px] border-[10px] border-white/95" />

            {/* brush stroke behind girl */}
            <div className="absolute right-6 sm:right-12 lg:right-16 top-3 sm:top-6 w-[320px] sm:w-[390px] lg:w-[460px] h-[460px] sm:h-[560px] lg:h-[620px] bg-white/25 rotate-2 rounded-[28px] blur-[0.2px]" />

            {/* girl */}
            <img
              src={GIRL}
              alt="Traveler"
              className="relative z-10 w-[300px] sm:w-[380px] lg:w-[460px] object-contain drop-shadow-2xl"
              loading="lazy"
            />

            {/* Make Possible text */}
            <div className="absolute left-4 sm:left-10 lg:left-16 bottom-10 z-20">
              <p className="text-white/90 text-3xl sm:text-4xl font-[cursive] italic drop-shadow">
                Make Possible
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom-right airplane icon */}
      <div className="absolute right-6 bottom-6 text-white/95">
        <FaPlane className="text-3xl -rotate-12 drop-shadow" />
      </div>
    </section>
  );
}

function FeatureRow({ Icon, title, desc }) {
  return (
    <div className="flex items-start gap-6">
      <div className="mt-1 w-12 h-12 rounded-xl bg-white/0 grid place-items-center">
        <Icon className="text-black text-[34px]" />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#083c66]">
          {title}
        </h3>
        <p className="mt-3 text-sm sm:text-base leading-5 font-semibold text-white/90 max-w-xl">
          {desc}
        </p>
      </div>
    </div>
  );
}