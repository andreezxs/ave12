import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Quote,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/Section";
import { parish, formatDate, type NewsPost } from "@/data/site";
import { fetchNews, fetchSchedules } from "@/lib/content";
import heroImg from "@/assets/hero-igreja.jpeg";
import interiorImg from "@/assets/interior-igreja.jpeg";
import comunidadeImg from "@/assets/comunidade.jpg";

export const Route = createFileRoute("/")({
  loader: async () => ({
    news: await fetchNews(),
    schedules: await fetchSchedules(),
  }),
  component: Home,
  head: () => ({
    meta: [
      { title: "Paróquia Nossa Senhora Aparecida — Site oficial" },
      {
        name: "description",
        content:
          "Notícias, agenda litúrgica, horários de missas, galeria de fotos, Jubileu de Prata e Show de Prêmios da Paróquia Nossa Senhora Aparecida.",
      },
      { property: "og:title", content: "Paróquia Nossa Senhora Aparecida — Site oficial" },
      {
        property: "og:description",
        content: "O canal oficial de comunicação da nossa comunidade paroquial.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const covers = { igreja: heroImg, interior: interiorImg, comunidade: comunidadeImg };

const quickCards = [
  { icon: Clock, title: "Missas", text: "Sex 7h · Sáb 19h30 · Dom 8h, 18h", to: "/horarios" },
  {
    icon: Phone,
    title: "Secretaria",
    text: `${parish.phone} · Seg–sex 08h–11h30, 13h30–18h · Sáb 08h–12h`,
    to: "/horarios",
  },
  {
    icon: CalendarDays,
    title: "Confissões",
    text: "Qua 14h–16h · Sex 8h30–11h · Sáb 8h30–11h",
    to: "/horarios",
  },
  {
    icon: MapPin,
    title: "Localização",
    text: "Praça Nossa Senhora Aparecida · Vila Esperança",
    href: parish.maps,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Fale com a secretaria",
    href: parish.whatsapp,
  },
  {
    icon: Instagram,
    title: "Instagram",
    text: "@pnsa_mga",
    href: parish.instagram,
  },
];

function Home() {
  const { news, schedules } = Route.useLoaderData() as {
    news: NewsPost[];
    schedules: Array<{ title: string; items: string[] }>;
  };
  const latest = news.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Fachada da Igreja Matriz Nossa Senhora Aparecida ao entardecer"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.145_0_0/70%),oklch(0.145_0_0/45%),oklch(0.145_0_0/85%))]"
        />
        <div className="container-page relative flex min-h-[92vh] flex-col justify-end pt-36 pb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/25%)] bg-[oklch(1_0_0/12%)] px-4 py-1.5 text-xs font-medium tracking-wide text-[oklch(1_0_0)] uppercase backdrop-blur-md">
              Portal Oficial · Jubileu de Prata
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold text-[oklch(1_0_0)] sm:text-6xl md:text-7xl">
              Paróquia Nossa Senhora Aparecida
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[oklch(1_0_0/78%)]">
              Uma comunidade de fé em {parish.city}. Aqui você encontra a agenda das celebrações, as
              notícias da paróquia e todos os canais para caminhar conosco.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href={parish.shopUrl} target="_blank" rel="noopener noreferrer">
                Comprar camiseta <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href={parish.ticketsUrl} target="_blank" rel="noopener noreferrer">
                Comprar cartela
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href="https://colmeiafm.com.br/" target="_blank" rel="noopener noreferrer">
                Ouvir rádio <Radio className="size-4" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[oklch(1_0_0/35%)] bg-[oklch(1_0_0/10%)] text-[oklch(1_0_0)] backdrop-blur-md hover:bg-[oklch(1_0_0/20%)] hover:text-[oklch(1_0_0)]"
            >
              <Link to="/a-paroquia">Conheça a paróquia</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Acesso rápido"
            title="Tudo o que você precisa, em um toque"
            description="Os serviços mais procurados da comunidade, sempre à mão."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0.02}>
              <a
                href="https://colmeiafm.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card block h-full p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Radio className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold">Rádio Colmeia</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Ouça ao vivo a programação da Rádio Colmeia e entre em contato com a comunidade.
                </p>
              </a>
            </Reveal>
            {quickCards.map((card, i) => {
              const content = (
                <>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <card.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </>
              );
              return (
                <Reveal key={card.title} delay={i * 0.05}>
                  {card.to ? (
                    <Link to={card.to} className="surface-card block h-full p-6">
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface-card block h-full p-6"
                    >
                      {content}
                    </a>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Agenda"
              title="Agenda"
              description="Sincronizado com o calendário oficial da Arquidiocese de Maringá."
            />
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/agenda">
                Ver agenda completa <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          {/* Próximos eventos removidos — manter apenas o link para a agenda completa */}
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Notícias" title="Últimas da comunidade" />
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/noticias">
                Todas as notícias <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
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
                    <h3 className="mt-2 text-lg leading-snug font-semibold">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">{formatDate(post.date)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card overflow-hidden">
              <img
                src={interiorImg}
                alt="Interior da igreja matriz durante a celebração"
                loading="lazy"
                width={1600}
                height={1000}
                className="aspect-video size-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionTitle
              eyebrow="Institucional"
              title="Conheça a nossa casa"
              description="Um convite a caminhar com a comunidade: a história, as pastorais e as pessoas que fazem desta paróquia um lar."
            />
            <Reveal delay={0.1} className="mt-8">
              <figure className="surface-card p-7">
                <Quote className="size-6 text-primary" aria-hidden />
                <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                  “Nossa Senhora Aparecida nos ensina que a fé se encontra também nas águas turvas
                  do cotidiano. Que esta paróquia seja sempre uma casa de acolhida para todos.”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  Pe. Pároco — Paróquia Nossa Senhora Aparecida
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Galeria removida */}

      <section className="section-y">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-brand px-8 py-16 text-center md:px-16 md:py-24">
            <Reveal>
              <span className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/80 uppercase">
                Jubileu de Prata
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-primary-foreground md:text-5xl">
                Doze meses sustentando a missão da nossa paróquia
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85">
                Uma contribuição mensal que garante obras, pastorais e ações sociais durante todo o
                ano.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" variant="secondary" className="rounded-full">
                  <Link to="/ave12">Conhecer o Jubileu de Prata</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[oklch(1_0_0/40%)] bg-transparent text-primary-foreground hover:bg-[oklch(1_0_0/15%)] hover:text-primary-foreground"
                >
                  <Link to="/show-de-premios">Show de Prêmios</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page grid gap-4 md:grid-cols-3">
          {schedules.slice(0, 3).map((block, i) => (
            <Reveal key={block.title} delay={i * 0.05}>
              <div className="surface-card h-full p-6">
                <Newspaper className="size-5 text-primary" aria-hidden />
                <h3 className="mt-4 text-base font-semibold">{block.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {block.items.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
