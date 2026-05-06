"use client";

import { useEffect, useState } from "react";
import { RestaurantSuggestion } from "@/types";
import { fetchHealthyPlaces } from "@/services/places";
import { GlassCard } from "@/components/shared/GlassCard";
import { MapPin, Star, Utensils, ChevronRight, Search, Navigation, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HealthyPlaces() {
  const [places, setPlaces] = useState<RestaurantSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const loadPlaces = async (query?: string, location?: {lat: number, lng: number}) => {
    setLoading(true);
    const data = await fetchHealthyPlaces(query, location?.lat, location?.lng);
    setPlaces(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPlaces(searchQuery, userLocation || undefined);
  };

  const getMyLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        loadPlaces(searchQuery, loc);
      }, (error) => {
        console.error(error);
        setLoading(false);
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black mb-1">Healthy Dining</h2>
          <p className="text-sm text-muted-foreground">Discover AI-recommended healthy spots near you.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search healthy food..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 ring-emerald-500 outline-none transition-all"
            />
          </form>
          <button 
            onClick={getMyLocation}
            className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
            title="Get My Location"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[0, 1, 2].map((i) => (
              <GlassCard key={i} className="h-64 animate-pulse bg-white/5 border-white/10" />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {places.map((place, i) => (
              <GlassCard key={i} className="p-0 overflow-hidden group border border-white/5 hover:border-emerald-500/30 transition-all duration-500" hover={false}>
                <div className="h-32 bg-emerald-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-10 group-hover:scale-125 transition-transform duration-700">
                    🥗
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/10">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    {place.rating || "N/A"}
                  </div>
                  {place.distance && (
                    <div className="absolute bottom-3 left-3 bg-emerald-500/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white">
                      {place.distance}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-black text-lg mb-1 group-hover:text-emerald-400 transition-colors line-clamp-1">{place.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {place.address}
                  </p>
                  
                  <div className="space-y-2.5 mb-6">
                    {place.healthyOptions.map((opt, j) => (
                      <div key={j} className="text-[11px] font-medium flex items-center gap-2.5 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                        {opt}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all duration-500 flex items-center justify-center gap-2">
                    View Healthy Menu <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && places.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-bold">No healthy places found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search query or location.</p>
        </div>
      )}
    </div>
  );
}
