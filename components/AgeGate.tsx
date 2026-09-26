"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sipswift_age_verified_v1";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = window.localStorage.getItem(STORAGE_KEY);
    if (!verified) setVisible(true);
  }, []);

  function confirmAge() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function decline() {
    window.location.href = "https://www.responsibility.org/";
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-md p-6">
      <div className="glass-card max-w-md w-full p-8 text-center rise">
        <div className="mx-auto mb-5 h-14 w-14 rounded-full glass flex items-center justify-center border-amber/40">
          <span className="font-display text-2xl text-amber-light">21+</span>
        </div>
        <h2 className="font-display text-2xl text-ivory mb-2">
          Are you of legal drinking age?
        </h2>
        <p className="text-smoke text-sm mb-6 leading-relaxed">
          SipSwift sells age-restricted products. By entering, you confirm you
          meet the legal drinking age in your state and agree to our terms.
          Delivery availability for regulated products depends on your
          location.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={decline} className="btn-ghost">
            I'm under age
          </button>
          <button onClick={confirmAge} className="btn-pour">
            Yes, I'm 21+
          </button>
        </div>
        <p className="text-smoke/60 text-xs mt-6">
          Please drink responsibly. SipSwift promotes responsible consumption.
        </p>
      </div>
    </div>
  );
}
