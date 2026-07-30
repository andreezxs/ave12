import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";

export const Route = createFileRoute("/admin/galeria/")({ component: GaleriaRemoved });

function GaleriaRemoved() {
  useEffect(() => {
    // No-op: route removed. Could redirect to admin dashboard.
  }, []);
  return <div className="p-4">Galeria (removida)</div>;
}
