"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_COURSES } from "@/lib/db";
import { GraduationCap, BookOpen, Layers, Clock, ArrowRight } from "lucide-react";

export default function LearnPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filteredCourses = MOCK_COURSES.filter(
    (course) => activeFilter === "All" || course.difficulty === activeFilter
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title block */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#00f5ff] font-semibold tracking-wider uppercase">
          <GraduationCap className="w-4 h-4" />
          Flogistic Academy
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Learn Artificial Intelligence</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Deploy AI-driven automations and build robust agent workflows through practical, hands-on, sandbox-driven courses.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2.5 pb-2 border-b border-[rgba(255,255,255,0.06)]">
        {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeFilter === filter
                ? "bg-[#0066ff]/20 text-[#00f5ff] border border-[#0066ff]/40 shadow-[0_0_12px_rgba(0,102,255,0.15)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-[rgba(255,255,255,0.02)]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="glass-card bg-[rgba(11,19,41,0.3)] hover:bg-[rgba(11,19,41,0.5)] border border-[rgba(255,255,255,0.05)] hover:border-[#0066ff]/20 flex flex-col h-[400px] overflow-hidden group transition-all duration-300"
          >
            {/* Header placeholder / Image */}
            <div className="h-40 relative bg-gradient-to-br from-[#0e1b38] to-[#040814] flex items-center justify-center p-6 border-b border-[rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 bg-[#0066ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <BookOpen className="w-12 h-12 text-[#00f5ff]/40 group-hover:text-[#00f5ff] group-hover:scale-110 transition-all duration-500" />
              <div className="absolute top-4 left-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  course.difficulty === "Beginner"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : course.difficulty === "Intermediate"
                    ? "bg-[#0066ff]/10 text-[#3393ff] border border-[#0066ff]/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {course.difficulty}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-[#00f5ff] transition-colors leading-snug">
                  {course.title}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    Interactive Labs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Self-Paced
                  </span>
                </div>
                <Link
                  href={`/learn/${course.id}`}
                  className="inline-flex items-center text-xs font-bold text-[#00f5ff] group-hover:text-white transition-colors gap-1"
                >
                  Start Course
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
