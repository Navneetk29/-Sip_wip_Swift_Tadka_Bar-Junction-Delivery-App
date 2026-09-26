import Hero from "@/components/Hero";
import CategoryRail from "@/components/CategoryRail";
import ProductCard from "@/components/ProductCard";
import RestaurantCard from "@/components/RestaurantCard";
import { products, categories } from "@/data/products";
import { restaurants } from "@/data/restaurants";
import Link from "next/link";
import { ArrowRight, Zap, Star, Gift, Smartphone } from "lucide-react";

const OFFERS = [
  { code: "NEWUSER50", desc: "₹50 off your first order", min: "Min. ₹199", color: "from-amber/20 to-amber/5", border: "border-amber/30" },
  { code: "BEER10",    desc: "₹10 off every beer order", min: "No minimum", color: "from-gold/15 to-gold/5", border: "border-gold/25" },
  { code: "FLASH20",   desc: "20% off all whiskey",      min: "Min. ₹500",  color: "from-wine-bright/20 to-wine-bright/5", border: "border-ruby/25" },
  { code: "WEEKEND15", desc: "15% off weekend orders",   min: "Sat & Sun only", color: "from-emerald/15 to-emerald/5", border: "border-emerald-bright/25" },
];

const TOP_BRANDS = [
  { name: "Johnnie Walker", emoji: "🥃", cat: "whiskey" },
  { name: "Absolut",        emoji: "🍸", cat: "vodka"   },
  { name: "Kingfisher",     emoji: "🍺", cat: "beer"    },
  { name: "Sula Vineyards", emoji: "🍷", cat: "wine"    },
  { name: "Old Monk",       emoji: "🍹", cat: "rum"     },
  { name: "Bombay Sapphire",emoji: "🌿", cat: "gin"     },
];

export default function HomePage() {
  const trending   = products.slice(0, 4);
  const bestsellers = products.slice(4, 8);
  const newArrivals = products.slice(18, 22);

  return (
    <>
      <Hero />
      <CategoryRail />

      {/* Offers strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="section-title flex items-center gap-2">
            <Zap size={22} className="text-amber-light" />
            Active Offers
          </h2>
          <Link href="/offers" className="text-amber-light text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {OFFERS.map((o) => (
            <div
              key={o.code}
              className={`glass rounded-xl2 p-4 bg-gradient-to-br ${o.color} border ${o.border} hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}
            >
              <p className="font-mono text-sm font-bold text-ivory tracking-wider">{o.code}</p>
              <p className="text-xs text-ivory/80 mt-1">{o.desc}</p>
              <p className="text-[10px] text-smoke mt-1">{o.min}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="section-title">Trending Near You</h2>
          <Link href="/products" className="text-amber-light text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Restaurants delivering now */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="section-title">Restaurants Delivering Now</h2>
          <Link href="/restaurants" className="text-amber-light text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurants.slice(0, 3).map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* Top Brands */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="section-title flex items-center gap-2">
            <Star size={20} className="text-gold" />
            Top Brands
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {TOP_BRANDS.map((b) => (
            <Link
              key={b.name}
              href={`/products?brand=${encodeURIComponent(b.name)}`}
              className="glass rounded-xl2 p-4 flex flex-col items-center gap-2 hover:border-amber/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              <span className="text-[10px] font-medium text-smoke group-hover:text-ivory text-center transition-colors leading-tight">{b.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="section-title">Bestsellers</h2>
          <Link href="/products" className="text-amber-light text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="section-title">New Arrivals</h2>
          <Link href="/products" className="text-amber-light text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Referral Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="relative glass-card overflow-hidden p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-amber-radial opacity-40 pointer-events-none" />
          <div className="relative">
            <Gift size={40} className="text-amber-light mx-auto mb-4" />
            <h2 className="font-display text-3xl text-ivory mb-2">Invite Friends, Earn ₹50</h2>
            <p className="text-smoke max-w-md mx-auto mb-6 text-sm">
              Share your referral code and earn ₹50 loyalty points for every friend who places their first order.
            </p>
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <div className="glass rounded-full px-6 py-3 font-mono text-amber-light font-bold tracking-widest text-lg">
                ARJUN50
              </div>
              <button className="btn-pour">Copy Code</button>
            </div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 mb-8">
        <div className="glass-card p-8 sm:p-12 bg-gradient-to-br from-void via-cask to-void">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <Smartphone size={36} className="text-amber-light mb-4 mx-auto md:mx-0" />
              <h2 className="font-display text-3xl text-ivory mb-2">Get the SipSwift App</h2>
              <p className="text-smoke text-sm mb-6 max-w-md">
                Faster checkout, push notifications for flash sales, and exclusive app-only offers. Available on iOS & Android.
              </p>
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                <button className="btn-ghost btn-sm flex items-center gap-2">
                  <span className="text-lg">🍎</span> App Store
                </button>
                <button className="btn-ghost btn-sm flex items-center gap-2">
                  <span className="text-lg">🤖</span> Google Play
                </button>
              </div>
            </div>
            <div className="shrink-0">
              <div className="glass rounded-3xl p-4 w-48 h-80 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-radial opacity-30" />
                <Smartphone size={48} className="text-amber/60" />
                <p className="font-display text-xl text-ivory text-center italic relative z-10">Sip<span className="text-amber-light">Swift</span></p>
                <div className="relative z-10 flex flex-col gap-2 w-full">
                  {["🍺 Beer", "🥃 Whiskey", "🍷 Wine"].map(l => (
                    <div key={l} className="glass rounded-lg px-3 py-1.5 text-xs text-smoke text-center">{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
