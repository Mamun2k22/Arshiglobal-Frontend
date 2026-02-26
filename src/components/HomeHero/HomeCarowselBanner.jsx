import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeCarowselBanner() {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);

  // ✅ first fast, then slow
  const FIRST_SPEED = 2800;
  const NORMAL_SPEED = 6000;

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
          title: b.title || "",
        }));

        setSlides(mapped);
      } catch (err) {
        console.error("Banner fetch error:", err);
        setSlides([
          {
            id: 1,
            img: "https://www.tahitianvacations.com/wp-content/uploads/2016/08/islands_hero-1.jpg",
            title: "Tahitian Paradise",
          },
          {
            id: 2,
            img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/img1.jpg",
            title: "Luxury Travel",
          },
          {
            id: 3,
            img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/img3.jpg",
            title: "Exotic Destinations",
          },
  
        ]);
      }
    };

    fetchBanners();
  }, [API_BASE]);

  const displaySlides =
    slides.length > 0
      ? slides
      : [
          {
            id: 1,
            img: "https://www.tahitianvacations.com/wp-content/uploads/2016/08/islands_hero-1.jpg",
            title: "Tahitian Paradise",
          },
          {
            id: 2,
            img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/img1.jpg",
            title: "Luxury Travel",
          },
          {
            id: 3,
            img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/img3.jpg",
            title: "Exotic Destinations",
          },
          {
            id: 4,
            img: "https://www.ibookgetway.com/Content/client-UI/IBook/images/bgimg-two.jpg",
            title: "Beach Paradise",
          },
        ];

  const transitionSpeed = 650;

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: transitionSpeed,
      fade: true,
      autoplay: true,
      autoplaySpeed: autoMs, // ✅ dynamic
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,

      // ✅ after first change => switch to normal slower speed
      beforeChange: (_, next) => {
        setActive(next);

        if (!switched) {
          setSwitched(true);
          setAutoMs(NORMAL_SPEED);

          // react-slick autoplay speed change apply reliably:
          // pause + play after state update
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.slickPause();
              sliderRef.current.slickPlay();
            }
          }, 0);
        }
      },

      appendDots: (dots) => (
        <div className="absolute bottom-6 w-full z-30">
          <ul className="flex justify-center gap-3 m-0 p-0">{dots}</ul>
        </div>
      ),
      customPaging: () => (
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/50 hover:bg-white/90 transition-all duration-300 cursor-pointer" />
      ),
    }),
    [autoMs, switched]
  );

  return (
    <div
      className="
        relative w-full overflow-hidden
        h-screen
        [&_.slick-slider]:h-full 
        [&_.slick-list]:h-full 
        [&_.slick-track]:h-full
        [&_.slick-slide>div]:h-full
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 z-10 pointer-events-none" />

      {/* ✅ Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 pt-4">
        <div className="h-[3px] w-full bg-white/15 rounded-full overflow-hidden">
          <div
            key={`${active}-${autoMs}`} // re-trigger when speed changes too
            className="h-full bg-white/85 rounded-full animate-progress"
            style={{ animationDuration: `${autoMs}ms` }}
          />
        </div>
      </div>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4 pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest drop-shadow-2xl">
          TRAVEL
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light text-center drop-shadow-xl">
          Book Flights, Hotels and Holiday Packages
        </p>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {displaySlides.map((s, i) => (
          <div key={s.id} className="h-full">
            <img
              src={s.img}
              alt={s.title || `Banner ${i + 1}`}
              className="
                w-full h-full
                object-cover
                scale-125
                transition-transform duration-[9000ms]
              "
              style={{
                objectPosition: "50% 85%",
              }}
            />
          </div>
        ))}
      </Slider>

      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
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
      `}</style>
    </div>
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
