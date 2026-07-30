import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as newsService from "@/lib/newsService";

export function useNewsList(params: unknown) {
  return useQuery(["news", params], () =>
    newsService.getNewsList(params as unknown as Record<string, unknown>),
  );
}

export function useNews(id: string) {
  return useQuery(["news", id], () => newsService.getNewsById(id), { enabled: !!id });
}

export function useCreateNews() {
  const qc = useQueryClient();
  return useMutation(
    (data: unknown) => newsService.createNews(data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["news"]),
    },
  );
}

export function useUpdateNews() {
  const qc = useQueryClient();
  return useMutation(
    ({ id, data }: { id: string; data: unknown }) =>
      newsService.updateNews(id, data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["news"]),
    },
  );
}

export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation((id: string) => newsService.deleteNews(id), {
    onSuccess: () => qc.invalidateQueries(["news"]),
  });
}
