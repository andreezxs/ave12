import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Target, Sparkles } from "lucide-react";
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
          "Conheça o Jubileu de Prata: celebrando 25 anos de missão da Paróquia Nossa Senhora Aparecida.",
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
    text: "O Jubileu representa um tempo de memória, gratidão e renovação. É uma oportunidade de recordar os caminhos percorridos, reconhecer as conquistas e agradecer a Deus por todos aqueles que contribuíram para a construção desta história.",
  },
  {
    icon: Sparkles,
    title: "Como surgiu",
    text: "Ao longo desses 25 anos, sacerdotes, religiosos, lideranças, agentes de pastoral, benfeitores e fiéis participaram ativamente da missão evangelizadora da Paróquia, fortalecendo a vida comunitária e testemunhando a fé em Jesus Cristo. Mais do que celebrar uma data, este jubileu convida toda a comunidade a valorizar sua história, renovar o compromisso com a missão da Igreja e continuar construindo, juntos, os próximos capítulos dessa caminhada de fé.",
  },
  {
    icon: HandHeart,
    title: "Finalidade",
    text: "Transformar a colaboração em corresponsabilidade: cada família participa da missão com o que pode, ao longo dos doze meses do ano.",
  },
];

const jubileePrayer = [
  "Senhor Jesus, Pastor eterno, neste Jubileu colocamo-nos aos teus pés com o coração agradecido pelos 24 anos da Paróquia Nossa Senhora Aparecida; Tu foste nossa luz nas noites, força nas lutas e esperança nas travessias.",
  "Recordamos Contigo cada gesto de evangelização, cada pastoral, cada comunidade que, entre lágrimas e sorrisos, fez florescer o teu Reino.",
  "Maria Santíssima, Mãe Aparecida, envolve-nos com teu manto e ensina-nos a guardar no íntimo a tua palavra: “Faça o que Ele vos disser”.",
  "Jesus te pedimos, se esfriarmos, reacende-nos; se cansarmos, renova-nos; se vacilarmos, sustenta-nos.",
  "Derrama sobre nós um novo Pentecostes e faze de nossas sete comunidades discípulas ardentes e missionárias corajosas.",
  "E agora, Senhor, humildemente suplicamos: dai-nos a tua bênção e faze deste Ano Jubilar um tempo de graça, fidelidade e profundo amor a Ti.",
  "Amém.",
];

function Ave12() {
  return (
    <>
      <PageHero
        eyebrow="Jubileu de Prata"
        title="Jubileu de Prata"
        description="Doze meses. Uma comunidade. Um compromisso comum com a missão da Paróquia Nossa Senhora Aparecida."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a
              href={`${parish.whatsapp}?text=${encodeURIComponent("Quero comprar a camiseta do jubileu")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar camiseta do Jubileu de Prata
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
              alt="Comunidade reunida em ação do Jubileu de Prata"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>
          <div>
            <SectionTitle
              eyebrow="Oração"
              title="Oração do Jubileu"
              description="Uma oração de entrega, fé e esperança para este tempo especial da comunidade."
            />
            <Reveal delay={0.1} className="mt-8">
              <div className="rounded-3xl border border-border bg-background p-7 shadow-[var(--shadow-soft)]">
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {jubileePrayer.join("\n\n")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Multimídia"
            title="Vídeos e imagens do Jubileu de Prata"
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
