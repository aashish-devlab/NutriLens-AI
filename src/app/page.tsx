"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Camera, Sparkles, Scale, TrendingUp, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen AI Nutrition Analysis</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
            >
              Know What You Eat With <span className="text-gradient">AI Precision.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed"
            >
              Simply snap a photo of your meal and let NutriLens AI analyze calories, 
              macros, and health scores in seconds. Your journey to a healthier you starts with a lens.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <button className="emerald-gradient text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  Get Started Free <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="glass-morphism text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-colors">
                View Demo
              </button>
            </motion.div>
          </div>

          {/* Feature Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard delay={0.4}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Camera className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Snap & Analyze</h3>
              <p className="text-muted-foreground">
                Advanced computer vision identifies ingredients and portion sizes from a single photo.
              </p>
            </GlassCard>

            <GlassCard delay={0.5}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <Scale className="text-cyan-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compare Meals</h3>
              <p className="text-muted-foreground">
                Undecided between two options? Compare their nutritional profiles and get AI-powered recommendations.
              </p>
            </GlassCard>

            <GlassCard delay={0.6}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Insights</h3>
              <p className="text-muted-foreground">
                Receive personalized health scores and healthy alternatives based on your dietary goals.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Food Items", value: "500k+" },
              { label: "Active Users", value: "50k+" },
              { label: "Accuracy", value: "98.5%" },
              { label: "AI Processed", value: "1M+" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
