"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type CardVariant = "default" | "glass" | "glowing" | "interactive";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  glowColor?: string; // e.g. "rgba(0, 245, 255, 0.15)"
}

export function Card({
  children,
  className,
  variant = "default",
  glowColor = "rgba(0, 102, 255, 0.12)",
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const baseStyles = "rounded-2xl border transition-all duration-300 overflow-hidden relative";

  const variants = {
    default: "bg-[#0b1329] border-[rgba(255,255,255,0.06)] text-slate-100",
    glass: "bg-[rgba(11,19,41,0.4)] backdrop-blur-xl border-[rgba(255,255,255,0.05)] text-slate-100 shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]",
    glowing: "bg-[#0b1329] border-[rgba(0,102,255,0.2)] shadow-[0_0_20px_rgba(0,102,255,0.08)] text-slate-100",
    interactive: "bg-[rgba(11,19,41,0.3)] hover:bg-[rgba(11,19,41,0.5)] border-[rgba(255,255,255,0.05)] hover:border-[#0066ff]/30 text-slate-100 hover:-translate-y-0.5 cursor-pointer shadow-md"
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Tracking overlay (only for interactive/glowing cards) */}
      {isHovered && (variant === "interactive" || variant === "glowing" || variant === "glass") && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

// Inner Helper Components for structured card formatting
export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("p-6 pb-4 border-b border-[rgba(255,255,255,0.04)]", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("p-6 pt-4 border-t border-[rgba(255,255,255,0.04)] bg-[rgba(4,8,20,0.2)]", className)} {...props}>
      {children}
    </div>
  );
}
