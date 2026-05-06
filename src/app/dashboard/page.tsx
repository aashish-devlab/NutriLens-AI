"use client";

import DashboardLayout from "@/app/dashboard/layout";
import { GlassCard } from "@/components/shared/GlassCard";
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { HealthyPlaces } from "@/components/dashboard/HealthyPlaces";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const data = [
  { name: 'Mon', calories: 2100 },
  { name: 'Tue', calories: 2300 },
  { name: 'Wed', calories: 1900 },
  { name: 'Thu', calories: 2400 },
  { name: 'Fri', calories: 2200 },
  { name: 'Sat', calories: 2600 },
  { name: 'Sun', calories: 2100 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-10 pb-20"
      >
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div variants={item}>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              Welcome Back, <span className="text-gradient">Aashish</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              You've stayed on track for 12 days straight!
            </p>
          </motion.div>
          <motion.div variants={item}>
            <Link href="/analyze">
              <button className="emerald-gradient text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all group">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                Analyze New Meal
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Daily Calories", value: "2,140", change: "+12%", trend: "up", icon: Zap, color: "emerald" },
            { label: "Protein Intake", value: "124g", change: "+5%", trend: "up", icon: Activity, color: "cyan" },
            { label: "Health Score", value: "84/100", change: "-2%", trend: "down", icon: TrendingUp, color: "emerald" },
            { label: "Meals Logged", value: "18", change: "+8%", trend: "up", icon: Calendar, color: "cyan" },
          ].map((stat, i) => (
            <motion.div key={i} variants={item}>
              <GlassCard className="relative overflow-hidden group">
                <div className={cn(
                  "absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40",
                  stat.color === "emerald" ? "bg-emerald-500" : "bg-cyan-500"
                )} />
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg border",
                    stat.trend === "up" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-red-400 bg-red-500/10 border-red-500/20"
                  )}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">{stat.label}</div>
                  <div className="text-3xl font-black">{stat.value}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Chart & History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={item} className="lg:col-span-2">
            <GlassCard className="h-full" hover={false}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black">Nutrition Overview</h2>
                  <p className="text-xs text-muted-foreground mt-1">Calorie consumption trends over the last 7 days</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 ring-emerald-500 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 12}} 
                      dy={10}
                    />
                    <YAxis 
                      hide 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#10b981" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorCal)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={item}>
            <GlassCard className="h-full" hover={false}>
              <h2 className="text-2xl font-black mb-8">Recent Analysis</h2>
              <div className="space-y-6">
                {[
                  { name: "Avocado Toast", time: "2 hours ago", score: 92, emoji: "🥑" },
                  { name: "Grilled Salmon", time: "Yesterday", score: 88, emoji: "🐟" },
                  { name: "Burger & Fries", time: "2 days ago", score: 45, emoji: "🍔" },
                  { name: "Greek Yogurt", time: "3 days ago", score: 95, emoji: "🥣" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
                        {item.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-sm group-hover:text-emerald-400 transition-colors">{item.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.time}
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "font-black text-sm",
                      item.score > 80 ? "text-emerald-400" : item.score > 60 ? "text-cyan-400" : "text-red-400"
                    )}>
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black hover:bg-white/10 transition-all uppercase tracking-widest">
                View All History
              </button>
            </GlassCard>
          </motion.div>
        </div>

        {/* Healthy Places Section */}
        <motion.div variants={item}>
          <HealthyPlaces />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
