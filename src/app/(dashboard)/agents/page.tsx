"use client";

import React, { useState } from "react";
import { MOCK_AGENTS } from "@/lib/db";
import { Agent } from "@/types/database.types";
import {
  Cpu,
  Plus,
  Settings,
  MessageSquare,
  Send,
  Loader2,
  Trash2,
  History,
  CornerUpLeft,
  Calendar,
  User
} from "lucide-react";

export default function AgentFactoryPage() {
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(MOCK_AGENTS[0] || null);

  // Form states for creating/editing
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [modelProvider, setModelProvider] = useState<"openai" | "anthropic" | "google">("google");
  const [modelName, setModelName] = useState("gemini-1.5-pro");
  const [temperature, setTemperature] = useState(0.2);
  const [memoryType, setMemoryType] = useState<"buffer" | "vector" | "none">("buffer");

  // Version History state
  const [showHistory, setShowHistory] = useState(false);
  const mockVersions = [
    {
      version: 3,
      author: "John Doe",
      date: "10 mins ago",
      text: "You are a lead enrichment and scoring assistant. Inspect the incoming customer metadata, evaluate its alignment with our ICP (Enterprise SaaS companies with >50 employees), and output a score from 1-100."
    },
    {
      version: 2,
      author: "Sarah Jenkins",
      date: "2 hours ago",
      text: "ICP Lead scoring assistant. Qualify customer records against enterprise targets (>100 seats, tech vertical) and output grade (A/B/C)."
    },
    {
      version: 1,
      author: "Alex Rivera",
      date: "Yesterday",
      text: "Standard lead triager. Review companies and sort them."
    }
  ];

  // Chat sandbox state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "agent"; text: string }>>([
    { sender: "agent", text: "Hi, I am ready to test. Send a message to run me with my active system prompt!" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      projectId: "project-1",
      name,
      systemPrompt,
      modelProvider,
      modelName,
      temperature,
      memoryType,
      isPublic: true,
      createdAt: new Date().toISOString(),
    };

    setAgents([...agents, newAgent]);
    setSelectedAgent(newAgent);
    
    // Clear form
    setName("");
    setSystemPrompt("");
    setTemperature(0.2);

    // Reset Chat
    setChatHistory([
      { sender: "agent", text: `Hi! I'm ${name}, your new agent. Send a message to test my configuration.` }
    ]);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !selectedAgent) return;

    const userText = chatMessage;
    setChatMessage("");
    setChatHistory((prev) => [...prev, { sender: "user", text: userText }]);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/v1/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: selectedAgent.systemPrompt,
          userMessage: userText,
          provider: selectedAgent.modelProvider,
          tier: selectedAgent.modelName.includes("pro") || selectedAgent.modelName.includes("sonnet") || selectedAgent.modelName === "gpt-4o" ? "intelligence-optimized" : "cost-optimized",
          temperature: selectedAgent.temperature
        })
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();

      setChatHistory((prev) => [...prev, { sender: "agent", text: data.text }]);
    } catch (err: any) {
      setChatHistory((prev) => [...prev, { sender: "agent", text: `[Error: Failed to route chat to model. ${err.message}]` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleDeleteAgent = (id: string) => {
    const updated = agents.filter((a) => a.id !== id);
    setAgents(updated);
    if (selectedAgent?.id === id) {
      setSelectedAgent(updated[0] || null);
    }
  };

  const restorePromptVersion = (text: string) => {
    if (!selectedAgent) return;
    const updatedAgent = { ...selectedAgent, systemPrompt: text };
    setAgents(agents.map(a => a.id === selectedAgent.id ? updatedAgent : a));
    setSelectedAgent(updatedAgent);
    setChatHistory(prev => [
      ...prev,
      { sender: "agent", text: "[System: Reverted system instructions to restored historical version]" }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-[#00f5ff]" />
          Agent Factory
        </h1>
        <p className="text-slate-400 text-xs">
          Design, adjust, and deploy autonomous cognitive agents running custom instruction layers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch min-h-[600px]">
        {/* Left Col - Agent Selection & Creation */}
        <div className="space-y-6">
          {/* Active Agents list */}
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Active Agents</h2>
            <div className="space-y-2">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setChatHistory([
                      { sender: "agent", text: `Hi! I'm ${agent.name}, ready to test. Send a message.` }
                    ]);
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedAgent?.id === agent.id
                      ? "bg-[#0066ff]/10 border-[#00f5ff]/40 shadow-[0_0_12px_rgba(0,102,255,0.1)]"
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Cpu className={`w-4 h-4 shrink-0 ${selectedAgent?.id === agent.id ? "text-[#00f5ff]" : "text-slate-400"}`} />
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-semibold text-white">{agent.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">{agent.modelProvider} ({agent.modelName})</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAgent(agent.id);
                    }}
                    className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Agent Creator form */}
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase mb-4 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#00f5ff]" />
              Create New Agent
            </h2>
            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Agent Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Assistant"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">System Prompt</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify role, constraints, and objective..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00f5ff] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Provider</label>
                  <select
                    value={modelProvider}
                    onChange={(e) => {
                      const p = e.target.value as any;
                      setModelProvider(p);
                      setModelName(p === "google" ? "gemini-1.5-pro" : p === "openai" ? "gpt-4o" : "claude-3-5-sonnet");
                    }}
                    className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2 py-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="google">Google</option>
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Memory Type</label>
                  <select
                    value={memoryType}
                    onChange={(e) => setMemoryType(e.target.value as any)}
                    className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2 py-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="buffer">Short Term</option>
                    <option value="vector">Long Term (Vector)</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(0,102,255,0.3)]"
              >
                Create Agent
              </button>
            </form>
          </div>
        </div>

        {/* Center / Right - Configuration Editor and Live Chat Testing */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Agent Parameters Spec */}
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 flex flex-col justify-between overflow-hidden">
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-slate-400" />
                  Parameters
                </h2>
                
                {selectedAgent && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase border transition-all ${
                      showHistory
                        ? "bg-[#0066ff]/20 text-[#00f5ff] border-[#0066ff]/40"
                        : "bg-[rgba(255,255,255,0.02)] text-slate-400 border-[rgba(255,255,255,0.06)] hover:text-white"
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    History
                  </button>
                )}
              </div>

              {selectedAgent ? (
                showHistory ? (
                  /* Prompt Version History View Drawer */
                  <div className="space-y-4 animate-slideUp">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prompt Revision History</span>
                    <div className="space-y-3">
                      {mockVersions.map((ver) => (
                        <div
                          key={ver.version}
                          className="p-3 rounded-xl bg-[#040814]/60 border border-[rgba(255,255,255,0.04)] space-y-2 hover:border-[#0066ff]/20 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">Version v{ver.version}</span>
                            <button
                              onClick={() => restorePromptVersion(ver.text)}
                              className="inline-flex items-center gap-1 text-[9px] font-bold bg-[#0066ff]/10 hover:bg-[#0066ff] text-[#00f5ff] hover:text-white px-2 py-0.5 rounded-lg border border-[#0066ff]/20 transition-all"
                            >
                              <CornerUpLeft className="w-3 h-3" />
                              Restore
                            </button>
                          </div>
                          <p className="text-[10px] font-mono text-slate-400 line-clamp-3 leading-relaxed">{ver.text}</p>
                          <div className="flex items-center justify-between text-[8px] text-slate-500 font-semibold uppercase tracking-wider pt-1 border-t border-[rgba(255,255,255,0.02)]">
                            <span className="flex items-center gap-1"><User className="w-2.5 h-2.5" /> {ver.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> {ver.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Regular Config View */
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-[#040814]/50 border border-[rgba(255,255,255,0.04)] space-y-1">
                      <span className="text-[9px] font-semibold text-slate-500 uppercase">Agent ID</span>
                      <p className="text-xs font-mono text-slate-300">{selectedAgent.id}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Model Target</span>
                      <p className="text-xs text-white capitalize font-semibold">{selectedAgent.modelProvider} / {selectedAgent.modelName}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Temperature</span>
                        <span className="text-[#00f5ff]">{selectedAgent.temperature}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={selectedAgent.temperature}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setAgents(agents.map(a => a.id === selectedAgent.id ? { ...a, temperature: val } : a));
                          setSelectedAgent({ ...selectedAgent, temperature: val });
                        }}
                        className="w-full accent-[#00f5ff]"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">System Context Instructions</span>
                      <textarea
                        rows={6}
                        value={selectedAgent.systemPrompt}
                        onChange={(e) => {
                          const text = e.target.value;
                          setAgents(agents.map(a => a.id === selectedAgent.id ? { ...a, systemPrompt: text } : a));
                          setSelectedAgent({ ...selectedAgent, systemPrompt: text });
                        }}
                        className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-xs text-slate-300 leading-relaxed font-mono focus:outline-none focus:border-[#00f5ff]"
                      />
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">No agent selected.</div>
              )}
            </div>
            {selectedAgent && (
              <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] text-[10px] text-slate-500">
                Saves automatically when parameters adjust.
              </div>
            )}
          </div>

          {/* Test Chat Sandbox */}
          <div className="glass-card bg-[rgba(4,8,20,0.5)] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between overflow-hidden">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(11,19,41,0.3)] flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#00f5ff]" />
                Agent Chat Sandbox
              </span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Live Test
              </span>
            </div>

            {/* Chat Output */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[360px] min-h-[300px]">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#0066ff] text-white rounded-br-none shadow-md"
                        : "bg-[#0b1329] border border-[rgba(255,255,255,0.05)] text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00f5ff]" />
                  <span>Agent routing tokens...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(4,8,20,0.8)] flex gap-2">
              <input
                type="text"
                disabled={!selectedAgent || isChatLoading}
                placeholder={selectedAgent ? "Send a test message..." : "Select an agent first..."}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f5ff] disabled:opacity-40"
              />
              <button
                onClick={handleSendMessage}
                disabled={!selectedAgent || isChatLoading || !chatMessage.trim()}
                className="bg-[#0066ff] hover:bg-[#0052cc] disabled:bg-[rgba(255,255,255,0.02)] disabled:text-slate-600 text-white p-2.5 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
