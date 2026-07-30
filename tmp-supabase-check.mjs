import { createClient } from "@supabase/supabase-js";
const url = "https://clzznwlegaiattvodrer.supabase.co";
const key = "sb_publishable_WKlJhdaHELj_THWoYZS7nw_58NxsHeK";
const supabase = createClient(url, key);
const names = ["noticias", "news", "posts", "articles", "publicacoes"];
for (const table of names) {
  try {
    const { data, error } = await supabase.from(table).select("slug,title").limit(1);
    console.log("TABLE", table, "ERROR", error?.message || null, "DATA", data);
  } catch (e) {
    console.error("TABLE", table, "EXCEPTION", e.message || e);
  }
}
try {
  const { data, error } = await supabase
    .from("information_schema.tables")
    .select("table_name,table_schema")
    .limit(10);
  console.log("SCHEMA TABLES", "ERROR", error?.message || null, "DATA", data);
} catch (e) {
  console.error("SCHEMA FAIL", e.message || e);
}
