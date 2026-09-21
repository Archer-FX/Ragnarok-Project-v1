import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Cyber-Minimalist / Glassmorphism" tomada de las capturas de referencia
        base: {
          950: "#05070f",
          900: "#0a0e1a",
          800: "#0f1424",
          700: "#161c30",
        },
        neon: {
          cyan: "#22d3ee",   // TL - Traducción
          magenta: "#c084fc", // CR - Corrección
          green: "#4ade80",  // SINC - Sincronía
          amber: "#fbbf24",  // QC - Control de calidad / estados de espera
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-cyan": "0 0 12px rgba(34,211,238,0.55)",
        "neon-magenta": "0 0 12px rgba(192,132,252,0.55)",
        "neon-green": "0 0 12px rgba(74,222,128,0.55)",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
