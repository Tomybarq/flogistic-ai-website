/**
 * Flogistic Platform Database Types
 * Represents the relational schema and entities mapped to PostgreSQL/pgvector.
 */

export interface Organization {
  id: string; // UUID
  name: string;
  slug: string;
  logoUrl?: string;
  createdAt: string;
}

export interface Role {
  id: string; // UUID
  name: "Owner" | "Admin" | "Developer" | "Member";
}

export interface Permission {
  id: string; // UUID
  code: string; // e.g. "agent:create", "billing:edit"
  description?: string;
}

export interface User {
  id: string; // Clerk UID
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  organizationId?: string; // FK -> Organization
  roleId?: string; // FK -> Role
  createdAt: string;
}

export interface Project {
  id: string; // UUID
  organizationId: string; // FK -> Organization
  name: string;
  description?: string;
  createdAt: string;
}

export interface Agent {
  id: string; // UUID
  projectId: string; // FK -> Project
  name: string;
  systemPrompt: string;
  modelProvider: "openai" | "anthropic" | "google" | "groq" | "custom";
  modelName: string; // e.g. "gpt-4o", "claude-3-5-sonnet", "gemini-1.5-pro"
  temperature: number;
  memoryType: "buffer" | "vector" | "none";
  isPublic: boolean;
  createdAt: string;
}

export interface Prompt {
  id: string; // UUID
  agentId: string; // FK -> Agent
  userId: string; // FK -> User
  version: number;
  promptText: string;
  variables: Record<string, string>; // JSONB key-value variables
  createdAt: string;
}

export interface Workflow {
  id: string; // UUID
  projectId: string; // FK -> Project
  name: string;
  graphData: {
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data: Record<string, any>;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
      data?: Record<string, any>;
    }>;
  };
  isActive: boolean;
  createdAt: string;
}

export interface WorkflowRun {
  id: string; // UUID
  workflowId: string; // FK -> Workflow
  status: "pending" | "running" | "succeeded" | "failed";
  startedAt: string;
  endedAt?: string;
  executionLogs: Array<{
    timestamp: string;
    stepId: string;
    level: "info" | "warn" | "error";
    message: string;
  }>;
}

// LMS: Learn AI Entities
export interface Course {
  id: string; // UUID
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  createdAt: string;
}

export interface Lesson {
  id: string; // UUID
  courseId: string; // FK -> Course
  title: string;
  contentMarkdown: string;
  videoUrl?: string;
  sortOrder: number;
  createdAt: string;
}

export interface Enrollment {
  id: string; // UUID
  userId: string; // FK -> User
  courseId: string; // FK -> Course
  progressPercent: number; // 0 - 100
  completedAt?: string;
  createdAt: string;
}

// Marketplace & Templates
export interface MarketplaceListing {
  id: string; // UUID
  sellerId: string; // FK -> User
  title: string;
  description: string;
  type: "agent" | "workflow" | "prompt";
  price: number; // in cents
  rating: number;
  createdAt: string;
}
