// src/components/FindMatch/FindMatchButton.jsx
// src/components/FindMatch/FindMatchButton.jsx
// Drop-in replacement for the "Find Your People" card button on the Profile page.
// Uses the same glass + cyan glow aesthetic as the rest of Connecto.

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FindMatchButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(167,139,250,0.08) 100%)",
        border: "1px solid rgba(0,229,255,0.25)",
      }}
    >
      {/* Animated glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 40px rgba(0,229,255,0.15)" }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)" }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.3)" }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "#00e5ff" }} />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-bold text-white leading-tight">Find Your Match</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
              Interest-based matching
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1"
          style={{ background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.25)" }}
        >
          <ArrowRight className="w-3.5 h-3.5" style={{ color: "#00e5ff" }} />
        </div>
      </div>
    </motion.button>
  );
}