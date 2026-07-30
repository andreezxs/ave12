import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useProfile, useUpdateProfile, useResetPassword } from "@/hooks/useProfiles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/usuarios/$id")({ component: UsuariosEdit });

function UsuariosEdit() {
  const params = (Route as unknown as { useParams?: () => Record<string, string> }).useParams?.();
  const id = params?.id as string | undefined;
  const { data } = useProfile(id);
  const update = useUpdateProfile();
  const reset = useResetPassword();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (data) {
      setUsername(data.username || "");
      setFullName(data.full_name || "");
    }
  }, [data]);

  async function handleSave() {
    await update.mutateAsync({ id, data: { username, full_name: fullName } });
    window.location.replace("/admin/usuarios");
  }

  async function handleReset() {
    if (data?.email) {
      await reset.mutateAsync(data.email);
      alert("E-mail para reset enviado.");
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Editar usuário</h2>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={handleSave}>Salvar</Button>
        <Button variant="ghost" onClick={handleReset}>
          Resetar senha
        </Button>
      </div>
    </div>
  );
}
