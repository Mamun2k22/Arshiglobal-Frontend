import React from "react";

export default function HeroWorldSection() {
  // ✅ 1st image (rotate হবে)
  const ROTATE_IMG =
    "https://www.ibookgetway.com/Content/client-UI/IBook/images/world-img.png";

  // ✅ 2nd image (background হবে) — এখানে আপনার 2nd image URL বসান
  const BG_IMG =
    "https://www.ibookgetway.com/Content/client-UI/IBook/images/bgimg-two.jpg";

  return (
    <section className="relative w-full overflow-hidden">


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {/* White panel (like screenshot) */}
        <div className="bg-white rounded-sm ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-center px-8 sm:px-10 lg:px-12 py-12 lg:py-16">
            {/* LEFT */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b3a66] leading-tight">
                Them Best Great Tourism is Right <br className="hidden sm:block" />
                Here
              </h2>

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Better Travel Packages like any other
              </p>

              <div className="mt-4 h-[2px] w-10 bg-amber-400" />

              <p className="mt-6 text-slate-600 leading-7 text-sm sm:text-base">
                Dummy text ever since the 1500s, when an unknown printer took. A
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries. Dummy text ever since the
                1500s, when an unknown printer took. A galley of type.
              </p>

              <button className="mt-9 inline-flex items-center justify-center px-8 py-3 border border-[#0b3a66] text-[#0b3a66] font-semibold tracking-[0.22em] text-xs uppercase hover:bg-[#0b3a66] hover:text-white transition">
                JOIN ADVENTURE
              </button>
            </div>

            {/* CENTER */}
            <div className="flex flex-col items-center text-center">
              {/* ✅ rotating image */}
              <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]">
                <img
                  src={ROTATE_IMG}
                  alt="World"
                  className="w-full h-full object-contain animate-world-rotate"
                  loading="lazy"
                />
              </div>

              <p className="-mt-2 text-base font-extrabold text-[#0b3a66]">
                Travel through the Amazing
              </p>

           <h1 className="text-4xl md:text-7xl  font-black leading-none">
  <span className="world-text">
    WORLD
  </span>
</h1>

              <p className="mt-3 text-[11px] sm:text-xs tracking-[0.45em] text-slate-500 font-semibold">
                GREATER TOURISM
              </p>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-xl font-extrabold text-[#0b3a66]">Our Awards</h3>

              <p className="mt-4 text-slate-600 leading-7 text-sm sm:text-base">
                Dummy text ever since the 1500s, when an unknown printer took. A
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries.
              </p>

         <div className="mt-10 flex items-center gap-10 flex-wrap">
  <img
    src="https://dtora.wpengine.com/wp-content/uploads/2019/03/client-logo-img1.png"
    alt="Award 1"
    className="h-16 object-contain grayscale-0 transition duration-300"
  />

  <img
    src="https://dtora.wpengine.com/wp-content/uploads/2019/03/client-logo-img2.png"
    alt="Award 2"
    className="h-16 object-contain grayscale-0 transition duration-300"
  />

  <img
    src="https://dtora.wpengine.com/wp-content/uploads/2019/03/client-logo-img3.png"
    alt="Award 3"
    className="h-16 object-contain grayscale-0 transition duration-300"
  />
</div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ rotation animation */}

    </section>
  );
}

function AwardIcon({ labelTop, labelBottom }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-xl">
        🏆
      </div>
      <div className="mt-2 text-center leading-tight">
        <div className="text-[10px] font-extrabold text-slate-600 tracking-wider">
          {labelTop}
        </div>
        <div className="text-[10px] font-semibold text-slate-500">
          {labelBottom}
        </div>
      </div>
    </div>
  );
}