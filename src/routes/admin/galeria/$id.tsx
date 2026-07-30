import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/admin/galeria/$id")({ component: GaleriaIdRemoved });

function GaleriaIdRemoved() {
  return <div className="p-4">Editar álbum (removido)</div>;
}
