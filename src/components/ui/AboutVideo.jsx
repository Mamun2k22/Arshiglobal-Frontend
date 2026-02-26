import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AboutVideo() {
  const [open, setOpen] = useState(false);

  const BG_IMG =
    "https://dtora.wpengine.com/wp-content/uploads/2019/03/video-img-750x488.jpg";

  const VIMEO_SRC =
    "https://player.vimeo.com/video/18439821?h=2c6b3dfb2d&autoplay=1";

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT: Image + Overlay Card */}
          <div className="relative">
            {/* main image */}
            <div className="overflow-hidden bg-slate-100">
              <img
                src={BG_IMG}
                alt="Video"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover"
                style={{ objectPosition: "50% 55%" }}
                loading="lazy"
              />
            </div>

            {/* overlay card (same-to-same) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-34px] w-[86%] sm:w-[72%] lg:w-[78%]">
              <div className="bg-white shadow-[0_18px_35px_rgba(0,0,0,0.18)] border border-slate-100">
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  {/* play button */}
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative h-14 w-14 rounded-full bg-[#19c1ff] grid place-items-center shrink-0 focus:outline-none"
                    aria-label="Play video"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/20" />
                    <span className="relative text-white text-lg leading-none">
                      ▶
                    </span>
                  </button>

                  {/* text */}
                  <div className="min-w-0">
                    <div className="text-[12px] font-extrabold text-slate-500 tracking-[0.08em]">
                      Video
                    </div>

                    <div className="mt-1 flex items-end gap-2 flex-wrap">
                      <div className="font-extrabold text-[#0b3a63] text-base sm:text-lg leading-snug">
                        Travel like there is no tomorrow
                      </div>

                      <span className="font-bold text-slate-500 text-sm">
                        33.50
                      </span>
                    </div>
                  </div>
                </div>

                {/* bottom accent line */}
                <div className="h-[3px] w-full bg-[#19c1ff]" />
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="pt-10 lg:pt-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b3a63] leading-tight">
              Talk to a Local and the Get the best{" "}
              <br className="hidden sm:block" />
              Travel Locations
            </h2>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Travelled through Atlanta, USA
            </p>

            <div className="mt-4 h-[2px] w-10 bg-yellow-400" />

            <p className="mt-6 text-slate-600 leading-7 text-sm sm:text-base max-w-xl">
              Dummy text ever since the 1500s, when an unknown printer took. A
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries. Dummy text ever since the
              1500s, when an unknown printer took. A galley of type.
            </p>

            <Link
              to="/media"
              className="mt-8 inline-flex items-center justify-center px-10 py-3 border border-[#0b3a63] text-[#0b3a63] font-semibold tracking-[0.22em] text-xs uppercase hover:bg-[#0b3a63] hover:text-white transition"
            >
              VIEW VIDEOS
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Vimeo Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="relative w-full pt-[56.25%]">
              <iframe
                title="vimeo-player"
                src={VIMEO_SRC}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}