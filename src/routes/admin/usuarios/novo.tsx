import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProfile, useResetPassword } from "@/hooks/useProfiles";
import { supabase } from "@/lib/superabase";

export const Route = createFileRoute("/admin/usuarios/novo")({ component: UsuariosNew });

function UsuariosNew() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const create = useCreateProfile();

  async function handleCreate() {
    // Attempt to sign up user via Supabase Auth
    try {
      await supabase.auth.signUp({ email, password: Math.random().toString(36).slice(-8) });
    } catch (err) {
      console.warn("signUp error", err);
    }
    await create.mutateAsync({ email, username, full_name: fullName, role: "editor" });
    window.location.replace("/admin/usuarios");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Novo usuário</h2>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
      <Input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Nome completo"
      />
      <div className="flex gap-2">
        <Button onClick={handleCreate}>Criar</Button>
      </div>
    </div>
  );
}
