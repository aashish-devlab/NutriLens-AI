import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NutriLens AI | Precision Nutrition Analysis",
  description: "Advanced AI-powered food analysis, meal comparison, and healthy restaurant discovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${outfit.variable} font-sans antialiased bg-[#020617] text-slate-50 selection:bg-emerald-500/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            {/* Global Gradient Overlays */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>
            
            <div className="animate-in fade-in duration-1000 ease-in-out">
              {children}
            </div>
            <Toaster position="top-center" expand={true} richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
