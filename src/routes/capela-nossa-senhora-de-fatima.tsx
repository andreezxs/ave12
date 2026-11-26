import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Church, Clock, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { chapelSchedule, parish } from "@/data/site";
import chapelWedding from "@/assets/CASA CAPELA.jpeg";
import chapelWeddingDetail from "@/assets/CASA CAPELA 02.jpeg";
import matrizWedding from "@/assets/CASA MATRIZ.jpeg";
import chapelAerial from "@/assets/AEREO CAPELA.jpg";
import chapelDuo from "@/assets/CAPELA DUO.jpg";
import chapelFaithful from "@/assets/CAPELA E FIELS.jpg";

const weddingPhotos = [
  {
    src: chapelWedding,
    alt: "Corredor decorado com flores para uma celebração de casamento",
    caption: "Capela Nossa Senhora de Fátima",
  },
  {
    src: chapelWeddingDetail,
    alt: "Altar preparado com flores para uma celebração de casamento",
    caption: "Capela Nossa Senhora de Fátima",
  },
  {
    src: matrizWedding,
    alt: "Interior da Igreja Matriz Nossa Senhora Aparecida decorado para um casamento",
    caption: "Igreja Matriz Nossa Senhora Aparecida",
  },
];

const chapelHeroPhotos = [
  {
    src: chapelAerial,
    alt: "Vista aérea da Capela Nossa Senhora de Fátima",
  },
  {
    src: chapelDuo,
    alt: "Fiéis reunidos durante uma celebração na capela",
  },
  {
    src: chapelFaithful,
    alt: "Comunidade reunida na Capela Nossa Senhora de Fátima",
  },
];

export const Route = createFileRoute("/capela-nossa-senhora-de-fatima")({
  component: CapelaNossaSenhoraDeFatima,
  head: () => ({
    meta: [
      { title: "Capela Nossa Senhora de Fátima — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Conheça a Capela Nossa Senhora de Fátima, confira os horários de missa e saiba sobre as celebrações de casamento na paróquia.",
      },
      {
        property: "og:title",
        content: "Capela Nossa Senhora de Fátima — Paróquia Nossa Senhora Aparecida",
      },
      {
        property: "og:description",
        content:
          "Uma comunidade de fé da Paróquia Nossa Senhora Aparecida, com celebrações de casamento na capela e na Igreja Matriz.",
      },
      { property: "og:url", content: "/capela-nossa-senhora-de-fatima" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/capela-nossa-senhora-de-fatima" }],
  }),
});

function CapelaNossaSenhoraDeFatima() {
  return (
    <>
      <PageHero
        eyebrow="Comunidade paroquial"
        title="Capela Nossa Senhora de Fátima"
        description={`Uma comunidade de fé que faz parte da ${parish.name}, em ${parish.city}.`}
        image={<ChapelHeroCarousel />}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild className="rounded-full">
            <a href="#celebracoes">
              Horários das celebrações <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a href={parish.whatsapp} target="_blank" rel="noopener noreferrer">
              Fale com a secretaria <MessageCircle className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle
              eyebrow="Nossa comunidade"
              title="Fé que se vive em comunidade"
              description="A Capela Nossa Senhora de Fátima reúne fiéis para a oração e a celebração da Eucaristia. Como comunidade da Paróquia Nossa Senhora Aparecida, caminha em comunhão com a vida pastoral da Igreja."
            />
            <Reveal delay={0.08}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Todos são bem-vindos para participar das celebrações e da vida comunitária. Para
                informações sobre atividades, atendimento ou alterações nos horários, entre em
                contato com a secretaria paroquial.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <article className="relative overflow-hidden rounded-3xl border border-border bg-[linear-gradient(145deg,#e7f6fb,#ffffff)] p-8 shadow-[var(--shadow-soft)] md:p-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <Church className="size-7" aria-hidden />
              </span>
              <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Em comunhão com
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{parish.name}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {parish.archdiocese} · {parish.city}
              </p>
              <Link
                to="/a-paroquia"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Conheça a paróquia <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Heart
                className="pointer-events-none absolute -right-4 -bottom-5 size-36 rotate-12 text-primary/10"
                aria-hidden
              />
            </article>
          </Reveal>
        </div>
      </section>

      <section id="celebracoes" className="section-y scroll-mt-24 bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Celebrações"
            title="Horários de missas"
            description="Reúna-se conosco para celebrar a fé. Em datas especiais, os horários podem sofrer alterações."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <Reveal>
              <article className="surface-card h-full p-7 md:p-9">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <CalendarDays className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{chapelSchedule.title}</h3>
                <ul className="mt-5 space-y-3">
                  {chapelSchedule.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                  Confirme a programação com a secretaria paroquial, especialmente em datas
                  comemorativas.
                </p>
                <Link
                  to="/horarios"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Ver todos os horários paroquiais <ArrowRight className="size-4" aria-hidden />
                </Link>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="surface-card flex h-full flex-col justify-between gap-8 p-7 md:p-9">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                    Sacramento do matrimônio
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">Celebre seu casamento conosco</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Realizamos celebrações de casamento na Capela Nossa Senhora de Fátima e na
                    Igreja Matriz Nossa Senhora Aparecida. Para consultar disponibilidade e receber
                    orientações sobre o agendamento, fale com a secretaria paroquial.
                  </p>
                </div>
                <WeddingGallery />
                <div className="flex flex-col items-start gap-4">
                  <Button asChild className="rounded-full">
                    <a href={parish.whatsapp} target="_blank" rel="noopener noreferrer">
                      Consultar pelo WhatsApp <MessageCircle className="size-4" aria-hidden />
                    </a>
                  </Button>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ChapelHeroCarousel() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || isHovered || hasFocus) return;

    const interval = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % chapelHeroPhotos.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [hasFocus, isHovered, prefersReducedMotion]);

  return (
    <div
      className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]"
      role="region"
      aria-label="Fotos da Capela Nossa Senhora de Fátima"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
      {chapelHeroPhotos.map((photo, index) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={index === activePhoto ? photo.alt : ""}
          aria-hidden={index !== activePhoto}
          loading={index === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === activePhoto ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

function WeddingGallery() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      aria-label="Fotos de celebrações de casamento"
      className="px-10"
    >
      <CarouselContent>
        {weddingPhotos.map((photo) => (
          <CarouselItem key={photo.src}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-accent/60">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="absolute inset-0 size-full object-contain p-1"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm font-medium text-muted-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious aria-label="Foto anterior" className="left-0" />
      <CarouselNext aria-label="Próxima foto" className="right-0" />
    </Carousel>
  );
}
