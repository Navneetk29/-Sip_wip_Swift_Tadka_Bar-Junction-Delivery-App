"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error(
        "Stripe is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local"
      );
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}
