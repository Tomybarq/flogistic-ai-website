import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        // Simple phone validation regex
        return /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im.test(val);
      },
      { message: "Please enter a valid phone number." }
    ),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const AgentSchema = z.object({
  projectId: z.string().uuid({ message: "Invalid Project UUID." }),
  name: z.string().min(2, { message: "Agent name must be at least 2 characters." }),
  systemPrompt: z.string().min(10, { message: "System prompt must be at least 10 characters." }),
  modelProvider: z.enum(["openai", "anthropic", "google", "groq", "custom"]),
  modelName: z.string().min(2, { message: "Invalid model name specification." }),
  temperature: z.number().min(0).max(2).default(0.2),
  memoryType: z.enum(["buffer", "vector", "none"]).default("buffer")
});

export type AgentInput = z.infer<typeof AgentSchema>;

export const WorkflowSchema = z.object({
  projectId: z.string().uuid({ message: "Invalid Project UUID." }),
  name: z.string().min(2, { message: "Workflow name must be at least 2 characters." }),
  graphData: z.object({
    nodes: z.array(z.any()),
    edges: z.array(z.any())
  })
});

export type WorkflowInput = z.infer<typeof WorkflowSchema>;

