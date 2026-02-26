import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useSiteSettings from "../hooks/useSiteSettings";
import CalendlyModal from "../components/CalendlyModal";
import logo from "../assets/logo.png";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const OraNavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "relative px-3 py-2 text-[11px] font-extrabold tracking-wide uppercase transition",
        "text-white/90 hover:text-white",
        isActive ? "text-white" : "",
      ].join(" ")
    }
  >
    {({ isActive }) => (
      <span className="relative">
        {children}
        <span
          className={[
            "absolute left-0 -bottom-2 h-[2px] w-full rounded-full transition",
            isActive ? "bg-white" : "bg-transparent",
          ].join(" ")}
        />
      </span>
    )}
  </NavLink>
);

function DrawerItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl text-sm font-semibold transition ${
          isActive
            ? "bg-slate-900 text-white"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const s = useSiteSettings();
  const [openCalendly, setOpenCalendly] = useState(false);

  // Drawer states
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const waLink = useMemo(() => {
    const num = s?.whatsapp ? String(s.whatsapp).replace(/\D/g, "") : "";
    return num ? `https://wa.me/${num}` : "https://wa.me/8801316889942";
  }, [s?.whatsapp]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDrawer = () => {
    setDrawerMounted(true);
    requestAnimationFrame(() => setDrawerOpen(true));
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setDrawerMounted(false), 220);
  };

  const phoneText = s?.phone || s?.hotline || "+880 1316-889942";

  return (
    <>
      {/* ✅ Navbar */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50",
          "border-b border-white/10",
          "bg-gradient-to-b from-[#0B5C86] to-[#0A4F74]",
          scrolled ? "shadow-lg" : "",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto max-w-7xl px-2 md:px-0",
            "flex items-center justify-between gap-3",
            scrolled ? "h-14" : "h-14",
            "transition-all",
          ].join(" ")}
        >
          {/* ✅ Left: Logo */}
          <Link to="/" className="flex items-center gap-3 min-w-[160px]">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-auto drop-shadow"
              onError={(e) => (e.currentTarget.src = "/logo.webp")}
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-white font-extrabold text-sm">
                {s?.siteName || "Arshi Global"}
              </div>
              <div className="text-[11px] text-white/75 -mt-0.5">
                Visa • Job • Travel
              </div>
            </div>
          </Link>

          {/* ✅ Desktop Nav */}
          <nav className="hidden md:flex items-center 0.5">
            <OraNavItem to="/">Home</OraNavItem>
            <OraNavItem to="/services">Services</OraNavItem>
            <OraNavItem to="/jobs">Jobs</OraNavItem>
            <OraNavItem to="/media">Media</OraNavItem>
            <OraNavItem to="/about">About</OraNavItem>
            {/* <OraNavItem to="/hotel">Hotel</OraNavItem> */}
            <OraNavItem to="/contact">Contact</OraNavItem>
            <OraNavItem to="/education-guidance">Education Guidance</OraNavItem>

            <button
              onClick={() => setOpenCalendly(true)}
              className="
                ml-2 px-4 py-2 rounded-full
                bg-white/15 hover:bg-white/25
                border border-white/20
                text-white text-[12px] font-extrabold uppercase tracking-wide
                transition
              "
              type="button"
            >
              Free Consultation
            </button>
          </nav>

          {/* ✅ Right Side: Phone (Desktop card + Mobile icon) */}
          <div className="flex items-center gap-2">
            {/* Desktop phone card */}
            <div className="hidden lg:block">
              <div className="relative bg-white shadow-md
      pl-[70px] pr-8 py-3
      rounded-l-sm
      -mr-4
      lg:-mr-[calc((100vw-1280px)/2)]">
                <div className="absolute left-0 top-0 bottom-0 w-[30px] bg-[#01ABFF]  flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-[#0B5C86] grid place-items-center">
                    <FaPhoneAlt className="text-white text-sm" />
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="text-[12px] font-extrabold text-[#0b3a63]">
                    {phoneText}
                  </div>
                  <div className="text-[12px] font-semibold text-slate-500">
                    24/7 Customer Support
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Mobile phone button (never disappears now) */}
            <a
              href={`tel:${String(phoneText).replace(/\s/g, "")}`}
              className="lg:hidden h-10 w-10 rounded-full bg-white/15 border border-white/25 grid place-items-center text-white hover:bg-white/25 transition"
              aria-label="Call"
            >
              <FaPhoneAlt />
            </a>

            {/* ✅ Mobile whatsapp button */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="lg:hidden h-10 w-10 rounded-full bg-white/15 border border-white/25 grid place-items-center text-white hover:bg-white/25 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            {/* ✅ Mobile: Drawer button */}
            <button
              onClick={openDrawer}
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 bg-white/10 hover:bg-white/15 border border-white/15 transition"
              aria-label="Open menu"
              type="button"
            >
              <span className="text-xl text-white">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Mobile Drawer */}
      {drawerMounted && (
        <div className="fixed inset-0 z-[100]">
          <div
            onClick={closeDrawer}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
          />

        <div
  className={`absolute right-0 top-0 h-full w-full bg-white shadow-2xl transition-transform duration-200 ${
    drawerOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
            <div className="p-5 flex items-center justify-between border-b">
              <div className="font-extrabold text-slate-900">
                {s?.siteName || "Menu"}
              </div>
              <button
                onClick={closeDrawer}
                className="rounded-xl p-2 hover:bg-slate-100 transition"
                aria-label="Close menu"
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-2">
              <DrawerItem to="/" onClick={closeDrawer}>Home</DrawerItem>
              <DrawerItem to="/services" onClick={closeDrawer}>Services</DrawerItem>
              <DrawerItem to="/jobs" onClick={closeDrawer}>Jobs</DrawerItem>
              <DrawerItem to="/media" onClick={closeDrawer}>Media</DrawerItem>
              <DrawerItem to="/education-guidance" onClick={closeDrawer}>Education Guidance</DrawerItem>
              <DrawerItem to="/about" onClick={closeDrawer}>About</DrawerItem>
              {/* <DrawerItem to="/hotel" onClick={closeDrawer}>Hotel</DrawerItem> */}
              <DrawerItem to="/contact" onClick={closeDrawer}>Contact</DrawerItem>

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenCalendly(true);
                  }}
                  className="w-full rounded-2xl bg-[#0A5E88] px-4 py-3 text-white font-extrabold hover:bg-[#084C6C] transition"
                  type="button"
                >
                  📅 Free Consultation
                </button>

                {/* <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex justify-center rounded-2xl bg-slate-900 px-4 py-3 text-white font-extrabold hover:bg-slate-800 transition"
                >
                  WhatsApp
                </a> */}

                {/* ✅ Mobile phone visible inside drawer too */}
                {/* <a
                  href={`tel:${String(phoneText).replace(/\s/g, "")}`}
                  className="w-full inline-flex justify-center rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 font-extrabold hover:bg-slate-50 transition"
                >
                  Call: {phoneText}
                </a> */}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 border-t text-xs text-slate-500">
              © {new Date().getFullYear()} {s?.siteName || "Arshi Global"}
            </div>
          </div>
        </div>
      )}

      <CalendlyModal
        open={openCalendly}
        onClose={() => setOpenCalendly(false)}
        url={import.meta.env.VITE_CALENDLY_URL}
      />
    </>
  );
}