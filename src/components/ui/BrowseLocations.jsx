import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaArrowRight,
  FaArrowLeft,
  FaStar,
  FaRegHeart,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function BrowseLocations() {
  const sliderRef = useRef(null);

  // ✅ DESTINATIONS (আপনার দেয়া ইমেজ)
  const destinations = [
    {
      id: 1,
      name: "BALI",
      country: "Indonesia",
      description: "Paradise island with stunning beaches and rich culture",
      image:
        "https://dtora.wpengine.com/wp-content/uploads/2019/03/destination-img1-392x452.jpg",
      price: "$499",
      rating: 4.8,
      tours: 124,
    },
    {
      id: 2,
      name: "PARIS",
      country: "France",
      description: "City of love, art, and exquisite cuisine",
      image:
        "https://dtora.wpengine.com/wp-content/uploads/2019/04/destination-img-2-392x452.jpg",
      price: "$699",
      rating: 4.9,
      tours: 256,
    },
    {
      id: 3,
      name: "MALDIVES",
      country: "Indian Ocean",
      description: "Luxury overwater bungalows and crystal clear waters",
      image:
        "https://dtora.wpengine.com/wp-content/uploads/2019/04/destination-img-3-392x452.jpg",
      price: "$899",
      rating: 5.0,
      tours: 189,
    },
    {
      id: 4,
      name: "SANTORINI",
      country: "Greece",
      description: "Whitewashed buildings and breathtaking sunsets",
      image:
        "https://dtora.wpengine.com/wp-content/uploads/2019/04/destination-img-5-392x452.jpg",
      price: "$749",
      rating: 4.7,
      tours: 98,
    },
    {
      id: 5,
      name: "DUBAI",
      country: "UAE",
      description: "Ultramodern architecture and luxury shopping",
      image:
        "https://dtora.wpengine.com/wp-content/uploads/2019/04/destination-img-4-392x452.jpg",
      price: "$599",
      rating: 4.6,
      tours: 312,
    },
  ];

  // ✅ react-slick refresh/jump fix
  useEffect(() => {
    const t1 = setTimeout(() => {
      sliderRef.current?.slickGoTo(0, true);
      sliderRef.current?.slickPlay?.();
    }, 0);

    const t2 = setTimeout(() => {
      sliderRef.current?.slickGoTo(0, true);
      sliderRef.current?.slickPlay?.();
    }, 250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4, // ✅ right side এ সুন্দর fit হবে
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    cssEase: "ease-in-out",

    // ✅ stable
    adaptiveHeight: false,
    variableWidth: false,
    waitForAnimate: false,

    arrows: false, // ✅ left panel থেকে custom arrows control করবো
    responsive: [
       { breakpoint: 1280, settings: { slidesToShow: 3 } }, // ✅ 1280 এ 3
    { breakpoint: 1024, settings: { slidesToShow: 2 } }, // ✅ 1024 এ 2
    { breakpoint: 640, settings: { slidesToShow: 1 } }, 
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],

    appendDots: (dots) => (
      <div className="absolute -bottom-10 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-yellow-500 transition-all duration-300 cursor-pointer" />
    ),
  };

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-6 items-stretch">
          {/* ✅ LEFT PANEL (screenshot like) */}
        <div className="relative bg-white border border-slate-100 p-6 flex flex-col justify-between min-h-[420px] items-center text-center lg:items-start lg:text-left">
  <div>
    <h2 className="text-[#0b3a63] font-extrabold tracking-[0.34em] text-lg">
      BROWSE
      <br />
      LOCATIONS
    </h2>

    {/* faint background image */}
    <div className="mt-10 opacity-100">
      <img
        src="https://dtora.wpengine.com/wp-content/uploads/2019/03/browse-location-img.png"
        alt="Browse Locations"
        className="w-[150px] h-auto object-contain"
      />
    </div>
  </div>

  {/* arrows */}
  <div className="flex items-center gap-4 text-[#0b3a63]">
    <button
      onClick={() => sliderRef.current?.slickPrev()}
      className="h-9 w-9 grid place-items-center border border-slate-200 hover:bg-slate-50 transition"
      aria-label="Prev"
      type="button"
    >
      <FaArrowLeft />
    </button>

    <button
      onClick={() => sliderRef.current?.slickNext()}
      className="h-9 w-9 grid place-items-center border border-slate-200 hover:bg-slate-50 transition"
      aria-label="Next"
      type="button"
    >
      <FaArrowRight />
    </button>
  </div>
</div>

          {/* ✅ RIGHT: DEEPSEEK CAROUSEL (stable) */}
          <div className="relative overflow-hidden min-h-[420px]">
            <Slider ref={sliderRef} {...settings}>
              {destinations.map((dest) => (
                <div key={dest.id} className="px-3">
                  <div className="group relative bg-white rounded-md shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-[420px] overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* fav */}
                      <button
                        type="button"
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:scale-110 transition-all duration-300 z-10"
                      >
                        <FaRegHeart className="text-lg" />
                      </button>

                      {/* rating */}
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-semibold">
                          {dest.rating}
                        </span>
                      </div>

                      {/* location info */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <FaMapMarkerAlt className="text-yellow-400 text-sm" />
                          <span className="text-sm font-light">
                            {dest.country}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                        <p className="text-sm text-gray-200 mb-2 line-clamp-1">
                          {dest.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-yellow-400">
                            {dest.price}
                          </span>
                          <span className="text-xs text-gray-300">
                            {dest.tours}+ tours
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* footer */}
                    {/* <div className="p-4 bg-white">
                      <button
                        type="button"
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform group-hover:scale-[1.02]"
                      >
                        Explore Now
                      </button>
                    </div> */}
                  </div>
                </div>
              ))}
            </Slider>

            <style>{`
              .line-clamp-1 {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .slick-dots li.slick-active div {
                background-color: #eab308;
                width: 24px;
                border-radius: 12px;
              }
              .slick-dots li div { transition: all 0.3s ease; }
              .slick-dots li { margin: 0 4px; }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}