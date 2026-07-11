"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_COURSES, MOCK_LESSONS } from "@/lib/db";
import {
  ArrowLeft,
  ChevronRight,
  Terminal,
  Send,
  Loader2,
  Settings2,
  Sparkles,
  CheckCircle2,
  Brain
} from "lucide-react";

export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
  const course = MOCK_COURSES.find((c) => c.id === params.courseId);
  const lessons = MOCK_LESSONS[params.courseId] || [];
  
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const activeLesson = lessons[activeLessonIndex];

  // Playground state
  const [systemPrompt, setSystemPrompt] = useState("You are an educational AI assistant inside the Flogistic sandbox.");
  const [userPrompt, setUserPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelProvider, setModelProvider] = useState<"google" | "openai" | "anthropic">("google");
  const [modelTier, setModelTier] = useState<"speed-optimized" | "intelligence-optimized">("speed-optimized");
  const [temperature, setTemperature] = useState(0.2);

  // Auto-set instructions when switching lessons
  useEffect(() => {
    if (activeLesson) {
      setUserPrompt("");
      setApiResponse(null);
    }
  }, [activeLessonIndex, activeLesson]);

  if (!course || !activeLesson) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Course or Lessons not found</h2>
        <Link href="/learn" className="text-[#00f5ff] hover:underline">Return to Academy</Link>
      </div>
    );
  }

  const runPlaygroundTest = async () => {
    if (!userPrompt.trim()) return;
    setIsLoading(true);
    setApiResponse(null);

    try {
      const res = await fetch("/api/v1/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          userMessage: userPrompt,
          provider: modelProvider,
          tier: modelTier,
          temperature
        })
      });

      if (!res.ok) {
        throw new Error("API Execution failed");
      }

      const data = await res.json();
      setApiResponse(data);
    } catch (err: any) {
      setApiResponse({
        error: true,
        text: `Error connecting to gateway: ${err.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Breadcrumbs / Nav */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/learn"
            className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Academy</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400 truncate max-w-[180px]">{course.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-medium truncate max-w-[120px]">{activeLesson.title}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonIndex(idx)}
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                activeLessonIndex === idx
                  ? "bg-[#00f5ff] text-[#040814] border-[#00f5ff] shadow-[0_0_10px_rgba(0,245,255,0.3)]"
                  : "bg-[rgba(255,255,255,0.02)] text-slate-400 border-[rgba(255,255,255,0.05)] hover:border-slate-500"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Workspace Grid splits lesson and playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[580px]">
        
        {/* Left Pane - Lesson Viewer */}
        <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] bg-[#0066ff]/20 text-[#3393ff] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Lesson {activeLessonIndex + 1} of {lessons.length}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">{activeLesson.title}</h2>
            </div>
            
            {/* Markdown Viewer */}
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 leading-relaxed">
              {activeLesson.contentMarkdown.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("###")) {
                  return <h3 key={pIdx} className="text-lg font-semibold text-white mt-4">{para.replace("###", "")}</h3>;
                }
                if (para.startsWith("####")) {
                  return <h4 key={pIdx} className="text-base font-semibold text-[#00f5ff] mt-2">{para.replace("####", "")}</h4>;
                }
                if (para.startsWith("1.") || para.startsWith("-")) {
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-1 text-slate-400">
                      {para.split("\n").map((li, lIdx) => (
                        <li key={lIdx}>{li.replace(/^[-\d\.\s]+/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={pIdx}>{para}</p>;
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.05)] mt-8 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Completed lessons earn certificate points.</span>
            {activeLessonIndex < lessons.length - 1 ? (
              <button
                onClick={() => setActiveLessonIndex(activeLessonIndex + 1)}
                className="inline-flex items-center px-4 py-2 text-xs font-bold bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl transition-all gap-1.5"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/learn"
                className="inline-flex items-center px-4 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Finish Course
              </Link>
            )}
          </div>
        </div>

        {/* Right Pane - Sandbox Sandbox */}
        <div className="glass-card bg-[rgba(4,8,20,0.5)] border border-[rgba(255,255,255,0.06)] overflow-hidden flex flex-col">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(11,19,41,0.3)]">
            <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-[#00f5ff]" />
              <span>Prompt Sandbox</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Provider selector */}
              <select
                value={modelProvider}
                onChange={(e) => setModelProvider(e.target.value as any)}
                className="bg-[#0b1329] border border-[rgba(255,255,255,0.1)] text-slate-300 text-xs rounded-lg px-2 py-1 outline-none focus:border-[#00f5ff]"
              >
                <option value="google">Google Gemini</option>
                <option value="openai">OpenAI GPT</option>
                <option value="anthropic">Anthropic Claude</option>
              </select>

              {/* Tier selector */}
              <select
                value={modelTier}
                onChange={(e) => setModelTier(e.target.value as any)}
                className="bg-[#0b1329] border border-[rgba(255,255,255,0.1)] text-slate-300 text-xs rounded-lg px-2 py-1 outline-none focus:border-[#00f5ff]"
              >
                <option value="speed-optimized">Flash / Mini</option>
                <option value="intelligence-optimized">Pro / Sonnet</option>
              </select>
            </div>
          </div>

          {/* Sandbox Workspace Area */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* System Instruct */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Settings2 className="w-3.5 h-3.5 text-slate-500" />
                  System Instructions
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={2}
                  className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-[#00f5ff]/40 transition-colors resize-none"
                />
              </div>

              {/* Live Sandbox Outputs */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#00f5ff]" />
                  Execution Result
                </label>
                <div className="w-full bg-[#040814]/80 border border-[rgba(255,255,255,0.05)] rounded-xl p-4 min-h-[140px] text-xs font-mono text-slate-300 leading-relaxed overflow-y-auto max-h-[220px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-24 space-x-2 text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin text-[#00f5ff]" />
                      <span>Routing LLM and streaming execution logs...</span>
                    </div>
                  ) : apiResponse ? (
                    apiResponse.error ? (
                      <div className="text-red-400">{apiResponse.text}</div>
                    ) : (
                      <div className="space-y-4">
                        <div className="whitespace-pre-wrap">{apiResponse.text}</div>
                        <div className="border-t border-[rgba(255,255,255,0.05)] pt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                          <span>Model: <span className="text-slate-300">{apiResponse.model}</span></span>
                          <span>Tokens: <span className="text-slate-300">{apiResponse.usage?.promptTokens + apiResponse.usage?.completionTokens}</span></span>
                          <span>Est. Cost: <span className="text-[#00f5ff]">${apiResponse.usage?.estimatedCostUsd?.toFixed(6)}</span></span>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center h-24 text-slate-500 text-center gap-1">
                      <Brain className="w-6 h-6 text-slate-600" />
                      <span>Write your prompt below and click Send to test.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Input Send Area */}
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)] flex gap-2">
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runPlaygroundTest()}
                placeholder="Type your playground test input..."
                className="flex-1 bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-[#00f5ff] transition-all"
                disabled={isLoading}
              />
              <button
                onClick={runPlaygroundTest}
                disabled={isLoading || !userPrompt.trim()}
                className="bg-[#0066ff] hover:bg-[#0052cc] disabled:bg-[rgba(255,255,255,0.02)] disabled:text-slate-500 text-white p-2.5 rounded-xl transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
