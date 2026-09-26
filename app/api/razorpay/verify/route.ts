import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verifies the HMAC-SHA256 signature Razorpay returns after checkout so a
// tampered client-side response can never mark an order as paid.
export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json(
      { error: "RAZORPAY_KEY_SECRET is not set on the server." },
      { status: 500 }
    );
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid = expected === razorpay_signature;

  if (!isValid) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  // TODO: mark the order as paid in the database here.
  return NextResponse.json({ verified: true });
}
