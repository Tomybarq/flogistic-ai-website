import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flogistic Solutions Co | Digital Services, App Development & Automation",
  description: "We build digital solutions — from app development and SaaS B2B platforms to automation and business problem-solving. Flogistic Solutions Co transforms ideas into real-world impact.",
  keywords: ["digital services", "app development", "SaaS B2B", "automation", "problem solving", "Flogistic Solutions"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--text-primary)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
