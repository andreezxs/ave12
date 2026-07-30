import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
          "Fale com a secretaria paroquial: WhatsApp, telefone, e-mail, endereço, redes sociais e formulário de contato.",
      },
      { property: "og:title", content: "Contato — Paróquia Nossa Senhora Aparecida" },
      { property: "og:description", content: "Estamos à disposição da comunidade." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
});

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255),
  subject: z.string().trim().min(3, "Informe o assunto").max(120),
  message: z.string().trim().min(10, "Escreva ao menos 10 caracteres").max(1000),
});

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp da secretaria",
    value: "Atendimento em horário comercial",
    href: parish.whatsapp,
  },
  {
    icon: Phone,
    label: "Telefone",
    value: parish.phone,
    href: `tel:${parish.phone.replace(/\D/g, "")}`,
  },
  { icon: Mail, label: "E-mail", value: parish.email, href: `mailto:${parish.email}` },
  { icon: MapPin, label: "Endereço", value: parish.address, href: parish.maps },
  { icon: Instagram, label: "Instagram", value: "Publicações diárias", href: parish.instagram },
  { icon: Facebook, label: "Facebook", value: "Avisos e transmissões", href: parish.facebook },
  { icon: Youtube, label: "YouTube", value: "Missas ao vivo", href: parish.youtube },
  {
    icon: MessageCircle,
    label: "Canal do WhatsApp",
    value: "Receba os avisos oficiais",
    href: parish.whatsappChannel,
  },
];

function Contato() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Fale conosco"
        title="Contato"
        description="A secretaria paroquial está à disposição para dúvidas, agendamentos e pedidos de oração."
      />

      <section className="section-y">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
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
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{c.label}</span>
                      <span className="block text-sm text-muted-foreground">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="surface-card p-7 md:p-9">
              <h2 className="text-xl font-semibold">Envie uma mensagem</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Respondemos em até dois dias úteis.
              </p>

              <div className="mt-7 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" name="name" maxLength={100} autoComplete="name" />
                  {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={255}
                    autoComplete="email"
                  />
                  {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" name="subject" maxLength={120} />
                  {errors.subject ? (
                    <p className="text-xs text-destructive">{errors.subject}</p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" name="message" rows={5} maxLength={1000} />
                  {errors.message ? (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  ) : null}
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-7 w-full rounded-full">
                <Send className="size-4" aria-hidden /> Enviar mensagem
              </Button>

              {sent ? (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2 rounded-2xl bg-accent p-4 text-sm text-accent-foreground"
                >
                  <CheckCircle2 className="size-4.5" aria-hidden />
                  Mensagem validada. O envio será ativado junto com o painel administrativo.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Localização da Paróquia Nossa Senhora Aparecida no Google Maps"
              src={parish.mapsEmbed}
              loading="lazy"
              className="h-96 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
