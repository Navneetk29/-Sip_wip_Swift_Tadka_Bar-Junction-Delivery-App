"use client";

import Link from "next/link";
import { ShoppingBag, Star, Heart, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: Props) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast({ type: "success", title: "Added to cart!", message: product.name });
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    showToast({
      type: wishlisted ? "info" : "success",
      title: wishlisted ? "Removed from wishlist" : "Added to wishlist!",
      message: product.name,
    });
  }

  const discountPct = product.discount ?? Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <Link href={`/product/${product.id}`} className="product-card group block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cask">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag ribbon */}
        {product.tag && (
          <span className="tag-ribbon">{product.tag}</span>
        )}

        {/* Discount badge */}
        {discountPct > 0 && !product.tag && (
          <span className="absolute top-3 left-3 badge-success text-[10px]">-{discountPct}%</span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-void/70 flex items-center justify-center">
            <span className="badge-smoke">Out of Stock</span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 h-8 w-8 rounded-full glass flex items-center justify-center transition-all duration-200 ${
            wishlisted ? "bg-ruby/30 border-ruby/50" : "hover:border-line-bright"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={14}
            className={`transition-colors ${wishlisted ? "text-ruby fill-ruby" : "text-ivory"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="eyebrow text-[10px] mb-0.5">{product.brand}</p>
        <h3 className="text-sm font-semibold text-ivory leading-tight line-clamp-2 group-hover:text-amber-light transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-smoke mt-0.5">{product.size}{product.abv ? ` · ${product.abv}` : ""}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={11} className="star-filled fill-current" />
          <span className="text-xs text-ivory font-medium">{product.rating}</span>
          <span className="text-xs text-smoke">({product.reviews})</span>
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-2.5">
          <div>
            <span className="text-base font-bold text-ivory">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-smoke line-through ml-1.5">₹{product.mrp}</span>
            )}
          </div>
          {product.inStock ? (
            <button
              onClick={handleAdd}
              className="h-8 w-8 rounded-full bg-amber hover:bg-amber-light text-void flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Add to cart"
            >
              <Plus size={16} />
            </button>
          ) : (
            <button disabled className="h-8 w-8 rounded-full bg-smoke/20 text-smoke/40 flex items-center justify-center cursor-not-allowed">
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
