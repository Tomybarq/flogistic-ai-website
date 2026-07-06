"use client";

import React from "react";
import Link from "next/link";

interface SquircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  containerClassName?: string;
  wrapClassName?: string;
  href?: string;
}

export default function SquircleButton({
  children,
  onClick,
  disabled,
  className = "",
  containerClassName = "",
  wrapClassName = "",
  type = "button",
  href,
  ...props
}: SquircleButtonProps) {
  return (
    <div className={`squircle-btn-container ${containerClassName}`}>
      <div className={`squircle-btn-wrap ${wrapClassName}`}>
        {href ? (
          <Link
            href={href}
            className={`squircle-btn ${className}`}
            style={{ textDecoration: "none" }}
          >
            {children}
          </Link>
        ) : (
          <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`squircle-btn ${className}`}
            {...props}
          >
            {children}
          </button>
        )}
      </div>
    </div>
  );
}
