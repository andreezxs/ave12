import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, parish } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const primary = nav.slice(0, 6);
const secondary = nav.slice(6);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        aria-label="Menu principal"
        className={`container-page flex items-center gap-3 rounded-3xl py-2.5 transition-all duration-500 ${
          scrolled ? "glass glass-strong shadow-[var(--shadow-soft)]" : "glass shadow-[var(--shadow-soft)]"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="Início">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
            <img src="/favicon.ico" alt="Ícone da paróquia" className="size-4.5" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold">N. Sra. Aparecida</span>
            <span className="block text-[11px] text-muted-foreground">Portal Oficial · AVE12</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-0.5 lg:flex">
          {primary.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:text-foreground"
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Mais <ChevronDown className="size-3.5" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl">
              {secondary.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="cursor-pointer rounded-xl">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <a href={parish.ticketsUrl} target="_blank" rel="noopener noreferrer">
              Comprar cartela
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menu"
                className="min-h-11 min-w-11 rounded-full lg:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[19rem] overflow-y-auto">
              <SheetTitle className="px-4 pt-4 text-base">Navegação</SheetTitle>
              <div className="flex flex-col gap-1 p-3">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
