import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Images, X } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { fetchAlbums } from "@/lib/gallery";
import type { GalleryAlbum } from "@/data/site";
import comunidadeImg from "@/assets/comunidade.jpg";
import interiorImg from "@/assets/interior-igreja.jpeg";
import heroImg from "@/assets/hero-igreja.jpeg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/galeria")({
  loader: async () => ({ albums: await fetchAlbums() }),
  component: Galeria,
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — Paróquia Nossa Senhora Aparecida" },
      {
        name: "description",
        content:
          "Álbuns de missas, festas, sacramentos, eventos e fotos históricas da comunidade paroquial.",
      },
      { property: "og:title", content: "Galeria de Fotos — Paróquia Nossa Senhora Aparecida" },
      { property: "og:description", content: "Reviva os momentos da nossa comunidade." },
      { property: "og:url", content: "/galeria" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
});

const thumbs = [comunidadeImg, interiorImg, heroImg];

function Galeria() {
  const { albums } = Route.useLoaderData() as { albums: GalleryAlbum[] };
  const categories = ["Todos", ...Array.from(new Set(albums.map((album) => album.category)))];
  const [category, setCategory] = useState("Todos");
  const [open, setOpen] = useState<GalleryAlbum | null>(null);
  const list = category === "Todos" ? albums : albums.filter((a) => a.category === category);

  return (
    <>
      <PageHero
        eyebrow="Memória viva"
        title="Galeria"
        description="Os álbuns são hospedados no servidor de fotos da paróquia e exibidos aqui automaticamente — sem sobrecarregar o portal."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat
                    ? "border-transparent bg-gradient-brand text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((album, i) => (
              <Reveal key={album.slug ?? album.title} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => setOpen(album)}
                  className="surface-card group block w-full overflow-hidden text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={album.coverUrl ?? thumbs[i % thumbs.length]}
                      alt={`Capa do álbum ${album.title}`}
                      loading="lazy"
                      width={1600}
                      height={1000}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h2 className="text-base font-semibold">{album.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {album.category} · {album.count} fotos
                      </p>
                    </div>
                    <Images className="size-5 text-muted-foreground" aria-hidden />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Rolagem infinita e carregamento progressivo são ativados assim que a API do servidor de
            fotos for conectada.
          </p>
        </div>
      </section>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-3xl p-0">
          <DialogTitle className="px-6 pt-6 text-lg">{open?.title ?? "Álbum"}</DialogTitle>
          <div className="grid grid-cols-2 gap-2 p-6 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <img
                key={i}
                src={open?.coverUrl ?? thumbs[i % thumbs.length]}
                alt={`Foto ${i + 1} do álbum ${open?.title ?? ""}`}
                loading="lazy"
                width={1600}
                height={1000}
                className="aspect-square w-full rounded-xl object-cover"
              />
            ))}
          </div>
          <p className="flex items-center gap-2 border-t border-border px-6 py-4 text-xs text-muted-foreground">
            <X className="size-3.5" aria-hidden /> Pré-visualização — o álbum completo virá do
            servidor externo de fotos.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
