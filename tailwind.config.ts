import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        page: "#232829",
        surface: "#313637",
        "surface-alt": "#2d3233",
        "offer-bg": "#1d5b43",
        accent: "#fdb056",
        sale: "#fd5656",
        success: "#81fe95",
        timer: "#ffbb00",
        danger: "#ff6767",
        border: "#484d4e",
        muted: "#9b9b9b"
      },
      animation: {
        blinkSoft: "blinkSoft 1.15s steps(2, end) infinite",
        criticalTimer: "criticalTimer 0.8s steps(2, end) infinite",
        priceSwap: "priceSwap 320ms ease-out both",
        pulseSale: "pulseSale 1.4s ease-in-out infinite"
      },
      keyframes: {
        blinkSoft: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.45" }
        },
        criticalTimer: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.32" }
        },
        priceSwap: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseSale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
