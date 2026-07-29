import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { parish } from "@/data/site";

export const Route = createFileRoute("/agenda")({
  component: Agenda,
  head: () => ({
    meta: [
      { title: "Agenda — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Agenda litúrgica e comunitária da paróquia, integrada ao calendário oficial da Arquidiocese de Maringá.",
      },
      { property: "og:title", content: "Agenda — Paróquia Nossa Senhora Aparecida" },
      { property: "og:description", content: "Calendário completo da paróquia." },
      { property: "og:url", content: "/agenda" },
    ],
    links: [{ rel: "canonical", href: "/agenda" }],
  }),
});

function Agenda() {
  return (
    <>
      <PageHero
        eyebrow="Calendário"
        title="Agenda da paróquia"
        description="Celebrações, formações e eventos comunitários. O calendário completo é mantido pela Arquidiocese de Maringá."
      >
        <Button asChild size="lg" className="rounded-full">
          <a href={parish.calendarUrl} target="_blank" rel="noopener noreferrer">
            Abrir calendário paroquial <ExternalLink className="size-4" aria-hidden />
          </a>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <p className="text-sm text-muted-foreground">Use o botão acima para abrir o calendário completo.</p>
        </div>
      </section>
    </>
  );
}
