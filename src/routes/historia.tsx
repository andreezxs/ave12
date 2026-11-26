import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { fetchTimeline } from "@/lib/content";
import heroImg from "@/assets/hero-igreja.jpeg";
import historicalPhoto127 from "@/assets/fotos historicas/127.JPG";
import historicalPhoto128 from "@/assets/fotos historicas/128.JPG";
import historicalPhotoCommunity from "@/assets/fotos historicas/854739963_1453323166806142_8657542668630289838_n.jpg";
import historicalPhotoStatue from "@/assets/fotos historicas/DSC07077.JPG";
import historicalPhotoChurch from "@/assets/fotos historicas/Fotos igreja 6.jpeg";
import historicalPhotoParish from "@/assets/fotos historicas/Paróquia 050.jpg";
import historicalPhotoKitchen from "@/assets/fotos historicas/cozinha.jpg";
import historicalPhotoChild from "@/assets/fotos historicas/criança.jpg";
import historicalPhotoFeast from "@/assets/fotos historicas/festa.jpg";
import historicalPhotoArchive from "@/assets/fotos historicas/historica.jpg";

const historicalPhotos = [
  {
    src: historicalPhoto127,
    alt: "Pessoa trabalhando na imagem de Nossa Senhora Aparecida",
  },
  {
    src: historicalPhoto128,
    alt: "Restauração da imagem de Nossa Senhora Aparecida",
  },
  {
    src: historicalPhotoCommunity,
    alt: "Crianças e famílias reunidas em celebração na igreja",
  },
  {
    src: historicalPhotoStatue,
    alt: "Imagem de Nossa Senhora Aparecida na área externa da igreja",
  },
  {
    src: historicalPhotoChurch,
    alt: "Fachada da igreja da comunidade",
  },
  {
    src: historicalPhotoParish,
    alt: "Voluntárias preparando alimentos para a comunidade",
  },
  {
    src: historicalPhotoKitchen,
    alt: "Famílias reunidas em atividade comunitária",
  },
  {
    src: historicalPhotoChild,
    alt: "Participantes reunidos em confraternização paroquial",
  },
  {
    src: historicalPhotoFeast,
    alt: "Imagem de Nossa Senhora Aparecida diante da igreja",
  },
  {
    src: historicalPhotoArchive,
    alt: "Vista externa da Igreja Matriz Nossa Senhora Aparecida",
  },
];

export const Route = createFileRoute("/historia")({
  loader: async () => ({ timeline: await fetchTimeline() }),
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
  const { timeline } = Route.useLoaderData() as {
    timeline: Array<{ year: string; title: string; text: string }>;
  };
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
          <SectionTitle eyebrow="Acervo" title="Fotos históricas" />
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {historicalPhotos.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.04} className="mb-5 break-inside-avoid">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="block h-auto w-full rounded-2xl shadow-[var(--shadow-soft)]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
