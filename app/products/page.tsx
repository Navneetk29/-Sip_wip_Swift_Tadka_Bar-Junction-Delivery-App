"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, categories, getProductsByCategory, searchProducts } from "@/data/products";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";
import Link from "next/link";

const SORT_OPTIONS = [
  { value: "default",     label: "Relevance"        },
  { value: "price-asc",   label: "Price: Low to High" },
  { value: "price-desc",  label: "Price: High to Low" },
  { value: "rating",      label: "Highest Rated"    },
  { value: "discount",    label: "Best Discount"    },
];

const PRICE_RANGES = [
  { label: "Under ₹500",        min: 0,    max: 499   },
  { label: "₹500 – ₹1,000",     min: 500,  max: 999   },
  { label: "₹1,000 – ₹3,000",   min: 1000, max: 2999  },
  { label: "₹3,000+",           min: 3000, max: 99999 },
];

export default function ProductsPage() {
  const params = useSearchParams();
  const initialCat = params.get("cat") || "all";
  const initialQ   = params.get("q") || "";

  const [activeCat, setActiveCat]   = useState(initialCat);
  const [sort, setSort]             = useState("default");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [minRating, setMinRating]   = useState(0);
  const [query, setQuery]           = useState(initialQ);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen]     = useState(false);

  const filtered = useMemo(() => {
    let list = query.trim() ? searchProducts(query) : getProductsByCategory(activeCat === "all" ? undefined : activeCat);
    if (priceRange) list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price-asc":  list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating":     list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "discount":   list = [...list].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)); break;
    }
    return list;
  }, [activeCat, query, sort, priceRange, minRating]);

  function clearFilters() {
    setActiveCat("all");
    setPriceRange(null);
    setMinRating(0);
    setQuery("");
    setSort("default");
  }

  const hasFilters = activeCat !== "all" || priceRange || minRating > 0 || query;

  const Sidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-smoke uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveCat("all")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeCat === "all" ? "bg-amber/10 text-amber-light border border-amber/20" : "text-smoke hover:text-ivory hover:bg-glass-strong"}`}
          >
            All Products
          </button>
          {categories.filter(c => c.slug !== "restaurants").map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCat(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${activeCat === cat.slug ? "bg-amber/10 text-amber-light border border-amber/20" : "text-smoke hover:text-ivory hover:bg-glass-strong"}`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-semibold text-smoke uppercase tracking-wider mb-3">Price Range</h3>
        <div className="space-y-1">
          {PRICE_RANGES.map((r) => (
            <button
              key={r.label}
              onClick={() => setPriceRange(priceRange?.min === r.min ? null : r)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${priceRange?.min === r.min ? "bg-amber/10 text-amber-light border border-amber/20" : "text-smoke hover:text-ivory hover:bg-glass-strong"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-semibold text-smoke uppercase tracking-wider mb-3">Minimum Rating</h3>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${minRating === r && r > 0 ? "bg-amber/10 text-amber-light border border-amber/20" : "text-smoke hover:text-ivory hover:bg-glass-strong"}`}
            >
              {r > 0 ? `⭐ ${r}+` : "All Ratings"}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button onClick={clearFilters} className="w-full btn-ghost btn-sm flex items-center justify-center gap-2">
          <X size={14} /> Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex-1">
          <h1 className="font-display text-3xl text-ivory">
            {query ? `Results for "${query}"` : activeCat === "all" ? "All Products" : categories.find(c => c.slug === activeCat)?.label ?? "Products"}
          </h1>
          <p className="text-smoke text-sm mt-1">{filtered.length} products found</p>
        </div>

        {/* Search in page */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="input-glass pl-9"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((p) => !p)}
            className="btn-ghost btn-sm flex items-center gap-2"
          >
            Sort: {SORT_OPTIONS.find(s => s.value === sort)?.label}
            <ChevronDown size={14} className={sortOpen ? "rotate-180" : ""} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 glass-panel rounded-xl py-2 z-30 animate-slide-down shadow-glass">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => { setSort(s.value); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === s.value ? "text-amber-light" : "text-smoke hover:text-ivory hover:bg-glass-strong"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile filter toggle */}
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn-ghost btn-sm flex items-center gap-2">
          <SlidersHorizontal size={15} /> Filters
          {hasFilters && <span className="badge-amber text-[9px]">Active</span>}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="glass-card p-4 sticky top-20">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-void/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 glass-panel p-6 overflow-y-auto animate-slide-left">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-ivory">Filters</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={20} className="text-smoke hover:text-ivory" />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-smoke text-4xl mb-4">🔍</p>
              <p className="text-ivory font-semibold mb-2">No products found</p>
              <p className="text-smoke text-sm mb-6">Try a different search term or clear your filters</p>
              <button onClick={clearFilters} className="btn-pour btn-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
