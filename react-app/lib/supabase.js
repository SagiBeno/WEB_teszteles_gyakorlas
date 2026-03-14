import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
    throw new Error("Missing VITE_SUPABASE_URL environment variable");
}

if (!supabaseServiceRoleKey) {
    throw new Error("Missing VITE_SUPABASE_ANON_KEY environment variable");
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
