"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { lines, updateQuantity, removeFromCart, subtotal, hasAgeRestrictedItem } = useCart();

  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-ivory mb-3">Your cart is empty</h1>
        <p className="text-smoke mb-6">Add a bottle, a bite, or both.</p>
        <Link href="/products" className="btn-pour">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl text-ivory mb-8">Your cart</h1>

      <div className="space-y-3">
        {lines.map(({ product, quantity }) => (
          <div key={product.id} className="glass-card p-4 flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-smoke">{product.brand}</p>
              <h3 className="text-ivory font-medium truncate">{product.name}</h3>
              <p className="font-mono text-amber-light mt-1">₹{product.price}</p>
            </div>
            <div className="glass flex items-center rounded-full shrink-0">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="h-8 w-8 flex items-center justify-center text-ivory"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center font-mono text-sm text-ivory">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="h-8 w-8 flex items-center justify-center text-ivory"
              >
                <Plus size={12} />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(product.id)}
              aria-label="Remove item"
              className="text-smoke hover:text-wine transition-colors shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {hasAgeRestrictedItem && (
        <p className="text-xs text-amber-light mt-4">
          Your cart contains age-restricted items — ID will be checked at delivery.
        </p>
      )}

      <div className="glass-card p-6 mt-8">
        <div className="flex justify-between text-smoke text-sm mb-2">
          <span>Subtotal</span>
          <span className="font-mono">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-smoke text-sm mb-4">
          <span>Delivery fee</span>
          <span className="font-mono">{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
        </div>
        <div className="pour-divider mb-4" />
        <div className="flex justify-between text-ivory font-semibold text-lg mb-6">
          <span>Total</span>
          <span className="font-mono">₹{total}</span>
        </div>
        <Link href="/checkout" className="btn-pour w-full block text-center">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
