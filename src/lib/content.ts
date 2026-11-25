import { createServerFn } from "@tanstack/react-start";
import {
  agenda as staticAgenda,
  albums as staticAlbums,
  catecheticalBooks as staticCatecheticalBooks,
  catecheticalSources as staticCatecheticalSources,
  catechesisContents as staticCatechesisContents,
  faq as staticFaq,
  news as staticNews,
  prizes as staticPrizes,
  schedules as staticSchedules,
  timeline as staticTimeline,
  type GalleryAlbum,
  type CatechesisContent,
  type CatecheticalBook,
  type CatecheticalSource,
  type NewsPost,
} from "@/data/site";
import { getSql } from "@/lib/db";

export type AgendaItem = (typeof staticAgenda)[number];
export type TimelineItem = (typeof staticTimeline)[number];
export type ScheduleBlock = (typeof staticSchedules)[number];
export type { CatechesisContent, CatecheticalBook };
export type CatecheticalLibrary = {
  contents: CatechesisContent[];
  books: CatecheticalBook[];
  sources: CatecheticalSource[];
};
export type FaqItem = (typeof staticFaq)[number];
export type PrizeItem = (typeof staticPrizes)[number];
export type SaintOfDayInfo = { name: string; description: string; url: string };

async function queryNews(): Promise<NewsPost[]> {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT slug, title, excerpt, body, category, author, date::text AS date, cover, cover_url
      FROM news
      ORDER BY date DESC
    `;
    return rows.map((row) => ({
      slug: String(row.slug),
      title: String(row.title),
      excerpt: String(row.excerpt),
      body: Array.isArray(row.body) ? (row.body as string[]) : [],
      category: String(row.category),
      author: String(row.author),
      date: String(row.date).slice(0, 10),
      cover: row.cover as NewsPost["cover"],
      coverUrl: row.cover_url ? String(row.cover_url) : undefined,
    }));
  } catch (error) {
    console.warn("Neon news fallback:", error instanceof Error ? error.message : error);
    return staticNews;
  }
}

export const fetchNews = createServerFn({ method: "GET" }).handler(async () => queryNews());

export const fetchNewsBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const sql = await getSql();
      const rows = await sql`
        SELECT slug, title, excerpt, body, category, author, date::text AS date, cover, cover_url
        FROM news
        WHERE slug = ${slug}
        LIMIT 1
      `;
      const row = rows[0];
      if (!row) return staticNews.find((post) => post.slug === slug) ?? null;
      return {
        slug: String(row.slug),
        title: String(row.title),
        excerpt: String(row.excerpt),
        body: Array.isArray(row.body) ? (row.body as string[]) : [],
        category: String(row.category),
        author: String(row.author),
        date: String(row.date).slice(0, 10),
        cover: row.cover as NewsPost["cover"],
        coverUrl: row.cover_url ? String(row.cover_url) : undefined,
      } satisfies NewsPost;
    } catch (error) {
      console.warn("Neon news by slug fallback:", error instanceof Error ? error.message : error);
      return staticNews.find((post) => post.slug === slug) ?? null;
    }
  });

export const fetchFaq = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT question, answer
      FROM faq
      ORDER BY sort_order ASC, id ASC
    `;
    return rows.map((row) => ({
      q: String(row.question),
      a: String(row.answer),
    }));
  } catch (error) {
    console.warn("Neon faq fallback:", error instanceof Error ? error.message : error);
    return staticFaq;
  }
});

export const fetchSchedules = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT title, items
      FROM schedules
      ORDER BY sort_order ASC, id ASC
    `;
    return rows.map((row) => ({
      title: String(row.title),
      items: Array.isArray(row.items) ? (row.items as string[]) : [],
    }));
  } catch (error) {
    console.warn("Neon schedules fallback:", error instanceof Error ? error.message : error);
    return staticSchedules;
  }
});

export const fetchCatecheticalLibrary = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatecheticalLibrary> => ({
    contents: staticCatechesisContents,
    books: staticCatecheticalBooks,
    sources: staticCatecheticalSources,
  }),
);

export const fetchPrizes = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT title, description, highlight
      FROM prizes
      ORDER BY sort_order ASC, id ASC
    `;
    return rows.map((row) => ({
      title: String(row.title),
      description: String(row.description),
      highlight: Boolean(row.highlight),
    }));
  } catch (error) {
    console.warn("Neon prizes fallback:", error instanceof Error ? error.message : error);
    return staticPrizes;
  }
});

export const fetchTimeline = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT year, title, text
      FROM timeline
      ORDER BY sort_order ASC, id ASC
    `;
    return rows.map((row) => ({
      year: String(row.year),
      title: String(row.title),
      text: String(row.text),
    }));
  } catch (error) {
    console.warn("Neon timeline fallback:", error instanceof Error ? error.message : error);
    return staticTimeline;
  }
});

export const fetchAgenda = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT category, title, date::text AS date, time, place
      FROM agenda
      ORDER BY date ASC, id ASC
    `;
    return rows.map((row) => ({
      category: String(row.category),
      title: String(row.title),
      date: String(row.date).slice(0, 10),
      time: String(row.time),
      place: String(row.place),
    }));
  } catch (error) {
    console.warn("Neon agenda fallback:", error instanceof Error ? error.message : error);
    return staticAgenda;
  }
});

export const fetchAlbums = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT slug, title, category, count, cover_url
      FROM albums
      ORDER BY sort_order ASC, id ASC
    `;
    return rows.map(
      (row) =>
        ({
          slug: String(row.slug),
          title: String(row.title),
          category: String(row.category),
          count: Number(row.count ?? 0),
          coverUrl: row.cover_url ? String(row.cover_url) : undefined,
        }) satisfies GalleryAlbum,
    );
  } catch (error) {
    console.warn("Neon albums fallback:", error instanceof Error ? error.message : error);
    return staticAlbums;
  }
});

export const fetchSaintOfDay = createServerFn({ method: "GET" }).handler(
  async (): Promise<SaintOfDayInfo> => {
    const url = "https://a12.com/santuario/reze-no-santuario/santo-do-dia/";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`A12 respondeu com status ${response.status}`);
      }

      const html = await response.text();
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
      const name = title
        ?.replace(/<[^>]*>/g, "")
        .replace(/^Santo do Dia\s*[—–-]\s*/i, "")
        .trim();
      const descriptionTag = html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0];
      const description = descriptionTag?.match(/\bcontent=(["'])(.*?)\1/i)?.[2];

      if (!name) throw new Error("Não foi possível identificar o santo do dia na página do A12");

      return {
        name,
        description: description ?? "",
        url,
      };
    } finally {
      clearTimeout(timeout);
    }
  },
);
