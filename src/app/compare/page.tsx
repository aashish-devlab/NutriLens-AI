"use client";

import { useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { GlassCard } from "@/components/shared/GlassCard";
import { UploadBox } from "@/components/analysis/UploadBox";
import { AnalysisResult, ComparisonResult } from "@/types";
import { Scale, Check, Zap, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { ComparisonCard } from "@/components/comparison/ComparisonCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const [mealA, setMealA] = useState<AnalysisResult | null>(null);
  const [mealB, setMealB] = useState<AnalysisResult | null>(null);
  const [imgA, setImgA] = useState<string | null>(null);
  const [imgB, setImgB] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  const handleUploadA = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgA(e.target?.result as string);
    reader.readAsDataURL(file);

    // Mock analysis for Meal A
    setMealA({
      items: [{ name: "Caesar Salad", portion: "Large", macros: { calories: 450, protein: 12, carbs: 25, fat: 32, sugar: 4, fiber: 3 }, healthScore: 65, healthConcerns: ["High saturated fat"], betterAlternatives: [], description: "", ingredients: [] }],
      totalMacros: { calories: 450, protein: 12, carbs: 25, fat: 32, sugar: 4, fiber: 3 },
      averageHealthScore: 65,
      recommendations: [],
      healthyAlternatives: [],
      dietaryNotes: []
    });
  };

  const handleUploadB = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgB(e.target?.result as string);
    reader.readAsDataURL(file);

    // Mock analysis for Meal B
    setMealB({
      items: [{ name: "Greek Salad", portion: "Large", macros: { calories: 320, protein: 10, carbs: 18, fat: 22, sugar: 5, fiber: 4 }, healthScore: 88, healthConcerns: ["Moderate sodium"], betterAlternatives: [], description: "", ingredients: [] }],
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
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setComparison({
      mealA: mealA,
      mealB: mealB,
      verdict: "The Greek Salad is the significantly healthier choice due to lower calorie density and a more favorable fat-to-fiber ratio.",
      winner: 'B',
      comparisonPoints: [
        "Meal B contains 130 fewer calories per serving.",
        "Meal A has 45% more saturated fat from dressing.",
        "Meal B provides better micronutrient variety.",
        "Meal B is 30% lower in processed sodium."
      ]
    });
    setIsComparing(false);
  };

  const reset = () => {
    setComparison(null);
    setMealA(null);
    setMealB(null);
    setImgA(null);
    setImgB(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-2"
          >
            <Scale className="w-4 h-4" />
            <span>AI Decision Engine</span>
          </motion.div>
          <h1 className="text-5xl font-black tracking-tight">Meal <span className="text-gradient">Comparison</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Undecided between two options? Let our AI analyze the nutritional facts and recommend the best fit for your goals.
          </p>
        </div>

        {!comparison ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start relative mt-16">
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-background border-4 border-white/10 flex items-center justify-center text-3xl font-black italic text-gradient shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-pulse">
                VS
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 px-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">1</div>
                <h3 className="font-bold text-xl">First Option</h3>
              </div>
              <UploadBox onUpload={handleUploadA} isAnalyzing={false} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 px-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold">2</div>
                <h3 className="font-bold text-xl">Second Option</h3>
              </div>
              <UploadBox onUpload={handleUploadB} isAnalyzing={false} />
            </div>

            <div className="md:col-span-2 flex flex-col items-center justify-center pt-10">
              <button
                disabled={!mealA || !mealB || isComparing}
                onClick={runComparison}
                className={cn(
                  "px-16 py-5 rounded-3xl text-2xl font-black transition-all duration-500 flex items-center gap-4 shadow-[0_20px_50px_rgba(16,185,129,0.3)] group overflow-hidden relative",
                  mealA && mealB 
                    ? "emerald-gradient text-white hover:scale-105 active:scale-95" 
                    : "bg-white/5 text-muted-foreground cursor-not-allowed border border-white/10"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {isComparing ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Run AI Comparison
                  </>
                )}
              </button>
              <p className="text-xs text-muted-foreground mt-4 font-medium uppercase tracking-widest">Powered by Gemini 1.5 Flash</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="flex justify-center">
              <button 
                onClick={reset}
                className="px-6 py-2 rounded-full border border-white/10 text-sm font-bold text-muted-foreground hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Scale className="w-4 h-4" /> Start New Comparison
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <ComparisonCard 
                meal={comparison.mealA} 
                label="Option A" 
                isWinner={comparison.winner === 'A'} 
                color="emerald" 
                imageUrl={imgA || undefined}
              />
              <ComparisonCard 
                meal={comparison.mealB} 
                label="Option B" 
                isWinner={comparison.winner === 'B'} 
                color="cyan" 
                imageUrl={imgB || undefined}
              />
            </div>

            {/* AI Verdict Premium Card */}
            <GlassCard className="relative overflow-hidden bg-emerald-500/5 border-emerald-500/20 py-10" hover={false}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -ml-32 -mb-32 rounded-full" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center px-6">
                <div className="w-32 h-32 rounded-[2.5rem] bg-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-2xl border border-emerald-500/30">
                  <Trophy className="text-emerald-400 w-16 h-16 animate-bounce" />
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl font-black mb-3 flex items-center gap-3">
                      <Zap className="w-8 h-8 text-emerald-400 fill-emerald-400" />
                      AI Verdict
                    </h3>
                    <p className="text-xl text-emerald-100 font-medium leading-relaxed">{comparison.verdict}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comparison.comparisonPoints.map((point, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 text-sm text-emerald-100/70 bg-black/30 p-4 rounded-2xl border border-white/5"
                      >
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        {point}
                      </motion.div>
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
