import { createClient } from "@supabase/supabase-js";
const url = "https://clzznwlegaiattvodrer.supabase.co";
const key = "sb_publishable_WKlJhdaHELj_THWoYZS7nw_58NxsHeK";
const supabase = createClient(url, key);
const tables = ["albums", "galeria", "album", "fotos", "photos", "photo_albums", "gallery_albums"];
for (const table of tables) {
  try {
    const { data, error } = await supabase.from(table).select("*").limit(2);
    console.log(
      "TABLE",
      table,
      "ERROR",
      error?.message || null,
      "DATA",
      data ? JSON.stringify(data, null, 2) : null,
    );
  } catch (e) {
    console.error("TABLE", table, "EXC", e instanceof Error ? e.message : e);
  }
}
