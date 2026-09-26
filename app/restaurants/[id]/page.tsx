"use client";

import { notFound } from "next/navigation";
import { getRestaurantById, restaurants, foodCategories } from "@/data/restaurants";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useState, use } from "react";
import { Star, Clock, Plus, Minus, ArrowLeft, Search, Leaf, Flame } from "lucide-react";
import Link from "next/link";
import type { MenuItem } from "@/data/restaurants";
import type { Product } from "@/data/products";

export default function RestaurantMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const r = getRestaurantById(id);
  if (!r) notFound();

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const availableCategories = [...new Set(r.menu.map((m) => m.category))];

  const filteredMenu = r.menu.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchQ = !query.trim() || item.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  function getQty(itemId: string) {
    return quantities[itemId] ?? 0;
  }

  function setQty(itemId: string, qty: number) {
    setQuantities((p) => ({ ...p, [itemId]: Math.max(0, qty) }));
  }

  function handleAdd(item: MenuItem) {
    const menuProduct: Product = {
      id: item.id,
      name: item.name,
      brand: r.name,
      category: "food",
      size: "1 serving",
      price: item.price,
      mrp: item.mrp ?? item.price,
      rating: item.rating,
      reviews: item.reviews,
      image: item.image,
      ageRestricted: false,
      vendor: r.name,
      vendorId: r.id,
      inStock: item.isAvailable,
    };
    const qty = getQty(item.id) || 1;
    addToCart(menuProduct, qty);
    showToast({ type: "success", title: "Added to cart!", message: `${qty}x ${item.name}` });
    if (!quantities[item.id]) setQty(item.id, 1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
      {/* Banner */}
      <div className="relative h-56 sm:h-72 -mx-4 sm:-mx-6 overflow-hidden mb-0">
        <img src={r.banner} alt={r.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        <Link href="/restaurants" className="absolute top-4 left-4 sm:left-6 btn-icon">
          <ArrowLeft size={18} className="text-ivory" />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl text-ivory">{r.name}</h1>
              <p className="text-smoke text-sm mt-1">{r.cuisine}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-bright/20 border border-emerald-bright/30 rounded-xl px-3 py-2 shrink-0">
              <Star size={14} className="text-emerald-bright fill-current" />
              <span className="text-sm font-bold text-emerald-bright">{r.rating}</span>
              <span className="text-xs text-smoke">({r.reviews})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex flex-wrap items-center gap-4 py-4 border-b border-line text-sm text-smoke">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-amber-light" />{r.eta}</span>
        <span>· ₹{r.priceForTwo} for two</span>
        <span>· Min. order ₹{r.minOrder}</span>
        <span>· {r.deliveryFee === 0 ? <span className="text-emerald-bright">Free delivery</span> : `₹${r.deliveryFee} delivery`}</span>
        {r.offer && <span className="badge-amber ml-auto">🎁 {r.offer}</span>}
      </div>

      <div className="flex gap-6 mt-6">
        {/* Category sidebar */}
        <aside className="hidden md:block w-48 shrink-0">
          <div className="glass-card p-3 sticky top-20">
            <button
              onClick={() => setActiveCategory("all")}
              className={`nav-link w-full ${activeCategory === "all" ? "active" : ""}`}
            >
              All Items
            </button>
            {availableCategories.map((slug) => {
              const cat = foodCategories.find(c => c.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  className={`nav-link w-full ${activeCategory === slug ? "active" : ""}`}
                >
                  {cat ? `${cat.emoji} ${cat.label}` : slug}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Menu items */}
        <div className="flex-1">
          {/* Search */}
          <div className="relative mb-5">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu…"
              className="input-glass pl-9"
            />
          </div>

          {/* Mobile category chips */}
          <div className="flex gap-2 overflow-x-auto scroll-rail pb-2 mb-5 md:hidden">
            <button onClick={() => setActiveCategory("all")} className={`shrink-0 px-4 py-2 rounded-full text-sm ${activeCategory === "all" ? "bg-amber text-void" : "glass text-smoke"}`}>All</button>
            {availableCategories.map(slug => {
              const cat = foodCategories.find(c => c.slug === slug);
              return (
                <button key={slug} onClick={() => setActiveCategory(slug)} className={`shrink-0 px-4 py-2 rounded-full text-sm ${activeCategory === slug ? "bg-amber text-void" : "glass text-smoke"}`}>
                  {cat?.label ?? slug}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredMenu.map((item) => (
              <div key={item.id} className="glass-card p-4 flex gap-4">
                {/* Image */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-cask shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.tag && (
                    <span className="absolute bottom-1 left-1 text-[9px] badge-amber">{item.tag}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.isVeg ? (
                          <span className="veg-badge"><Leaf size={10} />Veg</span>
                        ) : (
                          <span className="nonveg-badge"><Flame size={10} />Non-veg</span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-ivory mt-1 leading-tight">{item.name}</h3>
                      <p className="text-xs text-smoke mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-smoke">
                        <span className="flex items-center gap-1"><Star size={10} className="star-filled fill-current" />{item.rating} ({item.reviews})</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{item.prepTime}</span>
                        {item.calories && <span>{item.calories} kcal</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="font-bold text-ivory">₹{item.price}</span>
                      {item.mrp && item.mrp > item.price && (
                        <span className="text-xs text-smoke line-through ml-1.5">₹{item.mrp}</span>
                      )}
                    </div>

                    {getQty(item.id) === 0 ? (
                      <button
                        onClick={() => { setQty(item.id, 1); handleAdd(item); }}
                        disabled={!item.isAvailable}
                        className="btn-pour btn-sm disabled:opacity-40"
                      >
                        <Plus size={14} /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 glass rounded-full px-1 py-1">
                        <button onClick={() => setQty(item.id, getQty(item.id) - 1)} className="h-6 w-6 rounded-full hover:bg-glass-strong flex items-center justify-center">
                          <Minus size={12} className="text-ivory" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-ivory">{getQty(item.id)}</span>
                        <button onClick={() => { setQty(item.id, getQty(item.id) + 1); handleAdd(item); }} className="h-6 w-6 rounded-full hover:bg-glass-strong flex items-center justify-center">
                          <Plus size={12} className="text-amber-light" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredMenu.length === 0 && (
              <div className="text-center py-16 text-smoke">No items match your search.</div>
            )}
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <Link href="/cart" className="floating-cart">
        <ShoppingBag size={18} /> View Cart
      </Link>
    </div>
  );
}

function ShoppingBag({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}
