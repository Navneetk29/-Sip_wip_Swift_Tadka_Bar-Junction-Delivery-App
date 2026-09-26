# SipSwift — Customer Web App

Premium multi-vendor alcohol + snacks + restaurant delivery web app. Next.js 15 / React 19 / TypeScript / Tailwind, black-and-gold "pour" themed UI, with real integration wiring for Firebase Auth, Razorpay, Stripe, and Google Maps.

This is the **customer web app** slice of the full SipSwift platform (admin dashboard, vendor panel, delivery app, and Node/Express backend are separate builds — ask if you want any of those next).

## What's actually wired up vs. mocked

| Piece | Status |
|---|---|
| UI, routing, cart, product browsing, checkout flow | ✅ Fully built, real code |
| Firebase Auth (Google, Phone/OTP, Email link) | ✅ Real SDK calls in `lib/firebase.ts` — needs your Firebase project keys |
| Razorpay checkout (UPI/cards/wallets) | ✅ Real order-create + signature-verify API routes — needs your Razorpay keys |
| Stripe checkout (international cards) | ✅ Real PaymentIntent API route — needs your Stripe keys, and a `<PaymentElement>` form for full confirmation (see note in `app/checkout/page.tsx`) |
| Google Maps (address autocomplete / live tracking) | 🔲 Wiring point left in `app/checkout/page.tsx` (`useMyLocation`) — needs your Maps key + `@react-google-maps/api` component |
| Product catalog | 🔲 Seed data in `data/products.ts` — swap for your real product-service API once the backend exists |
| Cloudinary image upload | 🔲 Not needed on the customer app (that's a vendor-panel concern) |

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your real API keys
npm run dev
```

Open http://192.168.181.86:3000

## Getting your keys

- **Firebase**: console.firebase.google.com → create project → Authentication → enable Google, Phone, Email link providers → Project settings → your web app config.
- **Razorpay**: dashboard.razorpay.com → Settings → API Keys (use test mode keys first).
- **Stripe**: dashboard.stripe.com → Developers → API keys.
- **Google Maps**: console.cloud.google.com → enable "Maps JavaScript API", "Places API", "Geocoding API" → Credentials → create API key.

## Compliance notes built in

- `components/AgeGate.tsx` blocks the whole app behind a 21+ confirmation before any browsing.
- Cash on delivery is automatically disabled in checkout whenever the cart contains an age-restricted item (`hasAgeRestrictedItem` in `context/CartContext.tsx`).
- Each product has an `ageRestricted` flag; ID-check messaging shows on the product page and cart.
- These are UI-level safeguards only — you still need real backend enforcement (server-side age/ID verification, city-level regulated-product toggles, license checks) before going live. Alcohol delivery laws vary a lot by state/country — check them for every city you operate in.

## Design system

Black-and-amber "pour" theme — see `tailwind.config.ts` and `app/globals.css` for the token system (colors, the animated pour-divider, glass cards). Display font is Fraunces (serif), body is Inter, prices/data use IBM Plex Mono.

## Project structure

```
app/
  page.tsx              Home
  products/page.tsx     Browse + search + category filter
  product/[id]/         Product detail
  cart/page.tsx          Cart
  checkout/page.tsx      Address + payment
  login/page.tsx          Google / Phone OTP / Email link
  api/stripe/…           Stripe PaymentIntent route
  api/razorpay/…          Razorpay order + signature verification routes
components/              Navbar, AgeGate, Hero, CategoryRail, ProductCard, RestaurantCard, Footer
context/CartContext.tsx  Cart state, persisted to localStorage
lib/                      firebase.ts, stripe.ts, razorpay.ts client helpers
data/products.ts          Seed catalog + categories (replace with real API)
```

## Next pieces (not built yet)

Ask for any of these as a follow-up build:
- Node/Express + MongoDB backend (orders, inventory, users)
- Admin dashboard (users, vendors, products, revenue)
- Vendor/restaurant panel (inventory, orders, earnings)
- Delivery partner app (accept orders, navigation, OTP handoff, earnings)
- React Native mobile apps (Android/iOS)
