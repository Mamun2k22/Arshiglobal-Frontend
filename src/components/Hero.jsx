import React from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div>
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-emerald-500/40 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-blue-500/35 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                {/* ✅ গ্লোব ব্যাকগ্রাউন্ড - এড করা অংশ */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
                    <div className="relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] animate-spin-slow">
                        <img 
                            src="https://dtora.wpengine.com/wp-content/uploads/2019/03/world-img.png"
                            alt=""
                            className="w-full h-full object-contain opacity-95"
                            loading="lazy"
                        />
                        {/* ঘূর্ণায়মান রিং ইফেক্ট */}
                        <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" />
                        <div className="absolute inset-[10%] rounded-full border border-white/10" />
                    </div>
                </div>

                {/* ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট ওভারলে - গ্লোবের উপর পড়বে */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80 pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="py-20 md:py-24 lg:py-28">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
                            {/* Left */}
                            <div className="order-1">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-xs sm:text-sm">🌍 Overseas Opportunities</span>
                                </div>

                                <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
                                    Find overseas jobs with{" "}
                                    <span className="text-emerald-400">guided documentation</span> &{" "}
                                    <span className="whitespace-nowrap">processing</span>
                                </h1>

                                {/* Bullet chips (mobile friendly) */}
                                <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                                    {[
                                        "Counseling",
                                        "Documentation",
                                        "Submission",
                                        "Result",
                                    ].map((t) => (
                                        <div
                                            key={t}
                                            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-xs sm:text-sm"
                                        >
                                            <span className="text-emerald-400">✓</span>
                                            <span className="text-white/90">{t}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="mt-4 text-slate-200 text-base sm:text-lg max-w-xl">
                                    Start your journey today with our trusted overseas job processing
                                    support.
                                </p>

                                {/* CTAs */}
                                <div className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md">
                                    <Link
                                        to="/jobs"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30"
                                    >
                                        🔍 Browse Jobs
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white font-semibold hover:bg-white/15 transition border border-white/15"
                                    >
                                        📞 Contact Us
                                    </Link>
                                </div>

                                {/* Trust */}
                                <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-emerald-500/15 border border-white/15 flex items-center justify-center text-xs"
                                            >
                                                ✓
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-sm text-slate-300">
                                        <span className="font-bold text-white">500+</span> successful
                                        placements
                                    </div>

                                    <div className="text-sm text-slate-300">
                                        <span className="font-bold text-white">8+</span> years experience
                                    </div>
                                </div>
                            </div>

                            {/* Right Card */}
                            <div className="order-2">
                                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-7 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.8)]">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        {[
                                            { icon: "🔄", title: "Transparent Process", desc: "Step-by-step guidance" },
                                            { icon: "🤝", title: "Trusted Support", desc: "Dedicated help" },
                                            { icon: "⚡", title: "Fast Communication", desc: "WhatsApp support" },
                                            { icon: "📋", title: "Document Check", desc: "Reduce mistakes" },
                                        ].map(({ icon, title, desc }) => (
                                            <div
                                                key={title}
                                                className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition relative overflow-hidden"
                                            >
                                                {/* subtle hover glow */}
                                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
                                                <div className="relative">
                                                    <div className="text-2xl mb-2">{icon}</div>
                                                    <div className="font-semibold text-sm sm:text-base">{title}</div>
                                                    <div className="text-xs sm:text-sm text-slate-300 mt-1">{desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                                        <div className="rounded-xl bg-white/5 border border-white/10 py-3">
                                            <div className="text-xl sm:text-2xl font-bold text-emerald-400">20+</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">Countries</div>
                                        </div>
                                        <div className="rounded-xl bg-white/5 border border-white/10 py-3">
                                            <div className="text-xl sm:text-2xl font-bold text-emerald-400">50+</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">Partners</div>
                                        </div>
                                        <div className="rounded-xl bg-white/5 border border-white/10 py-3">
                                            <div className="text-xl sm:text-2xl font-bold text-emerald-400">24/7</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">Support</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile-only helper spacing */}
                                <div className="h-2 md:hidden" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;