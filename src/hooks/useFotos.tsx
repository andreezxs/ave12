import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as fotos from "@/lib/fotosService";

export function usePhotos(albumId?: string) {
  return useQuery(["photos", albumId], () => fotos.getPhotosByAlbum(albumId as string), {
    enabled: !!albumId,
  });
}

export function useAddPhotos(albumId?: string) {
  const qc = useQueryClient();
  return useMutation((urls: string[]) => fotos.addPhotos(albumId as string, urls), {
    onSuccess: () => qc.invalidateQueries(["photos", albumId]),
  });
}

export function useDeletePhoto() {
  const qc = useQueryClient();
  return useMutation((id: string) => fotos.deletePhoto(id), {
    onSuccess: (_, id) => qc.invalidateQueries(["photos"]),
  });
}

export function useUpdatePhotoOrder() {
  const qc = useQueryClient();
  return useMutation(
    (orders: { id: string; position: number }[]) => fotos.updatePhotoOrder(orders),
    {
      onSuccess: () => qc.invalidateQueries(["photos"]),
    },
  );
}
