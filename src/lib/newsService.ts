import { supabase } from "./superabase";

export type News = {
  id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  cover?: string;
  category?: string;
  author_id?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  published?: boolean;
  featured?: boolean;
  date?: string;
};

export async function getNewsList({ page = 1, perPage = 10, search, order = "date.desc" } = {}) {
  const from = (page - 1) * perPage;
  let query = supabase
    .from("noticias")
    .select("*, profiles:author_id(*)", { count: "estimated" })
    .range(from, from + perPage - 1);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (order) {
    const [col, dir] = order.split(".");
    query = query.order(col, { ascending: dir === "asc" });
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count };
}

export async function getNewsById(id: string) {
  const { data, error } = await supabase.from("noticias").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function createNews(news: News) {
  const { data, error } = await supabase.from("noticias").insert(news).select().single();
  if (error) throw error;
  return data;
}

export async function updateNews(id: string, news: Partial<News>) {
  const { data, error } = await supabase
    .from("noticias")
    .update(news)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteNews(id: string) {
  const { error } = await supabase.from("noticias").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export async function duplicateNews(id: string) {
  const original = await getNewsById(id);
  const copy = { ...original, title: original.title + " (Cópia)", slug: null };
  delete copy.id;
  return createNews(copy as News);
}
