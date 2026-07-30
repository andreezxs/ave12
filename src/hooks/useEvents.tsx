import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as events from "@/lib/eventsService";

export function useEvents() {
  return useQuery(["events"], () => events.getEvents());
}

export function useEvent(id?: string) {
  return useQuery(["event", id], () => events.getEvent(id as string), { enabled: !!id });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation(
    (data: unknown) => events.createEvent(data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["events"]),
    },
  );
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation(
    ({ id, data }: { id: string; data: unknown }) =>
      events.updateEvent(id, data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["events"]),
    },
  );
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation((id: string) => events.deleteEvent(id), {
    onSuccess: () => qc.invalidateQueries(["events"]),
  });
}
