import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

const hotels = [
  {
    id: 1,
    name: "Duplex Room",
    price: 27.5,
    persons: 2,
    image: "https://dtora.wpengine.com/wp-content/uploads/2019/03/room-8-600x400.jpg",
    location: "8127 Myrtle Street, Muncie, IN 47302",
  },
  {
    id: 2,
    name: "Suite Room",
    price: 33.0,
    persons: 3,
    image: "https://dtora.wpengine.com/wp-content/uploads/2019/03/room-9-570x380.jpg",
    location: "8127 Myrtle Street, Muncie, IN 47302",
  },
  {
    id: 3,
    name: "Twin Room",
    price: 27.5,
    persons: 4,
    image: "https://dtora.wpengine.com/wp-content/uploads/2019/03/room-10-570x380.jpg",
    location: "8127 Myrtle Street, Muncie, IN 47302",
  },
  {
    id: 4,
    name: "Triple Room",
    price: 33.0,
    persons: 4,
    image: "https://dtora.wpengine.com/wp-content/uploads/2019/03/room-7-570x380.jpg",
    location: "8127 Myrtle Street, Muncie, IN 47302",
  },
  {
    id: 5,
    name: "Double Room",
    price: 34.1,
    persons: 5,
    image: "https://dtora.wpengine.com/wp-content/uploads/2019/03/room-5-570x380.jpg",
    location: "8127 Myrtle Street, Muncie, IN 47302",
  },
  {
    id: 6,
    name: "Family Room",
    price: 31.7,
    persons: 3,
    image: "https://dtora.wpengine.com/wp-content/uploads/2019/03/room-4-570x380.jpg",
    location: "8127 Myrtle Street, Muncie, IN 47302",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function PopularHotels() {
  const [activeTab, setActiveTab] = useState("all");

  const total = useMemo(() => hotels.length, []);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-amber-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/60 text-amber-700 text-sm font-semibold">
            Handpicked stays
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Popular Hotels
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover comfortable rooms with great pricing. Choose your perfect stay and book instantly.
          </p>

          <div className="w-28 h-1 bg-amber-400 mx-auto mt-7 rounded-full" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex rounded-2xl bg-white/80 backdrop-blur border border-amber-100 shadow-sm p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-amber-500 text-white shadow"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              All ({total})
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <motion.article
              key={hotel.id}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Subtle glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                  loading="lazy"
                />

                {/* Price pill */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 shadow-sm border border-white">
                    <span className="text-xs font-semibold text-gray-500">From</span>
                    <span className="text-sm font-extrabold text-gray-900">
                      ${hotel.price}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">/night</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                    {hotel.name}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <FaUser className="text-sm" />
                    <span className="text-sm font-semibold">{hotel.persons}</span>
                    <span className="text-xs text-gray-500">Guests</span>
                  </div>
                </div>

                {/* Location */}
                <div className="mt-4 flex items-start gap-2">
                  <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {hotel.location}
                    </p>
                    <button className="mt-1 text-amber-600 text-sm font-semibold hover:text-amber-700">
                      View on map →
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* Footer actions */}
                <div className="flex items-center justify-between gap-4">
                  <div className="text-gray-700">
                    <p className="text-xs text-gray-500">Total per night</p>
                    <p className="text-lg font-extrabold">${hotel.price}</p>
                  </div>

                  <button className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-bold text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm">
                    Book now
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}