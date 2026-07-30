import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNewsList, useDeleteNews } from "@/hooks/useNews";

export const Route = createFileRoute("/admin/noticias/")({
  component: NoticiasList,
});

function NoticiasList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useNewsList({ page, perPage: 10, search });
  const deleteMutation = useDeleteNews();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notícias</h2>
        <div className="flex items-center gap-2">
          <input
            className="input"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button asChild>
            <Link to="/admin/noticias/nova">Nova notícia</Link>
          </Button>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-3">Título</th>
              <th className="text-left p-3">Categoria</th>
              <th className="text-left p-3">Publicado</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="p-4">
                  Carregando...
                </td>
              </tr>
            )}
            {data?.data?.map(
              (item: { id: string; title?: string; category?: string; published?: boolean }) => {
                return (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.published ? "Sim" : "Não"}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to="/admin/noticias/$id"
                          params={{ id: item.id }}
                          className="text-primary"
                        >
                          Editar
                        </Link>
                        <button
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(item.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Total: {data?.count ?? 0}</div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</Button>
          <div>#{page}</div>
          <Button onClick={() => setPage((p) => p + 1)}>Próxima</Button>
        </div>
      </div>
    </div>
  );
}
