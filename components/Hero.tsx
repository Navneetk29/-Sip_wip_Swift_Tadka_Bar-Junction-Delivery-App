"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Clock, Tag } from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "Limited Time Deal",
    headline: "Poured fresh.",
    headlineAccent: "Delivered fast.",
    sub: "Wine, beer, whiskey & restaurant food — all in one order. Live tracked, age-verified.",
    cta: { label: "Start an Order", href: "/products" },
    ctaGhost: { label: "Browse Restaurants", href: "/restaurants" },
    badge: "⚡ Flash Sale — 20% off Whiskey",
    badgeColor: "badge-amber",
    bg: "from-[#0B0B0D] via-[#15130F] to-[#1A1208]",
    accent: "before:from-amber/20",
  },
  {
    id: 2,
    eyebrow: "New on SipSwift",
    headline: "Premium imports.",
    headlineAccent: "At cellar prices.",
    sub: "Moët & Chandon, Johnnie Walker Black, Bombay Sapphire — delivered to your door.",
    cta: { label: "Shop Premium", href: "/products?cat=whiskey" },
    ctaGhost: { label: "View All Imports", href: "/products?tag=imported" },
    badge: "🍾 Luxury Collection",
    badgeColor: "badge-gold",
    bg: "from-[#0B0B0D] via-[#12100A] to-[#1A1005]",
    accent: "before:from-gold/15",
  },
  {
    id: 3,
    eyebrow: "Restaurant Specials",
    headline: "Biryani, kebabs",
    headlineAccent: "& 50+ dishes.",
    sub: "Top restaurants delivering your favourite meals — pair with your favourite drink.",
    cta: { label: "Order Food", href: "/restaurants" },
    ctaGhost: { label: "View Offers", href: "/offers" },
    badge: "🔥 Free delivery above ₹299",
    badgeColor: "badge-wine",
    bg: "from-[#0B0B0D] via-[#130A0F] to-[#1A080F]",
    accent: "before:from-wine-bright/15",
  },
];

const TICKER_ITEMS = [
  "⚡ FLASH20 — 20% off all Whiskey",
  "🍺 BEER10 — ₹10 off every beer pack",
  "🎁 NEWUSER50 — ₹50 off your first order",
  "🚀 Free delivery on orders above ₹399",
  "🏆 Earn 2x loyalty points this weekend",
  "🍷 Premium wine collection — now in Delhi, Mumbai, Bangalore",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      {/* Flash sale ticker */}
      <div className="bg-amber/10 border-b border-amber/20 overflow-hidden h-9 flex items-center">
        <div className="flex items-center gap-2 px-4 shrink-0 border-r border-amber/20 h-full">
          <Zap size={12} className="text-amber-light" />
          <span className="text-xs font-mono text-amber-light tracking-widest uppercase">Live Deals</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-xs text-ivory/80 px-8 shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero carousel */}
      <div
        className={`relative bg-gradient-to-br ${slide.bg} min-h-[520px] sm:min-h-[580px]`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-amber-radial opacity-60" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber/8 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-14 pb-16 flex flex-col md:flex-row items-center gap-10 relative">
          {/* Left content */}
          <div className="flex-1 animate-slide-up">
            {slide.badge && (
              <span className={`${slide.badgeColor} inline-flex items-center gap-1.5 mb-5`}>
                {slide.badge}
              </span>
            )}
            <p className="eyebrow mb-3">{slide.eyebrow}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-ivory">
              {slide.headline}
              <br />
              <span className="italic text-amber-light">{slide.headlineAccent}</span>
            </h1>
            <p className="text-smoke mt-5 max-w-md leading-relaxed text-base">{slide.sub}</p>

            {/* Delivery promise pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { icon: <Clock size={13} />, label: "18–30 min delivery" },
                { icon: <Tag size={13} />, label: "Age-verified platform" },
                { icon: <Zap size={13} />, label: "Live tracking" },
              ].map((pill) => (
                <span key={pill.label} className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs text-smoke border border-line">
                  <span className="text-amber-light">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <Link href={slide.cta.href} className="btn-pour">
                {slide.cta.label}
              </Link>
              <Link href={slide.ctaGhost.href} className="btn-ghost">
                {slide.ctaGhost.label}
              </Link>
            </div>
          </div>

          {/* Right: Bottle / decorative */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center shrink-0">
            <div className="relative w-44 sm:w-56 animate-float">
              <svg viewBox="0 0 120 280" className="w-full drop-shadow-[0_0_60px_rgba(200,121,26,0.35)]">
                <defs>
                  <linearGradient id="bottleGrad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#C8791A" />
                    <stop offset="100%" stopColor="#E8C84D" />
                  </linearGradient>
                  <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                  </linearGradient>
                  <clipPath id="bottleClip">
                    <path d="M45 8h30v38c14 8 22 22 22 42v160a14 14 0 0 1-14 14H37a14 14 0 0 1-14-14V88c0-20 8-34 22-42V8z" />
                  </clipPath>
                </defs>
                {/* Bottle outline */}
                <path
                  d="M45 8h30v38c14 8 22 22 22 42v160a14 14 0 0 1-14 14H37a14 14 0 0 1-14-14V88c0-20 8-34 22-42V8z"
                  fill="url(#bottleBody)"
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="1.5"
                />
                {/* Liquid fill */}
                <g clipPath="url(#bottleClip)">
                  <rect x="0" y="100" width="120" height="180" fill="url(#bottleGrad)" opacity="0.85" className="animate-glint" />
                </g>
                {/* Label area */}
                <rect x="27" y="130" width="66" height="80" rx="6" fill="rgba(212,175,55,0.08)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                <text x="60" y="165" textAnchor="middle" fill="rgba(232,169,77,0.9)" fontSize="8" fontFamily="serif" fontStyle="italic">SipSwift</text>
                <text x="60" y="178" textAnchor="middle" fill="rgba(154,148,136,0.6)" fontSize="5" fontFamily="monospace">PREMIUM DELIVERY</text>
                {/* Neck cap */}
                <rect x="50" y="4" width="20" height="12" rx="3" fill="rgba(212,175,55,0.7)" />
              </svg>
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full border border-amber/10 animate-ping-slow" />
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button onClick={prev} className="btn-icon">
            <ChevronLeft size={16} className="text-ivory" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-amber-light w-6" : "bg-smoke/40 w-1.5"}`}
              />
            ))}
          </div>
          <button onClick={next} className="btn-icon">
            <ChevronRight size={16} className="text-ivory" />
          </button>
        </div>
      </div>

      <div className="pour-divider" />
    </section>
  );
}
