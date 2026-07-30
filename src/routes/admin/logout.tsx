import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { signOut } from "@/lib/adminAuth";

export const Route = createFileRoute("/admin/logout")({
  component: AdminLogout,
});

function AdminLogout() {
  useEffect(() => {
    (async () => {
      await signOut();
      window.location.replace("/admin/login");
    })();
  }, []);

  return <div className="p-6">Saindo...</div>;
}
