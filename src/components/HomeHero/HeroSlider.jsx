import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);

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
        setSlides([]);
      }
    };

    fetchBanners();
  }, [API_BASE]);

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Next"
      className="
        hidden md:flex items-center justify-center
        absolute right-4 top-1/2 -translate-y-1/2 z-10
        h-11 w-11 rounded-full
        border border-white/60 bg-black/30 text-white
        hover:bg-black/45 active:scale-95 transition
      "
    >
      ›
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Prev"
      className="
        hidden md:flex items-center justify-center
        absolute left-4 top-1/2 -translate-y-1/2 z-10
        h-11 w-11 rounded-full
        border border-white/60 bg-black/30 text-white
        hover:bg-black/45 active:scale-95 transition
      "
    >
      ‹
    </button>
  );

  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 500,
    fade: true,
    autoplay: slides.length > 1,
    autoplaySpeed: 3200,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: { fade: false, speed: 380, arrows: false },
      },
    ],
  };

  if (!slides.length) return null;

  return (
    <div
      className="
        relative w-full overflow-hidden
        h-[170px] min-[360px]:h-[180px] sm:h-[220px] md:h-[420px] lg:h-[520px] xl:h-[600px]
        max-h-[70vh]
        [&_.slick-slider]:h-full [&_.slick-list]:h-full [&_.slick-track]:h-full
        [&_.slick-slide>div]:h-full
        [&_.slick-dots]:bottom-4
        [&_.slick-dots_li_button:before]:text-white/40
        [&_.slick-dots_li.slick-active_button:before]:text-white
      "
    >
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={s.id} className="h-full">
            {/* ❌ Link removed */}
            <div className="block h-full">
              <img
                src={s.img}
                alt={s.title || `Banner ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="
                  w-full h-full block
                  object-contain bg-white
                  select-none pointer-events-none
                "
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
