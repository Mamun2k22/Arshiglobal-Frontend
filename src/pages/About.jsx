// src/pages/about/About.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Card({ children }) {
  return <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">{children}</div>;
}

function IconDot() {
  return <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />;
}

function SocialLink({ href, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
    >
      <span>{label}</span>
      <span className="text-slate-400">↗</span>
    </a>
  );
}

export default function About() {
  const [settings, setSettings] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const s = await getJSON("/api/site-settings");
        setSettings(s || {});
      } catch (e) {
        setErr(e.message || "Failed to load settings");
        setSettings({});
      }
    })();
  }, []);

  const waLink = useMemo(() => {
    const raw = String(settings?.whatsapp || settings?.whatsappLink || "").trim();
    if (!raw) return "";
    if (raw.includes("wa.me") || raw.startsWith("http")) return raw;
    const digits = raw.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }, [settings]);

  const socials = useMemo(
    () => [
      { label: "Facebook Page", href: settings?.facebook },
      { label: "Facebook Group", href: settings?.facebookGroup },
      { label: "Instagram", href: settings?.instagram },
      { label: "YouTube", href: settings?.youtube },
      { label: "LinkedIn", href: settings?.linkedin },
      { label: "TikTok", href: settings?.tiktok },
      { label: "X (Twitter)", href: settings?.twitter },
      { label: "Google Business", href: settings?.googleBusiness },
      { label: "WhatsApp", href: waLink },
    ],
    [settings, waLink]
  );

  return (
    <div className="bg-slate-50">
      {/* HERO SECTION - ENHANCED */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 relative z-10 mt-4 md:mt-10">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* LEFT COLUMN - ENHANCED */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                <IconDot />
                <span>About Arshi Global</span>
                <span className="text-white/60">• Since 2020</span>
              </div>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
                Arshi Global
              </h1>

              <p className="mt-3 text-white/80 text-base md:text-lg leading-relaxed">
                🌍 Your Premier Partner for <span className="text-emerald-400 font-semibold">Visa, Job & Travel</span> Solutions — 
                Bridging Dreams to Reality with Professional Excellence and Transparent Guidance.
              </p>

              {/* Enhanced Bangla Card */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <p className="text-sm md:text-base font-semibold text-white leading-relaxed">
                  <span className="text-emerald-400 text-lg">🕌 আসসালামু আলাইকুম</span> — 
                  আপনার বিশ্বস্ত ভ্রমণ ও ক্যারিয়ার পার্টনার
                </p>
                <p className="mt-2 text-white/70 text-sm">
                  আমরা বিশ্বাস করি, সঠিক দিকনির্দেশনা ও পেশাদার সহায়তা পেলে আপনার স্বপ্ন পৌঁছাবে সফলতার চূড়ায়। 
                  <span className="font-bold text-emerald-400"> Arshi Global</span> নিয়ে এসেছে ভিসা, জব ও ট্রাভেলের জন্য সম্পূর্ণ আইনসম্মত ও স্বচ্ছ সেবা।
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "✈️ ট্যুর ও ট্রাভেল",
                    "🎓 স্টাডি ভিসা",
                    "💼 ওয়ার্ক পারমিট",
                    "📄 ডকুমেন্টেশন",
                    "🇪🇺 ইউরোপ কনসাল্টেন্সি",
                    "✅ আইনসম্মত প্রক্রিয়া",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm text-white/90 hover:bg-emerald-600/30 transition"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-white/20 flex items-center justify-center text-xs">
                        ✓
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/80">১০০০+ সফল ক্লায়েন্ট</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-700 transition transform hover:scale-105"
                >
                  📞 Free Consultation
                </Link>

                {waLink ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white/10 px-6 py-3 font-semibold hover:bg-white/15 transition backdrop-blur-sm border border-white/20"
                  >
                    💬 WhatsApp Now
                  </a>
                ) : null}
              </div>

              {err ? (
                <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800 text-sm font-semibold">
                  {err}
                </div>
              ) : null}
            </div>

            {/* RIGHT COLUMN - ENHANCED CONTACT INFO */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Quick Contact
                </div>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-emerald-400">📞</span>
                    <span className="font-medium">{settings?.phone || "+880 1316-889944"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-emerald-400">📧</span>
                    <span>{settings?.email || "arshitraveldhaka@gmail.com"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <span className="text-emerald-400">📍</span>
                    <span>{settings?.address || "924-A, BNS CENTER, SECTOR-07, UTTARA, Dhaka"}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <div className="text-sm text-white/80">🕒 Office Hours</div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-white">
                    <span>Saturday–Thursday</span>
                    <span className="font-semibold">10:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70 mt-1">
                    <span>Friday</span>
                    <span className="text-rose-400">Closed</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <div className="text-sm text-white/80">✨ Why Choose Arshi Global?</div>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  {[
                    "✅ 8+ Years of Experience",
                    "✅ 1000+ Successful Visa Applications",
                    "✅ Direct Consultation with Experts",
                    "✅ Transparent Fee Structure",
                    "✅ Document Verification Service",
                    "✅ Post-Visa Support",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-emerald-400">{t.split(' ')[0]}</span>
                      <span>{t.substring(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - ENHANCED */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Who we are - ENHANCED */}
            <Card>
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                  Who We Are
                </h2>

                <p className="mt-4 text-slate-700 leading-relaxed">
                  <span className="font-semibold text-emerald-700">Arshi Global</span> is a premier 
                  visa consultancy and travel assistance firm based in the heart of <span className="font-semibold">Uttara, Dhaka</span>. 
                  Since our establishment, we have been dedicated to providing comprehensive support for 
                  individuals seeking to explore international opportunities through tourism, education, and employment.
                </p>

                <p className="mt-3 text-slate-700 leading-relaxed">
                  What sets us apart is our commitment to <span className="font-semibold">transparency, integrity, 
                  and personalized service</span>. We understand that each client's journey is unique, and we take 
                  the time to understand your specific goals, whether you're planning a European vacation, 
                  pursuing higher education abroad, or seeking overseas employment.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:shadow-md transition">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="text-emerald-600 text-lg">🎯</span>
                      Our Mission
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      To provide accessible, reliable, and ethical visa and travel guidance that empowers 
                      individuals to achieve their international aspirations with confidence.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:shadow-md transition">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="text-emerald-600 text-lg">🌟</span>
                      Our Vision
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      To become Bangladesh's most trusted name in overseas opportunities, known for integrity, 
                      excellence, and client success stories.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-sm font-bold text-slate-900">Our Promise to You</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {[
                        "✓ 100% transparent process with clear timelines",
                        "✓ Professional document verification & checklist",
                        "✓ Fast communication via WhatsApp & phone",
                        "✓ No hidden fees or surprises",
                        "✓ Post-application follow-up support",
                      ].map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="text-emerald-600">{t.substring(0,2)}</span>
                          <span>{t.substring(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-sm font-bold text-slate-900">Our Core Services</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {[
                        "✓ Europe tour planning & travel support",
                        "✓ Study visa counseling (Schengen, UK, Canada)",
                        "✓ Work permit & overseas job processing",
                        "✓ Document legalization & attestation",
                        "✓ Travel insurance assistance",
                      ].map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="text-emerald-600">{t.substring(0,2)}</span>
                          <span>{t.substring(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* How we work - ENHANCED */}
            <Card>
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                  Our Step-by-Step Process
                </h3>
                <p className="mt-2 text-slate-600">
                  We've designed a simple, structured approach to make your journey stress-free and successful.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      step: "01",
                      title: "Initial Consultation",
                      desc: "We sit down with you (in-person or via call) to understand your goals, check eligibility, and discuss the best options for your situation."
                    },
                    {
                      step: "02",
                      title: "Document Preparation",
                      desc: "Our experts provide a detailed checklist, review your documents, and guide you through any corrections or additional requirements."
                    },
                    {
                      step: "03",
                      title: "Application Processing",
                      desc: "We help you complete applications accurately, prepare for interviews if needed, and ensure everything is submitted correctly."
                    },
                    {
                      step: "04",
                      title: "Follow-up & Support",
                      desc: "We stay connected throughout the process, providing updates and answering questions until you reach your destination."
                    }
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-emerald-600 group-hover:scale-110 transition">
                          {step}
                        </span>
                        <span className="font-bold text-slate-900">{title}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-700">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Visit office - ENHANCED */}
            <Card>
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                  Visit Our Office
                </h3>
                <p className="mt-2 text-slate-600">
                  We're conveniently located in Uttara, Dhaka. Come visit us for a face-to-face consultation.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="text-emerald-600">🏢</span>
                      Arshi Global Headquarters
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <div className="flex gap-2">
                        <span className="text-emerald-600">📍</span>
                        <span>924-A, BNS CENTER, SECTOR-07, UTTARA, Dhaka-1230</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-600">📞</span>
                        <span>+880 1316-889944</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-600">📧</span>
                        <span>arshitraveldhaka@gmail.com</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-600">🌐</span>
                        <span>www.arshi-global.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="text-emerald-600">⏰</span>
                      Business Hours
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Saturday - Thursday</span>
                        <span className="font-semibold">10:00 AM – 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <span className="text-rose-600 font-semibold">Closed</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-emerald-700 font-medium">📅 Appointment recommended</p>
                        <p className="text-xs text-slate-500 mt-1">Walk-ins welcome, but booking ensures dedicated time with our experts</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        to="/contact"
                        className="rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-slate-800 transition text-sm"
                      >
                        Book Appointment
                      </Link>

                      {waLink ? (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold hover:bg-slate-50 transition text-sm"
                        >
                          Message on WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Testimonials Section - NEW */}
            <Card>
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                  Client Success Stories
                </h3>
                <p className="mt-2 text-slate-600">
                  Don't just take our word for it — hear from some of our successful clients.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Rafiqul Islam",
                      country: "Germany",
                      type: "Study Visa",
                      quote: "Arshi Global made my dream of studying in Germany possible. Their team guided me through every step of the visa process."
                    },
                    {
                      name: "Nusrat Jahan",
                      country: "Italy",
                      type: "Tourist Visa",
                      quote: "I was nervous about my first European tour, but their team handled everything professionally. Highly recommended!"
                    },
                    {
                      name: "Hasan Mahmud",
                      country: "UK",
                      type: "Work Permit",
                      quote: "Got my UK work permit smoothly. The document checklist saved me from many common mistakes."
                    },
                    {
                      name: "Tahmina Akter",
                      country: "Canada",
                      type: "Study Visa",
                      quote: "Their consultation was spot-on. They helped me prepare for my visa interview and I got approved!"
                    }
                  ].map((client, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{client.name}</div>
                          <div className="text-xs text-emerald-600">{client.country} • {client.type}</div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-slate-700 italic">"{client.quote}"</p>
                      <div className="mt-2 flex text-yellow-400">★★★★★</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - ENHANCED */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <div className="font-extrabold text-slate-900">Connect With Us</div>
                <div className="mt-4 grid gap-3">
                  {socials.map((s, i) => (
                    <SocialLink key={i} href={s.href} label={s.label} />
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="font-extrabold text-slate-900">Quick Links</div>
                <div className="mt-4 grid gap-3">
                  <Link
                    to="/jobs"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>📋 View Jobs</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                  <Link
                    to="/services"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>🛠️ Our Services</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>📞 Contact</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                  <Link
                    to="/visa-guide"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>📘 Visa Guide</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="font-extrabold text-slate-900">Why Clients Trust Us</div>
                <div className="mt-4 space-y-3">
                  {[
                    { icon: "⭐", text: "8+ Years Experience" },
                    { icon: "✅", text: "1000+ Successful Cases" },
                    { icon: "🔒", text: "100% Confidential" },
                    { icon: "💬", text: "Bengali & English Support" },
                    { icon: "⚡", text: "Fast Processing" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="text-emerald-600">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-white">
                <div className="font-extrabold text-emerald-900">Popular Destinations</div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    "🇩🇪 Germany",
                    "🇮🇹 Italy",
                    "🇫🇷 France",
                    "🇪🇸 Spain",
                    "🇬🇧 UK",
                    "🇨🇦 Canada",
                    "🇦🇪 UAE",
                    "🇬🇷 Greece",
                  ].map((country) => (
                    <div key={country} className="text-sm bg-white rounded-lg px-3 py-2 border border-emerald-100">
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
              <div className="text-lg font-extrabold text-emerald-900">📱 Need Immediate Help?</div>
              <div className="mt-2 text-sm text-emerald-800">
                Our visa experts are available on WhatsApp for quick queries and document checks.
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-emerald-800">
                  <span>⚡</span>
                  <span>Average response: &lt; 30 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-800">
                  <span>📄</span>
                  <span>Free document pre-check</span>
                </div>
              </div>

              {waLink ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full justify-center rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700 transition transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <span>💬</span>
                    WhatsApp Now
                  </span>
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full justify-center rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  Contact us
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner - NEW */}
      <section className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-3 text-white/80">
            Whether you're planning a vacation, pursuing education abroad, or seeking overseas employment — 
            we're here to guide you every step of the way.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-700 transition"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/services"
              className="rounded-xl bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition border border-white/20"
            >
              Explore Services
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">
            📍 924-A, BNS CENTER, SECTOR-07, UTTARA, Dhaka | 📞 +880 1316-889944 | 📧 arshitraveldhaka@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
}