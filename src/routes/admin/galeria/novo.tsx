import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/galeria/novo")({ component: GaleriaNovoRemoved });

function GaleriaNovoRemoved() {
  return <div className="p-4">Criar álbum (removido)</div>;
}
