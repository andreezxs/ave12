import { useState } from "react";
import { ArrowLeft, ChevronRight, Info, MessageCircle, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { parish } from "@/data/site";
import { fetchFaq, type FaqItem } from "@/lib/content";

export function FaqChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<FaqItem | null>(null);
  const {
    data: faqItems,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: () => fetchFaq(),
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      {isOpen && (
        <section
          id="faq-chat-panel"
          aria-label="Ajuda da paróquia"
          className="fixed right-4 bottom-24 z-[60] flex h-[min(36rem,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-[var(--shadow-lift)]"
        >
          <header className="flex items-center gap-3 border-b border-border bg-surface p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold">Ajuda da paróquia</h2>
              <p className="text-xs text-muted-foreground">Respostas rápidas do FAQ</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full"
              aria-label="Fechar ajuda"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-4" aria-hidden />
            </Button>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted p-3 text-sm leading-relaxed">
              Olá! Posso ajudar com algumas dúvidas frequentes. O que você gostaria de saber?
            </p>

            {isPending ? (
              <p role="status" className="text-sm text-muted-foreground">
                Carregando perguntas...
              </p>
            ) : isError ? (
              <div role="alert" className="space-y-3 text-sm">
                <p>Não foi possível carregar as perguntas frequentes.</p>
                <Button type="button" variant="outline" size="sm" onClick={() => void refetch()}>
                  Tentar novamente
                </Button>
              </div>
            ) : selectedQuestion ? (
              <>
                <p className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-primary p-3 text-sm leading-relaxed text-primary-foreground">
                  {selectedQuestion.q}
                </p>
                <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted p-3 text-sm leading-relaxed">
                  {selectedQuestion.a}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedQuestion(null)}
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Escolher outra pergunta
                </Button>
              </>
            ) : faqItems?.length ? (
              <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                {faqItems.map((item) => (
                  <button
                    key={item.q}
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background p-3 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setSelectedQuestion(item)}
                  >
                    <span>{item.q}</span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Não há perguntas frequentes disponíveis no momento.
              </p>
            )}
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-3">
            <Link to="/faq" className="text-sm font-medium text-primary hover:underline">
              Ver FAQ completo
            </Link>
            <a
              href={parish.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
          </footer>
        </section>
      )}

      <Button
        type="button"
        size="icon"
        className="fixed right-4 bottom-4 z-[60] size-14 rounded-full shadow-[var(--shadow-lift)]"
        aria-label={isOpen ? "Fechar ajuda" : "Abrir ajuda"}
        aria-expanded={isOpen}
        aria-controls="faq-chat-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="size-5" aria-hidden /> : <Info className="size-5" aria-hidden />}
      </Button>
    </>
  );
}
