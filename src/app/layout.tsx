import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "NutriLens AI | Precision Nutrition Analysis",
  description: "Analyze your meals with AI precision. Get instant nutritional insights, macro tracking, and healthy recommendations.",
  keywords: ["AI Nutrition", "Food Analysis", "Health Tech", "Macro Tracker", "Gemini AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
