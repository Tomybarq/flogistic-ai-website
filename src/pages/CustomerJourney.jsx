import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Plus, Link2, MousePointer2, Trash2, RotateCcw, X, Save } from 'lucide-react';

const STAGE_COLORS = [
  { bar: '#3b82f6', glow: 'rgba(59,130,246,0.25)' },
  { bar: '#8b5cf6', glow: 'rgba(139,92,246,0.25)' },
  { bar: '#ec4899', glow: 'rgba(236,72,153,0.25)' },
  { bar: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
  { bar: '#10b981', glow: 'rgba(16,185,129,0.25)' },
  { bar: '#06b6d4', glow: 'rgba(6,182,212,0.25)' },
];

const NODE_W = 200;
const NODE_H = 96;

const DEFAULT_STAGES = [
  { id: 's1', title: '认知', description: '客户首次了解品牌', x: 60, y: 220, color: 0 },
  { id: 's2', title: '兴趣', description: '对产品产生兴趣', x: 320, y: 220, color: 1 },
  { id: 's3', title: '考虑', description: '评估不同选项', x: 580, y: 220, color: 2 },
  { id: 's4', title: '意向', description: '产生购买意向', x: 840, y: 220, color: 3 },
  { id: 's5', title: '购买', description: '完成购买决策', x: 1100, y: 220, color: 4 },
];

const DEFAULT_CONNECTIONS = [
  { id: 'c1', from: 's1', to: 's2' },
  { id: 'c2', from: 's2', to: 's3' },
  { id: 'c3', from: 's3', to: 's4' },
  { id: 'c4', from: 's4', to: 's5' },
];

let idCounter = 100;
const newId = () => `n${idCounter++}`;

export default function CustomerJourney() {
  const [nodes, setNodes] = useState(DEFAULT_STAGES);
  const [connections, setConnections] = useState(DEFAULT_CONNECTIONS);
  const [mode, setMode] = useState('select'); // select | connect | delete
  const [connectFrom, setConnectFrom] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: '', description: '' });
  const canvasRef = useRef(null);

  const addNode = () => {
    const node = {
      id: newId(),
      title: '新阶段',
      description: '描述此阶段',
      x: 80 + Math.random() * 400,
      y: 400 + Math.random() * 120,
      color: Math.floor(Math.random() * STAGE_COLORS.length),
    };
    setNodes((prev) => [...prev, node]);
  };

  const reset = () => {
    setNodes(DEFAULT_STAGES);
    setConnections(DEFAULT_CONNECTIONS);
    setMode('select');
    setConnectFrom(null);
    setEditingId(null);
  };

  const onNodeMouseDown = (e, node) => {
    if (mode === 'select' && editingId !== node.id) {
      e.stopPropagation();
      e.preventDefault();
      setDragging({ id: node.id, offsetX: e.clientX - node.x, offsetY: e.clientY - node.y });
    }
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.clientX - dragging.offsetX;
      const y = e.clientY - dragging.offsetY;
      setNodes((prev) => prev.map((n) => (n.id === dragging.id ? { ...n, x, y } : n)));
    };
    const onUp = () => setDragging(null);
    if (dragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
    }
  }, [dragging]);

  const onNodeClick = (node) => {
    if (mode === 'connect') {
      if (!connectFrom) {
        setConnectFrom(node.id);
      } else if (connectFrom !== node.id) {
        const exists = connections.some((c) => c.from === connectFrom && c.to === node.id);
        if (!exists) {
          setConnections((prev) => [...prev, { id: newId(), from: connectFrom, to: node.id }]);
        }
        setConnectFrom(null);
      }
    } else if (mode === 'delete') {
      setNodes((prev) => prev.filter((n) => n.id !== node.id));
      setConnections((prev) => prev.filter((c) => c.from !== node.id && c.to !== node.id));
    }
  };

  const startEdit = (node) => {
    setEditingId(node.id);
    setDraft({ title: node.title, description: node.description });
  };

  const saveEdit = () => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === editingId ? { ...n, title: draft.title, description: draft.description } : n
      )
    );
    setEditingId(null);
  };

  const onConnectionClick = (id) => {
    if (mode === 'delete') setConnections((prev) => prev.filter((c) => c.id !== id));
  };

  const center = (n) => ({ x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 });

  const pathFor = (from, to) => {
    const a = center(from);
    const b = center(to);
    const dx = Math.abs(b.x - a.x) / 2;
    const c1x = a.x + dx;
    const c1y = a.y;
    const c2x = b.x - dx;
    const c2y = b.y;
    return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
  };

  const modeBtn = (key, Icon, label) => {
    const active = mode === key;
    return (
      <button
        onClick={() => {
          setMode(key);
          setConnectFrom(null);
        }}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
          active
            ? 'bg-white text-slate-900 shadow-lg'
            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">客户旅程流程图</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {mode === 'connect' && (connectFrom ? '选择目标阶段以建立连接' : '选择起始阶段')}
            {mode === 'select' && '拖拽阶段以重新排列 · 双击编辑内容'}
            {mode === 'delete' && '点击阶段或连线以删除'}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {modeBtn('select', MousePointer2, '选择')}
          {modeBtn('connect', Link2, '连接')}
          {modeBtn('delete', Trash2, '删除')}
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button
            onClick={addNode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            添加阶段
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </div>
      </header>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative flex-1 overflow-auto"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="relative" style={{ width: 3000, height: 1200 }}>
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
              </marker>
            </defs>
            {connections.map((c) => {
              const from = nodes.find((n) => n.id === c.from);
              const to = nodes.find((n) => n.id === c.to);
              if (!from || !to) return null;
              const isHover = mode === 'delete';
              return (
                <g key={c.id} className="pointer-events-auto" style={{ cursor: isHover ? 'pointer' : 'default' }}>
                  <path
                    d={pathFor(from, to)}
                    fill="none"
                    stroke={isHover ? '#818cf8' : '#64748b'}
                    strokeWidth={isHover ? 3 : 2}
                    strokeDasharray={isHover ? '6 4' : 'none'}
                    markerEnd={`url(#${isHover ? 'arrow-active' : 'arrow'})`}
                    onClick={() => onConnectionClick(c.id)}
                  />
                  <path
                    d={pathFor(from, to)}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={16}
                    onClick={() => onConnectionClick(c.id)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const color = STAGE_COLORS[node.color % STAGE_COLORS.length];
            const isConnectFrom = connectFrom === node.id;
            const isEditing = editingId === node.id;
            return (
              <div
                key={node.id}
                onMouseDown={(e) => onNodeMouseDown(e, node)}
                onClick={() => onNodeClick(node)}
                onDoubleClick={() => startEdit(node)}
                className={`absolute rounded-xl border transition-shadow select-none ${
                  mode === 'select' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                } ${isConnectFrom ? 'ring-2 ring-indigo-400' : ''} ${
                  mode === 'delete' ? 'hover:ring-2 hover:ring-rose-400' : ''
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                  width: NODE_W,
                  height: NODE_H,
                  background: 'rgba(15,23,42,0.95)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  boxShadow: `0 8px 24px ${color.glow}, 0 2px 8px rgba(0,0,0,0.4)`,
                }}
              >
                <div className="h-1.5 rounded-t-xl" style={{ background: color.bar }} />
                <div className="px-3 py-2.5">
                  {isEditing ? (
                    <div className="space-y-1.5">
                      <input
                        autoFocus
                        value={draft.title}
                        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        className="w-full bg-white/10 border border-white/15 rounded px-2 py-1 text-sm font-semibold outline-none focus:border-indigo-400"
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                      <input
                        value={draft.description}
                        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        className="w-full bg-white/10 border border-white/15 rounded px-2 py-1 text-xs outline-none focus:border-indigo-400"
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                      <div className="flex gap-1.5 pt-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); saveEdit(); }}
                          className="flex items-center gap-1 text-xs bg-indigo-500 hover:bg-indigo-400 px-2 py-1 rounded"
                        >
                          <Save className="w-3 h-3" /> 保存
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                          className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded"
                        >
                          <X className="w-3 h-3" /> 取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white truncate">{node.title}</h3>
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: color.bar }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {node.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <footer className="border-t border-white/10 bg-slate-900/60 px-6 py-2.5 text-xs text-slate-500 flex items-center justify-between">
        <span>阶段: {nodes.length} · 连接: {connections.length}</span>
        <span>双击阶段编辑 · 选择「连接」模式建立关系</span>
      </footer>
    </div>
  );
}