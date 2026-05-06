"use client";

import { AnalysisResult } from "@/types";
import { GlassCard } from "@/components/shared/GlassCard";
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  Info,
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisDisplayProps {
  result: AnalysisResult;
  imageUrl?: string;
}

export function AnalysisDisplay({ result, imageUrl }: AnalysisDisplayProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-20"
    >
      {/* Top Hero Section: Image + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image Preview */}
        <motion.div variants={item} className="lg:col-span-3 h-full">
          <GlassCard className="p-0 overflow-hidden h-full min-h-[300px]" hover={false}>
            {imageUrl ? (
              <img src={imageUrl} alt="Uploaded Food" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-emerald-400 opacity-20" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Analysis Live</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Health Score Meter */}
        <motion.div variants={item} className="lg:col-span-2">
          <GlassCard className="flex flex-col items-center justify-center text-center h-full py-10" hover={false}>
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-white/5"
                />
                <motion.circle
                  initial={{ strokeDasharray: "0 534" }}
                  animate={{ strokeDasharray: `${(result.averageHealthScore / 100) * 534} 534` }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  cx="96"
                  cy="96"
                  r="85"
                  fill="none"
                  stroke="url(#arc-gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1 }}
                  className="text-6xl font-black text-gradient"
                >
                  {result.averageHealthScore}
                </motion.span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mt-1">Health Score</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                {result.averageHealthScore > 80 ? "Excellent Choice!" : result.averageHealthScore > 60 ? "Moderate Choice" : "Needs Improvement"}
              </h3>
              <p className="text-sm text-muted-foreground px-6 leading-relaxed">
                This meal profile matches <span className="text-emerald-400 font-bold">Elite Athlete</span> nutritional standards.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Nutrition Grid */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Calories", value: result.totalMacros.calories, unit: "kcal", icon: Zap, color: "emerald" },
          { label: "Protein", value: result.totalMacros.protein, unit: "g", icon: Activity, color: "cyan" },
          { label: "Carbs", value: result.totalMacros.carbs, unit: "g", icon: TrendingUp, color: "emerald" },
          { label: "Fat", value: result.totalMacros.fat, unit: "g", icon: Info, color: "yellow" },
          { label: "Sugar", value: result.totalMacros.sugar, unit: "g", icon: Sparkles, color: "pink" },
          { label: "Fiber", value: result.totalMacros.fiber, unit: "g", icon: ArrowUpRight, color: "orange" },
        ].map((macro, i) => (
          <GlassCard key={i} className="p-4 flex flex-col items-center text-center">
            <div className={`w-8 h-8 rounded-lg bg-${macro.color}-500/10 flex items-center justify-center mb-3`}>
              <macro.icon className={`w-4 h-4 text-${macro.color}-400`} />
            </div>
            <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">{macro.label}</div>
            <div className="text-xl font-black">{macro.value}</div>
            <div className="text-[8px] text-muted-foreground mt-0.5">{macro.unit}</div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Detailed Analysis Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detected Items & Warnings */}
        <motion.div variants={item} className="lg:col-span-2 space-y-8">
          <GlassCard hover={false} className="bg-black/20">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              Nutritional Breakdown
            </h3>
            <div className="space-y-4">
              {result.items.map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/5 group hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.portion}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-400">{item.macros.calories} kcal</div>
                    </div>
                  </div>
                  
                  {item.healthConcerns.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.healthConcerns.map((concern, j) => (
                        <div key={j} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          {concern}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-red-500/5 border-red-500/20" hover={false}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Health Warnings
            </h3>
            <ul className="space-y-3">
              {result.items.flatMap(i => i.healthConcerns).map((warning, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-muted-foreground bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                  <span className="text-red-400 font-bold">•</span>
                  {warning}
                </li>
              ))}
              {result.items.flatMap(i => i.healthConcerns).length === 0 && (
                <li className="text-sm text-muted-foreground italic">No specific health concerns detected.</li>
              )}
            </ul>
          </GlassCard>
        </motion.div>

        {/* AI Recommendations & Alternatives */}
        <motion.div variants={item} className="space-y-8">
          <GlassCard className="bg-emerald-500/5 border-emerald-500/20 h-full" hover={false}>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              AI Recommendations
            </h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">{rec}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-cyan-400">
                <TrendingUp className="w-5 h-5" />
                Better Alternatives
              </h3>
              <div className="space-y-3">
                {result.healthyAlternatives.map((alt, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 hover:bg-cyan-500/10 transition-colors">
                    <span className="text-sm font-medium">{alt}</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
