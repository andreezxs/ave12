import { createClient } from "@supabase/supabase-js";
const url = "https://clzznwlegaiattvodrer.supabase.co";
const key = "sb_publishable_WKlJhdaHELj_THWoYZS7nw_58NxsHeK";
const supabase = createClient(url, key);
try {
  const { data, error } = await supabase.from("noticias").select("*").limit(5);
  console.log("ERROR", error?.message || null);
  console.log("DATA", JSON.stringify(data, null, 2));
} catch (e) {
  console.error("EXCEPTION", e instanceof Error ? e.message : e);
}
