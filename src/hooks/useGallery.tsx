import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as gallery from "@/lib/galleryService";

export function useAlbums() {
  return useQuery(["albums"], () => gallery.getAlbums());
}

export function useAlbum(id?: string) {
  return useQuery(["album", id], () => gallery.getAlbum(id as string), { enabled: !!id });
}

export function useCreateAlbum() {
  const qc = useQueryClient();
  return useMutation(
    (data: unknown) => gallery.createAlbum(data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["albums"]),
    },
  );
}

export function useUpdateAlbum() {
  const qc = useQueryClient();
  return useMutation(
    ({ id, data }: { id: string; data: unknown }) =>
      gallery.updateAlbum(id, data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["albums"]),
    },
  );
}

export function useDeleteAlbum() {
  const qc = useQueryClient();
  return useMutation((id: string) => gallery.deleteAlbum(id), {
    onSuccess: () => qc.invalidateQueries(["albums"]),
  });
}
