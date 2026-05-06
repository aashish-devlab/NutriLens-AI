"use client";

import { useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { UploadBox } from "@/components/analysis/UploadBox";
import { AnalysisResult, ComparisonResult } from "@/types";
import { Scale, Check, Zap } from "lucide-react";
import { ComparisonCard } from "@/components/comparison/ComparisonCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/shared/GlassCard";

export default function ComparePage() {
  const [mealA, setMealA] = useState<AnalysisResult | null>(null);
  const [mealB, setMealB] = useState<AnalysisResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  const handleUploadA = async (file: File) => {
    // Mock analysis for Meal A
    setMealA({
      items: [{ name: "Caesar Salad", portion: "Large", macros: { calories: 450, protein: 12, carbs: 25, fat: 32, sugar: 4, fiber: 3 }, healthScore: 65, healthConcerns: ["High saturated fat from dressing"], betterAlternatives: ["Light vinaigrette"], description: "", ingredients: [] }],
      totalMacros: { calories: 450, protein: 12, carbs: 25, fat: 32, sugar: 4, fiber: 3 },
      averageHealthScore: 65,
      recommendations: [],
      healthyAlternatives: [],
      dietaryNotes: []
    });
  };

  const handleUploadB = async (file: File) => {
    // Mock analysis for Meal B
    setMealB({
      items: [{ name: "Greek Salad", portion: "Large", macros: { calories: 320, protein: 10, carbs: 18, fat: 22, sugar: 5, fiber: 4 }, healthScore: 88, healthConcerns: ["Moderate sodium from feta"], betterAlternatives: ["Less feta cheese"], description: "", ingredients: [] }],
      totalMacros: { calories: 320, protein: 10, carbs: 18, fat: 22, sugar: 5, fiber: 4 },
      averageHealthScore: 88,
      recommendations: [],
      healthyAlternatives: [],
      dietaryNotes: []
    });
  };

  const runComparison = async () => {
    if (!mealA || !mealB) return;
    setIsComparing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setComparison({
      mealA: mealA,
      mealB: mealB,
      verdict: "The Greek Salad is the significantly healthier choice due to lower calorie density and better fat profile.",
      winner: 'B',
      comparisonPoints: [
        "Meal B has 130 fewer calories.",
        "Meal A has 45% more saturated fat from dressing.",
        "Meal B provides better micronutrient density.",
        "Sodium levels are 30% lower in Meal B."
      ]
    });
    setIsComparing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Meal <span className="text-gradient">Comparison</span></h1>
          <p className="text-muted-foreground">Undecided? Compare two meals to see which one fits your goals better.</p>
        </div>

        {!comparison ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            <div className="space-y-4">
              <h3 className="text-center font-bold text-lg text-emerald-400">Option A</h3>
              <UploadBox onUpload={handleUploadA} isAnalyzing={false} />
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
              <div className="w-16 h-16 rounded-full bg-background border-4 border-white/10 flex items-center justify-center text-2xl font-black italic text-gradient shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                VS
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-center font-bold text-lg text-cyan-400">Option B</h3>
              <UploadBox onUpload={handleUploadB} isAnalyzing={false} />
            </div>

            <div className="md:col-span-2 flex justify-center mt-8">
              <button
                disabled={!mealA || !mealB || isComparing}
                onClick={runComparison}
                className={cn(
                  "px-12 py-4 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-2xl",
                  mealA && mealB
                    ? "emerald-gradient text-white hover:scale-105"
                    : "bg-white/5 text-muted-foreground cursor-not-allowed border border-white/10"
                )}
              >
                {isComparing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI Comparing...
                  </>
                ) : (
                  <>
                    <Scale className="w-6 h-6" />
                    Compare Meals
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <button
                onClick={() => { setComparison(null); setMealA(null); setMealB(null); }}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                Start New Comparison
              </button>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComparisonCard
                meal={comparison.mealA}
                label="Option A"
                isWinner={comparison.winner === 'A'}
                color="emerald"
              />
              <ComparisonCard
                meal={comparison.mealB}
                label="Option B"
                isWinner={comparison.winner === 'B'}
                color="cyan"
              />
            </div>

            {/* Verdict */}
            <GlassCard className="bg-emerald-500/10 border-emerald-500/20" hover={false}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="text-emerald-400 w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">AI Verdict</h3>
                  <p className="text-lg text-emerald-100 mb-6">{comparison.verdict}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comparison.comparisonPoints.map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground bg-black/20 p-3 rounded-xl">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
