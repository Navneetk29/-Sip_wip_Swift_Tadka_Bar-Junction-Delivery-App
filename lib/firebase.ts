"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  type ConfirmationResult,
  type Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard against missing config during local dev before keys are added.
const hasConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const firebaseApp = hasConfig
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;

function requireAuth(): Auth {
  if (!auth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* keys to .env.local"
    );
  }
  return auth;
}

// ----- Google Sign-In -----
export async function signInWithGoogle() {
  const a = requireAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(a, provider);
}

// ----- Phone / OTP Sign-In -----
let recaptchaVerifier: RecaptchaVerifier | null = null;

export function initRecaptcha(containerId: string) {
  const a = requireAuth();
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(a, containerId, {
      size: "invisible",
    });
  }
  return recaptchaVerifier;
}

export async function sendOtp(
  phoneNumberE164: string,
  containerId = "recaptcha-container"
): Promise<ConfirmationResult> {
  const a = requireAuth();
  const verifier = initRecaptcha(containerId);
  return signInWithPhoneNumber(a, phoneNumberE164, verifier);
}

export async function confirmOtp(
  confirmation: ConfirmationResult,
  code: string
) {
  return confirmation.confirm(code);
}

// ----- Email link Sign-In -----
export async function sendEmailLink(email: string) {
  const a = requireAuth();
  const actionCodeSettings = {
    url: typeof window !== "undefined" ? window.location.href : "",
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(a, email, actionCodeSettings);
  window.localStorage.setItem("sipswift_email_for_signin", email);
}

export async function completeEmailLinkSignIn(url: string) {
  const a = requireAuth();
  if (!isSignInWithEmailLink(a, url)) return null;
  const email = window.localStorage.getItem("sipswift_email_for_signin");
  if (!email) throw new Error("Missing email for sign-in link confirmation.");
  return signInWithEmailLink(a, email, url);
}
