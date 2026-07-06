import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicShaderBackground from "@/components/ui/DynamicShaderBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flogistic Solutions Co | Digital Services, App Development & Automation",
  description: "We build digital solutions — from app development and SaaS B2B platforms to automation and business problem-solving. Flogistic Solutions Co transforms ideas into real-world impact.",
  keywords: ["digital services", "app development", "SaaS B2B", "automation", "problem solving", "Flogistic Solutions"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--text-primary)] antialiased relative min-h-screen overflow-x-hidden`}>
        {/* Dynamic Background Shader Canvas */}
        <DynamicShaderBackground />
        
        {/* Main Interface Dashboard Overlay Container Layer */}
        <main className="relative z-10 w-full min-h-screen mix-blend-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
