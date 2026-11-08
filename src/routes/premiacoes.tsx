import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";
import { fetchPrizes } from "@/lib/content";

export const Route = createFileRoute("/premiacoes")({
  loader: async () => ({ prizes: await fetchPrizes() }),
  component: Premiacoes,
  head: () => ({
    meta: [
      { title: "Premiações — Show de Prêmios da Paróquia" },
      {
        name: "description",
        content:
          "Lista completa das premiações do Show de Prêmios da Paróquia Nossa Senhora Aparecida.",
      },
      { property: "og:title", content: "Premiações — Show de Prêmios" },
      { property: "og:description", content: "Confira todos os prêmios da edição 2026." },
      { property: "og:url", content: "/premiacoes" },
    ],
    links: [{ rel: "canonical", href: "/premiacoes" }],
  }),
});

function Premiacoes() {
  const { prizes } = Route.useLoaderData() as {
    prizes: Array<{ title: string; description: string; highlight?: boolean }>;
  };
  return (
    <>
      <PageHero
        eyebrow="Show de Prêmios"
        title="Premiações"
        description="Todos os prêmios confirmados pela comissão organizadora da edição 2026."
      >
        <Button asChild size="lg" className="rounded-full">
          <a href={parish.ticketsUrl} target="_blank" rel="noopener noreferrer">
            <Ticket className="size-4" aria-hidden /> Comprar cartela
          </a>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prizes.map((prize, i) => (
            <Reveal key={prize.title} delay={i * 0.04}>
              <article
                className={`group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 ${
                  prize.highlight
                    ? "bg-gradient-brand text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "surface-card"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute -top-10 -right-10 size-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                />
                <Trophy className={`size-6 ${prize.highlight ? "" : "text-primary"}`} aria-hidden />
                <h2 className="mt-5 text-sm font-semibold tracking-wide uppercase opacity-80">
                  {prize.title}
                </h2>
                <p className="mt-2 text-lg leading-snug font-semibold">{prize.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
