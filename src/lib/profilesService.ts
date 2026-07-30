import { supabase } from "./superabase";

export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getProfile(id: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function createProfile(profile: unknown) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile as unknown as Record<string, unknown>)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(id: string, profile: unknown) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile as unknown as Record<string, unknown>)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProfile(id: string) {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export async function sendResetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/admin/login",
  });
  if (error) throw error;
  return data;
}
