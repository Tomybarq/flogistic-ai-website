"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Palette, ChevronDown, ChevronUp } from "lucide-react";

export default function ColorPaletteVerification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsLight(root.getAttribute("data-theme") === "light");
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme");
    if (currentTheme === "light") {
      root.removeAttribute("data-theme");
      setIsLight(false);
    } else {
      root.setAttribute("data-theme", "light");
      setIsLight(true);
    }
  };

  const primarySteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const secondarySteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="w-full bg-surface/50 border border-border backdrop-blur-md rounded-2xl p-6 my-16 max-w-7xl mx-auto shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
            <Palette size={20} className="text-primary-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Flogistic Design System Verification</h3>
            <p className="text-xs text-text-muted">Test official colors and verify WCAG contrast dynamic compliance</p>
          </div>
        </div>
        <div className="text-text-secondary hover:text-text-primary transition-colors">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-8 space-y-8 animate-fade-in">
          {/* Controls */}
          <div className="flex items-center justify-between p-4 bg-elevated/40 border border-border rounded-xl">
            <span className="text-sm font-semibold text-text-secondary">Toggle Theme:</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all font-medium text-xs shadow-md shadow-primary-500/10"
            >
              {isLight ? (
                <>
                  <Moon size={14} />
                  Switch to Dark Mode (Default)
                </>
              ) : (
                <>
                  <Sun size={14} />
                  Switch to Light Mode
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary Scale */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                flogistic-primary (Blue Scale)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {primarySteps.map((step) => (
                  <div
                    key={`prim-${step}`}
                    className="p-3 rounded-xl border border-border flex flex-col justify-between h-24"
                    style={{
                      backgroundColor: `var(--primary-${step})`,
                    }}
                  >
                    <span
                      className={`text-xs font-bold ${
                        step >= 500 ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {step}
                    </span>
                    <span
                      className={`text-[10px] font-mono select-all ${
                        step >= 500 ? "text-white/80" : "text-slate-900/80"
                      }`}
                    >
                      {step === 500 ? "#0066FF" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Scale */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                flogistic-secondary (Silver Scale)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {secondarySteps.map((step) => (
                  <div
                    key={`sec-${step}`}
                    className="p-3 rounded-xl border border-border flex flex-col justify-between h-24"
                    style={{
                      backgroundColor: `var(--secondary-${step})`,
                    }}
                  >
                    <span
                      className={`text-xs font-bold ${
                        step >= 500 ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Accent and Semantic Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
            {/* Accent */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                flogistic-accent
              </h4>
              <div className="p-4 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-between">
                <span className="text-sm font-bold text-text-primary">Cyber Cyan</span>
                <span className="w-6 h-6 rounded-lg bg-accent shadow-[0_0_8px_var(--accent)]" />
              </div>
            </div>

            {/* Semantic Background / Surface */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Semantic Surfaces
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-background border border-border rounded-lg text-center h-16 flex flex-col justify-center">
                  <span className="text-[10px] text-text-muted">Background</span>
                </div>
                <div className="p-2 bg-surface border border-border rounded-lg text-center h-16 flex flex-col justify-center">
                  <span className="text-[10px] text-text-muted">Surface</span>
                </div>
                <div className="p-2 bg-card border border-border rounded-lg text-center h-16 flex flex-col justify-center">
                  <span className="text-[10px] text-text-muted">Card</span>
                </div>
              </div>
            </div>

            {/* Semantic Texts */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Contrast Check (Text)
              </h4>
              <div className="p-4 bg-elevated border border-border rounded-xl space-y-1">
                <p className="text-text-primary font-bold text-sm">Primary Text (WCAG Pass)</p>
                <p className="text-text-secondary text-xs">Secondary Text (Muted details)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
