import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as profiles from "@/lib/profilesService";

export function useProfiles() {
  return useQuery(["profiles"], () => profiles.getProfiles());
}

export function useProfile(id?: string) {
  return useQuery(["profile", id], () => profiles.getProfile(id as string), { enabled: !!id });
}

export function useCreateProfile() {
  const qc = useQueryClient();
  return useMutation(
    (data: unknown) => profiles.createProfile(data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["profiles"]),
    },
  );
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation(
    ({ id, data }: { id: string; data: unknown }) =>
      profiles.updateProfile(id, data as unknown as Record<string, unknown>),
    {
      onSuccess: () => qc.invalidateQueries(["profiles"]),
    },
  );
}

export function useDeleteProfile() {
  const qc = useQueryClient();
  return useMutation((id: string) => profiles.deleteProfile(id), {
    onSuccess: () => qc.invalidateQueries(["profiles"]),
  });
}

export function useResetPassword() {
  return useMutation((email: string) => profiles.sendResetPassword(email));
}
