import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/agenda/")({ component: AdminAgendaRemoved });

function AdminAgendaRemoved() {
  return <div className="p-4">Agenda administrativa (removida)</div>;
}
