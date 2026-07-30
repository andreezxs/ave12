import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/eventos/novo")({ component: EventosNovoRemoved });

function EventosNovoRemoved() {
  return <div className="p-4">Criar evento (removido)</div>;
}
