import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { news } from "@/data/site";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/a-paroquia", changefreq: "monthly", priority: "0.8" },
          { path: "/historia", changefreq: "monthly", priority: "0.7" },
          { path: "/noticias", changefreq: "daily", priority: "0.9" },
          { path: "/agenda", changefreq: "weekly", priority: "0.9" },
          { path: "/ave12", changefreq: "monthly", priority: "0.8" },
          { path: "/camisetas", changefreq: "monthly", priority: "0.7" },
          { path: "/show-de-premios", changefreq: "weekly", priority: "0.9" },
          { path: "/premiacoes", changefreq: "monthly", priority: "0.7" },
          { path: "/galeria", changefreq: "weekly", priority: "0.7" },
          { path: "/horarios", changefreq: "monthly", priority: "0.8" },
          { path: "/regulamento", changefreq: "yearly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/contato", changefreq: "monthly", priority: "0.7" },
          ...news.map((post) => ({
            path: `/noticias/${post.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
