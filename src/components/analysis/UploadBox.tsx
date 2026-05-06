"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Camera, X, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function UploadBox({ onUpload, isAnalyzing }: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File is too large. Max 5MB allowed.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "relative min-h-[350px] rounded-[2.5rem] transition-all duration-500 cursor-pointer overflow-hidden group",
          "border-2 border-dashed",
          isDragActive ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]" : "border-white/10 bg-white/5",
          preview ? "border-solid border-emerald-500/50" : "hover:border-emerald-500/30",
          error ? "border-red-500/50 bg-red-500/5" : ""
        )}
      >
        {/* Animated Gradient Border (Visible on Hover/Active) */}
        <div className="absolute inset-0 p-[2px] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 animate-gradient-x rounded-[2.5rem]" />
          <div className="absolute inset-0 bg-background rounded-[2.5rem] m-[2px]" />
        </div>

        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative z-10 flex flex-col items-center justify-center p-12 text-center h-full"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-24 h-24 rounded-3xl bg-emerald-500/20 flex items-center justify-center"
                >
                  <Upload className="text-emerald-400 w-10 h-10" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center animate-bounce">
                  <Sparkles className="text-white w-4 h-4" />
                </div>
              </div>

              <h3 className="text-3xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Drop your meal here
              </h3>
              <p className="text-muted-foreground max-w-sm mb-8 text-lg">
                Snap a photo or drag & drop to reveal nutritional secrets instantly.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">PNG, JPG, WebP</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">Max 5MB</span>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 text-red-400 font-bold bg-red-500/10 px-4 py-2 rounded-xl"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="preview-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-[400px] z-10"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              
              {/* Overlay */}
              <div className={cn(
                "absolute inset-0 backdrop-blur-sm transition-colors duration-500",
                isAnalyzing ? "bg-black/60" : "bg-black/20 group-hover:bg-black/40"
              )}>
                <div className="flex flex-col items-center justify-center h-full">
                  {isAnalyzing ? (
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="w-24 h-24 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin mx-auto" />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 w-8 h-8 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white mb-2">Analyzing Meal...</h4>
                        <div className="flex gap-1 justify-center">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                              className="w-2 h-2 rounded-full bg-emerald-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={reset}
                      className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:bg-red-600 transition-colors"
                    >
                      <X className="w-8 h-8" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => {}} 
          className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 rounded-3xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Camera className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-bold text-sm">Use Camera</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Instant Capture</div>
          </div>
        </button>
        
        <button 
          onClick={() => {}} 
          className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 rounded-3xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-bold text-sm">Choose File</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Browse Local</div>
          </div>
        </button>
      </div>
    </div>
  );
}
