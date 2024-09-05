import { createClient } from "@supabase/supabase-js";
import { getKey } from "../utils/help_sec";

export const supabaseUrl = "https://osvuabjhfgyvcliwmqed.supabase.co";
const sk = await getKey();
const supabase = createClient(supabaseUrl, sk);

export default supabase;
