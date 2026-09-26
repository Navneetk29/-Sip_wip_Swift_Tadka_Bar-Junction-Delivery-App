import Link from "next/link";
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Truck,
} from "lucide-react";

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Liquor & Spirits",    href: "/products"          },
      { label: "Restaurants",          href: "/restaurants"       },
      { label: "Flash Sales",          href: "/offers"            },
      { label: "SipSwift Premium",     href: "/offers#premium"    },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Orders",            href: "/orders"            },
      { label: "Wishlist",             href: "/wishlist"          },
      { label: "Profile & Addresses",  href: "/profile"           },
      { label: "Loyalty Points",       href: "/profile#loyalty"   },
    ],
  },
  {
    title: "Partner With Us",
    links: [
      { label: "List Your Restaurant",href: "/vendor/login"       },
      { label: "Register Liquor Store",href: "/vendor/login"      },
      { label: "Become a Delivery Partner", href: "/delivery/login" },
      { label: "Advertise",           href: "/vendor/login"       },
    ],
  },
  {
    title: "Help & Legal",
    links: [
      { label: "Help Centre",         href: "#support"            },
      { label: "Terms of Service",    href: "#terms"              },
      { label: "Privacy Policy",      href: "#privacy"            },
      { label: "Responsible Drinking",href: "#responsibility"     },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-cask border-t border-line mt-16">
      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-6 py-8 border-b border-line/50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Shield size={22} className="text-amber-light" />, label: "Age Verified Platform", sub: "Mandatory 21+ verification on every order" },
            { icon: <Truck size={22} className="text-amber-light" />,  label: "18–30 Min Delivery",    sub: "Live tracking from store to your door"     },
            { icon: <Award size={22} className="text-amber-light" />,  label: "Licensed Vendors Only", sub: "All stores are FSSAI & excise licensed"    },
          ].map((b) => (
            <div key={b.label} className="flex items-start gap-4 glass rounded-xl2 px-4 py-4">
              <div className="h-10 w-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
                {b.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-ivory">{b.label}</p>
                <p className="text-xs text-smoke mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display italic text-2xl text-ivory">
              Sip<span className="text-amber-light">Swift</span>
            </Link>
            <p className="text-xs text-smoke mt-3 leading-relaxed max-w-[200px]">
              Premium alcohol and restaurant food delivery. Age-verified, fast, and discreet.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="h-8 w-8 rounded-full glass flex items-center justify-center hover:border-amber/50 transition-all"
                >
                  <Icon size={14} className="text-smoke hover:text-ivory transition-colors" />
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              <a href="mailto:support@sipswift.in" className="flex items-center gap-2 text-xs text-smoke hover:text-ivory transition-colors">
                <Mail size={12} className="text-amber-light" /> support@sipswift.in
              </a>
              <a href="tel:+918800001234" className="flex items-center gap-2 text-xs text-smoke hover:text-ivory transition-colors">
                <Phone size={12} className="text-amber-light" /> +91 88000 01234
              </a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs font-semibold text-ivory uppercase tracking-wider mb-4">{s.title}</h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-smoke hover:text-ivory transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line/50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-smoke/60">
            © {new Date().getFullYear()} SipSwift Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-smoke/40 text-center">
            🔞 Alcohol is injurious to health. Drink responsibly. Not for sale to minors. Delivery subject to state excise laws.
          </p>
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/120px-RuPay.svg.png" alt="RuPay" className="h-5 opacity-50 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 opacity-50 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 grayscale" />
          </div>
        </div>
      </div>
    </footer>
  );
}
