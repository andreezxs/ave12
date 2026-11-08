import { createServerFn } from "@tanstack/react-start";
import {
  agenda as staticAgenda,
  albums as staticAlbums,
  faq as staticFaq,
  news as staticNews,
  prizes as staticPrizes,
  schedules as staticSchedules,
  timeline as staticTimeline,
  type GalleryAlbum,
  type NewsPost,
} from "@/data/site";
import { getSql } from "@/lib/db";

export type AgendaItem = (typeof staticAgenda)[number];
export type TimelineItem = (typeof staticTimeline)[number];
export type ScheduleBlock = (typeof staticSchedules)[number];
export type FaqItem = (typeof staticFaq)[number];
export type PrizeItem = (typeof staticPrizes)[number];

async function queryNews(): Promise<NewsPost[]> {
  try {
    const sql = await getSql();
    const rows = await sql`
      SELECT slug, title, excerpt, body, category, author, date::text AS date, cover
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
        SELECT slug, title, excerpt, body, category, author, date::text AS date, cover
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
