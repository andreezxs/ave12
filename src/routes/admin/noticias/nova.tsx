import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/admin/Editor";
import { FileUploader } from "@/components/admin/FileUploader";
import { useCreateNews } from "@/hooks/useNews";

export const Route = createFileRoute("/admin/noticias/nova")({
  component: NoticiasNew,
});

function NoticiasNew() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const create = useCreateNews();

  async function handleSave() {
    await create.mutateAsync({ title, excerpt, content, cover, published: true });
    window.location.replace("/admin/noticias");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Nova notícia</h2>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Resumo" />
      <div>
        <div className="mb-2 text-sm font-medium">Imagem de capa</div>
        <FileUploader bucket="noticias" onComplete={(urls) => setCover(urls[0] ?? null)} />
        {cover && <img src={cover} alt="cover" className="mt-2 max-h-40 object-cover" />}
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">Conteúdo</div>
        <Editor content={content} onChange={(html) => setContent(html)} />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Publicar</Button>
        <Button variant="ghost">Salvar rascunho</Button>
      </div>
    </div>
  );
}
