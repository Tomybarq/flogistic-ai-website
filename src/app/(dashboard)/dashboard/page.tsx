"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  GitFork,
  ArrowUpRight,
  TrendingUp,
  Brain,
  Zap,
  Activity,
  Layers
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { name: "Total API Requests", value: "142,384", change: "+12.3%", icon: Activity, color: "text-[#00f5ff]" },
    { name: "Active AI Agents", value: "8", change: "+2", icon: Cpu, color: "text-[#0066ff]" },
    { name: "Automation Runs", value: "2,841", change: "99.98% SLA", icon: GitFork, color: "text-emerald-400" },
    { name: "Token Consumption", value: "4.8M / 10M", change: "48%", icon: Zap, color: "text-amber-400" },
  ];

  const quickLinks = [
    {
      title: "Enroll in LMS courses",
      description: "Learn advanced prompt engineering, tool design, and agentic workflows.",
      href: "/learn",
      cta: "Explore Courses",
      badge: "Education"
    },
    {
      title: "Design a new AI Agent",
      description: "Configure system instructions, connect tool specifications, and test dynamically.",
      href: "/agents",
      cta: "Open Agent Factory",
      badge: "Builder"
    },
    {
      title: "Create a Visual Automation",
      description: "Connect multiple agents and tool APIs using a visual, drag-and-drop node canvas.",
      href: "/automation",
      cta: "Open Canvas",
      badge: "Workflow"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-r from-[rgba(11,19,41,0.8)] to-[rgba(4,8,20,0.8)] p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0066ff]/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] bg-[#00f5ff]/5 rounded-full blur-[80px] -z-10" />
        
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0066ff]/20 text-[#3393ff] border border-[#0066ff]/30">
            <Brain className="w-3.5 h-3.5" />
            AI Operating System Active
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Welcome to Flogistic Platform
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Configure agent templates, orchestrate visual graphs, and educate your team using the single console for enterprise AI.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 hover:border-[#0066ff]/30 transition-all duration-300 group hover:translate-y-[-2px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">
                {stat.name}
              </span>
              <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="inline-flex items-center text-xs font-semibold text-slate-300">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Token Consumption Chart */}
      <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Token Consumption & API Activity
            </h2>
            <p className="text-slate-400 text-xs">Real-time daily usage across Google, OpenAI, and Anthropic endpoints.</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0066ff]" /> Google</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#00f5ff]" /> OpenAI</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Anthropic</span>
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative w-full h-48 bg-[#040814]/40 rounded-xl border border-[rgba(255,255,255,0.04)] p-6 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066ff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0066ff" />
                <stop offset="50%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            
            {/* Grid Lines */}
            <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Area Path */}
            <path
              d="M 0,130 C 50,110 80,40 120,50 C 160,60 200,120 250,90 C 300,60 330,20 380,30 C 430,40 450,100 500,80 L 500,150 L 0,150 Z"
              fill="url(#chart-glow)"
            />
            
            {/* Line Path */}
            <path
              d="M 0,130 C 50,110 80,40 120,50 C 160,60 200,120 250,90 C 300,60 330,20 380,30 C 430,40 450,100 500,80"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="2.5"
            />
            
            {/* Interactive/Highlight Dots */}
            <circle cx="120" cy="50" r="4" fill="#00f5ff" />
            <circle cx="380" cy="30" r="4" fill="#00f5ff" />
          </svg>
          
          {/* Day Labels Overlay */}
          <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[9px] text-slate-500 font-mono tracking-wider">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>
        </div>
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Quick Launchpads */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00f5ff]" />
              Quick Launchpads
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {quickLinks.map((link) => (
              <div
                key={link.title}
                className="glass-card bg-[rgba(11,19,41,0.3)] hover:bg-[rgba(11,19,41,0.5)] border border-[rgba(255,255,255,0.05)] hover:border-[#0066ff]/20 p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-medium bg-[rgba(255,255,255,0.06)] px-2.5 py-0.5 rounded-full text-slate-300">
                      {link.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{link.title}</h3>
                  <p className="text-slate-400 text-xs max-w-lg">{link.description}</p>
                </div>
                <Link
                  href={link.href}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold bg-[#0066ff]/10 hover:bg-[#0066ff] text-[#00f5ff] hover:text-white border border-[#0066ff]/30 hover:border-[#0066ff] rounded-xl transition-all duration-300 group shrink-0"
                >
                  {link.cta}
                  <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity & Analytics */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Recent Activity
          </h2>
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5" />
                <div className="flex-1 space-y-0.5">
                  <p className="text-slate-300">Workflow <strong className="text-white">Support Automation</strong> ran successfully</p>
                  <p className="text-slate-500">12 seconds ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5" />
                <div className="flex-1 space-y-0.5">
                  <p className="text-slate-300">Agent <strong className="text-white">Lead Qualifier</strong> executed API call</p>
                  <p className="text-slate-500">3 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-[#00f5ff] mt-1.5" />
                <div className="flex-1 space-y-0.5">
                  <p className="text-slate-300">Course progress updated on <strong className="text-white">Agent Engineering</strong></p>
                  <p className="text-slate-500">2 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <Link
                href="/audit-logs"
                className="text-xs text-[#00f5ff] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>View Full Audit Logs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
