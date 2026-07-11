"use client";

import React, { useState } from "react";
import { Terminal, Search, Copy, Check, Sparkles, Filter, Code } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  version: string;
  targetModel: string;
  promptText: string;
  variables: string[];
}

export default function PromptStudioPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const templates: PromptTemplate[] = [
    {
      id: "prompt-1",
      name: "ICP Lead Scoring Evaluator",
      category: "Operations",
      version: "v2.1",
      targetModel: "Claude 3.5 Sonnet",
      promptText: "You are a sales operations analyst scoring inbound signups. Inspect metadata: Company Size: {{company_size}}, Vertical: {{vertical}}, Tech Stack: {{tech_stack}}. Compare with our ICP (>100 seats, Tech vertical). Output score 1-100.",
      variables: ["company_size", "vertical", "tech_stack"]
    },
    {
      id: "prompt-2",
      name: "Natural Language to SQL Writer",
      category: "Database",
      version: "v1.4",
      targetModel: "GPT-4o",
      promptText: "Given the database schema for the tables {{schema}}, translate the following English query into structured, valid PostgreSQL: {{query}}. Return ONLY the SQL block inside Markdown ticks.",
      variables: ["schema", "query"]
    },
    {
      id: "prompt-3",
      name: "Support Sentiment Classifier",
      category: "Customer Support",
      version: "v1.0",
      targetModel: "Gemini 1.5 Flash",
      promptText: "Classify the sentiment of the support ticket: '{{ticket_text}}'. Select strictly from: [Positive, Neutral, Negative, Escalated]. Explain your reasoning in 1 sentence.",
      variables: ["ticket_text"]
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTemplates = templates.filter(
    (t) =>
      (activeCategory === "All" || t.category === activeCategory) &&
      (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.promptText.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#00f5ff] font-semibold tracking-wider uppercase">
          <Terminal className="w-4 h-4" />
          Prompt Playground
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Prompt Studio</h1>
        <p className="text-slate-400 text-xs">
          Manage, version-control, and share prompt templates across your organization&apos;s AI pipelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search templates or variables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b1329] border border-[rgba(255,255,255,0.06)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f5ff] transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Operations", "Database", "Customer Support"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeCategory === cat
                  ? "bg-[#0066ff]/20 text-[#00f5ff] border border-[#0066ff]/30 shadow-[0_0_8px_rgba(0,102,255,0.1)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            variant="interactive"
            className="flex flex-col justify-between h-[300px]"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded text-slate-300 tracking-wider">
                    {template.version}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                    {template.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#00f5ff] transition-colors">
                  {template.name}
                </h3>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 shrink-0 text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
                onClick={() => handleCopy(template.id, template.promptText)}
              >
                {copiedId === template.id ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </CardHeader>

            <CardBody className="flex-1 flex flex-col justify-between">
              <div className="space-y-3.5">
                {/* Prompt preview box */}
                <div className="bg-[#040814]/60 border border-[rgba(255,255,255,0.03)] p-3 rounded-xl font-mono text-[10px] text-slate-300 leading-relaxed line-clamp-4 select-all">
                  {template.promptText}
                </div>

                {/* Variable badges */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <Code className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
                  {template.variables.map((v) => (
                    <span
                      key={v}
                      className="text-[9px] font-mono text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/20 px-2 py-0.5 rounded"
                    >
                      {"{{"}
                      {v}
                      {"}}"}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>

            <div className="p-4 border-t border-[rgba(255,255,255,0.04)] bg-[rgba(4,8,20,0.15)] flex items-center justify-between text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
              <span>Model Target: <strong className="text-slate-300">{template.targetModel}</strong></span>
              <span className="text-[#00f5ff] font-bold cursor-pointer hover:underline">Open in Playground ➔</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
