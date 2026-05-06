"use client";

import { useEffect, useState } from "react";
import { RestaurantSuggestion } from "@/types";
import { getHealthyPlaces } from "@/services/places";
import { GlassCard } from "@/components/shared/GlassCard";
import { MapPin, Star, Utensils, ChevronRight } from "lucide-react";

export function HealthyPlaces() {
  const [places, setPlaces] = useState<RestaurantSuggestion[]>([]);

  useEffect(() => {
    // In a real app, use navigator.geolocation
    getHealthyPlaces(37.7749, -122.4194).then(setPlaces);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Healthy Places Nearby</h2>
        <button className="text-xs text-emerald-400 font-bold hover:underline">View Map</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place, i) => (
          <GlassCard key={i} className="p-0 overflow-hidden group">
            <div className="h-32 bg-emerald-500/10 relative">
              <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                🥗
              </div>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {place.rating}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold mb-1">{place.name}</h3>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mb-4">
                <MapPin className="w-3 h-3" />
                {place.address} • {place.distance}
              </p>
              
              <div className="space-y-2 mb-4">
                {place.healthyOptions.map((opt, j) => (
                  <div key={j} className="text-[11px] flex items-center gap-2 text-muted-foreground">
                    <Utensils className="w-3 h-3 text-emerald-400" />
                    {opt}
                  </div>
                ))}
              </div>
              
              <button className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1">
                Menu & Directions <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
