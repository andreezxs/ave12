import { createFileRoute, Link } from "@tanstack/react-router";
import { Ticket, CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { parish, prizes } from "@/data/site";

export const Route = createFileRoute("/show-de-premios")({
  component: ShowDePremios,
  head: () => ({
    meta: [
      { title: "Show de Prêmios 2026 — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Show de Prêmios da paróquia: data, horário, premiações, regulamento e compra de cartelas pela Nomine Ingressos.",
      },
      { property: "og:title", content: "Show de Prêmios 2026" },
      { property: "og:description", content: "Participe do maior evento da nossa comunidade." },
      { property: "og:url", content: "/show-de-premios" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/show-de-premios" }],
  }),
});

const info = [
  { icon: CalendarDays, label: "Data", value: "11 de outubro de 2026" },
  { icon: Clock, label: "Horário", value: "A partir das 14h00" },
  {
    icon: MapPin,
    label: "Local",
    value: parish.address,
  },
  { icon: Ticket, label: "Cartela", value: "R$ 25,00 por cartela" },
];

const faqs = [
  {
    q: "Preciso estar presente para concorrer?",
    a: "Não. Os sorteios são acompanhados ao vivo e os ganhadores são contatados pelos dados informados no momento da compra da cartela.",
  },
  {
    q: "Posso comprar mais de uma cartela?",
    a: "Sim, não há limite de cartelas por participante enquanto houver disponibilidade.",
  },
  {
    q: "Como recebo o prêmio?",
    a: "A entrega é feita na secretaria paroquial mediante apresentação de documento com foto e da cartela premiada.",
  },
  {
    q: "As cartelas são vendidas na secretaria?",
    a: "A venda oficial é feita pela plataforma Nomine Ingressos. A secretaria auxilia quem tiver dificuldade com a compra online.",
  },
];

function ShowDePremios() {
  return (
    <>
      <PageHero
        eyebrow="Evento"
        title="Show de Prêmios 2026"
        description="Uma tarde de festa, comunhão e grandes prêmios em benefício das obras da nossa paróquia."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full">
            <a href={parish.ticketsUrl} target="_blank" rel="noopener noreferrer">
              <Ticket className="size-4" aria-hidden /> Comprar cartela
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href={parish.whatsapp} target="_blank" rel="noopener noreferrer">
              Falar com a secretaria
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/regulamento">Ler o regulamento</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <div className="surface-card h-full p-6">
                <item.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-4 text-xs tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-semibold">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Premiações"
            title="O que você pode ganhar"
            description="Prêmios confirmados pela comissão organizadora. A lista completa também está na página Premiações."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prizes.slice(0, 4).map((prize, i) => (
              <Reveal key={prize.title} delay={i * 0.05}>
                <div
                  className={`h-full rounded-3xl p-6 ${
                    prize.highlight
                      ? "bg-gradient-brand text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "surface-card"
                  }`}
                >
                  <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
                    {prize.title}
                  </p>
                  <p className="mt-3 text-base leading-snug font-semibold">{prize.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/premiacoes">Ver todas as premiações</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes do evento" />
          <Reveal delay={0.1} className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
