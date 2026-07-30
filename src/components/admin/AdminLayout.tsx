import React from "react";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/admin/Sidebar";

export function AdminLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          {/* header */}
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Painel Administrativo</h1>
          </header>
          <main>{children ?? <Outlet />}</main>
        </div>
      </div>
    </div>
  );
}
