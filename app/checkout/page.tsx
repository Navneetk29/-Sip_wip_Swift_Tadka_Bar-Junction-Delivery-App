"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { getStripe } from "@/lib/stripe";
import { MapPin, CreditCard, Wallet, Banknote } from "lucide-react";

type PaymentMethod = "razorpay" | "stripe" | "cod";

export default function CheckoutPage() {
  const { lines, subtotal, clearCart, hasAgeRestrictedItem } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState({
    line1: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [method, setMethod] = useState<PaymentMethod>("razorpay");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;
  const orderId = useMemo(() => `SS-${Date.now()}`, []);

  // COD is withheld for age-restricted baskets — most jurisdictions require
  // prepaid + ID verification for regulated products.
  const codAllowed = !hasAgeRestrictedItem;

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(() => {
      // Wire this coordinate into the Google Maps Geocoding API
      // (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) to reverse-geocode into an address.
      setAddress((a) => ({ ...a, city: a.city || "Current location detected" }));
    });
  }

  async function handlePlaceOrder() {
    setError(null);
    if (!address.line1 || !address.city || !address.pincode || !address.phone) {
      setError("Please complete your delivery address.");
      return;
    }
    setPlacing(true);

    try {
      if (method === "razorpay") {
        const res = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amountInPaise: total * 100, orderId }),
        });
        const order = await res.json();
        if (!res.ok) throw new Error(order.error);

        await openRazorpayCheckout({
          orderId: order.id,
          amountInPaise: total * 100,
          prefill: { contact: address.phone },
          onSuccess: async (response) => {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verify = await verifyRes.json();
            if (verify.verified) {
              clearCart();
              router.push(`/checkout/success?order=${orderId}`);
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          },
          onDismiss: () => setPlacing(false),
        });
      } else if (method === "stripe") {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total * 100, currency: "usd", orderId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        // In production, use Stripe Elements / PaymentElement mounted in a
        // form to confirm data.clientSecret. This is the wiring point:
        const stripe = await getStripe();
        if (!stripe) throw new Error("Stripe failed to load.");
        // stripe.confirmPayment({ elements, clientSecret: data.clientSecret, ... })
        clearCart();
        router.push(`/checkout/success?order=${orderId}`);
      } else {
        // Cash on Delivery — no payment gateway call needed.
        await new Promise((r) => setTimeout(r, 600));
        clearCart();
        router.push(`/checkout/success?order=${orderId}`);
      }
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-smoke">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl text-ivory mb-8">Checkout</h1>

      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-ivory flex items-center gap-2">
            <MapPin size={18} className="text-amber-light" /> Delivery address
          </h2>
          <button onClick={useMyLocation} className="text-xs text-amber-light hover:underline">
            Use current location
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            placeholder="Flat, street, area"
            value={address.line1}
            onChange={(e) => setAddress((a) => ({ ...a, line1: e.target.value }))}
            className="glass rounded-lg px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50 sm:col-span-2"
          />
          <input
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
            className="glass rounded-lg px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50"
          />
          <input
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) => setAddress((a) => ({ ...a, pincode: e.target.value }))}
            className="glass rounded-lg px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50"
          />
          <input
            placeholder="Phone number"
            value={address.phone}
            onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
            className="glass rounded-lg px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50"
          />
        </div>
      </div>

      <div className="glass-card p-6 mb-6">
        <h2 className="font-display text-lg text-ivory mb-4">Payment method</h2>
        <div className="space-y-2">
          <PaymentOption
            icon={<Wallet size={16} />}
            label="UPI / Cards / Wallets (Razorpay)"
            active={method === "razorpay"}
            onClick={() => setMethod("razorpay")}
          />
          <PaymentOption
            icon={<CreditCard size={16} />}
            label="International card (Stripe)"
            active={method === "stripe"}
            onClick={() => setMethod("stripe")}
          />
          <PaymentOption
            icon={<Banknote size={16} />}
            label="Cash on delivery"
            active={method === "cod"}
            onClick={() => codAllowed && setMethod("cod")}
            disabled={!codAllowed}
            disabledNote="Not available for orders containing age-restricted items"
          />
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between text-ivory font-semibold text-lg mb-1">
          <span>Total</span>
          <span className="font-mono">₹{total}</span>
        </div>
        <p className="text-smoke text-xs mb-4">Includes all taxes and fees</p>
        {error && <p className="text-wine text-sm mb-3">{error}</p>}
        <button onClick={handlePlaceOrder} disabled={placing} className="btn-pour w-full disabled:opacity-60">
          {placing ? "Placing order…" : `Place order · ₹${total}`}
        </button>
      </div>
    </div>
  );
}

function PaymentOption({
  icon,
  label,
  active,
  onClick,
  disabled,
  disabledNote,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  disabledNote?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
        active ? "border-amber bg-amber/10" : "border-line"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "hover:border-amber/50"}`}
    >
      <span className="text-amber-light">{icon}</span>
      <span className="text-sm text-ivory flex-1">{label}</span>
      {disabled && disabledNote && (
        <span className="text-[10px] text-smoke">{disabledNote}</span>
      )}
    </button>
  );
}
