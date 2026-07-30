import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/configuracoes/")({ component: ConfigPage });

function ConfigPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Configurações</h2>
      <div className="surface-card p-4">
        Editar configurações do site (nome, logo, contato, horários)
      </div>
    </div>
  );
}
