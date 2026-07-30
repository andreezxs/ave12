import { supabase } from "./superabase";

export async function getEvents() {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getEvent(id: string) {
  const { data, error } = await supabase.from("eventos").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function createEvent(ev: unknown) {
  const { data, error } = await supabase
    .from("eventos")
    .insert(ev as unknown as Record<string, unknown>)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, ev: unknown) {
  const { data, error } = await supabase
    .from("eventos")
    .update(ev as unknown as Record<string, unknown>)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from("eventos").delete().eq("id", id);
  if (error) throw error;
  return true;
}
