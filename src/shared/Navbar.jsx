import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useSiteSettings from "../hooks/useSiteSettings";
import CalendlyModal from "../components/CalendlyModal";
import logo  from "../assets/logo.png"

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `relative px-3 py-2 rounded-lg text-sm font-semibold transition ${
        isActive
          ? "text-slate-900"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`
    }
  >
    {({ isActive }) => (
      <span className="relative">
        {children}
        <span
          className={`absolute left-0 -bottom-2 h-0.5 w-full rounded-full transition ${
            isActive ? "bg-emerald-600" : "bg-transparent"
          }`}
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

  // Drawer animation states
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Navbar shrink on scroll
  const [scrolled, setScrolled] = useState(false);

  // Desktop dropdown
  const [openServices, setOpenServices] = useState(false);

  const waLink = useMemo(() => {
    const num = s?.whatsapp ? String(s.whatsapp).replace(/\D/g, "") : "";
    return num ? `https://wa.me/${num}` : "#";
  }, [s?.whatsapp]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC close drawer
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

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur border-b transition-all ${
          scrolled ? "bg-white/95 shadow-sm" : "bg-white/100"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-4 flex items-center justify-between transition-all ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
                            src={logo}
                            alt="Arshi Global logo"
                            className="h-16 w-auto"
                            onError={(e) => (e.currentTarget.src = "/logo.webp")}
                          />
            {/* <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center font-extrabold">
              {s?.siteName?.slice(0, 1) || "logo"}
            </div> */}
            <div className="leading-tight">
              <div className="font-extrabold text-slate-900">
                {s?.siteName || "Arshi Global"}
              </div>
              <div className="text-xs text-slate-500 -mt-0.5">
                Visa • Job • Travel
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/jobs">Jobs</NavItem>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenServices(true)}
              onMouseLeave={() => setOpenServices(false)}
            >
              <button
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  openServices
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                type="button"
              >
                Services ▾
              </button>

              <div
                className={`absolute left-0 top-full mt-2 w-56 rounded-2xl border bg-white shadow-lg overflow-hidden transition-all origin-top ${
                  openServices
                    ? "opacity-100 scale-100 translate-y-0"
                    : "pointer-events-none opacity-0 scale-95 -translate-y-1"
                }`}
              >
                {/* আপনার প্রয়োজন অনুযায়ী link পরিবর্তন করবেন */}
                <NavLink
                  to="/services"
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  All Services
                </NavLink>
                <NavLink
                  to="/services"
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Visa Assistance
                </NavLink>
                <NavLink
                  to="/services"
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Tour & Travel
                </NavLink>
              </div>
            </div>

            <NavItem to="/media">Media</NavItem>
                <DrawerItem to="/education-guidance" onClick={closeDrawer}>
                Education Guidance
              </DrawerItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>

            {/* CTA + WhatsApp */}
            <button
              onClick={() => setOpenCalendly(true)}
              className="ml-3 rounded-full bg-gradient-to-r from-emerald-500 to-[#063D9D] px-5 py-2.5 text-white text-sm font-extrabold shadow-md hover:scale-[1.03] transition"
              type="button"
            >
              Free Consultation
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="ml-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-[#078a62] text-white text-sm font-semibold hover:bg-slate-800 transition"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={openDrawer}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-slate-100 transition"
            aria-label="Open menu"
            type="button"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerMounted && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            onClick={closeDrawer}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-[82%] max-w-[320px] bg-white shadow-2xl border-l transition-transform duration-200 ${
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
              <DrawerItem to="/" onClick={closeDrawer}>
                Home
              </DrawerItem>
              <DrawerItem to="/jobs" onClick={closeDrawer}>
                Jobs
              </DrawerItem>
              <DrawerItem to="/services" onClick={closeDrawer}>
                Services
              </DrawerItem>
              <DrawerItem to="/media" onClick={closeDrawer}>
                Media
              </DrawerItem>
              <DrawerItem to="/education-guidance" onClick={closeDrawer}>
                Education Guidance
              </DrawerItem>
              <DrawerItem to="/about" onClick={closeDrawer}>
                About
              </DrawerItem>
              <DrawerItem to="/contact" onClick={closeDrawer}>
                Contact
              </DrawerItem>

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenCalendly(true);
                  }}
                  className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-extrabold hover:bg-emerald-700 transition"
                  type="button"
                >
                  📅 Free Consultation
                </button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex justify-center rounded-2xl bg-slate-900 px-4 py-3 text-white font-extrabold hover:bg-slate-800 transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 border-t text-xs text-slate-500">
              © {new Date().getFullYear()} {s?.siteName || "Arshi Global"}
            </div>
          </div>
        </div>
      )}

      {/* Floating “Book” Button (all pages) */}
      <button
        onClick={() => setOpenCalendly(true)}
        className="fixed bottom-5 right-5 z-[60] rounded-full bg-emerald-600 text-white font-extrabold shadow-lg px-5 py-3 hover:bg-emerald-700 hover:scale-[1.03] transition md:hidden"
        type="button"
        aria-label="Book consultation"
      >
        📅 Book
      </button>

      {/* Calendly Modal */}
      <CalendlyModal
        open={openCalendly}
        onClose={() => setOpenCalendly(false)}
        url={import.meta.env.VITE_CALENDLY_URL}
      />
    </>
  );
}
