import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/eventos/")({ component: EventosRemoved });

function EventosRemoved() {
  return <div className="p-4">Eventos (removido)</div>;
}
