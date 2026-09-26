"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ConfirmationResult } from "firebase/auth";
import {
  signInWithGoogle,
  sendOtp,
  confirmOtp,
  sendEmailLink,
} from "@/lib/firebase";

type Tab = "phone" | "email";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    setError(null);
    setLoading(true);
    try {
      const result = await sendOtp(phone.startsWith("+") ? phone : `+91${phone}`);
      setConfirmation(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmOtp() {
    if (!confirmation) return;
    setError(null);
    setLoading(true);
    try {
      await confirmOtp(confirmation, otp);
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendEmailLink() {
    setError(null);
    setLoading(true);
    try {
      await sendEmailLink(email);
      setEmailSent(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl text-ivory mb-2">Welcome to SipSwift</h1>
      <p className="text-smoke text-sm mb-8">Sign in to track orders and save addresses.</p>

      <button onClick={handleGoogle} disabled={loading} className="btn-ghost w-full mb-6">
        Continue with Google
      </button>

      <div className="pour-divider mb-6" />

      <div className="flex gap-2 mb-5">
        <TabButton active={tab === "phone"} onClick={() => setTab("phone")}>
          Phone OTP
        </TabButton>
        <TabButton active={tab === "email"} onClick={() => setTab("email")}>
          Email link
        </TabButton>
      </div>

      {tab === "phone" && (
        <div className="space-y-3">
          <input
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="glass rounded-lg w-full px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50"
          />
          {!confirmation ? (
            <button onClick={handleSendOtp} disabled={loading} className="btn-pour w-full">
              Send OTP
            </button>
          ) : (
            <>
              <input
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="glass rounded-lg w-full px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50"
              />
              <button onClick={handleConfirmOtp} disabled={loading} className="btn-pour w-full">
                Verify & continue
              </button>
            </>
          )}
          <div id="recaptcha-container" />
        </div>
      )}

      {tab === "email" && (
        <div className="space-y-3">
          {emailSent ? (
            <p className="text-smoke text-sm">
              Check <span className="text-ivory">{email}</span> for a sign-in link.
            </p>
          ) : (
            <>
              <input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass rounded-lg w-full px-4 py-2.5 text-sm text-ivory placeholder:text-smoke/60 outline-none focus:border-amber/50"
              />
              <button onClick={handleSendEmailLink} disabled={loading} className="btn-pour w-full">
                Send sign-in link
              </button>
            </>
          )}
        </div>
      )}

      {error && <p className="text-wine text-sm mt-4">{error}</p>}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-full text-sm border transition-colors ${
        active ? "bg-amber text-void border-amber" : "border-line text-smoke"
      }`}
    >
      {children}
    </button>
  );
}
