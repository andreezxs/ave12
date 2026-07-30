import React, { useRef, useState } from "react";
import { supabase } from "@/lib/superabase";
import imageCompression from "browser-image-compression";

type Props = {
  bucket: string;
  pathPrefix?: string;
  multiple?: boolean;
  onComplete?: (urls: string[]) => void;
};

export function FileUploader({
  bucket,
  pathPrefix = "uploads",
  multiple = false,
  onComplete,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(selected: FileList | null) {
    if (!selected) return;
    const arr = Array.from(selected);
    setFiles((s) => [...s, ...arr]);
  }

  async function uploadAll() {
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const name = `${pathPrefix}/${Date.now()}_${file.name}`;
        // upload via XHR to capture progress
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = `${supabaseUrl}/storage/v1/object/${bucket}/${encodeURIComponent(name)}`;
          xhr.open("PUT", url);
          xhr.setRequestHeader("Authorization", `Bearer ${anonKey}`);
          xhr.onload = async () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const publicRes = supabase.storage.from(bucket).getPublicUrl(name);
              urls.push(publicRes.data.publicUrl);
              resolve();
            } else {
              reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
          };
          xhr.onerror = () => reject(new Error("Network error"));
          xhr.upload.onprogress = (e) => {
            // could set per-file progress state here
          };
          xhr.send(compressed as Blob);
        });
      } catch (err) {
        console.error(err);
      }
    }
    setUploading(false);
    setFiles([]);
    onComplete?.(urls);
  }

  return (
    <div className="space-y-2">
      <div
        className="flex h-36 items-center justify-center rounded-md border border-dashed p-4"
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-center text-sm text-muted-foreground">
          Arraste arquivos aqui ou clique para selecionar
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded-md bg-surface p-2">
              <div className="flex items-center gap-3">
                <img
                  src={URL.createObjectURL(f)}
                  className="h-12 w-12 object-cover"
                  alt="preview"
                />
                <div>
                  <div className="text-sm font-medium">{f.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(f.size / 1024)} KB
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button className="btn" onClick={() => setFiles([])} disabled={uploading}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={uploadAll} disabled={uploading}>
              {uploading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
