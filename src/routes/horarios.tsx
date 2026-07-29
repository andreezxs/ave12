import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { schedules } from "@/data/site";

export const Route = createFileRoute("/horarios")({
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
  return (
    <>
      <PageHero
        eyebrow="Atendimento"
        title="Horários"
        description="Celebrações e atendimentos da paróquia. Em datas festivas a programação pode sofrer alterações — acompanhe os avisos."
      />

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
