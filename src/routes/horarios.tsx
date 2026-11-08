import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";
import { fetchSchedules } from "@/lib/content";

export const Route = createFileRoute("/horarios")({
  loader: async () => ({ schedules: await fetchSchedules() }),
  component: Horarios,
  head: () => ({
    meta: [
      { title: "Horários de Missas e Atendimento — Paróquia N. Sra. Aparecida" },
      {
        name: "description",
        content:
          "Horários de missas, confissões, adoração, secretaria e atendimento do pároco na Paróquia Nossa Senhora Aparecida.",
      },
      { property: "og:title", content: "Horários — Paróquia Nossa Senhora Aparecida" },
      { property: "og:description", content: "Missas, confissões, adoração e secretaria." },
      { property: "og:url", content: "/horarios" },
    ],
    links: [{ rel: "canonical", href: "/horarios" }],
  }),
});

function Horarios() {
  const { schedules } = Route.useLoaderData() as {
    schedules: Array<{ title: string; items: string[] }>;
  };
  return (
    <>
      <PageHero
        eyebrow="Atendimento"
        title="Horários"
        description="Celebrações e atendimentos da paróquia. Em datas festivas a programação pode sofrer alterações — acompanhe os avisos."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: MapPin,
                label: "Endereço",
                value: parish.address,
                href: parish.maps,
              },
              {
                icon: Phone,
                label: "Telefone",
                value: parish.phone,
                href: `tel:${parish.phone.replace(/\D/g, "")}`,
              },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Fale com a secretaria",
                href: parish.whatsapp,
              },
              {
                icon: Instagram,
                label: "Redes sociais",
                value: "@pnsa_mga · @pnsa.maringa",
                href: parish.instagram,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.04}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card flex h-full flex-col gap-3 p-6"
                  >
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">{item.value}</p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schedules.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.05}>
              <article className="surface-card h-full p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Clock className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{block.title}</h2>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {block.items.map((item) => (
                    <li key={item} className="border-b border-border pb-2 last:border-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
