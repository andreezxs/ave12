import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchNews, fetchNewsBySlug } from "@/lib/news";
import { formatDate, type NewsPost } from "@/data/site";
import heroImg from "@/assets/hero-igreja.jpeg";
import interiorImg from "@/assets/interior-igreja.jpeg";
import comunidadeImg from "@/assets/comunidade.jpg";

const covers = { igreja: heroImg, interior: interiorImg, comunidade: comunidadeImg };

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ params }) => {
    const post = await fetchNewsBySlug(params.slug);
    if (!post) throw notFound();
    const related = (await fetchNews()).filter((n) => n.slug !== params.slug).slice(0, 3);
    return { post, related };
  },
  component: Post,
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: [
        { title: post ? `${post.title} — Notícias` : "Notícia" },
        { name: "description", content: post?.excerpt ?? "Notícia da paróquia." },
        { property: "og:title", content: post?.title ?? "Notícia" },
        { property: "og:description", content: post?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/noticias/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/noticias/${params.slug}` }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: post.title,
                datePublished: post.date,
                author: { "@type": "Organization", name: post.author },
              }),
            },
          ]
        : [],
    };
  },
});

function Post() {
  const { post, related } = Route.useLoaderData() as { post: NewsPost; related: NewsPost[] };

  const share = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      void navigator.share({ title: post.title, url: window.location.href });
    } else if (typeof navigator !== "undefined") {
      void navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="pt-32 pb-24 md:pt-40">
      <div className="container-page max-w-3xl">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden /> Voltar para notícias
        </Link>
        <span className="mt-8 block text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {post.category}
        </span>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {post.author} · {formatDate(post.date)}
        </p>

        <img
          src={covers[post.cover]}
          alt={post.title}
          width={1600}
          height={1000}
          className="mt-10 w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
        />

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 border-t border-border pt-8">
          <Button variant="outline" className="rounded-full" onClick={share}>
            <Share2 className="size-4" aria-hidden /> Compartilhar
          </Button>
        </div>
      </div>

      <div className="container-page mt-20">
        <h2 className="text-2xl font-semibold">Leia também</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              to="/noticias/$slug"
              params={{ slug: item.slug }}
              className="surface-card block h-full p-6"
            >
              <span className="text-xs font-medium text-primary uppercase">{item.category}</span>
              <h3 className="mt-2 text-base leading-snug font-semibold">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
