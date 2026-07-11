"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  Cpu,
  GitFork,
  GraduationCap,
  Sparkles,
  Command,
  X
} from "lucide-react";

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const commandItems = [
    { name: "Go to Dashboard", href: "/dashboard", icon: LayoutDashboard, category: "Navigation" },
    { name: "Go to Learn AI Academy", href: "/learn", icon: GraduationCap, category: "Navigation" },
    { name: "Go to Agent Factory", href: "/agents", icon: Cpu, category: "Navigation" },
    { name: "Go to Automation Hub", href: "/automation", icon: GitFork, category: "Navigation" },
    { name: "Build New AI Agent", href: "/agents?new=true", icon: Sparkles, category: "Actions" },
    { name: "Configure Webhook Trigger", href: "/automation?trigger=webhook", icon: GitFork, category: "Actions" }
  ];

  const filteredItems = commandItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // Toggle overlay on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation inside menu list
  useEffect(() => {
    if (!isOpen) return;

    const handleListNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = filteredItems[selectedIndex];
        if (activeItem) {
          router.push(activeItem.href);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleListNavigation);
    return () => window.removeEventListener("keydown", handleListNavigation);
  }, [isOpen, filteredItems, selectedIndex, router]);

  // Reset indices on query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <>
      {/* Floating shortcut badge in the layout header */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] hover:border-[#0066ff]/20 text-slate-400 hover:text-white transition-all text-xs focus:outline-none focus:ring-1 focus:ring-[#00f5ff]/40"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Quick search...</span>
        <span className="font-semibold px-1 py-0.5 rounded bg-[#040814] border border-[rgba(255,255,255,0.08)] text-[9px] flex items-center font-mono select-none">
          <Command className="w-2.5 h-2.5 mr-0.5" />K
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog block */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="w-full max-w-lg overflow-hidden glass-card bg-[#0b1329]/95 border border-[rgba(255,255,255,0.08)] shadow-2xl relative z-10 mx-4 flex flex-col max-h-[380px]"
            >
              {/* Input header */}
              <div className="flex items-center px-4 border-b border-[rgba(255,255,255,0.06)] h-12">
                <Search className="w-4 h-4 text-slate-400 mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search platform pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => {
                    const ItemIcon = item.icon;
                    const active = idx === selectedIndex;
                    return (
                      <div
                        key={item.name}
                        onClick={() => {
                          router.push(item.href);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                          active
                            ? "bg-[#0066ff] text-white shadow-md shadow-[#0066ff]/20"
                            : "hover:bg-[rgba(255,255,255,0.02)] text-slate-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <ItemIcon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                          <span className="text-xs font-medium truncate">{item.name}</span>
                        </div>
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          active ? "bg-white/20 text-white" : "bg-[#040814] text-slate-500 border border-[rgba(255,255,255,0.05)]"
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No results found matching &quot;{query}&quot;
                  </div>
                )}
              </div>

              {/* Keyboard legend footer */}
              <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(4,8,20,0.4)] flex justify-between items-center text-[9px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  Use keys <kbd className="bg-[#040814] px-1 rounded border border-[rgba(255,255,255,0.06)] font-mono">↑</kbd> 
                  <kbd className="bg-[#040814] px-1 rounded border border-[rgba(255,255,255,0.06)] font-mono">↓</kbd> to navigate
                </span>
                <span className="flex items-center gap-1">
                  Press <kbd className="bg-[#040814] px-1 rounded border border-[rgba(255,255,255,0.06)] font-mono">Enter</kbd> to select
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
