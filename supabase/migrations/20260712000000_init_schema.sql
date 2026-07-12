-- Flogistic Platform PostgreSQL Initial Database Schema Migration
-- Database: PostgreSQL + pgvector (SaaS multi-tenant multi-user architecture)

-- Enable vector extensions for agent search, semantic caching, and prompt matching
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- -------------------------------------------------------------
-- 1. Organizations & Access Control (RBAC)
-- -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE -- 'Owner', 'Admin', 'Developer', 'Member'
);

-- Seed basic roles
INSERT INTO roles (name) VALUES ('Owner'), ('Admin'), ('Developer'), ('Member') ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Maps to Auth UID
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 2. Projects & Agentic Workspaces
-- -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    system_prompt TEXT NOT NULL,
    model_provider VARCHAR(50) NOT NULL, -- 'openai', 'anthropic', 'google', 'groq', etc.
    model_name VARCHAR(100) NOT NULL, -- 'gpt-4o', 'claude-3-5-sonnet', etc.
    temperature NUMERIC(3,2) DEFAULT 0.2 NOT NULL CHECK (temperature >= 0.0 AND temperature <= 2.0),
    memory_type VARCHAR(50) DEFAULT 'buffer' NOT NULL, -- 'buffer', 'vector', 'none'
    is_public BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    version INTEGER NOT NULL DEFAULT 1,
    prompt_text TEXT NOT NULL,
    variables JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for prompt lookups
CREATE INDEX IF NOT EXISTS idx_prompts_agent_version ON prompts(agent_id, version DESC);

-- -------------------------------------------------------------
-- 3. Visual Workflow Automation Engine
-- -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    graph_data JSONB NOT NULL, -- Stores node array and edge linkages
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS workflow_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- 'pending', 'running', 'succeeded', 'failed'
    execution_logs JSONB DEFAULT '[]'::jsonb NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Index for workflow monitoring
CREATE INDEX IF NOT EXISTS idx_runs_workflow_date ON workflow_runs(workflow_id, started_at DESC);

-- -------------------------------------------------------------
-- 4. LMS: Learn AI Academy
-- -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT,
    difficulty VARCHAR(50) DEFAULT 'Beginner' NOT NULL, -- 'Beginner', 'Intermediate', 'Advanced'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content_markdown TEXT NOT NULL,
    video_url TEXT,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    progress_percent INTEGER DEFAULT 0 NOT NULL CHECK (progress_percent >= 0 AND progress_percent <= 100),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);

-- -------------------------------------------------------------
-- 5. Audit Logging & System Telemetry
-- -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- e.g., 'agent:create', 'workflow:run'
    details JSONB DEFAULT '{}'::jsonb NOT NULL,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_org_date ON audit_logs(organization_id, created_at DESC);

-- -------------------------------------------------------------
-- 6. Row Level Security (RLS) Multi-Tenant Policies
-- -------------------------------------------------------------

-- Enable RLS for all client/tenant tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Note: LMS Tables (courses, lessons) do not use strict organization isolation. They are globally readable.
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- A. Organizations Policies
CREATE POLICY org_select_policy ON organizations
    FOR SELECT USING (
        id IN (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY org_update_policy ON organizations
    FOR UPDATE USING (
        id IN (SELECT organization_id FROM users WHERE id = auth.uid() AND role_id IN (SELECT id FROM roles WHERE name IN ('Owner', 'Admin')))
    );

-- B. Users Policies
CREATE POLICY user_read_policy ON users
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY user_write_policy ON users
    FOR ALL USING (
        id = auth.uid() OR 
        organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid() AND role_id IN (SELECT id FROM roles WHERE name IN ('Owner', 'Admin')))
    );

-- C. Projects Policies
CREATE POLICY project_tenant_policy ON projects
    FOR ALL USING (
        organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())
    );

-- D. Agents & Prompts Policies
CREATE POLICY agent_tenant_policy ON agents
    FOR ALL USING (
        project_id IN (SELECT id FROM projects WHERE organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()))
    );

CREATE POLICY prompt_tenant_policy ON prompts
    FOR ALL USING (
        agent_id IN (SELECT id FROM agents WHERE project_id IN (SELECT id FROM projects WHERE organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())))
    );

-- E. Workflows & Runs Policies
CREATE POLICY workflow_tenant_policy ON workflows
    FOR ALL USING (
        project_id IN (SELECT id FROM projects WHERE organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()))
    );

CREATE POLICY run_tenant_policy ON workflow_runs
    FOR ALL USING (
        workflow_id IN (SELECT id FROM workflows WHERE project_id IN (SELECT id FROM projects WHERE organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())))
    );

-- F. Audit Logs Policies
CREATE POLICY audit_tenant_policy ON audit_logs
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())
    );

-- G. LMS public read / secure enrollments policies
CREATE POLICY courses_public_select ON courses FOR SELECT USING (true);
CREATE POLICY lessons_public_select ON lessons FOR SELECT USING (true);

CREATE POLICY enrollments_user_policy ON enrollments
    FOR ALL USING (
        user_id = auth.uid()
    );

-- -------------------------------------------------------------
-- 7. Automatic updated_at Triggers
-- -------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_modtime BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_modtime BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_modtime BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
