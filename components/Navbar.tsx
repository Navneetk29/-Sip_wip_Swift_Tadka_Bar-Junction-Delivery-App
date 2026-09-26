"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Search,
  ShoppingBag,
  User,
  Heart,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Gift,
  Tag,
  LayoutDashboard,
  Bike,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { categories } from "@/data/products";

const cities = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Kolkata", "Chennai", "Gurugram", "Noida", "Jaipur"];

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, isLoggedIn, logout, selectedCity, setSelectedCity } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/products?q=${encodeURIComponent(query)}`);
  }

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { href: "/products",     label: "Liquor & Snacks" },
    { href: "/restaurants",  label: "Restaurants"    },
    { href: "/offers",       label: "Offers"         },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display italic text-2xl text-ivory leading-none">
              Sip<span className="text-amber-light">Swift</span>
            </span>
          </Link>

          {/* City picker */}
          <div ref={cityRef} className="hidden md:block relative shrink-0">
            <button
              onClick={() => setCityOpen((p) => !p)}
              className="flex items-center gap-1.5 text-sm text-smoke hover:text-ivory transition-colors"
            >
              <MapPin size={14} className="text-amber-light" />
              <span className="text-ivory font-medium max-w-[80px] truncate">{selectedCity}</span>
              <ChevronDown size={12} className={`transition-transform ${cityOpen ? "rotate-180" : ""}`} />
            </button>
            {cityOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 glass-panel rounded-xl2 py-2 animate-slide-down shadow-glass z-50">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCity(c); setCityOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-glass-strong transition-colors ${c === selectedCity ? "text-amber-light font-medium" : "text-ivory"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search whiskey, beer, chakhna, restaurants…"
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 focus:border-amber/50 outline-none transition-all"
            />
            {searchFocused && query.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl2 py-2 shadow-glass z-50">
                {categories.filter(c => c.label.toLowerCase().includes(query.toLowerCase())).slice(0,4).map(c => (
                  <Link
                    key={c.slug}
                    href={`/products?cat=${c.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-glass-strong text-sm"
                    onClick={() => setQuery("")}
                  >
                    <span>{c.emoji}</span>
                    <span className="text-ivory">{c.label}</span>
                    <span className="ml-auto text-smoke text-xs">Category</span>
                  </Link>
                ))}
                <Link
                  href={`/products?q=${encodeURIComponent(query)}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-glass-strong text-sm text-amber-light"
                  onClick={() => setQuery("")}
                >
                  <Search size={14} />
                  Search for &ldquo;{query}&rdquo;
                </Link>
              </div>
            )}
          </form>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-smoke hover:text-ivory transition-colors rounded-lg hover:bg-glass-strong"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative btn-icon hidden sm:flex">
              <Heart size={18} className="text-ivory" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ruby text-ivory text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative btn-icon">
              <ShoppingBag size={18} className="text-ivory" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber text-void text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isLoggedIn ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserOpen((p) => !p)}
                  className="flex items-center gap-2 btn-icon"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-5 w-5 rounded-full object-cover" />
                  ) : (
                    <User size={18} className="text-ivory" />
                  )}
                </button>
                {userOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 glass-panel rounded-xl2 py-2 animate-slide-down shadow-glass">
                    <div className="px-4 py-3 border-b border-line">
                      <p className="text-sm font-semibold text-ivory">{user?.name}</p>
                      <p className="text-xs text-smoke">{user?.email}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Gift size={11} className="text-amber-light" />
                        <span className="text-xs text-amber-light font-medium">{user?.loyaltyPoints} pts</span>
                      </div>
                    </div>
                    {[
                      { href: "/profile",  icon: <User size={14} />,           label: "My Profile"     },
                      { href: "/orders",   icon: <Package size={14} />,         label: "My Orders"      },
                      { href: "/wishlist", icon: <Heart size={14} />,           label: "Wishlist"       },
                      { href: "/offers",   icon: <Tag size={14} />,             label: "Offers & Coupons"},
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-smoke hover:text-ivory hover:bg-glass-strong transition-colors"
                        onClick={() => setUserOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-line mt-1 pt-1">
                      <Link href="/vendor/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-smoke hover:text-ivory hover:bg-glass-strong transition-colors" onClick={() => setUserOpen(false)}>
                        <LayoutDashboard size={14} />Vendor Panel
                      </Link>
                      <Link href="/delivery" className="flex items-center gap-3 px-4 py-2.5 text-sm text-smoke hover:text-ivory hover:bg-glass-strong transition-colors" onClick={() => setUserOpen(false)}>
                        <Bike size={14} />Delivery App
                      </Link>
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-smoke hover:text-ivory hover:bg-glass-strong transition-colors" onClick={() => setUserOpen(false)}>
                        <LayoutDashboard size={14} />Admin Panel
                      </Link>
                    </div>
                    <div className="border-t border-line mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setUserOpen(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors w-full text-left"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-1.5 text-sm text-ivory hover:text-amber-light transition-colors btn-icon">
                <User size={18} />
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden btn-icon"
            >
              {mobileOpen ? <X size={18} className="text-ivory" /> : <Menu size={18} className="text-ivory" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden glass-panel border-t border-line animate-slide-down">
            <div className="px-4 py-3 flex items-center gap-2 border-b border-line">
              <MapPin size={14} className="text-amber-light" />
              <span className="text-sm text-smoke">Deliver to</span>
              <span className="text-sm text-ivory font-medium">{selectedCity}</span>
            </div>
            <nav className="py-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center px-4 py-3 text-sm text-smoke hover:text-ivory hover:bg-glass-strong transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/wishlist" className="flex items-center gap-2 px-4 py-3 text-sm text-smoke hover:text-ivory hover:bg-glass-strong" onClick={() => setMobileOpen(false)}>
                <Heart size={16} /> Wishlist {wishlistCount > 0 && <span className="badge-wine ml-auto">{wishlistCount}</span>}
              </Link>
            </nav>
          </div>
        )}

        <div className="pour-divider" />
      </header>
    </>
  );
}
