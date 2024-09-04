import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://osvuabjhfgyvcliwmqed.supabase.co";

const supabase = createClient(supabaseUrl, import.meta.env.VITE_SUPABASE_KEY);

export default supabase;
