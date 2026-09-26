"use client";

import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useState, use } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

const MOCK_REVIEWS = [
  { id: 1, name: "Rohan Mehta",  rating: 5, date: "2 days ago",  text: "Excellent product! Delivered within 25 minutes. Packaging was great.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80" },
  { id: 2, name: "Priya Singh",  rating: 4, date: "1 week ago",  text: "Good quality, the taste is smooth. Will definitely reorder.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80" },
  { id: 3, name: "Aakash Gupta", rating: 5, date: "2 weeks ago", text: "Best whiskey at this price point. SipSwift's delivery was super fast as usual.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80" },
];

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "star-filled fill-current" : "star-empty"} />
      ))}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const [qty, setQty] = useState(1);

  function handleAdd() {
    addToCart(product, qty);
    showToast({ type: "success", title: "Added to cart!", message: `${qty}x ${product.name}` });
  }

  function handleWishlist() {
    toggle(product);
    showToast({ type: wishlisted ? "info" : "success", title: wishlisted ? "Removed from wishlist" : "Saved to wishlist!", message: product.name });
  }

  const discountPct = product.discount ?? Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-smoke mb-6">
        <Link href="/" className="hover:text-ivory">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-ivory">Products</Link>
        <span>/</span>
        <Link href={`/products?cat=${product.category}`} className="hover:text-ivory capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-ivory truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-xl3 overflow-hidden bg-cask glass border border-line">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.tag && <span className="tag-ribbon absolute top-4 left-0">{product.tag}</span>}
          {discountPct > 0 && (
            <div className="absolute top-4 right-4">
              <span className="badge-success font-bold">-{discountPct}% OFF</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="font-display text-3xl sm:text-4xl text-ivory mt-2 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-4 mt-3">
            <StarDisplay rating={product.rating} size={16} />
            <span className="text-sm font-bold text-ivory">{product.rating}</span>
            <span className="text-sm text-smoke">({product.reviews} reviews)</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="badge-smoke">{product.size}</span>
            {product.abv && <span className="badge-smoke">ABV {product.abv}</span>}
            {product.origin && <span className="badge-smoke">📍 {product.origin}</span>}
            <span className={product.inStock ? "badge-success" : "badge-error"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="font-display text-4xl text-ivory">₹{product.price}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-xl text-smoke line-through">₹{product.mrp}</span>
                <span className="badge-success font-bold">Save ₹{product.mrp - product.price}</span>
              </>
            )}
          </div>

          <p className="text-sm text-smoke mt-2">
            Sold by <span className="text-amber-light font-medium">{product.vendor}</span>
          </p>

          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center gap-1 glass rounded-full px-1 py-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-8 w-8 rounded-full hover:bg-glass-strong flex items-center justify-center transition-colors">
                <Minus size={14} className="text-ivory" />
              </button>
              <span className="w-8 text-center font-semibold text-ivory">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-8 w-8 rounded-full hover:bg-glass-strong flex items-center justify-center transition-colors">
                <Plus size={14} className="text-ivory" />
              </button>
            </div>

            <button onClick={handleAdd} disabled={!product.inStock} className="btn-pour flex-1 justify-center disabled:opacity-40">
              <ShoppingBag size={18} /> Add to Cart — ₹{product.price * qty}
            </button>

            <button onClick={handleWishlist} className={`btn-icon ${wishlisted ? "border-ruby/50 bg-ruby/10" : ""}`}>
              <Heart size={18} className={wishlisted ? "text-ruby fill-ruby" : "text-ivory"} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-7">
            {[
              { icon: <Truck size={16} />,     label: "18-30 min delivery"    },
              { icon: <Shield size={16} />,    label: "Age verified platform" },
              { icon: <RefreshCw size={16} />, label: "Easy returns"          },
            ].map((b) => (
              <div key={b.label} className="glass rounded-xl p-3 text-center">
                <span className="text-amber-light flex justify-center mb-1">{b.icon}</span>
                <span className="text-[10px] text-smoke leading-tight block">{b.label}</span>
              </div>
            ))}
          </div>

          <Link href="/cart" className="btn-ghost w-full justify-center mt-4">
            Go to Cart
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="section-title mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {MOCK_REVIEWS.map((r) => (
            <div key={r.id} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-ivory">{r.name}</p>
                  <p className="text-xs text-smoke">{r.date}</p>
                </div>
              </div>
              <StarDisplay rating={r.rating} />
              <p className="text-sm text-smoke mt-2 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
