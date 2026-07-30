import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useProfiles } from "@/hooks/useProfiles";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/usuarios/")({ component: UsuariosList });

function UsuariosList() {
  const { data: profiles, isLoading } = useProfiles();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Usuários</h2>
        <Button asChild>
          <Link to="/admin/usuarios/novo">Novo usuário</Link>
        </Button>
      </div>
      <div className="surface-card p-4">
        {isLoading
          ? "Carregando..."
          : (profiles || []).map(
              (p: { id: string; full_name?: string; username?: string; email?: string }) => {
                return (
                  <div key={p.id} className="flex items-center justify-between border-b py-2">
                    <div>
                      <div className="font-medium">{p.full_name || p.username}</div>
                      <div className="text-sm text-muted-foreground">{p.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to="/admin/usuarios/$id" params={{ id: p.id }} className="text-primary">
                        Editar
                      </Link>
                    </div>
                  </div>
                );
              },
            )}
      </div>
    </div>
  );
}
