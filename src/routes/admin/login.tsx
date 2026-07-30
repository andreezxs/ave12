import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithUsername } from "@/lib/adminAuth";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithUsername(username, password);
      window.location.replace("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <h2 className="text-2xl font-semibold">Entrar — Painel Administrativo</h2>
        {error && (
          <div className="rounded-md bg-destructive/10 p-2 text-sm text-destructive">{error}</div>
        )}
        <label className="block">
          <div className="mb-1 text-sm">Usuário</div>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="usuário ou e-mail"
          />
        </label>
        <label className="block">
          <div className="mb-1 text-sm">Senha</div>
          <div className="flex items-center gap-2">
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="button" variant="ghost" onClick={() => setShow((s) => !s)}>
              {show ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
        </label>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Lembrar-me
          </label>
          <a href="#" className="text-sm text-muted-foreground">
            Esqueci a senha
          </a>
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
