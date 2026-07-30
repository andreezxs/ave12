import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/regulamento")({
  component: Regulamento,
  head: () => ({
    meta: [
      { title: "Regulamento do Show de Prêmios — Paróquia N. Sra. Aparecida" },
      {
        name: "description",
        content:
          "Regulamento oficial do Show de Prêmios da Paróquia Nossa Senhora Aparecida: participação, sorteios, prêmios e entrega.",
      },
      { property: "og:title", content: "Regulamento oficial" },
      { property: "og:description", content: "Regras de participação e sorteio." },
      { property: "og:url", content: "/regulamento" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/regulamento" }],
  }),
});

const sections = [
  {
    title: "1. Do evento",
    items: [
      "O Show de Prêmios é promovido pela Paróquia Nossa Senhora Aparecida com finalidade exclusivamente beneficente.",
      "Toda a arrecadação é destinada às obras, pastorais e ações sociais da paróquia.",
    ],
  },
  {
    title: "2. Da participação",
    items: [
      "Podem participar pessoas maiores de 18 anos, mediante aquisição de cartela.",
      "A cartela é pessoal e intransferível após o sorteio, sendo válido o cadastro informado na compra.",
      "Não há limite de cartelas por participante enquanto houver disponibilidade.",
    ],
  },
  {
    title: "3. Da aquisição das cartelas",
    items: [
      "A venda é realizada exclusivamente pela plataforma Nomine Ingressos.",
      "A paróquia não realiza vendas por outros canais ou intermediários não autorizados somente plataforma Nomine Ingressos e agentes pastorais.",
      "O comprovante de compra deve ser guardado até a entrega dos prêmios.",
    ],
  },
  {
    title: "4. Dos sorteios",
    items: [
      "Os sorteios serão realizados na data e horário divulgados neste portal.",
      "Os sorteios são públicos, acompanhados pela comissão organizadora.",
      "Não é necessária a presença do participante para concorrer.",
    ],
  },
  {
    title: "5. Da entrega dos prêmios",
    items: [
      "Os prêmios devem ser retirados na secretaria paroquial em até 30 dias após o evento.",
      "A retirada exige documento oficial com foto e apresentação da cartela premiada.",
      "Prêmios não retirados no prazo revertem em benefício das obras da paróquia.",
    ],
  },
  {
    title: "6. Disposições gerais",
    items: [
      "Casos omissos serão resolvidos pela comissão organizadora.",
      "A participação implica na aceitação integral deste regulamento.",
    ],
  },
];

function Regulamento() {
  return (
    <>
      <PageHero
        eyebrow="Documento oficial"
        title="Regulamento"
        description="Regras de participação, sorteio e entrega dos prêmios do Show de Prêmios da paróquia."
      >
        <Button size="lg" variant="outline" className="rounded-full" onClick={() => window.print()}>
          <Download className="size-4" aria-hidden /> Baixar em PDF
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page max-w-3xl">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.04}>
              <div className="border-b border-border pb-8 last:border-0">
                <h2 className="mt-8 text-xl font-semibold">{section.title}</h2>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {item}
                    </li>
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
