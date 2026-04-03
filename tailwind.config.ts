import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans:    ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        display: ["Orbitron", "Share Tech Mono", "monospace"],
        mono:    ["Share Tech Mono", "monospace"],
      },
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk neon palette
        neon: {
          green:   "#00ff88",
          magenta: "#ff00ff",
          cyan:    "#00d4ff",
          red:     "#ff3366",
        },
      },
      borderRadius: {
        lg:  "4px",
        md:  "2px",
        sm:  "2px",
        none: "0px",
      },
      boxShadow: {
        "neon-sm":        "0 0 3px #00ff88, 0 0 6px #00ff8830",
        "neon":           "0 0 5px #00ff88, 0 0 10px #00ff8840",
        "neon-lg":        "0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830",
        "neon-magenta":   "0 0 5px #ff00ff, 0 0 20px #ff00ff60",
        "neon-cyan":      "0 0 5px #00d4ff, 0 0 20px #00d4ff60",
        "neon-red":       "0 0 5px #ff3366, 0 0 20px #ff336660",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%":       { transform: "translate(-2px, 2px)" },
          "40%":       { transform: "translate(2px, -2px)" },
          "60%":       { transform: "translate(-1px, -1px)" },
          "80%":       { transform: "translate(1px, 1px)" },
        },
        "rgb-shift": {
          "0%, 100%": { textShadow: "-2px 0 #ff00ff, 2px 0 #00d4ff" },
          "50%":       { textShadow: "2px 0 #ff00ff, -2px 0 #00d4ff" },
        },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff8840" },
          "50%":       { boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830" },
        },
        "border-flow": {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "text-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "blink":          "blink 1s step-end infinite",
        "glitch":         "glitch 0.3s ease-in-out infinite",
        "rgb-shift":      "rgb-shift 2s ease-in-out infinite",
        "scanline":       "scanline 8s linear infinite",
        "neon-pulse":     "neon-pulse 2s ease-in-out infinite",
        "border-flow":    "border-flow 3s linear infinite",
        "fade-up":        "fade-up 0.6s ease-out forwards",
        "text-flicker":   "text-flicker 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
