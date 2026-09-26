"use client";

import { useState } from "react";
import { restaurants, searchRestaurants } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import { Search, SlidersHorizontal } from "lucide-react";

const CUISINES = ["All", "North Indian", "Chinese", "Tandoori", "Burgers", "Pizza", "Asian"];

export default function RestaurantsPage() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");

  const filtered = restaurants.filter((r) => {
    const matchQ = !query.trim() || r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase());
    const matchC = cuisine === "All" || r.cuisine.toLowerCase().includes(cuisine.toLowerCase());
    return matchQ && matchC;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-ivory mb-2">🍽️ Restaurants Near You</h1>
        <p className="text-smoke">{restaurants.length} restaurants delivering now</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants or cuisines…"
            className="input-glass pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scroll-rail pb-1">
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setCuisine(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${c === cuisine ? "bg-amber text-void" : "glass text-smoke hover:text-ivory"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-ivory font-semibold mb-2">No restaurants found</p>
          <button onClick={() => { setQuery(""); setCuisine("All"); }} className="btn-pour btn-sm mt-4">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => <RestaurantCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}
