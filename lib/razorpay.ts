"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface OpenRazorpayCheckoutArgs {
  orderId: string; // created server-side via /api/razorpay/order
  amountInPaise: number;
  currency?: string;
  name?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (response: any) => void;
  onDismiss?: () => void;
}

export async function openRazorpayCheckout({
  orderId,
  amountInPaise,
  currency = "INR",
  name = "SipSwift",
  description = "Order payment",
  prefill,
  onSuccess,
  onDismiss,
}: OpenRazorpayCheckoutArgs) {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error("Failed to load Razorpay checkout script.");

  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!key) {
    throw new Error(
      "Razorpay is not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local"
    );
  }

  const rzp = new window.Razorpay({
    key,
    amount: amountInPaise,
    currency,
    name,
    description,
    order_id: orderId,
    prefill,
    theme: { color: "#C8791A" },
    handler: onSuccess,
    modal: { ondismiss: onDismiss },
  });
  rzp.open();
}
