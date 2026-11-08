import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { formatDate, type NewsPost } from "@/data/site";
import { fetchNews } from "@/lib/content";
import heroImg from "@/assets/hero-igreja.jpeg";
import interiorImg from "@/assets/interior-igreja.jpeg";
import comunidadeImg from "@/assets/comunidade.jpg";

export const Route = createFileRoute("/noticias/")({
  loader: async () => ({ news: await fetchNews() }),
  component: Noticias,
  head: () => ({
    meta: [
      { title: "Notícias — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Portal de notícias da paróquia: comunicados, liturgia, eventos, catequese, juventude e PASCOM.",
      },
      { property: "og:title", content: "Notícias — Paróquia Nossa Senhora Aparecida" },
      { property: "og:description", content: "Acompanhe as notícias da nossa comunidade." },
      { property: "og:url", content: "/noticias" },
    ],
    links: [{ rel: "canonical", href: "/noticias" }],
  }),
});

const covers = { igreja: heroImg, interior: interiorImg, comunidade: comunidadeImg };
const categories = [
  "Paróquia",
  "Arquidiocese",
  "Catequese",
  "Juventude",
  "PASCOM",
  "Comunicados",
  "Geral",
];

function Noticias() {
  const { news } = Route.useLoaderData() as { news: NewsPost[] };
  const [active, setActive] = useState("Paróquia");
  const list = news.filter((n) => n.category === active);

  return (
    <>
      <PageHero
        eyebrow="PASCOM"
        title="Notícias"
        description="Tudo o que acontece na paróquia, publicado e atualizado pela equipe de comunicação."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active === cat
                    ? "border-transparent bg-gradient-brand text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  to="/noticias/$slug"
                  params={{ slug: post.slug }}
                  className="surface-card group block h-full overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={covers[post.cover]}
                      alt={post.title}
                      loading="lazy"
                      width={1600}
                      height={1000}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary uppercase">
                      {post.category}
                    </span>
                    <h2 className="mt-2 text-lg leading-snug font-semibold">{post.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {post.author} · {formatDate(post.date)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="mt-12 text-sm text-muted-foreground">
              Nenhuma notícia publicada nesta categoria ainda.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
