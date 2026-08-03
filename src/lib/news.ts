import { news as staticNews, type NewsPost } from "@/data/site";

export async function fetchNews(): Promise<NewsPost[]> {
  return staticNews;
}

export async function fetchNewsBySlug(slug: string): Promise<NewsPost | null> {
  return staticNews.find((post) => post.slug === slug) ?? null;
}
