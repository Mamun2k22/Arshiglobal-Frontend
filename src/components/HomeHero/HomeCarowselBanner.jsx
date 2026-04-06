import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { MdOutlineVerified, MdTravelExplore } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { BsBriefcaseFill } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeCarowselBanner() {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);

  const FIRST_SPEED = 3200;
  const NORMAL_SPEED = 6500;

  const [autoMs, setAutoMs] = useState(FIRST_SPEED);
  const [switched, setSwitched] = useState(false);

  const sliderRef = useRef(null);

  const API_BASE =
    import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000/";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}api/banners`);
        const data = await res.json();

        const mapped = (Array.isArray(data) ? data : []).map((b) => ({
          id: b._id,
          img: b.imageUrl?.startsWith("http")
            ? b.imageUrl
            : `${API_BASE}${b.imageUrl.startsWith("/") ? "" : "/"}${b.imageUrl}`,
          title: b.title || "Your Trusted Gateway to Europe",
          subtitle:
            b.subtitle ||
            "Tour | Study | Work Visa with Legal & Professional Guidance",
        }));

        setSlides(mapped);
      } catch (err) {
        console.error("Banner fetch error:", err);
        setSlides([
          {
            id: 1,
            img: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=80",
            title: "Your Trusted Gateway to Europe",
            subtitle:
              "Tour | Study | Work Visa with Legal & Professional Guidance",
          },
          {
            id: 2,
            img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
            title: "Study in Europe with Expert Guidance",
            subtitle:
              "Get proper consultation, document support and visa assistance for your future.",
          },
          {
            id: 3,
            img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=80",
            title: "Work Permit & Immigration Support",
            subtitle:
              "Professional and legal support for your Europe work permit journey.",
          },
        ]);
      }
    };

    fetchBanners();
  }, [API_BASE]);

  const displaySlides = slides.length
    ? slides
    : [
        {
          id: 1,
          img: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=80",
          title: "Your Trusted Gateway to Europe",
          subtitle:
            "Tour | Study | Work Visa with Legal & Professional Guidance",
        },
        {
          id: 2,
          img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
          title: "Study in Europe with Expert Guidance",
          subtitle:
            "Get proper consultation, document support and visa assistance for your future.",
        },
      ];

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 700,
      fade: true,
      autoplay: true,
      autoplaySpeed: autoMs,
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (_, next) => {
        setActive(next);

        if (!switched) {
          setSwitched(true);
          setAutoMs(NORMAL_SPEED);

          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.slickPause();
              sliderRef.current.slickPlay();
            }
          }, 0);
        }
      },
      appendDots: (dots) => (
        <div className="absolute bottom-4 sm:bottom-5 md:bottom-7 left-0 w-full z-30">
          <ul className="flex justify-center gap-2 sm:gap-3 m-0 p-0">{dots}</ul>
        </div>
      ),
      customPaging: () => (
        <div className="w-2 h-2 sm:w-2.5 md:w-3 md:h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300 cursor-pointer" />
      ),
    }),
    [autoMs, switched]
  );

  const currentSlide = displaySlides[active] || displaySlides[0];

  return (
    <section
      className="
        relative w-full overflow-hidden
        min-h-[80vh] sm:min-h-[85vh] md:min-h-screen
        [&_.slick-slider]:h-full
        [&_.slick-list]:h-full
        [&_.slick-track]:h-full
        [&_.slick-slide>div]:h-full
      "
    >
      {/* Background overlay - improved for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062b45]/95 via-[#062b45]/70 to-black/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* Top progress bar - responsive padding */}
      <div className="absolute top-0 left-0 right-0 z-30 px-3 sm:px-4 md:px-8 pt-3 sm:pt-4">
        <div className="h-[2px] sm:h-[3px] w-full bg-white/15 rounded-full overflow-hidden">
          <div
            key={`${active}-${autoMs}`}
            className="h-full bg-[#f4b400] rounded-full animate-progress"
            style={{ animationDuration: `${autoMs}ms` }}
          />
        </div>
      </div>

      {/* Content - fully responsive typography and spacing */}
      <div className="absolute inset-0 z-20 flex items-center mt-6">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white pt-2 md:pt-4">
            {/* Badge - responsive text size */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-medium mb-4 sm:mb-5">
              <MdOutlineVerified className="text-[#f4b400] text-xs sm:text-sm" />
              Professional & Legal Guidance for Europe
            </div>

            {/* Title - fluid typography using clamp */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight drop-shadow-xl">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-xl text-white/90 max-w-2xl leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* Service badges - horizontal scroll on very small screens? No, wrap with gap */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2">
                <MdTravelExplore className="text-[#f4b400] text-sm sm:text-base" />
                Europe Tour
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2">
                <PiStudentBold className="text-[#f4b400] text-sm sm:text-base" />
                Study Visa
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2">
                <BsBriefcaseFill className="text-[#f4b400] text-sm sm:text-base" />
                Work Permit
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
  
  {/* Mobile only - 1 CTA */}
  <a
    href="/contact"
    className="sm:hidden inline-flex items-center justify-center rounded-xl bg-[#f4b400] px-5 py-3 font-semibold text-sm text-[#0b2239]"
  >
    Apply Now
  </a>

  {/* Desktop CTA */}
  <a
    href="/contact"
    className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4b400] px-6 py-3.5 font-semibold text-sm"
  >
    Apply Now <FaArrowRight />
  </a>

  <a
    href="https://wa.me/8801316889944"
    target="_blank"
    className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 font-semibold text-sm"
  >
    <FaWhatsapp /> Free Consultation
  </a>
</div>

            {/* Trust info - responsive grid, hidden on mobile, visible on md+ */}
            <div className="hidden md:grid mt-8 grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md px-3 sm:px-4 py-3 sm:py-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f4b400]">
                  100+
                </p>
                <p className="text-xs sm:text-sm text-white/85 mt-1">
                  Visa Guidance Cases
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md px-3 sm:px-4 py-3 sm:py-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f4b400]">
                  Legal
                </p>
                <p className="text-xs sm:text-sm text-white/85 mt-1">
                  Professional Support
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md px-3 sm:px-4 py-3 sm:py-4 col-span-2 sm:col-span-1">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f4b400]">
                  Dhaka
                </p>
                <p className="text-xs sm:text-sm text-white/85 mt-1">
                  Uttara Office Support
                </p>
              </div>
            </div>

            {/* Mobile-only trust stats - simplified version for small screens */}
            <div className="grid grid-cols-3 gap-2 mt-6 md:hidden">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-2 text-center">
                <p className="text-base font-bold text-[#f4b400]">100+</p>
                <p className="text-[10px] text-white/80">Cases</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-2 text-center">
                <p className="text-base font-bold text-[#f4b400]">Legal</p>
                <p className="text-[10px] text-white/80">Support</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-2 text-center">
                <p className="text-base font-bold text-[#f4b400]">Dhaka</p>
                <p className="text-[10px] text-white/80">Office</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slides with mobile-optimized image behavior */}
      <Slider ref={sliderRef} {...settings}>
        {displaySlides.map((s, i) => (
          <div key={s.id} className="h-full">
            <img
              src={s.img}
              alt={s.title || `Banner ${i + 1}`}
              className="w-full h-[80vh] md:h-full object-cover scale-[1.06] sm:scale-[1.08] transition-transform duration-[7000ms]"
              style={{ objectPosition: "center" }}
              loading="eager"
            />
          </div>
        ))}
      </Slider>

      {/* Bottom subtle fade - adjusted opacity for better visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-[#062b45] to-transparent z-20 pointer-events-none opacity-30 sm:opacity-20" />

      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-progress {
          transform-origin: left;
          animation-name: progress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        :global(.slick-dots li button:before) {
          display: none;
        }

        /* Improve dot visibility on mobile */
        :global(.slick-dots li) {
          width: auto !important;
          margin: 0 4px !important;
        }

        @media (max-width: 640px) {
          :global(.slick-dots li) {
            margin: 0 3px !important;
          }
        }
      `}</style>
    </section>
  );
}






















































// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function HomeCarowselBanner() {
//   const [slides, setSlides] = useState([]);

//   const API_BASE =
//     import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000/";

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const res = await fetch(`${API_BASE}api/banners`);
//         const data = await res.json();

//         const mapped = (Array.isArray(data) ? data : []).map((b) => ({
//           id: b._id,
//           img: b.imageUrl?.startsWith("http")
//             ? b.imageUrl
//             : `${API_BASE}${b.imageUrl.startsWith("/") ? "" : "/"}${b.imageUrl}`,
//           title: b.title || "",
//         }));

//         setSlides(mapped);
//       } catch (err) {
//         console.error("Banner fetch error:", err);
//         setSlides([]);
//       }
//     };

//     fetchBanners();
//   }, [API_BASE]);

//   const NextArrow = ({ onClick }) => (
//     <button
//       onClick={onClick}
//       aria-label="Next"
//       className="
//         hidden md:flex items-center justify-center
//         absolute right-4 top-1/2 -translate-y-1/2 z-10
//         h-11 w-11 rounded-full
//         border border-white/60 bg-black/30 text-white
//         hover:bg-black/45 active:scale-95 transition
//       "
//     >
//       ›
//     </button>
//   );

//   const PrevArrow = ({ onClick }) => (
//     <button
//       onClick={onClick}
//       aria-label="Prev"
//       className="
//         hidden md:flex items-center justify-center
//         absolute left-4 top-1/2 -translate-y-1/2 z-10
//         h-11 w-11 rounded-full
//         border border-white/60 bg-black/30 text-white
//         hover:bg-black/45 active:scale-95 transition
//       "
//     >
//       ‹
//     </button>
//   );

//   const settings = {
//     dots: true,
//     infinite: slides.length > 1,
//     speed: 500,
//     fade: true,
//     autoplay: slides.length > 1,
//     autoplaySpeed: 3200,
//     pauseOnHover: false,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 640,
//         settings: { fade: false, speed: 380, arrows: false },
//       },
//     ],
//   };

//   if (!slides.length) return null;

//   return (
//     <div
//       className="
//         relative w-full overflow-hidden
//         h-[170px] min-[360px]:h-[180px] sm:h-[220px] md:h-[420px] lg:h-[520px] xl:h-[600px]
//         max-h-[70vh]
//         [&_.slick-slider]:h-full [&_.slick-list]:h-full [&_.slick-track]:h-full
//         [&_.slick-slide>div]:h-full
//         [&_.slick-dots]:bottom-4
//         [&_.slick-dots_li_button:before]:text-white/40
//         [&_.slick-dots_li.slick-active_button:before]:text-white
//       "
//     >
//       <Slider {...settings}>
//         {slides.map((s, i) => (
//           <div key={s.id} className="h-full">
//             {/* ❌ Link removed */}
//             <div className="block h-full">
//               <img
//                 src={s.img}
//                 alt={s.title || `Banner ${i + 1}`}
//                 loading={i === 0 ? "eager" : "lazy"}
//                 className="
//                   w-full h-full block
//                   object-contain bg-white
//                   select-none pointer-events-none
//                 "
//               />
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
