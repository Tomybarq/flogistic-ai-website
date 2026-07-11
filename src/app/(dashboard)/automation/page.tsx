"use client";

import React, { useState } from "react";
import { MOCK_WORKFLOWS, MOCK_AGENTS } from "@/lib/db";
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
  Settings,
  ChevronRight,
  Info
} from "lucide-react";

export default function AutomationHubPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(MOCK_WORKFLOWS[0] || null);
  const [isRunning, setIsRunning] = useState(false);
  const [runLogs, setRunLogs] = useState<string[]>([]);
  const [activeRunNodeId, setActiveRunNodeId] = useState<string | null>(null);

  // Properties Panel states
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    activeWorkflow?.graphData.nodes[0]?.id || null
  );

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

  const selectedNode = activeWorkflow?.graphData.nodes.find(n => n.id === selectedNodeId);

  // Handler to update selected node property labels
  const handleUpdateNodeLabel = (newLabel: string) => {
    if (!activeWorkflow || !selectedNodeId) return;
    const updatedNodes = activeWorkflow.graphData.nodes.map(n => 
      n.id === selectedNodeId ? { ...n, data: { ...n.data, label: newLabel } } : n
    );
    setActiveWorkflow({
      ...activeWorkflow,
      graphData: {
        ...activeWorkflow.graphData,
        nodes: updatedNodes
      }
    });
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

      {/* Editor Layout Grid: 5-columns for expanded control properties panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch min-h-[640px]">
        
        {/* Col 1: Node Drawer Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-4 space-y-4">
            <h2 className="text-xs font-bold text-white tracking-wider uppercase">Triggers</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Webhook className="w-3.5 h-3.5 text-[#00f5ff]" />
                <span>Webhook Trigger</span>
              </div>
            </div>
          </div>

          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-4 space-y-4">
            <h2 className="text-xs font-bold text-white tracking-wider uppercase">Actions</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-[#0066ff]" />
                <span>AI Agent Task</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Database Query</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Slack className="w-3.5 h-3.5 text-orange-400" />
                <span>Slack Alert</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#040814]/40 border border-[rgba(255,255,255,0.04)] cursor-grab hover:border-[#00f5ff]/20 transition-all text-xs font-semibold text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Send Email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2-4: Visual Graph Editor Canvas */}
        <div className="lg:col-span-3 flex flex-col items-stretch justify-between relative glass-card bg-[rgba(4,8,20,0.5)] border border-[rgba(255,255,255,0.06)] overflow-hidden">
          {/* Canvas Dot Pattern */}
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
              <span>Canvas Listener Ready</span>
            </div>
          </div>

          {/* Graph Nodes */}
          <div className="flex-1 p-6 overflow-auto flex flex-col items-center justify-center min-h-[380px] z-10">
            {activeWorkflow ? (
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 py-8">
                {activeWorkflow.graphData.nodes.map((node, index) => {
                  const Icon = nodeIcons[node.type as keyof typeof nodeIcons] || GitFork;
                  const isNodeActive = activeRunNodeId === node.id;
                  const isSelected = selectedNodeId === node.id;
                  
                  return (
                    <React.Fragment key={node.id}>
                      {/* Node block */}
                      <div
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-48 glass-card bg-[rgba(11,19,41,0.6)] p-3.5 flex flex-col space-y-3 transition-all duration-300 relative border cursor-pointer ${
                          isNodeActive
                            ? "border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.15)] translate-y-[-2px]"
                            : isSelected
                            ? "border-[#0066ff] shadow-[0_0_12px_rgba(0,102,255,0.15)] translate-y-[-1px]"
                            : "border-[rgba(255,255,255,0.06)] hover:border-slate-500/40"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-2 rounded-lg bg-[#040814]/60 border border-[rgba(255,255,255,0.06)] ${isSelected ? "text-[#00f5ff]" : "text-slate-400"}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                              {node.type.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="text-xs font-semibold text-white truncate">{node.data.label}</span>
                          </div>
                        </div>

                        {/* Input/Output connectors */}
                        {index > 0 && (
                          <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1.5 w-2.5 h-2.5 rounded-full bg-[#040814] border-2 border-slate-600" />
                        )}
                        {index < activeWorkflow.graphData.nodes.length - 1 && (
                          <div className="absolute right-0 top-1/2 translate-x-1.5 -translate-y-1.5 w-2.5 h-2.5 rounded-full bg-[#040814] border-2 border-[#00f5ff]" />
                        )}
                      </div>

                      {/* Connection arrows */}
                      {index < activeWorkflow.graphData.nodes.length - 1 && (
                        <div className="hidden lg:flex items-center text-slate-600 font-bold shrink-0">
                          <ChevronRight className="w-4 h-4" />
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
              <p className="text-slate-500">No active run logs. Click &quot;Run Workflow&quot; to trigger.</p>
            )}
          </div>
        </div>

        {/* Col 5: Properties Panel */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="glass-card bg-[rgba(11,19,41,0.4)] border border-[rgba(255,255,255,0.06)] p-5 flex flex-col justify-between h-full">
            <div className="space-y-5">
              <h2 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-slate-400" />
                Properties Editor
              </h2>

              {selectedNode ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Node Name</label>
                    <input
                      type="text"
                      value={selectedNode.data.label || ""}
                      onChange={(e) => handleUpdateNodeLabel(e.target.value)}
                      className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                    />
                  </div>

                  {/* Webhook Properties */}
                  {selectedNode.type === "webhookTrigger" && (
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">HTTP Method</label>
                        <select className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2 py-1.5 text-xs text-slate-300">
                          <option>POST (Recommended)</option>
                          <option>GET</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Trigger endpoint</label>
                        <div className="bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl p-2.5 font-mono text-[9px] text-[#00f5ff] break-all select-all">
                          https://api.flogistic.ai/v1/hooks/run/wk_8829
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Agent properties */}
                  {selectedNode.type === "agentExecution" && (
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Select Agent Instance</label>
                        <select className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2 py-1.5 text-xs text-slate-300">
                          {MOCK_AGENTS.map(agent => (
                            <option key={agent.id} value={agent.id}>{agent.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Routing Tier</label>
                        <select className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2 py-1.5 text-xs text-slate-300">
                          <option>Cost Optimized (Flash)</option>
                          <option>Intelligence Optimized (Pro)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Database properties */}
                  {selectedNode.type === "databaseAction" && (
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Target Table</label>
                        <input
                          type="text"
                          defaultValue="leads"
                          className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Operation</label>
                        <select className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2 py-1.5 text-xs text-slate-300">
                          <option>INSERT INTO</option>
                          <option>UPDATE TABLE</option>
                          <option>SELECT FROM</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Slack properties */}
                  {selectedNode.type === "slackNotification" && (
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Slack Channel</label>
                        <input
                          type="text"
                          defaultValue="#ops-alerts"
                          className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Payload format</label>
                        <textarea
                          rows={2}
                          defaultValue='{"text": "Agent qualified lead: {{lead_name}}"}'
                          className="w-full bg-[#040814] border border-[rgba(255,255,255,0.06)] rounded-xl p-2 text-[10px] font-mono text-slate-300 resize-none focus:outline-none focus:border-[#00f5ff]"
                        />
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs flex flex-col items-center gap-1">
                  <Info className="w-5 h-5 text-slate-600" />
                  <span>Click a node to configure properties.</span>
                </div>
              )}
            </div>

            {selectedNode && (
              <div className="border-t border-[rgba(255,255,255,0.05)] pt-3 text-[9px] text-slate-500 leading-normal">
                Adjustments sync instantly. Changes will deploy on your next save.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
