import React from "react";
import { Link } from "@tanstack/react-router";
import { Home, FileText, Image, Calendar, Users, Settings, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <aside className="w-64 shrink-0 border-r bg-surface p-4">
      <div className="mb-6 px-2">
        <h3 className="text-sm font-semibold">Painel</h3>
      </div>
      <nav className="space-y-1">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
        >
          <Home className="size-4" /> <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/noticias"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
        >
          <FileText className="size-4" /> <span>Notícias</span>
        </Link>
        {/* Galeria e Eventos removidos do menu */}
        <Link to="/admin/agenda" className="flex items-center gap-3 rounded-md p-2 hover:bg-accent">
          <Calendar className="size-4" /> <span>Agenda</span>
        </Link>
        <Link
          to="/admin/usuarios"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
        >
          <Users className="size-4" /> <span>Usuários</span>
        </Link>
        <Link
          to="/admin/configuracoes"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
        >
          <Settings className="size-4" /> <span>Configurações</span>
        </Link>
        <Link
          to="/admin/logout"
          className="mt-4 flex items-center gap-3 rounded-md p-2 hover:bg-accent text-destructive"
        >
          <LogOut className="size-4" /> <span>Sair</span>
        </Link>
      </nav>
    </aside>
  );
}
