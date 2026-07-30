import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditorToolbar({
  editor,
  onUploadClick,
  onInsertImageFile,
}: {
  editor: Editor | null;
  onUploadClick?: () => void;
  onInsertImageFile?: (file: File) => void;
}) {
  if (!editor) return null;

  function addLink() {
    const url = prompt("URL do link");
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function insertYoutube() {
    const url = prompt("URL do vídeo YouTube (embed)");
    if (!url) return;
    // Simple embed as iframe HTML
    const iframe = `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
    editor.chain().focus().insertContent(iframe).run();
  }

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Type className="size-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={addLink}>
        <LinkIcon className="size-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => onUploadClick?.()}>
        <ImageIcon className="size-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={insertYoutube}>
        YT
      </Button>
      <Button variant="outline" size="sm" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="size-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="size-4" />
      </Button>
    </div>
  );
}
