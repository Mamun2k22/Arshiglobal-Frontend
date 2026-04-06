import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useSiteSettings from "../hooks/useSiteSettings";
import CalendlyModal from "../components/CalendlyModal";
import logo from "../assets/logo.png";
import { FaBars, FaTimes, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/jobs", label: "Jobs" },
  { to: "/media", label: "Media" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/education-guidance", label: "Education Guidance" },
];

function DesktopNavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "font- relative px-3 py-2 text-[14px] font-semibold transition-colors duration-300",
          isActive ? "text-white" : "text-white/85 hover:text-white",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <span className="relative inline-block">
          {children}
          <span
            className={[
              "absolute left-0 -bottom-1.5 h-[2px] rounded-full bg-[#f4b400] transition-all duration-300",
              isActive ? "w-full" : "w-0",
            ].join(" ")}
          />
        </span>
      )}
    </NavLink>
  );
}

function DrawerItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "font-manrope block rounded-xl px-4 py-3 text-sm font-semibold transition",
          isActive
            ? "bg-[#0B5C86] text-white"
            : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const s = useSiteSettings();
  const [openCalendly, setOpenCalendly] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const phoneText = s?.phone || s?.hotline || "+880 1316-889944";

  const waLink = useMemo(() => {
    const num = s?.whatsapp ? String(s.whatsapp).replace(/\D/g, "") : "";
    return num ? `https://wa.me/${num}` : "https://wa.me/8801316889944";
  }, [s?.whatsapp]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openDrawer = () => {
    setDrawerMounted(true);
    requestAnimationFrame(() => setDrawerOpen(true));
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setDrawerMounted(false), 250);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-all duration-300",
          scrolled
            ? "bg-[#0a4f74]/95 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-[#0B567E] to-[#084866]",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between gap-4">
            {/* Brand */}
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img
                src={logo}
                alt="Arshi Global"
                className="h-11 w-11 rounded-full object-contain shadow-md"
                onError={(e) => (e.currentTarget.src = "/logo.webp")}
              />

              <div className="min-w-0 leading-tight">
                <div className="font-poppins truncate text-sm font-bold tracking-tight text-white">
                  {s?.siteName || "Arshi Global"}
                </div>
                <div className="font-manrope text-xs sm:text-sm font-medium text-white/75">
                  Europe Visa • Job • Travel Support
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <DesktopNavItem key={item.to} to={item.to}>
                  {item.label}
                </DesktopNavItem>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setOpenCalendly(true)}
                type="button"
                className="font-poppins hidden md:inline-flex items-center justify-center rounded-full bg-[#f4b400] px-4 py-2 text-[13px] font-bold text-[#0b2239] shadow-md transition hover:bg-[#e0a800]"
              >
                Free Consultation
              </button>

              <button
                onClick={openDrawer}
                type="button"
                className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Open menu"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {drawerMounted && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            onClick={closeDrawer}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Close menu overlay"
          />

          <aside
            className={`absolute right-0 top-0 h-full w-[88%] max-w-[360px] bg-white shadow-2xl transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="border-b px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-poppins text-lg font-bold text-slate-900">
                    {s?.siteName || "Arshi Global"}
                  </div>
                  <div className="font-manrope text-xs text-slate-500">
                    Europe Visa • Job • Travel Support
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <DrawerItem key={item.to} to={item.to} onClick={closeDrawer}>
                    {item.label}
                  </DrawerItem>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenCalendly(true);
                  }}
                  type="button"
                  className="font-poppins w-full rounded-xl bg-[#0B5C86] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#084866]"
                >
                  Free Consultation
                </button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-manrope inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <FaWhatsapp />
                  WhatsApp Chat
                </a>

                <a
                  href={`tel:${String(phoneText).replace(/\s/g, "")}`}
                  className="font-manrope inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <FaPhoneAlt />
                  Call Now
                </a>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t px-5 py-4 text-xs text-slate-500">
              © {new Date().getFullYear()} {s?.siteName || "Arshi Global"}
            </div>
          </aside>
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