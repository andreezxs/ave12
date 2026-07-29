import { Link } from "@tanstack/react-router";
import { Church, Instagram, Facebook, Youtube, MessageCircle, Mail } from "lucide-react";
import { nav, parish } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
              <Church className="size-4.5" aria-hidden />
            </span>
            <span className="text-sm font-semibold">{parish.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Portal oficial da comunidade em {parish.city}. Notícias, agenda, galeria e informações
            institucionais em um só lugar.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { href: parish.instagram, icon: Instagram, label: "Instagram" },
              { href: parish.facebook, icon: Facebook, label: "Facebook" },
              { href: parish.youtube, icon: Youtube, label: "YouTube" },
              { href: parish.whatsappChannel, icon: MessageCircle, label: "Canal do WhatsApp" },
              { href: `mailto:${parish.email}`, icon: Mail, label: "E-mail" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="size-4.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Links rápidos">
          <h2 className="text-sm font-semibold">Links rápidos</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
            {nav.slice(1, 9).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Contato</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{parish.address}</li>
            <li>{parish.phone}</li>
            <li>{parish.email}</li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/faq" className="transition-colors hover:text-primary">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/regulamento" className="transition-colors hover:text-primary">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {parish.name} — {parish.archdiocese}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
