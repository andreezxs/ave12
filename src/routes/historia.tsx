import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { timeline } from "@/data/site";
import heroImg from "@/assets/hero-igreja.jpeg";

export const Route = createFileRoute("/historia")({
  component: Historia,
  head: () => ({
    meta: [
      { title: "História da Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Da devoção encontrada nas águas em 1717 até a paróquia de hoje: marcos, memórias e fotos históricas da comunidade em Maringá.",
      },
      { property: "og:title", content: "História da Paróquia Nossa Senhora Aparecida" },
      {
        property: "og:description",
        content: "Marcos e memórias da nossa comunidade paroquial.",
      },
      { property: "og:url", content: "/historia" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/historia" }],
  }),
});

function Historia() {
  return (
    <>
      <PageHero
        eyebrow="Memória"
        title="Nossa História"
        description="Uma caminhada de fé construída por famílias, mutirões e gerações que fizeram desta comunidade um lar."
      />

      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <img
              src={heroImg}
              alt="Igreja Matriz Nossa Senhora Aparecida vista da praça"
              loading="lazy"
              width={1920}
              height={1080}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionTitle
              eyebrow="Linha do tempo"
              title="Marcos da nossa caminhada"
              description="Estrutura preparada para receber textos extensos, documentos e fotos históricas enviados pela comunidade."
            />
            <ol className="relative border-l border-border pl-8">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.05}>
                  <li className="relative pb-12 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute top-1.5 -left-[2.28rem] size-3 rounded-full bg-gradient-brand ring-4 ring-background"
                    />
                    <span className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Acervo"
            title="Fotos históricas"
            description="As imagens do acervo paroquial ficam hospedadas no servidor externo de fotos e são exibidas aqui automaticamente assim que a integração for ativada."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
                  Acervo {i + 1}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
