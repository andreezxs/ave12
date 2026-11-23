import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Cross, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";
import catecheticalCenterVideo from "@/assets/centro-catequetico-h264.mp4";

export const Route = createFileRoute("/centro-catequetico")({
  component: CentroCatequetico,
  head: () => ({
    meta: [
      { title: "Centro Catequético — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Conheça a caminhada de formação cristã do Centro Catequético da Paróquia Nossa Senhora Aparecida.",
      },
      { property: "og:title", content: "Centro Catequético — Paróquia Nossa Senhora Aparecida" },
      {
        property: "og:description",
        content: "Formação na fé e acompanhamento para diferentes etapas da vida cristã.",
      },
      { property: "og:url", content: "/centro-catequetico" },
    ],
    links: [{ rel: "canonical", href: "/centro-catequetico" }],
  }),
});

const formationPaths = [
  {
    icon: UsersRound,
    title: "Iniciação à vida cristã",
    description:
      "Uma caminhada de descoberta da fé, vivida em comunidade e acompanhada por catequistas.",
  },
  {
    icon: Cross,
    title: "Preparação para os sacramentos",
    description:
      "Encontros de formação e oração que ajudam cada pessoa a aprofundar sua relação com Cristo.",
  },
  {
    icon: BookOpen,
    title: "Catequese de adultos",
    description:
      "Um espaço de escuta, partilha e conhecimento da fé para quem deseja iniciar ou retomar essa caminhada.",
  },
];

function CentroCatequetico() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border bg-[linear-gradient(135deg,#e7f6fb,#ffffff)] pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl"
        />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Formação e fé
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">
              Centro Catequético
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Um espaço de encontro e formação cristã para caminhar na fé, conhecer a Palavra e
              fortalecer a vida em comunidade.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full">
                <a
                  href={`${parish.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de informações sobre o Centro Catequético.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale com a secretaria
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-xs lg:mx-0">
            <div className="aspect-[9/16] overflow-hidden rounded-3xl bg-black shadow-[var(--shadow-lift)]">
              <video
                controls
                playsInline
                preload="metadata"
                aria-label="Vídeo vertical do Centro Catequético Nossa Senhora Aparecida"
                className="size-full object-contain"
              >
                <source src={catecheticalCenterVideo} type="video/mp4" />
                Seu navegador não oferece suporte à reprodução deste vídeo.
              </video>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Caminhos de formação"
            title="A fé cresce quando é partilhada"
            description="A catequese acompanha pessoas em diferentes momentos da vida, promovendo o encontro com Jesus e a participação na comunidade paroquial."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {formationPaths.map((path, i) => (
              <Reveal key={path.title} delay={i * 0.06}>
                <article className="surface-card h-full p-7">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <path.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold">{path.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle eyebrow="Grande solenidade" title="Um marco para a comunidade" />
          <Reveal delay={0.1}>
            <p className="surface-card p-7 text-base leading-relaxed text-muted-foreground">
              O ponto culminante será a grande solenidade de 26 de janeiro, quando ocorrerá também a
              inauguração e bênção do Centro Catequético Nossa Senhora Aparecida, patrimônio
              destinado à formação cristã das futuras gerações.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle
              eyebrow="Como participar"
              title="Dê o próximo passo"
              description="As turmas, os períodos de inscrição, os horários e os documentos necessários podem variar conforme a etapa. A secretaria paroquial pode orientar você sobre as informações atualizadas."
            />
          </div>
          <Reveal delay={0.1}>
            <div className="surface-card p-7">
              <h2 className="text-lg font-semibold">Estamos aqui para ajudar</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Entre em contato para saber qual caminho de formação atende melhor você ou sua
                família.
              </p>
              <Button asChild className="mt-6 rounded-full">
                <a
                  href={`${parish.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de saber sobre inscrições e turmas do Centro Catequético.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar pelo WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
