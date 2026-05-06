"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass-morphism rounded-[2.5rem] p-6 transition-all duration-500",
        hover && "hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-emerald-500/20",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      {/* Subtle Glow Effect on Hover */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
      )}
    </motion.div>
  );
}
