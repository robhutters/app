import { createClient } from '@supabase/supabase-js';

export const supabaseLocal = createClient(import.meta.env.VITE_APP_SUPABASE_LOCAL_URL, import.meta.env.VITE_APP_SUPABASE_LOCAL_ANON_KEY);