import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="surface-card p-4">
          Quantidade de notícias
          <br />0
        </div>
        <div className="surface-card p-4">
          Quantidade de eventos
          <br />0
        </div>
        <div className="surface-card p-4">
          Quantidade de álbuns
          <br />0
        </div>
      </div>
      <div className="grid gap-4">
        <div className="surface-card p-4">Últimas notícias</div>
        <div className="surface-card p-4">Últimos eventos</div>
      </div>
    </div>
  );
}
