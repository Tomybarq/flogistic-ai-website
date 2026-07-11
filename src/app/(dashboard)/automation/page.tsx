"use client";

import React, { useState } from "react";
import { MOCK_WORKFLOWS } from "@/lib/db";
import { Workflow } from "@/types/database.types";
import {
  GitFork,
  Play,
  Save,
  Plus,
  Webhook,
  Cpu,
  Database,
  Slack,
  Mail,
  Loader2,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function AutomationHubPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(MOCK_WORKFLOWS[0] || null);
  const [isRunning, setIsRunning] = useState(false);
  const [runLogs, setRunLogs] = useState<string[]>([]);
  const [activeRunNodeId, setActiveRunNodeId] = useState<string | null>(null);

  const nodeIcons = {
    webhookTrigger: Webhook,
    agentExecution: Cpu,
    databaseAction: Database,
    slackNotification: Slack,
    sendEmail: Mail
  };

  const handleRunWorkflow = async () => {
    if (!activeWorkflow) return;
    setIsRunning(true);
    setRunLogs([]);
    
    const logs = [
      "Initializing execution worker...",
      "Validating graph connections (DAG)...",
      "Executing trigger: webhookTrigger...",
      "Calling AI Agent (agent-2) dynamic route...",
      "Updating target database databaseAction...",
      "Dispatching Slack slackNotification...",
      "Workflow run completed successfully. Status: SUCCEEDED"
    ];

    const nodes = activeWorkflow.graphData.nodes;
    
    // Simulate step execution sequentially
    for (let i = 0; i < nodes.length; i++) {
      setActiveRunNodeId(nodes[i].id);
      setRunLogs((prev) => [...prev, `[STEP ${i + 1}] Running: ${nodes[i].data.label || nodes[i].type}...`]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    setActiveRunNodeId(null);
    setRunLogs((prev) => [...prev, "✓ Workflow run finished. Clean exit."]);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Title / Action bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GitFork className="w-6 h-6 text-[#00f5ff]" />
            Automation Hub
          </h1>
          <p className="text-slate-400 text-xs">
            Orchestrate custom APIs, databases, and agents using stateful workflow graphs.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleRunWorkflow}
            disabled={isRunning || !activeWorkflow}
            className="inline-flex items-center px-4 py-2.5 text-xs font-bold bg-gradient-to-r from-[#0066ff] to-[#0052cc] disabled:from-[rgba(255,255,255,0.02)] disabled:to-[rgba(255,255,255,0.02)] disabled:text-slate-500 hover:from-[#0052cc] hover:to-[#003e99] text-white rounded-xl transition-all shadow-[0_0_12px_rgba(0,102,255,0.2)] gap-1.5"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run Workflow
          </button>
          <button className="inline-flex items-center px-4 py-2.5 text-xs font-bold bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.06)] text-white rounded-xl transition-all gap-1.5">
            <Save className="w-4 h-4" />
            Save Canvas
          </button>
        </div>
      </div>

      {/* Editor Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch min-h-[640px]">
        
        {/* Node Drawer Sidebar */}
        <div className="space-y-6">
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Trigger Modules</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Webhook className="w-4 h-4 text-[#00f5ff]" />
                <span>Webhook Trigger</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <GitFork className="w-4 h-4 text-[#00f5ff]" />
                <span>Schedule Event</span>
              </div>
            </div>
          </div>

          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Action Modules</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Cpu className="w-4 h-4 text-[#0066ff]" />
                <span>AI Agent Task</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Database Query</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Slack className="w-4 h-4 text-orange-400" />
                <span>Slack Alert</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Send Email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Graph Editor Canvas */}
        <div className="lg:col-span-3 flex flex-col items-stretch justify-between relative glass-card bg-[rgba(4,8,20,0.5)] border border-[rgba(255,255,255,0.06)] overflow-hidden">
          
          {/* Canvas Dot Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px"
            }}
          />

          {/* Top Info bar */}
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(11,19,41,0.2)] flex items-center justify-between z-10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {activeWorkflow ? activeWorkflow.name : "Unsaved Graph"}
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>GraphQL Pipeline Active</span>
            </div>
          </div>

          {/* Interactive Node Graph area */}
          <div className="flex-1 p-8 overflow-auto flex flex-col items-center justify-center min-h-[380px] z-10">
            {activeWorkflow ? (
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-12 py-8">
                {activeWorkflow.graphData.nodes.map((node, index) => {
                  const Icon = nodeIcons[node.type as keyof typeof nodeIcons] || GitFork;
                  const isNodeActive = activeRunNodeId === node.id;
                  
                  return (
                    <React.Fragment key={node.id}>
                      {/* Node block */}
                      <div
                        className={`w-52 glass-card bg-[rgba(11,19,41,0.6)] p-4 flex flex-col space-y-3 transition-all duration-300 relative border ${
                          isNodeActive
                            ? "border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.15)] translate-y-[-2px] scale-105"
                            : "border-[rgba(255,255,255,0.06)] hover:border-[#0066ff]/40"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-2 rounded-lg bg-[#040814]/60 border border-[rgba(255,255,255,0.06)] ${isNodeActive ? "text-[#00f5ff]" : "text-slate-400"}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                              {node.type.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="text-xs font-semibold text-white truncate">{node.data.label}</span>
                          </div>
                        </div>
                        
                        {/* Node status details */}
                        <div className="text-[10px] text-slate-400 font-mono bg-[#040814]/50 border border-[rgba(255,255,255,0.02)] p-2 rounded-lg truncate">
                          {node.type === "agentExecution" ? "Agent: triager_bot" : "Active Listener"}
                        </div>

                        {/* Input/Output connectors */}
                        {index > 0 && (
                          <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1.5 w-3 h-3 rounded-full bg-[#040814] border-2 border-slate-600" />
                        )}
                        {index < activeWorkflow.graphData.nodes.length - 1 && (
                          <div className="absolute right-0 top-1/2 translate-x-1.5 -translate-y-1.5 w-3 h-3 rounded-full bg-[#040814] border-2 border-[#00f5ff]" />
                        )}
                      </div>

                      {/* Connection arrows */}
                      {index < activeWorkflow.graphData.nodes.length - 1 && (
                        <div className="hidden lg:flex items-center text-slate-600 font-bold shrink-0">
                          <span className="text-lg">➔</span>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div className="text-slate-500 text-xs">No graph active.</div>
            )}
          </div>

          {/* Logs Console Footer */}
          <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#040814]/90 p-4 font-mono text-[10px] text-slate-400 space-y-2 z-10 max-h-[160px] overflow-y-auto">
            <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-[rgba(255,255,255,0.03)] uppercase tracking-wider font-bold">
              <span>Run Execution Logs</span>
              {isRunning && <span className="animate-pulse text-[#00f5ff]">● Worker active</span>}
            </div>
            {runLogs.length > 0 ? (
              <div className="space-y-1">
                {runLogs.map((log, idx) => (
                  <p key={idx} className={log.includes("completed") || log.includes("✓") ? "text-emerald-400" : "text-slate-300"}>
                    {log}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No active run logs. Click "Run Workflow" to trigger.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
