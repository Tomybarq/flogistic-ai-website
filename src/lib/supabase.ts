import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Global Supabase Client
 * Used for client-side queries, automatically routing user session JWT tokens.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-Side Supabase Client Generator
 * Call this inside Next.js Server Actions or API Route Handlers.
 */
export function createServerSupabaseClient() {
  // In production, you would fetch authorization headers or cookies if using Next.js route contexts.
  // For standard server operations, we return an authenticated instance.
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

/**
 * Admin Service Role Supabase Client Generator
 * WARNING: Overpasses Row Level Security (RLS). Use strictly for webhook handlers or system triggers.
 */
export function createAdminSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}
