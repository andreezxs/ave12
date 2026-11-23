import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { PageHero, SectionTitle } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({
    meta: [
      { title: "Contato — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Fale com a secretaria paroquial: WhatsApp, telefone, e-mail, endereço e redes sociais.",
      },
      { property: "og:title", content: "Contato — Paróquia Nossa Senhora Aparecida" },
      { property: "og:description", content: "Estamos à disposição da comunidade." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
});

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp da secretaria",
    value: "(44) 99907-1683 · Atendimento de segunda a sexta",
    href: parish.whatsapp,
  },
  {
    icon: Phone,
    label: "Telefone",
    value: `${parish.phone} · Secretaria paroquial`,
    href: `tel:${parish.phone.replace(/\D/g, "")}`,
  },
  { icon: Mail, label: "E-mail", value: parish.email, href: `mailto:${parish.email}` },
  { icon: MapPin, label: "Endereço", value: parish.address, href: parish.maps },
  { icon: Instagram, label: "Instagram", value: "@pnsa_mga", href: parish.instagram },
  { icon: Facebook, label: "Facebook", value: "@pnsa.maringa", href: parish.facebook },
  { icon: Youtube, label: "YouTube", value: "Missas e mensagens", href: parish.youtube },
  {
    icon: MessageCircle,
    label: "Canal do WhatsApp",
    value: "Avisos oficiais da paróquia",
    href: parish.whatsappChannel,
  },
];

function Contato() {
  return (
    <>
      <PageHero
        eyebrow="Fale conosco"
        title="Contato"
        description="A secretaria paroquial está à disposição para dúvidas, agendamentos e pedidos de oração."
      />

      <section className="section-y">
        <div className="container-page">
          <SectionTitle eyebrow="Canais" title="Como falar com a paróquia" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.04}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card flex h-full items-start gap-4 p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <c.icon className="size-4.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{c.label}</span>
                    <span
                      className={`block text-sm text-muted-foreground ${
                        c.label === "E-mail" ? "break-all" : "break-words"
                      }`}
                    >
                      {c.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <div className="surface-card flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                Localização
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Paróquia Nossa Senhora Aparecida
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{parish.address}</p>
            </div>
            <a
              href={parish.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Abrir no Apple Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
