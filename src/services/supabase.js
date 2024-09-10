import { createClient } from "@supabase/supabase-js";
import { getKey } from "../utils/help_sec";

const supabasePromise = getKey().then((sk) => {
  return createClient(import.meta.env.VITE_SUPABASE_URL, sk);
});

export default supabasePromise;
