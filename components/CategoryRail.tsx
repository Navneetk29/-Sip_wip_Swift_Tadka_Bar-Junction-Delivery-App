"use client";

import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoryRail() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="section-title">Shop by Category</h2>
        <Link href="/products" className="text-amber-light text-sm hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
        {categories.filter(c => c.slug !== "restaurants").map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === "restaurants" ? "/restaurants" : `/products?cat=${cat.slug}`}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl glass hover:border-amber/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
              {cat.emoji}
            </div>
            <span className="text-[10px] font-medium text-smoke group-hover:text-ivory transition-colors text-center leading-tight">
              {cat.label}
            </span>
          </Link>
        ))}
        <Link
          href="/restaurants"
          className="group flex flex-col items-center gap-2 p-3 rounded-xl glass hover:border-amber/40 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl transition-transform duration-300 group-hover:scale-110">🍽️</div>
          <span className="text-[10px] font-medium text-smoke group-hover:text-ivory transition-colors text-center leading-tight">
            Restaurants
          </span>
        </Link>
      </div>
    </section>
  );
}
