import { supabase } from "./superabase";

export async function addPhotos(albumId: string, urls: string[]) {
  const rows = urls.map((u, i) => ({ album_id: albumId, url: u, position: i }));
  const { data, error } = await supabase.from("fotos").insert(rows).select();
  if (error) throw error;
  return data;
}

export async function getPhotosByAlbum(albumId: string) {
  const { data, error } = await supabase
    .from("fotos")
    .select("*")
    .eq("album_id", albumId)
    .order("position", { ascending: true });
  if (error) throw error;
  return data;
}

export async function deletePhoto(id: string) {
  const { error } = await supabase.from("fotos").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export async function updatePhotoOrder(photoOrders: { id: string; position: number }[]) {
  const updates = photoOrders.map((p) => ({ id: p.id, position: p.position }));
  const { data, error } = await supabase
    .from("fotos")
    .upsert(updates, { onConflict: ["id"] })
    .select();
  if (error) throw error;
  return data;
}
