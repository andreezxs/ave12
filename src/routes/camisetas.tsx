import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { parish } from "@/data/site";
import camisetaImg from "@/assets/camiseta.svg";

export const Route = createFileRoute("/camisetas")({
  component: Camisetas,
  head: () => ({
    meta: [
      { title: "Camiseta Oficial Jubileu de Prata — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Camiseta oficial da campanha Jubileu de Prata: tecido premium e compra pelo WhatsApp da secretaria da paróquia.",
      },
      { property: "og:title", content: "Camiseta Oficial Jubileu de Prata" },
      { property: "og:description", content: "Vista a camisa da nossa comunidade." },
      { property: "og:url", content: "/camisetas" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: "/camisetas" }],
  }),
});

function Camisetas() {
  return (
    <>
      <PageHero
        eyebrow="Venda pela secretaria"
        title="Camiseta Jubileu de Prata"
        description="Vista a camisa da nossa comunidade e ajude a sustentar a missão da paróquia."
      />

      <section className="section-y">
        <div className="container-page grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card overflow-hidden">
              <img
                src={camisetaImg}
                alt="Camiseta oficial Jubileu de Prata da Paróquia Nossa Senhora Aparecida"
                loading="lazy"
                width={1200}
                height={1200}
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <span className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Edição 2026
            </span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Camiseta oficial da campanha
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Produzida em algodão premium, com a identidade visual da campanha Jubileu de Prata.
              Disponível nos tamanhos infantil ao XG, com estoque limitado por lote.
            </p>

            <p className="mt-8 text-4xl font-semibold text-gradient">R$ 35,00</p>

            <Button asChild size="lg" className="mt-10 w-full rounded-full sm:w-auto">
              <a
                href={`${parish.whatsapp}?text=${encodeURIComponent("Quero comprar a camiseta do jubileu")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden /> Comprar camiseta
              </a>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Faça sua compra pelo WhatsApp oficial da Paróquia Nossa Senhora Aparecida
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
