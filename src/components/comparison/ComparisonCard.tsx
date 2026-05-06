"use client";

import { AnalysisResult } from "@/types";
import { GlassCard } from "@/components/shared/GlassCard";
import { Trophy, Activity, Zap, Info, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ComparisonCardProps {
  meal: AnalysisResult;
  label: string;
  isWinner: boolean;
  color: "emerald" | "cyan";
  imageUrl?: string;
}

export function ComparisonCard({ meal, label, isWinner, color, imageUrl }: ComparisonCardProps) {
  const colorClass = color === "emerald" ? "text-emerald-400" : "text-cyan-400";
  const borderColor = color === "emerald" ? "border-emerald-500/50" : "border-cyan-500/50";
  const bgColor = color === "emerald" ? "bg-emerald-500/10" : "bg-cyan-500/10";

  return (
    <GlassCard 
      className={cn(
        "relative overflow-hidden flex flex-col h-full",
        isWinner ? `${borderColor} shadow-[0_0_40px_rgba(16,185,129,0.15)] scale-[1.02]` : "opacity-90"
      )}
      hover={false}
    >
      {/* Image Section */}
      <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", bgColor)}>
            <Activity className={cn("w-10 h-10 opacity-20", colorClass)} />
          </div>
        )}
        {isWinner && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1 z-20 shadow-xl border border-white/20">
            <Trophy className="w-3 h-3" /> BEST CHOICE
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>

      <h3 className={cn("text-2xl font-black mb-1", colorClass)}>
        {meal.items[0]?.name || "Unknown Meal"}
      </h3>
      <p className="text-xs text-muted-foreground mb-6 line-clamp-1">{meal.items[0]?.portion || "Standard Portion"}</p>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { l: "Calories", v: meal.totalMacros.calories, u: "kcal", icon: Zap },
          { l: "Protein", v: meal.totalMacros.protein, u: "g", icon: Activity },
          { l: "Fat", v: meal.totalMacros.fat, u: "g", icon: Info },
          { l: "Score", v: meal.averageHealthScore, u: "/100", icon: ArrowUpRight },
        ].map((m, j) => (
          <div key={j} className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <m.icon className={cn("w-3 h-3", colorClass)} />
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">{m.l}</span>
            </div>
            <div className="text-lg font-black">{m.v}<span className="text-[10px] text-muted-foreground font-normal ml-0.5">{m.u}</span></div>
          </div>
        ))}
      </div>

      {/* Goal Suitability */}
      <div className="mt-auto">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-2">Goal Suitability</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${meal.averageHealthScore}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className={cn("h-full", color === "emerald" ? "emerald-gradient" : "bg-gradient-to-r from-cyan-500 to-blue-500")} 
              />
            </div>
            <span className="text-xs font-bold">{meal.averageHealthScore > 80 ? "High" : "Optimal"}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
