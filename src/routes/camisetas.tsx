import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle } from "@/components/site/Section";
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
          "Camiseta oficial da campanha Jubileu de Prata: tecido premium, tabela de tamanhos e compra segura pela loja oficial.",
      },
      { property: "og:title", content: "Camiseta Oficial Jubileu de Prata" },
      { property: "og:description", content: "Vista a camisa da nossa comunidade." },
      { property: "og:url", content: "/camisetas" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: "/camisetas" }],
  }),
});

const sizes = [
  { size: "P", chest: "50 cm", length: "70 cm" },
  { size: "M", chest: "53 cm", length: "72 cm" },
  { size: "G", chest: "56 cm", length: "74 cm" },
  { size: "GG", chest: "59 cm", length: "76 cm" },
  { size: "XG", chest: "62 cm", length: "78 cm" },
  { size: "Infantil", chest: "38 cm", length: "52 cm" },
];

const features = [
  "Malha penteada 30.1, toque macio",
  "Estampa em silk de alta durabilidade",
  "Modelagem unissex e infantil",
  "Renda revertida integralmente à campanha Jubileu de Prata",
];

function Camisetas() {
  return (
    <>
      <PageHero
        eyebrow="Loja oficial"
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
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Camiseta oficial da campanha</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Produzida em algodão premium, com a identidade visual da campanha Jubileu de Prata. Disponível
              nos tamanhos infantil ao XG, com estoque limitado por lote.
            </p>

            <p className="mt-8 text-4xl font-semibold text-gradient">R$ 35,00</p>
            <p className="mt-1 text-sm text-muted-foreground">à vista ou parcelado na loja oficial</p>

            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-10 w-full rounded-full sm:w-auto">
              <a href={parish.shopUrl} target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="size-4" aria-hidden /> Comprar camiseta
              </a>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              A compra é finalizada com segurança na loja oficial da paróquia (Nuvemshop).
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Guia"
            title="Tabela de tamanhos"
            description="Medidas aproximadas da peça deitada. Em caso de dúvida, escolha o tamanho maior."
          />
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-background">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Tabela de tamanhos da camiseta oficial</caption>
                <thead className="bg-muted text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Tamanho</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Largura do tórax</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Comprimento</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s) => (
                    <tr key={s.size} className="border-t border-border">
                      <th scope="row" className="px-6 py-4 font-semibold">{s.size}</th>
                      <td className="px-6 py-4 text-muted-foreground">{s.chest}</td>
                      <td className="px-6 py-4 text-muted-foreground">{s.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
