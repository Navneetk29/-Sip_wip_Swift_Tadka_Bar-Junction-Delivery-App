import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette
        void: "#0B0B0D",
        cask: "#15130F",
        glass: "rgba(255,255,255,0.04)",
        "glass-strong": "rgba(255,255,255,0.08)",
        "glass-panel": "rgba(15,12,8,0.85)",
        gold: "#D4AF37",
        amber: "#C8791A",
        "amber-light": "#E8A94D",
        "amber-dim": "#8B5412",
        ivory: "#F5F1E8",
        "ivory-dim": "#C8C2B4",
        smoke: "#9A9488",
        "smoke-dim": "#5A5650",
        wine: "#5C1A2B",
        "wine-bright": "#9B1D42",
        ruby: "#C42348",
        emerald: "#0D4A3A",
        "emerald-bright": "#10B981",
        line: "rgba(212,175,55,0.15)",
        "line-bright": "rgba(212,175,55,0.35)",
        "line-wine": "rgba(156,29,66,0.20)",
        // Status colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        pour: "linear-gradient(90deg, transparent 0%, #C8791A 20%, #E8A94D 50%, #C8791A 80%, transparent 100%)",
        "amber-radial": "radial-gradient(circle at 30% 20%, rgba(200,121,26,0.25), transparent 60%)",
        "wine-radial": "radial-gradient(circle at 70% 80%, rgba(92,26,43,0.30), transparent 55%)",
        "gold-mesh": "radial-gradient(circle at 15% 0%, rgba(200,121,26,0.10), transparent 45%), radial-gradient(circle at 85% 20%, rgba(212,175,55,0.06), transparent 40%)",
        "hero-gradient": "linear-gradient(135deg, #0B0B0D 0%, #15130F 50%, #1A1208 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "amber-gradient": "linear-gradient(135deg, #C8791A 0%, #E8A94D 100%)",
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #E8C84D 100%)",
        "dark-gradient": "linear-gradient(180deg, #0B0B0D 0%, #15130F 100%)",
        shimmer: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.1) 50%, transparent 100%)",
      },
      keyframes: {
        pourFill: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glint: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.9" },
        },
        rise: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pingSlow: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.1)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200,121,26,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(200,121,26,0.6)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        toastIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        toastOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        pour: "pourFill 3s linear infinite",
        glint: "glint 2.4s ease-in-out infinite",
        rise: "rise 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "slide-left": "slideLeft 0.3s ease-out forwards",
        "slide-right": "slideRight 0.3s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        ticker: "ticker 25s linear infinite",
        "ping-slow": "pingSlow 2s cubic-bezier(0,0,0.2,1) infinite",
        heartbeat: "heartbeat 1s ease-in-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.2s ease-out forwards",
        "toast-in": "toastIn 0.3s ease-out forwards",
        "toast-out": "toastOut 0.3s ease-in forwards",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        amber: "0 0 24px rgba(200,121,26,0.4)",
        "amber-lg": "0 8px 40px -8px rgba(200,121,26,0.5)",
        gold: "0 0 20px rgba(212,175,55,0.3)",
        glass: "0 8px 32px -4px rgba(0,0,0,0.5)",
        card: "0 4px 24px -4px rgba(0,0,0,0.4)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.06)",
        wine: "0 0 24px rgba(92,26,43,0.4)",
      },
      backdropBlur: {
        xs: "4px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
