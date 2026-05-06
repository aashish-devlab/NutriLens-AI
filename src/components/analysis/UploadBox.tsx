"use client";

import { useState, useRef } from "react";
import { Upload, Camera, X, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function UploadBox({ onUpload, isAnalyzing }: UploadBoxProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  const reset = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative min-h-[300px] border-2 border-dashed rounded-3xl transition-all duration-300 flex flex-col items-center justify-center p-8 overflow-hidden",
          dragActive ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]" : "border-white/10 bg-white/5",
          preview ? "border-solid border-emerald-500/50" : ""
        )}
      >
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <Upload className="text-emerald-400 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Upload Meal Photo</h3>
              <p className="text-muted-foreground mb-8">
                Drag and drop your image here, or click to browse
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="emerald-gradient text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                Select Image
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                {isAnalyzing ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <div className="text-white font-bold text-xl flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                      Analyzing Ingredients...
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={reset}
                    className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl hover:bg-white/10 transition-colors">
          <Camera className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm">Use Camera</span>
        </button>
        <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl hover:bg-white/10 transition-colors">
          <ImageIcon className="w-5 h-5 text-cyan-400" />
          <span className="font-medium text-sm">Gallery</span>
        </button>
      </div>
    </div>
  );
}
