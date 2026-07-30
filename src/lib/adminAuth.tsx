import { supabase } from "./superabase";

export async function signInWithUsername(username: string, password: string) {
  const isEmail = username.includes("@");
  let email = username;

  if (!isEmail) {
    // Try to resolve username -> email from profiles table
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", username)
      .limit(1)
      .single();
    if (error || !data) {
      throw new Error("Usuário não encontrado");
    }
    // data comes from supabase row and has `email`
    email = (data as { email?: string }).email as string;
  }

  const res = await supabase.auth.signInWithPassword({ email, password });
  if (res.error) throw res.error;
  return res;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(cb: (event: string, session: unknown) => void) {
  return supabase.auth.onAuthStateChange((event, session) => cb(event, session));
}

export async function ensureProfilesTable() {
  // Placeholder: prefer migrations on Supabase dashboard
  return true;
}
