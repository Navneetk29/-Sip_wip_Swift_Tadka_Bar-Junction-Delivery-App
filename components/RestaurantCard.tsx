"use client";

import Link from "next/link";
import { Star, Clock, ChevronRight, Leaf, Flame } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";

interface Props {
  r: Restaurant;
}

export default function RestaurantCard({ r }: Props) {
  return (
    <Link href={`/restaurants/${r.id}`} className="glass-card group block overflow-hidden hover:-translate-y-1 transition-all duration-300">
      {/* Banner */}
      <div className="relative h-44 overflow-hidden bg-cask">
        <img
          src={r.banner}
          alt={r.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />

        {/* Offer badge */}
        {r.offer && (
          <div className="absolute bottom-3 left-3">
            <span className="badge-amber text-[10px] font-bold">
              🎁 {r.offer}
            </span>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-3 right-3">
          <span className={`badge text-[10px] font-semibold ${r.isOpen ? "badge-success" : "badge-error"}`}>
            {r.isOpen ? "● Open" : "● Closed"}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-ivory group-hover:text-amber-light transition-colors truncate">
              {r.name}
            </h3>
            <p className="text-xs text-smoke mt-0.5 truncate">{r.cuisine}</p>
          </div>
          <div className="flex items-center gap-1 bg-emerald-bright/10 border border-emerald-bright/20 rounded-lg px-2 py-1 shrink-0">
            <Star size={11} className="text-emerald-bright fill-current" />
            <span className="text-xs font-bold text-emerald-bright">{r.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-smoke">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-amber-light" />
            {r.eta}
          </span>
          <span className="text-line">·</span>
          <span>₹{r.priceForTwo} for two</span>
          <span className="text-line">·</span>
          <span className={r.deliveryFee === 0 ? "text-emerald-bright" : ""}>
            {r.deliveryFee === 0 ? "Free delivery" : `₹${r.deliveryFee} delivery`}
          </span>
        </div>

        {/* Tags */}
        {r.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {r.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge-smoke text-[9px]">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
          <span className="text-xs text-smoke">Min. order ₹{r.minOrder}</span>
          <span className="text-xs text-amber-light flex items-center gap-1">
            View menu <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
