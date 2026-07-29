import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Target, Sparkles, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";
import comunidadeImg from "@/assets/comunidade.jpg";

export const Route = createFileRoute("/ave12")({
  component: Ave12,
  head: () => ({
    meta: [
      { title: "Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Conheça o Jubileu de prata: de 2002 - 2027, celebrando 25 anos de missão da Paróquia Nossa Senhora Aparecida.",
      },
      { property: "og:title", content: "Jubileu de Prata - Paróquia Nossa Senhora Aparecida" },
      {
        property: "og:description",
        content: "Celebre 25 anos de missão com a Paróquia Nossa Senhora Aparecida.",
      },
      { property: "og:url", content: "/ave12" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/ave12" }],
  }),
});

const pillars = [
  {
    icon: Target,
    title: "Objetivos",
    text: "Garantir a manutenção do templo, sustentar as pastorais, ampliar as ações sociais e viabilizar as obras aprovadas pelo conselho paroquial.",
  },
  {
    icon: Sparkles,
    title: "Como surgiu",
    text: "A campanha nasceu do conselho econômico junto à PASCOM, com o desejo de substituir pedidos pontuais por um compromisso contínuo e transparente.",
  },
  {
    icon: HandHeart,
    title: "Finalidade",
    text: "Transformar a colaboração em corresponsabilidade: cada família participa da missão com o que pode, ao longo dos doze meses do ano.",
  },
];

function Ave12() {
  return (
    <>
      <PageHero
        eyebrow="Campanha"
        title="AVE12"
        description="Doze meses. Uma comunidade. Um compromisso comum com a missão da Paróquia Nossa Senhora Aparecida."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full">
            <a href={parish.whatsapp} target="_blank" rel="noopener noreferrer">
              Quero participar
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href={parish.shopUrl} target="_blank" rel="noopener noreferrer">
              Comprar camiseta AVE12
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="surface-card h-full p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={comunidadeImg}
              alt="Comunidade reunida em ação da campanha AVE12"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>
          <div>
            <SectionTitle
              eyebrow="Transparência"
              title="Prestação de contas"
              description="Cada real recebido é registrado e publicado. Esta área receberá os relatórios periódicos aprovados pelo conselho econômico."
            />
            <Reveal delay={0.1} className="mt-8 space-y-3">
              {["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-dashed border-border bg-background p-5"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <FileBarChart className="size-4.5 text-primary" aria-hidden />
                    Relatório — {label}
                  </span>
                  <span className="text-xs text-muted-foreground">Em breve</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Multimídia"
            title="Vídeos e imagens da campanha"
            description="Espaço preparado para os vídeos institucionais e o material gráfico produzido pela PASCOM."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
                  Mídia {i + 1}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
