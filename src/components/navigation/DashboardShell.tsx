"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandPalette from "./CommandPalette";
import {
  LayoutDashboard,
  GraduationCap,
  Terminal,
  Cpu,
  GitFork,
  ShoppingBag,
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  Bell
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Learn AI (LMS)", href: "/learn", icon: GraduationCap },
    { name: "Prompt Studio", href: "/prompt-studio", icon: Terminal },
    { name: "Agent Factory", href: "/agents", icon: Cpu },
    { name: "Automation Hub", href: "/automation", icon: GitFork },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  ];

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-[#040814] overflow-hidden text-slate-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 glass-card rounded-none border-y-0 border-l-0 border-r border-[rgba(255,255,255,0.06)] bg-[rgba(11,19,41,0.5)] z-20">
        <div className="flex items-center h-16 px-6 border-b border-[rgba(255,255,255,0.06)]">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066ff] to-[#00f5ff] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,102,255,0.5)]">
              F
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-[#cbd5e1] tracking-wider">
              FLOGISTIC
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  active
                    ? "bg-gradient-to-r from-[rgba(0,102,255,0.15)] to-[rgba(0,245,255,0.05)] text-white border-l-4 border-[#00f5ff] shadow-[inset_0_0_8px_rgba(0,245,255,0.05)]"
                    : "text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)] border-l-4 border-transparent"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 transition-colors ${
                    active ? "text-[#00f5ff]" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[rgba(255,255,255,0.06)] space-y-1">
          <Link
            href="/settings"
            className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-400 rounded-xl hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
          <div className="flex items-center justify-between px-4 py-3 mt-2 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                U
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">Workspace Demo</span>
                <span className="text-[10px] text-slate-500">Free Tier</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-xs h-full bg-[#0b1329] border-r border-[rgba(255,255,255,0.08)] z-50">
            <div className="flex items-center justify-between h-16 px-6 border-b border-[rgba(255,255,255,0.06)]">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066ff] to-[#00f5ff] flex items-center justify-center font-bold text-white">
                  F
                </div>
                <span className="font-bold text-lg text-white">FLOGISTIC</span>
              </Link>
              <button onClick={() => setIsMobileOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-[rgba(0,102,255,0.15)] text-white border-l-4 border-[#00f5ff]"
                        : "text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${active ? "text-[#00f5ff]" : "text-slate-400"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(4,8,20,0.5)] backdrop-blur-md z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden text-slate-400 hover:text-white focus:outline-none mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-slate-200 capitalize font-medium">
                {pathname.split("/")[1] || "dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CommandPalette />
            <div className="w-px h-6 bg-[rgba(255,255,255,0.1)] hidden md:block" />
            <button className="relative p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00f5ff] ring-2 ring-[#040814]" />
            </button>
            <div className="w-px h-6 bg-[rgba(255,255,255,0.1)]" />
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-[#0066ff]/20 border border-[#0066ff]/40 flex items-center justify-center font-bold text-[#00f5ff]">
                JD
              </div>
              <span className="hidden md:inline text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                John Doe
              </span>
            </div>
          </div>
        </header>

        {/* Content body wrapper */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#040814]">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
