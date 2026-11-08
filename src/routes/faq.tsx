import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchFaq } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  loader: async () => ({ faq: await fetchFaq() }),
  component: Faq,
  head: ({ loaderData }) => ({
    meta: [
      { title: "Perguntas Frequentes — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Dúvidas sobre batizados, casamentos, catequese, Jubileu de Prata, cartelas e camisetas da paróquia.",
      },
      { property: "og:title", content: "Perguntas Frequentes" },
      { property: "og:description", content: "As respostas para as dúvidas mais comuns." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (loaderData?.faq ?? []).map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Faq() {
  const { faq } = Route.useLoaderData() as { faq: Array<{ q: string; a: string }> };
  return (
    <>
      <PageHero
        eyebrow="Ajuda"
        title="Perguntas frequentes"
        description="Reunimos aqui as dúvidas mais comuns da comunidade. Não encontrou? Fale com a secretaria."
      />

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
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
