"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#040814] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#0066ff] to-[#00f5ff] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] border border-[#00f5ff]/20",
      secondary:
        "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.06)] hover:border-slate-500/40",
      glass:
        "bg-[rgba(11,19,41,0.5)] backdrop-blur-md border border-[rgba(255,255,255,0.05)] text-slate-100 hover:bg-[rgba(11,19,41,0.7)] hover:border-[#00f5ff]/30 shadow-[inset_0_0_8px_rgba(255,255,255,0.02)]",
      outline:
        "bg-transparent border border-[rgba(255,255,255,0.15)] text-slate-300 hover:border-white hover:text-white",
      ghost:
        "bg-transparent text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.02)]"
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3.5 text-base"
    };

    return (
      <motion.button
        ref={ref as any}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        disabled={disabled || isLoading}
        {...(props as any)}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin text-current shrink-0" />}
        {!isLoading && leftIcon && <span className="mr-2 shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="ml-2 shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
