"use server";

import { requireUserRole } from "@/lib/auth";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase";
import { AgentSchema, AgentInput, WorkflowSchema, WorkflowInput } from "./schema";

/**
 * Server Action: Create AI Agent
 * Authorized roles: Owner, Admin, Developer
 */
export async function createAgentAction(data: AgentInput) {
  try {
    // 1. Authorize User Role (RBAC)
    const session = await requireUserRole(["Owner", "Admin", "Developer"]);

    // 2. Validate Inputs
    const parsed = AgentSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors
      };
    }

    const { projectId, name, systemPrompt, modelProvider, modelName, temperature, memoryType } = parsed.data;

    // 3. Initialize Server Supabase Client
    const supabase = createServerSupabaseClient();

    // 4. Save to Database
    const { data: agent, error } = await supabase
      .from("agents")
      .insert({
        project_id: projectId,
        name,
        system_prompt: systemPrompt,
        model_provider: modelProvider,
        model_name: modelName,
        temperature,
        memory_type: memoryType
      })
      .select()
      .single();

    if (error) {
      console.error("[createAgentAction DB Error]", error);
      return { success: false, error: `Database insertion failed: ${error.message}` };
    }

    // 5. Write to Audit Logs Table (using Admin bypass to ensure log completion)
    const adminSupabase = createAdminSupabaseClient();
    await adminSupabase.from("audit_logs").insert({
      organization_id: session.organizationId,
      user_id: session.userId,
      action: "agent:create",
      details: { agentId: agent.id, agentName: name, modelName }
    });

    return { success: true, agentId: agent.id };
  } catch (err: any) {
    console.error("[createAgentAction Error]", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Server Action: Create Visual Workflow
 * Authorized roles: Owner, Admin, Developer
 */
export async function createWorkflowAction(data: WorkflowInput) {
  try {
    // 1. Authorize User Role (RBAC)
    const session = await requireUserRole(["Owner", "Admin", "Developer"]);

    // 2. Validate Inputs
    const parsed = WorkflowSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors
      };
    }

    const { projectId, name, graphData } = parsed.data;

    // 3. Initialize Server Client
    const supabase = createServerSupabaseClient();

    // 4. Save to Database
    const { data: workflow, error } = await supabase
      .from("workflows")
      .insert({
        project_id: projectId,
        name,
        graph_data: graphData,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error("[createWorkflowAction DB Error]", error);
      return { success: false, error: `Database insertion failed: ${error.message}` };
    }

    // 5. Write to Audit Logs
    const adminSupabase = createAdminSupabaseClient();
    await adminSupabase.from("audit_logs").insert({
      organization_id: session.organizationId,
      user_id: session.userId,
      action: "workflow:create",
      details: { workflowId: workflow.id, workflowName: name }
    });

    return { success: true, workflowId: workflow.id };
  } catch (err: any) {
    console.error("[createWorkflowAction Error]", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
