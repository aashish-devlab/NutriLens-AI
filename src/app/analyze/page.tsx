"use client";

import { useState } from "react";
import { DashboardLayout } from "@/app/dashboard/layout";
import { UploadBox } from "@/components/analysis/UploadBox";
import { AnalysisDisplay } from "@/components/analysis/AnalysisDisplay";
import { AnalysisResult } from "@/types";
import { Sparkles, History, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Mock API Call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult: AnalysisResult = {
      items: [
        {
          name: "Grilled Salmon",
          portion: "150g",
          macros: { calories: 310, protein: 35, carbs: 0, fat: 18 },
          healthScore: 95,
          description: "Fresh Atlantic salmon grilled with olive oil and herbs.",
          ingredients: ["Salmon", "Olive Oil", "Black Pepper", "Lemon"]
        },
        {
          name: "Quinoa Salad",
          portion: "1 bowl",
          macros: { calories: 220, protein: 8, carbs: 32, fat: 7 },
          healthScore: 88,
          description: "Mixed quinoa with cherry tomatoes, cucumber, and light dressing.",
          ingredients: ["Quinoa", "Cucumber", "Tomato", "Lemon Juice"]
        }
      ],
      totalMacros: { calories: 530, protein: 43, carbs: 32, fat: 25 },
      averageHealthScore: 92,
      recommendations: [
        "Great source of Omega-3 fatty acids from the salmon.",
        "Consider adding more green leafy vegetables for fiber.",
        "The portion size is ideal for a lunch meal."
      ],
      healthyAlternatives: ["Steamed Asparagus", "Brown Rice", "Roasted Sweet Potato"],
      dietaryNotes: ["High Protein", "Gluten-Free", "Rich in Omega-3"]
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4"
          >
            <Camera className="w-4 h-4" />
            <span>Analysis Engine v2.0</span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Analyze Your <span className="text-gradient">Meal</span></h1>
          <p className="text-muted-foreground">Upload or take a photo of your food for instant nutritional insights.</p>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <UploadBox onUpload={handleUpload} isAnalyzing={isAnalyzing} />
              
              {/* Tips Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Good Lighting", desc: "Ensure the food is well-lit for better recognition accuracy." },
                  { title: "Clear Angle", desc: "Top-down or 45-degree angles work best for portion estimation." },
                  { title: "Individual Items", desc: "Separating items visually helps the AI identify each component." },
                ].map((tip, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-bold text-emerald-400 mb-1">{tip.title}</div>
                    <div className="text-xs text-muted-foreground">{tip.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <button 
                  onClick={() => setResult(null)}
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
                >
                  <History className="w-4 h-4" />
                  Analyze Another Meal
                </button>
                <div className="flex gap-4">
                  <button className="text-xs font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    Save to History
                  </button>
                  <button className="text-xs font-bold emerald-gradient text-white px-4 py-2 rounded-lg shadow-lg">
                    Share Report
                  </button>
                </div>
              </div>
              <AnalysisDisplay result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
