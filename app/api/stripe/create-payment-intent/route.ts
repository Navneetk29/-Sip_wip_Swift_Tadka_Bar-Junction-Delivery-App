import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not set on the server." },
      { status: 500 }
    );
  }
  const stripe = new Stripe(secretKey);

  try {
    const { amount, currency = "usd", orderId } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    // amount must be in the smallest currency unit (e.g. cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { orderId: orderId ?? "" },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Stripe payment intent creation failed." },
      { status: 500 }
    );
  }
}
