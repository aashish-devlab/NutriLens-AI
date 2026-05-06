"use client";

import { AnalysisResult } from "@/types";
import { GlassCard } from "@/components/shared/GlassCard";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonCardProps {
  meal: AnalysisResult;
  label: string;
  isWinner: boolean;
  color: "emerald" | "cyan";
}

export function ComparisonCard({ meal, label, isWinner, color }: ComparisonCardProps) {
  const colorClass = color === "emerald" ? "text-emerald-400" : "text-cyan-400";
  const borderColor = color === "emerald" ? "border-emerald-500/50" : "border-cyan-500/50";

  return (
    <GlassCard 
      className={cn(
        "relative overflow-hidden",
        isWinner ? `${borderColor} shadow-[0_0_40px_rgba(16,185,129,0.15)]` : "opacity-80"
      )}
      hover={false}
    >
      {isWinner && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1 z-20">
          <Trophy className="w-3 h-3" /> AI WINNER
        </div>
      )}
      <h3 className={cn("text-xl font-bold mb-6", colorClass)}>{label}: {meal.items[0]?.name || "Unknown Meal"}</h3>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { l: "Cal", v: meal.totalMacros.calories },
          { l: "Prot", v: meal.totalMacros.protein },
          { l: "Carb", v: meal.totalMacros.carbs },
          { l: "Fat", v: meal.totalMacros.fat },
        ].map((m, j) => (
          <div key={j} className="text-center bg-white/5 rounded-xl py-3">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">{m.l}</div>
            <div className="text-lg font-bold">{m.v}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
        <span className="text-sm font-bold">Health Score</span>
        <span className={cn("text-2xl font-black", meal.averageHealthScore > 80 ? "text-emerald-400" : "text-yellow-400")}>
          {meal.averageHealthScore}
        </span>
      </div>
    </GlassCard>
  );
}
