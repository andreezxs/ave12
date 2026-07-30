import { createFileRoute, Outlet } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { getSession, onAuthStateChange } from "@/lib/adminAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/__root")({
  component: AdminRoot,
});

function AdminRoot() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sub: { data?: { subscription?: { unsubscribe?: () => void } } } | null = null;
    (async () => {
      const session = await getSession();
      if (!session) {
        window.location.replace("/admin/login");
        return;
      }
      setLoading(false);
      sub = onAuthStateChange((event, _session) => {
        if (event === "SIGNED_OUT" || !_session) {
          window.location.replace("/admin/login");
        }
      }) as unknown as typeof sub;
    })();
    return () => sub?.data?.subscription?.unsubscribe?.();
  }, []);

  if (loading) return <div className="p-6">Verificando sessão...</div>;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
