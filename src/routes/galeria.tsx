import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { parish } from "@/data/site";

export const Route = createFileRoute("/galeria")({
  component: GaleriaRedirect,
});

function GaleriaRedirect() {
  useEffect(() => {
    // Redirect to home since Galeria was removed.
    window.location.replace("/");
  }, []);

  return (
    <div className="container-page">
      <p>Galeria removida. Voltando para a página inicial...</p>
      <p>
        Se a intenção era acessar a agenda, use o link do calendário oficial:{" "}
        <a href={parish.calendarUrl}>{parish.calendarUrl}</a>
      </p>
      <p>
        <Link to="/">Ir para Início</Link>
      </p>
    </div>
  );
}
