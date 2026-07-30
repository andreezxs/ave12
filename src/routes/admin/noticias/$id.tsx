import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useNews } from "@/hooks/useNews";
import { Editor } from "@/components/admin/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateNews } from "@/hooks/useNews";

export const Route = createFileRoute("/admin/noticias/$id")({
  component: NoticiasEdit,
});

function NoticiasEdit() {
  const params = (Route as unknown as { useParams?: () => Record<string, string> }).useParams?.();
  const id = params?.id as string | undefined;
  const { data, isLoading } = useNews(id);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const update = useUpdateNews();

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");
    }
  }, [data]);

  if (isLoading) return <div>Carregando...</div>;

  async function handleSave() {
    await update.mutateAsync({ id, data: { title, excerpt, content } });
    window.location.replace("/admin/noticias");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Editar notícia</h2>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      <div>
        <div className="mb-2 text-sm font-medium">Conteúdo</div>
        <Editor content={content} onChange={(html) => setContent(html)} />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Salvar</Button>
      </div>
    </div>
  );
}
