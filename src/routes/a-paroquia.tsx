import { createFileRoute } from "@tanstack/react-router";
import { Heart, Eye, Compass, Users } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";
import interiorImg from "@/assets/interior-igreja.jpeg";
import CebImg from "@/assets/comunidade.jpg";

export const Route = createFileRoute("/a-paroquia")({
  component: Paroquia,
  head: () => ({
    meta: [
      { title: "A Paróquia — Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Missão, visão, valores, padroeira, clero e Cebs da Paróquia Nossa Senhora Aparecida em Maringá.",
      },
      { property: "og:title", content: "A Paróquia — Nossa Senhora Aparecida" },
      {
        property: "og:description",
        content: "Conheça a identidade, o clero e as Cebs da nossa paróquia.",
      },
      { property: "og:url", content: "/a-paroquia" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/a-paroquia" }],
  }),
});

const pillars = [
  {
    icon: Compass,
    title: "Missão",
    text: "Evangelizar em comunhão com a Arquidiocese de Maringá, acolhendo todas as pessoas e promovendo o encontro com Jesus Cristo por meio da liturgia, da caridade e da formação.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser uma paróquia viva, missionária e corresponsável, referência de acolhida e de serviço para as famílias da região.",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Fé, acolhida, transparência, comunhão, serviço aos pobres, cuidado com a criação e valorização das famílias.",
  },
];

const clergy = [
  {
    role: "Pároco",
    name: "Pe. Valter Antônio Brandão",
    note: "Nascimento: 26/02/1969 - Ordenação: 14/01/1996",
  },
  {
    role: "Diácono",
    name: "Sérgio Luiz Rodrigues",
    note: "Nascimento: 26/07/1965 - Ordenação: 02/10/2015",
  },
  {
    role: "Diácono",
    name: "Leocir da Silva",
    note: "Nascimento: 08/04/1962 - Ordenação: 18/08/2024",
  },
];

const communities = [
  "Ceb Nossa Senhora das Graças",
  "Ceb Nossa Senhora de Fátima",
  "Ceb Nossa Senhora do Rocio",
  "Ceb Sagrada Família",
  "Ceb São José",
  "Ceb Nossa Senhora de Guadalupe",
  "Ceb Imaculada Conceição",
];

function Paroquia() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="A Paróquia"
        description={`Uma Ceb católica em ${parish.city}, integrada à ${parish.archdiocese} e dedicada à padroeira do Brasil.`}
      />

      <section className="section-y">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={interiorImg}
              alt="Nave da igreja matriz iluminada pela luz natural"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>
          <div>
            <SectionTitle eyebrow="Quem somos" title="Uma casa de fé e de acolhida" />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  A Paróquia Nossa Senhora Aparecida nasceu da fé das famílias que ajudaram a
                  construir Maringá. O que começou como uma pequena capela de bairro tornou-se, ao
                  longo das décadas, um dos centros de referência espiritual da região.
                </p>
                <p>
                  Hoje a paróquia reúne Cebs filiais, dezenas de pastorais e movimentos, um amplo
                  trabalho de catequese e uma atuação social que atende famílias em situação de
                  vulnerabilidade.
                </p>
                <p>
                  Nossa vida comunitária se organiza em torno da Eucaristia, da Palavra e do serviço
                  — três pilares que sustentam tudo o que fazemos.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle eyebrow="Identidade" title="Missão, visão e valores" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="surface-card h-full p-7">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <p.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Padroeira"
              title="Nossa Senhora Aparecida"
              description="Padroeira do Brasil, encontrada nas águas do Rio Paraíba do Sul em 1717 por três pescadores. Sua devoção atravessa gerações e inspira a nossa Ceb a confiar mesmo quando as redes parecem vazias."
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A solenidade da padroeira, celebrada em 12 de outubro, é o ponto alto do nosso
                calendário: precedida por uma novena, reúne milhares de fiéis em celebrações,
                procissão e festa comunitária.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <img
              src={CebImg}
              alt="Fiéis reunidos no pátio da paróquia após a missa"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle eyebrow="Clero" title="Conheça o padre e diáconos..." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {clergy.map((c, i) => (
              <Reveal key={c.role} delay={i * 0.06}>
                <article className="surface-card h-full p-7">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {c.role}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <SectionTitle eyebrow="Cebs" title="Nossas Cebs" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {communities.map((c, i) => (
                <Reveal key={c} delay={i * 0.04}>
                  <div className="surface-card flex items-center gap-3 p-5">
                    <Users className="size-4.5 shrink-0 text-primary" aria-hidden />
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
