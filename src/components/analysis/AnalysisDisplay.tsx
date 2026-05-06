"use client";

import { AnalysisResult } from "@/types";
import { GlassCard } from "@/components/shared/GlassCard";
import { 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  Info,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

export function AnalysisDisplay({ result }: AnalysisDisplayProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Section: Health Score & Macros */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="flex flex-col items-center justify-center text-center py-10" hover={false}>
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-white/5"
              />
              <motion.circle
                initial={{ strokeDasharray: "0 440" }}
                animate={{ strokeDasharray: `${(result.averageHealthScore / 100) * 440} 440` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold">{result.averageHealthScore}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Health Score</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground px-4">
            This meal is <span className="text-emerald-400 font-bold">Better than 85%</span> of your previous meals.
          </p>
        </GlassCard>

        <GlassCard className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6 items-center" hover={false}>
          {[
            { label: "Calories", value: result.totalMacros.calories, unit: "kcal", color: "text-white" },
            { label: "Protein", value: result.totalMacros.protein, unit: "g", color: "text-emerald-400" },
            { label: "Carbs", value: result.totalMacros.carbs, unit: "g", color: "text-cyan-400" },
            { label: "Fat", value: result.totalMacros.fat, unit: "g", color: "text-yellow-400" },
            { label: "Sugar", value: result.totalMacros.sugar, unit: "g", color: "text-pink-400" },
            { label: "Fiber", value: result.totalMacros.fiber, unit: "g", color: "text-orange-400" },
          ].map((macro, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-muted-foreground uppercase font-bold mb-2">{macro.label}</div>
              <div className={`text-3xl font-extrabold ${macro.color}`}>{macro.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{macro.unit}</div>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Main Content: Items & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard hover={false}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-400" />
            Detected Items
          </h3>
          <div className="space-y-4">
            {result.items.map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.portion}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">{item.macros.calories} kcal</div>
                  <div className="flex gap-2 text-[10px] text-muted-foreground justify-end">
                    <span>P: {item.macros.protein}g</span>
                    <span>C: {item.macros.carbs}g</span>
                    <span>S: {item.macros.sugar}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Health Concerns
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.items.flatMap(item => item.healthConcerns).map((concern, i) => (
                <div key={i} className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px]">
                  {concern}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="bg-emerald-500/5 border-emerald-500/20" hover={false}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              AI Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-muted-foreground leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="bg-cyan-500/5 border-cyan-500/20" hover={false}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Healthy Alternatives
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.healthyAlternatives.map((alt, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                  {alt}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
