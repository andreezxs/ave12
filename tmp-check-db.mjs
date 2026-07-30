import { createClient } from "@supabase/supabase-js";
const url = "https://clzznwlegaiattvodrer.supabase.co";
const key = "sb_publishable_WKlJhdaHELj_THWoYZS7nw_58NxsHeK";
const supabase = createClient(url, key);
const tables = [
  "news",
  "noticias",
  "posts",
  "articles",
  "publicacoes",
  "noticia",
  "noticias_publicas",
  "public.news",
];
for (const table of tables) {
  const { data, error } = await supabase.from(table).select("*").limit(1);
  console.log("TABLE", table, "ERROR", error?.message || null, "LENGTH", data?.length);
  if (data) console.log(JSON.stringify(data, null, 2));
}
