import { supabase } from "./superabase";

export async function getAlbums() {
  const { data, error } = await supabase
    .from("galeria")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getAlbum(id: string) {
  const { data, error } = await supabase.from("galeria").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function createAlbum(album: unknown) {
  const { data, error } = await supabase
    .from("galeria")
    .insert(album as unknown as Record<string, unknown>)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAlbum(id: string, album: unknown) {
  const { data, error } = await supabase
    .from("galeria")
    .update(album as unknown as Record<string, unknown>)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAlbum(id: string) {
  const { error } = await supabase.from("galeria").delete().eq("id", id);
  if (error) throw error;
  return true;
}
