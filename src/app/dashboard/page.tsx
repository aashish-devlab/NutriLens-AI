"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { 
  TrendingUp, 
  Activity, 
  Utensils, 
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { HealthyPlaces } from "@/components/dashboard/HealthyPlaces";
import Link from "next/link";

const data = [
  { day: "Mon", calories: 2100, protein: 120 },
  { day: "Tue", calories: 1950, protein: 110 },
  { day: "Wed", calories: 2300, protein: 140 },
  { day: "Thu", calories: 1800, protein: 95 },
  { day: "Fri", calories: 2400, protein: 150 },
  { day: "Sat", calories: 2100, protein: 130 },
  { day: "Sun", calories: 1900, protein: 115 },
];

const stats = [
  { label: "Daily Calories", value: "2,140", trend: "+12%", up: true, icon: Activity, color: "emerald" },
  { label: "Protein Intake", value: "124g", trend: "+5%", up: true, icon: Utensils, color: "cyan" },
  { label: "Health Score", value: "84/100", trend: "-2%", up: false, icon: TrendingUp, color: "emerald" },
  { label: "Meals Logged", value: "18", trend: "+8%", up: true, icon: Calendar, color: "cyan" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back, <span className="text-gradient">Aashish</span></h1>
          <p className="text-muted-foreground">Track your nutrition goals and analyze your meals.</p>
        </div>
        <Link href="/analyze">
          <button className="emerald-gradient text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Analyze New Meal
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            <div className="text-2xl font-bold mt-1">{stat.value}</div>
          </GlassCard>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 min-h-[400px]" hover={false}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Nutrition Overview</h2>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs px-3 py-1.5 outline-none focus:ring-1 ring-emerald-500">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#0f172a", 
                    border: "1px solid #ffffff10",
                    borderRadius: "12px",
                    color: "#fff"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col" hover={false}>
          <h2 className="text-xl font-bold mb-6">Recent Analysis</h2>
          <div className="flex-1 space-y-6">
            {[
              { name: "Avocado Toast", time: "2 hours ago", score: 92, image: "🥑" },
              { name: "Grilled Salmon", time: "Yesterday", score: 88, image: "🐟" },
              { name: "Burger & Fries", time: "2 days ago", score: 45, image: "🍔" },
              { name: "Greek Yogurt", time: "3 days ago", score: 95, image: "🥣" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.image}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold group-hover:text-emerald-400 transition-colors">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
                <div className={`text-sm font-bold ${item.score > 80 ? "text-emerald-400" : item.score > 60 ? "text-yellow-400" : "text-red-400"}`}>
                  {item.score}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">
            View All History
          </button>
        </GlassCard>
      </div>

      {/* Healthy Places Section */}
      <HealthyPlaces />
    </div>
  );
}
