"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Camera, 
  Scale, 
  History, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { group: "Analysis", items: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analyze Meal", href: "/analyze", icon: Camera },
    { name: "Compare Meals", href: "/compare", icon: Scale },
  ]},
  { group: "Settings", items: [
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help Center", href: "/help", icon: HelpCircle },
  ]}
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl h-screen sticky top-0 hidden lg:flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center shadow-lg">
            <Camera className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-gradient">NutriLens AI</span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
        {menuItems.map((group) => (
          <div key={group.group}>
            <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300",
                    pathname === item.href 
                      ? "bg-emerald-500/10 text-emerald-400" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-emerald-400" : "group-hover:text-emerald-400 transition-colors")} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {pathname === item.href && (
                    <motion.div layoutId="active" className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
