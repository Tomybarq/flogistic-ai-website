import { Course, Lesson, Agent, Workflow } from "@/types/database.types";

/**
 * Mock Database Store for Flogistic Platform local execution.
 */
export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "AI Agent Engineering for Business Operations",
    slug: "ai-agent-engineering",
    description: "Learn how to build, test, and deploy stateful AI agents to automate daily operational tasks, lead generation, and customer support workflows.",
    difficulty: "Intermediate",
    thumbnailUrl: "/courses/agent-eng.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "course-2",
    title: "Enterprise Prompt Engineering Mastery",
    slug: "prompt-engineering-mastery",
    description: "Master advanced prompt techniques, prompt evaluations, systemic token optimization, and mitigation of hallucinations in enterprise SaaS environments.",
    difficulty: "Beginner",
    thumbnailUrl: "/courses/prompt-eng.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "course-3",
    title: "Visual Workflows & API Integrations",
    slug: "visual-workflows-integrations",
    description: "Connect your AI models with external tools, webhooks, databases, and third-party systems using the Flogistic Automation visual node graph.",
    difficulty: "Advanced",
    thumbnailUrl: "/courses/workflows.png",
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_LESSONS: Record<string, Lesson[]> = {
  "course-1": [
    {
      id: "lesson-1-1",
      courseId: "course-1",
      title: "Introduction to Agentic Architectures",
      contentMarkdown: `### Welcome to Agentic Architectures

In this lesson, you will learn the core differences between traditional linear LLM requests and agentic loops.

#### What makes a system "Agentic"?
1. **Autonomy**: The agent determines the steps needed to solve a goal.
2. **Tool Use**: Access to search engines, databases, calculators, and API routers.
3. **Memory**: Short-term session context and long-term vector/semantic lookup databases.
4. **Planning**: Breaking down large questions into sub-steps.

Explore the right playground panel to experiment with your first agent.`,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: "lesson-1-2",
      courseId: "course-1",
      title: "Designing Robust Tool Specifications",
      contentMarkdown: `### Designing Tool Specs

To let agents interact with external APIs, you must define clear, robust schemas that LLMs can parse.

#### Key Principles
- Use descriptive tool names (e.g. \`retrieve_customer_record\` instead of \`get_db_data\`).
- Write explicit description tags for every parameter.
- Handle tool errors gracefully within the agent loop.`,
      sortOrder: 2,
      createdAt: new Date().toISOString(),
    }
  ],
  "course-2": [
    {
      id: "lesson-2-1",
      courseId: "course-2",
      title: "The Mechanics of Few-Shot Prompting",
      contentMarkdown: `### Few-Shot Prompting

Few-shot prompting provides the model with representative examples of input-output expectations to align response formats.

\`\`\`markdown
Classify the sentiment of the following support tickets:

Ticket: "The system is slow and crashes every 10 minutes."
Class: Critical Bug

Ticket: "I want to change my billing email."
Class: Billing Query

Ticket: "Can you add a dark mode option?"
Class: Feature Request
\`\`\`

Experiment in the Prompt Sandbox using few-shot formatting.`,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
    }
  ]
};

export const MOCK_AGENTS: Agent[] = [
  {
    id: "agent-1",
    projectId: "project-1",
    name: "Lead Qualification Agent",
    systemPrompt: "You are a lead enrichment and scoring assistant. Inspect the incoming customer metadata, evaluate its alignment with our ICP (Enterprise SaaS companies with >50 employees), and output a score from 1-100.",
    modelProvider: "anthropic",
    modelName: "claude-3-5-sonnet",
    temperature: 0.1,
    memoryType: "vector",
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "agent-2",
    projectId: "project-1",
    name: "Customer Support Triager",
    systemPrompt: "Review incoming customer support requests. Classify them into Technical, Billing, or General and draft a polite initial response targeting the specific issue.",
    modelProvider: "openai",
    modelName: "gpt-4o-mini",
    temperature: 0.2,
    memoryType: "buffer",
    isPublic: true,
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "workflow-1",
    projectId: "project-1",
    name: "Support Enrichment & Response Draft Automation",
    graphData: {
      nodes: [
        { id: "node-trigger", type: "webhookTrigger", position: { x: 50, y: 150 }, data: { label: "New Support Ticket Webhook" } },
        { id: "node-triage", type: "agentExecution", position: { x: 300, y: 100 }, data: { agentId: "agent-2", label: "Triage & Category Classifier" } },
        { id: "node-db-update", type: "databaseAction", position: { x: 550, y: 150 }, data: { label: "Update Supabase Ticket Status" } },
        { id: "node-slack", type: "slackNotification", position: { x: 800, y: 100 }, data: { label: "Alert Engineering Slack channel" } }
      ],
      edges: [
        { id: "edge-1", source: "node-trigger", target: "node-triage" },
        { id: "edge-2", source: "node-triage", target: "node-db-update" },
        { id: "edge-3", source: "node-db-update", target: "node-slack" }
      ]
    },
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];
