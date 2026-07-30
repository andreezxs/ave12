import { supabase } from "./superabase";
import { news as staticNews, type NewsPost } from "@/data/site";

type SupabaseNewsRow = {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  autor: string;
  categoria: string;
  imagem: string | null;
  slug?: string;
  created_at: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 100);
}

function mapSupabaseRow(row: SupabaseNewsRow): NewsPost {
  const slug = row.slug ? String(row.slug) : slugify(row.titulo);
  const date = row.created_at?.split("T")[0] ?? new Date().toISOString().slice(0, 10);

  return {
    slug,
    title: row.titulo,
    excerpt: row.resumo,
    body: [row.conteudo],
    category: row.categoria as NewsPost["category"],
    author: row.autor,
    date,
    cover: "comunidade",
  };
}

async function fetchNewsFromSupabase(): Promise<NewsPost[] | null> {
  const { data, error } = await supabase.from<SupabaseNewsRow>("noticias").select("*");

  if (error) {
    console.warn("Supabase news fetch failed:", error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return data.map(mapSupabaseRow);
}

export async function fetchNews(): Promise<NewsPost[]> {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are not configured. Using static news fallback.");
    return staticNews;
  }

  const data = await fetchNewsFromSupabase();
  return data ?? staticNews;
}

export async function fetchNewsBySlug(slug: string): Promise<NewsPost | null> {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return staticNews.find((post) => post.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from<SupabaseNewsRow>("noticias")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!error && data) {
    return mapSupabaseRow(data);
  }

  const allNews = await fetchNews();
  return allNews.find((post) => post.slug === slug) ?? null;
}
