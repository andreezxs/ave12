import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Quote,
  Radio,
  RefreshCw,
} from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/Section";
import { parish, formatDate, type NewsPost } from "@/data/site";
import { fetchNews, fetchSaintOfDay, fetchSchedules, type SaintOfDayInfo } from "@/lib/content";
import { getNewsImage } from "@/lib/news-image";
import heroImg from "@/assets/hero-igreja.jpeg";
import interiorImg from "@/assets/interior-igreja.jpeg";
import comunidadeImg from "@/assets/comunidade.jpg";
import paroquiaLogo from "@/assets/PAROQUIA.svg";

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

type LiturgyReading = {
  reference?: string;
  title?: string;
  text?: string;
  refrain?: string;
};

type LiturgyText = { label: string; text: string };

type DailyLiturgy = {
  date: string;
  celebration: string;
  liturgicalSeason: string;
  liturgicalColor: string;
  readings: Array<{ label: string; entries: LiturgyReading[] }>;
  prayers: LiturgyText[];
  antiphons: LiturgyText[];
};

type DailyLiturgyState =
  { status: "loading" } | { status: "loaded"; liturgy: DailyLiturgy } | { status: "error" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getReadings(value: unknown): LiturgyReading[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((reading) => {
    if (!isRecord(reading)) return [];
    const entry: LiturgyReading = {
      reference: typeof reading.referencia === "string" ? reading.referencia : undefined,
      title: typeof reading.titulo === "string" ? reading.titulo : undefined,
      text: typeof reading.texto === "string" ? reading.texto : undefined,
      refrain: typeof reading.refrao === "string" ? reading.refrao : undefined,
    };
    return Object.values(entry).some(Boolean) ? [entry] : [];
  });
}

function getLiturgyTexts(
  value: unknown,
  fields: Array<{ key: string; label: string }>,
): LiturgyText[] {
  if (!isRecord(value)) return [];

  return fields.flatMap(({ key, label }) => {
    const text = value[key];
    return typeof text === "string" && text.trim() ? [{ label, text }] : [];
  });
}

function getLiturgicalSeason(celebration: string): string {
  if (/tempo comum/i.test(celebration)) return "Tempo Comum";
  if (/advento/i.test(celebration)) return "Tempo do Advento";
  if (/natal/i.test(celebration)) return "Tempo do Natal";
  if (/quaresma/i.test(celebration)) return "Tempo da Quaresma";
  if (/páscoa|pascal/i.test(celebration)) return "Tempo Pascal";
  return "Tempo litúrgico conforme a celebração";
}

function getLiturgicalColorStyle(color: string): CSSProperties {
  const normalized = color
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  const colors: Record<string, CSSProperties> = {
    verde: { backgroundColor: "#2e7d32", color: "#ffffff" },
    roxo: { backgroundColor: "#6a1b9a", color: "#ffffff" },
    violeta: { backgroundColor: "#6a1b9a", color: "#ffffff" },
    branco: { backgroundColor: "#ffffff", color: "#1f2937", border: "1px solid #d1d5db" },
    vermelho: { backgroundColor: "#c62828", color: "#ffffff" },
    rosa: { backgroundColor: "#ad1457", color: "#ffffff" },
    preto: { backgroundColor: "#212121", color: "#ffffff" },
    dourado: { backgroundColor: "#b8860b", color: "#ffffff" },
  };

  return colors[normalized] ?? {};
}

function renderVerseText(text: string): ReactNode[] {
  const verseMarkers = /(^|[\s.!?;:])(\d{1,3}(?:[a-z](?=[A-ZÀ-ÖØ-Þ]))?)(?=\s?[A-Za-zÀ-ÖØ-öø-ÿ“])/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = verseMarkers.exec(text)) !== null) {
    const verseStart = match.index + match[1].length;
    parts.push(text.slice(lastIndex, verseStart));
    parts.push(
      <sup key={verseStart} className="ml-0.5 align-super text-[0.7em] leading-none">
        {match[2]}
      </sup>,
    );
    lastIndex = verseStart + match[2].length;
  }

  parts.push(text.slice(lastIndex));
  return parts;
}

function parseDailyLiturgy(value: unknown): DailyLiturgy | null {
  if (
    !isRecord(value) ||
    typeof value.data !== "string" ||
    typeof value.liturgia !== "string" ||
    typeof value.cor !== "string" ||
    !isRecord(value.leituras) ||
    !isRecord(value.oracoes) ||
    !isRecord(value.antifonas)
  ) {
    return null;
  }

  const readings = [
    { label: "1ª leitura", entries: getReadings(value.leituras.primeiraLeitura) },
    { label: "Salmo", entries: getReadings(value.leituras.salmo) },
    { label: "2ª leitura", entries: getReadings(value.leituras.segundaLeitura) },
    { label: "Evangelho", entries: getReadings(value.leituras.evangelho) },
  ].filter((reading) => reading.entries.length > 0);
  const prayers = getLiturgyTexts(value.oracoes, [
    { key: "coleta", label: "Oração da coleta" },
    { key: "oferendas", label: "Oração sobre as oferendas" },
    { key: "comunhao", label: "Oração depois da comunhão" },
  ]);
  const antiphons = getLiturgyTexts(value.antifonas, [
    { key: "entrada", label: "Antífona de entrada" },
    { key: "comunhao", label: "Antífona de comunhão" },
  ]);

  if (
    readings.length === 0 ||
    !readings.some((reading) => reading.entries.some((entry) => entry.text))
  ) {
    return null;
  }

  return {
    date: value.data,
    celebration: value.liturgia,
    liturgicalSeason: getLiturgicalSeason(value.liturgia),
    liturgicalColor: value.cor,
    readings,
    prayers,
    antiphons,
  };
}

function DailyLiturgySection() {
  const [state, setState] = useState<DailyLiturgyState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    setState({ status: "loading" });

    fetch("https://liturgia.up.railway.app/v2/", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Liturgia API respondeu com status ${response.status}`);
        const liturgy = parseDailyLiturgy(await response.json());
        if (!liturgy) throw new Error("A resposta da Liturgia API está em formato inválido");
        setState({ status: "loaded", liturgy });
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        console.error("Não foi possível carregar a liturgia diária:", error);
        setState({ status: "error" });
      });

    return () => {
      isActive = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionTitle
          eyebrow="Liturgia diária"
          title="A Palavra de Deus para hoje"
          description="Celebração e leituras da Igreja Católica Apostólica Romana."
        />
        <details open className="surface-card group mt-10 overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset marker:content-none md:p-8">
            <span className="text-base font-semibold">Liturgia do dia</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-border p-6 md:p-8" aria-live="polite">
            {state.status === "loading" && (
              <p className="text-sm text-muted-foreground">Carregando a liturgia de hoje…</p>
            )}
            {state.status === "error" && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Não foi possível carregar a liturgia diária. Tente novamente em instantes.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setAttempt((current) => current + 1)}
                >
                  Tentar novamente <RefreshCw className="size-4" aria-hidden />
                </Button>
              </div>
            )}
            {state.status === "loaded" && (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {state.liturgy.date} · {state.liturgy.liturgicalSeason}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{state.liturgy.celebration}</h3>
                  </div>
                  <span
                    className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
                    style={getLiturgicalColorStyle(state.liturgy.liturgicalColor)}
                  >
                    Cor litúrgica: {state.liturgy.liturgicalColor}
                  </span>
                </div>
                <div className="mt-8 space-y-6">
                  {state.liturgy.readings.map((reading) => (
                    <section key={reading.label} className="rounded-2xl bg-surface p-5 md:p-6">
                      <h4 className="flex items-center gap-2 text-base font-semibold">
                        <BookOpen className="size-4 text-primary" aria-hidden />
                        {reading.label}
                      </h4>
                      <div className="mt-4 space-y-5">
                        {reading.entries.map((entry, index) => (
                          <article key={`${entry.reference ?? reading.label}-${index}`}>
                            {entry.reference && (
                              <p className="text-sm font-medium text-primary">{entry.reference}</p>
                            )}
                            {entry.title && (
                              <h5 className="mt-1 text-sm font-semibold">{entry.title}</h5>
                            )}
                            {entry.refrain && (
                              <p className="mt-3 text-sm font-medium italic">
                                Refrão: {entry.refrain}
                              </p>
                            )}
                            {entry.text && (
                              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                                {renderVerseText(entry.text)}
                              </p>
                            )}
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
                {state.liturgy.prayers.length > 0 && (
                  <section className="mt-8">
                    <h4 className="text-lg font-semibold">Orações da celebração</h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {state.liturgy.prayers.map((prayer) => (
                        <article key={prayer.label} className="rounded-2xl bg-surface p-5">
                          <h5 className="text-sm font-semibold">{prayer.label}</h5>
                          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                            {prayer.text}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}
                {state.liturgy.antiphons.length > 0 && (
                  <section className="mt-8">
                    <h4 className="text-lg font-semibold">Antífonas</h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {state.liturgy.antiphons.map((antiphon) => (
                        <article key={antiphon.label} className="rounded-2xl bg-surface p-5">
                          <h5 className="text-sm font-semibold">{antiphon.label}</h5>
                          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                            {antiphon.text}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}

type SaintOfDayState =
  { status: "loading" } | { status: "loaded"; saint: SaintOfDayInfo } | { status: "error" };

function SaintOfDaySection() {
  const [state, setState] = useState<SaintOfDayState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;
    setState({ status: "loading" });

    fetchSaintOfDay()
      .then((saint) => {
        if (isActive) setState({ status: "loaded", saint });
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        console.error("Não foi possível carregar o santo do dia:", error);
        setState({ status: "error" });
      });

    return () => {
      isActive = false;
    };
  }, [attempt]);

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionTitle
          eyebrow="Santo do dia"
          title="Exemplos de fé para hoje"
          description="Conheça o santo celebrado neste dia."
        />
        <details open className="surface-card group mt-10 overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset marker:content-none md:p-8">
            <span className="text-base font-semibold">Santo do dia</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-border p-6 md:p-8" aria-live="polite">
            {state.status === "loading" && (
              <p className="text-sm text-muted-foreground">Carregando o santo do dia…</p>
            )}
            {state.status === "error" && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Não foi possível carregar o santo do dia. Tente novamente em instantes.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setAttempt((current) => current + 1)}
                >
                  Tentar novamente <RefreshCw className="size-4" aria-hidden />
                </Button>
              </div>
            )}
            {state.status === "loaded" && (
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold">{state.saint.name}</h3>
                  {state.saint.description && (
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                      {state.saint.description}
                    </p>
                  )}
                </div>
                <a
                  href={state.saint.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Conhecer a história <ExternalLink className="size-4" aria-hidden />
                </a>
              </div>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}

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
              <a
                href={`${parish.whatsapp}?text=${encodeURIComponent("Quero comprar a camiseta do jubileu")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[oklch(1_0_0/35%)] bg-[oklch(1_0_0/10%)] text-[oklch(1_0_0)] backdrop-blur-md hover:bg-[oklch(1_0_0/20%)] hover:text-[oklch(1_0_0)]"
            >
              <Link to="/centro-catequetico">Conhecer o Centro Catequético</Link>
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

      <DailyLiturgySection />
      <SaintOfDaySection />

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
                  <img
                    src={getNewsImage(post)}
                    alt={post.title}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="block h-auto w-full"
                  />
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
                  Pároco — Paróquia Nossa Senhora Aparecida
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Galeria removida */}

      <section className="section-y">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-brand px-8 py-16 md:px-12 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(240px,38%)]">
              <Reveal className="text-center">
                <span className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/80 uppercase">
                  Jubileu de Prata
                </span>
                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-primary-foreground md:text-5xl">
                  "Fazei tudo o que Ele vos disser" Jo 2,5
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85">
                  25 anos de fé, comunhão e missão
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
              <Reveal delay={0.1} className="flex justify-center">
                <img
                  src={paroquiaLogo}
                  alt=""
                  aria-hidden="true"
                  className="w-56 opacity-90 md:w-full md:max-w-[400px]"
                />
              </Reveal>
            </div>
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
