import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-surface pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl bg-gradient-brand"
      />
      <div className="container-page relative">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </header>
  );
}
