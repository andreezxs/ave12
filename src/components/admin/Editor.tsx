import React, { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import { supabase } from "@/lib/superabase";
import { EditorToolbar } from "@/components/admin/EditorToolbar";

type Props = {
  content?: string;
  onChange?: (html: string) => void;
  imageBucket?: string;
};

export function Editor({ content, onChange, imageBucket = "noticias" }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link,
      Underline,
      Table.configure({ resizable: true }),
    ],
    content: content || "",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  async function uploadImage(file: File) {
    const name = `editor/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(imageBucket)
      .upload(name, file, { cacheControl: "3600", upsert: false });
    if (error) {
      console.error(error);
      return null;
    }
    const publicUrl = supabase.storage.from(imageBucket).getPublicUrl(name).data.publicUrl;
    return publicUrl;
  }

  async function handleImageUploadFile(file: File) {
    const url = await uploadImage(file);
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  return (
    <div className="rounded-md border bg-background p-2">
      <EditorToolbar
        editor={editor}
        onUploadClick={() => inputRef.current?.click()}
        onInsertImageFile={handleImageUploadFile}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleImageUploadFile(f);
        }}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
