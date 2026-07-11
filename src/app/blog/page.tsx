"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, Clock, ArrowRight, Rss, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const posts: BlogPost[] = [
    {
      id: "post-1",
      title: "How We Built a Stateful Multi-Agent System for Enterprise Lead Qualification",
      description: "A deep technical walkthrough explaining vector memory mapping, fallbacks, and prompt optimization layers configured to scoring inbound SaaS leads without writing custom code.",
      category: "AI Engineering",
      readTime: "8 min read",
      date: "July 10, 2026",
      image: "/blog/lead-agents.jpg",
      featured: true
    },
    {
      id: "post-2",
      title: "Transitioning from Linear Zapier Pipelines to Agentic DAG Graphs",
      description: "Why traditional single-trigger automation workflows fail for complex business exceptions and how visual node graphs solve operational bottlenecks.",
      category: "Automation",
      readTime: "5 min read",
      date: "July 08, 2026",
      image: "/blog/automation.jpg"
    },
    {
      id: "post-3",
      title: "Optimizing API Budgets: Dynamic Routing Strategies across LLMs",
      description: "How to setup a gateway router to automatically swap model backends (OpenAI, Anthropic, Gemini) depending on prompt complexity and latency targets.",
      category: "AI Engineering",
      readTime: "6 min read",
      date: "July 05, 2026",
      image: "/blog/token-routing.jpg"
    },
    {
      id: "post-4",
      title: "Measuring SaaS Adoption: Telemetry KPIs that Actually Matter",
      description: "Stop counting page views. Start tracking token-level SLAs, active agent execution cycles, and workflow uptime metrics to understand enterprise utility.",
      category: "SaaS Strategy",
      readTime: "4 min read",
      date: "July 01, 2026",
      image: "/blog/telemetry.jpg"
    }
  ];

  const filteredPosts = posts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const featuredPost = posts.find((p) => p.featured);
  const secondaryPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== "All");

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-12">
        {/* Title header */}
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#00f5ff] font-semibold tracking-wider uppercase">
            <Rss className="w-4 h-4" />
            Flogistic Insights
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Blog & Industry Reports
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Technical guides, case studies, and engineering reports on workflow automation, stateful agents, and enterprise AI transformation.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[rgba(255,255,255,0.06)]">
          {["All", "AI Engineering", "Automation", "SaaS Strategy"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeCategory === cat
                  ? "bg-[#0066ff]/20 text-[#00f5ff] border border-[#0066ff]/30 shadow-[0_0_12px_rgba(0,102,255,0.15)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (Only visible when filtering 'All') */}
        {activeCategory === "All" && featuredPost && (
          <div className="glass-card bg-[rgba(11,19,41,0.3)] hover:bg-[rgba(11,19,41,0.45)] border border-[rgba(255,255,255,0.05)] hover:border-[#0066ff]/20 p-6 md:p-8 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group rounded-2xl">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span className="text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/20 px-2 py-0.5 rounded">Featured</span>
                <span>{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00f5ff] transition-colors leading-snug">
                {featuredPost.title}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {featuredPost.description}
              </p>
              <div className="pt-4 flex items-center justify-between border-t border-[rgba(255,255,255,0.04)]">
                <span className="flex items-center gap-1.5 text-xs text-slate-500"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center text-xs font-bold text-[#00f5ff] group-hover:text-white transition-all gap-1"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            {/* Visual Thumbnail graphic */}
            <div className="lg:col-span-5 relative h-56 md:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#0e1b38] to-[#040814] border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-[#00f5ff]/20 group-hover:text-[#00f5ff] group-hover:scale-105 transition-all duration-500" />
            </div>
          </div>
        )}

        {/* Secondary Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secondaryPosts.map((post) => (
            <div
              key={post.id}
              className="glass-card bg-[rgba(11,19,41,0.3)] hover:bg-[rgba(11,19,41,0.45)] border border-[rgba(255,255,255,0.05)] hover:border-[#0066ff]/20 flex flex-col justify-between h-[360px] overflow-hidden group transition-all duration-300 rounded-2xl"
            >
              {/* Graphic Header */}
              <div className="h-40 bg-gradient-to-br from-[#0e1b38] to-[#040814] flex items-center justify-center border-b border-[rgba(255,255,255,0.05)] relative">
                <BookOpen className="w-12 h-12 text-[#00f5ff]/20 group-hover:text-[#00f5ff] group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0b1329] border border-[rgba(255,255,255,0.06)] px-2.5 py-0.5 rounded-full text-[9px] font-bold text-slate-300 uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Info content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00f5ff] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-[10px] text-[#00f5ff] group-hover:text-white transition-colors gap-1"
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
