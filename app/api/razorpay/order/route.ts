import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay keys are not set on the server." },
      { status: 500 }
    );
  }

  try {
    const { amountInPaise, orderId } = await req.json();
    if (!amountInPaise || amountInPaise <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: orderId ?? `sipswift_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Razorpay order creation failed." },
      { status: 500 }
    );
  }
}
