"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-4 mt-6">
      <div className="glass flex items-center rounded-full">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-10 w-10 flex items-center justify-center text-ivory"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-mono text-ivory">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="h-10 w-10 flex items-center justify-center text-ivory"
        >
          <Plus size={14} />
        </button>
      </div>
      <button onClick={handleAdd} className="btn-pour flex-1">
        {added ? "Added to cart ✓" : "Add to cart"}
      </button>
    </div>
  );
}
