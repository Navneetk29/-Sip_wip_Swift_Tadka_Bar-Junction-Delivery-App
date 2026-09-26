import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import AgeGate from "@/components/AgeGate";
import SupportChat from "@/components/SupportChat";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SipSwift — Premium Alcohol, Chakhna & Restaurant Food Delivery",
  description:
    "Order wine, beer, whiskey, vodka, rum, desi liquor, snacks and restaurant food. Fast, discreet delivery with live tracking. Multi-vendor, age-verified platform.",
  keywords: "alcohol delivery, wine delivery, beer delivery, whiskey online, SipSwift, food delivery",
  openGraph: {
    title: "SipSwift — Poured fresh. Delivered fast.",
    description: "Premium alcohol and restaurant food delivery — 18-30 minutes to your door.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <AgeGate />
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <SupportChat />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
