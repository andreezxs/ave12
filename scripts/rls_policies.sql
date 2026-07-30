-- RLS policies for admin panel
-- This file enables Row Level Security and creates policies for roles: admin, editor, viewer.

-- Ensure profiles has user_id link to auth.users
alter table if exists public.profiles add column if not exists user_id uuid;

-- Attempt to populate user_id from auth.users by matching email
update public.profiles set user_id = (
  select id from auth.users where auth.users.email = public.profiles.email limit 1
) where user_id is null and email is not null;

-- helper function to check admin role
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin');
$$;

create or replace function public.is_editor() returns boolean
language sql stable as $$
  select exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'editor');
$$;

-- Enable RLS on tables
alter table if exists public.profiles enable row level security;
alter table if exists public.noticias enable row level security;
alter table if exists public.galeria enable row level security;
alter table if exists public.fotos enable row level security;
alter table if exists public.eventos enable row level security;
alter table if exists public.agenda enable row level security;
alter table if exists public.configuracoes enable row level security;

-- Profiles policies
-- Select: allow admins and the owner (auth user)
create policy if not exists profiles_select_owner_or_admin on public.profiles for select using (
  auth.uid() is not null and (user_id = auth.uid() or public.is_admin())
);
-- Insert: only admin can create profiles (manage roles)
create policy if not exists profiles_insert_admin on public.profiles for insert with check (public.is_admin());
-- Update: owner or admin
create policy if not exists profiles_update_owner_or_admin on public.profiles for update using (auth.uid() is not null and (user_id = auth.uid() or public.is_admin())) with check (auth.uid() is not null and (user_id = auth.uid() or public.is_admin()));
-- Delete: only admin
create policy if not exists profiles_delete_admin on public.profiles for delete using (public.is_admin());

-- Noticias policies
-- Select: published items are public; admins and editors (their own) can see drafts
create policy if not exists noticias_select_public on public.noticias for select using (
  published = true or public.is_admin() or (public.is_editor() and exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.id = public.noticias.author_id))
);
-- Insert: admin or editor
create policy if not exists noticias_insert_roles on public.noticias for insert with check (
  public.is_admin() or public.is_editor()
);
-- Update: admin or (editor and author)
create policy if not exists noticias_update_roles on public.noticias for update using (
  public.is_admin() or (public.is_editor() and exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.id = public.noticias.author_id))
) with check (
  public.is_admin() or public.is_editor()
);
-- Delete: admin only
create policy if not exists noticias_delete_admin on public.noticias for delete using (public.is_admin());

-- Galeria policies
create policy if not exists galeria_select_public on public.galeria for select using (true);
create policy if not exists galeria_insert_roles on public.galeria for insert with check (public.is_admin() or public.is_editor());
create policy if not exists galeria_update_roles on public.galeria for update using (public.is_admin() or public.is_editor()) with check (public.is_admin() or public.is_editor());
create policy if not exists galeria_delete_admin on public.galeria for delete using (public.is_admin());

-- Fotos policies
create policy if not exists fotos_select_public on public.fotos for select using (true);
create policy if not exists fotos_insert_roles on public.fotos for insert with check (public.is_admin() or public.is_editor());
create policy if not exists fotos_update_roles on public.fotos for update using (public.is_admin() or public.is_editor()) with check (public.is_admin() or public.is_editor());
create policy if not exists fotos_delete_roles on public.fotos for delete using (public.is_admin() or public.is_editor());

-- Eventos policies
create policy if not exists eventos_select_public on public.eventos for select using (true);
create policy if not exists eventos_insert_roles on public.eventos for insert with check (public.is_admin() or public.is_editor());
create policy if not exists eventos_update_roles on public.eventos for update using (public.is_admin() or public.is_editor()) with check (public.is_admin() or public.is_editor());
create policy if not exists eventos_delete_admin on public.eventos for delete using (public.is_admin());

-- Agenda policies
create policy if not exists agenda_select_public on public.agenda for select using (true);
create policy if not exists agenda_insert_roles on public.agenda for insert with check (public.is_admin() or public.is_editor());
create policy if not exists agenda_update_roles on public.agenda for update using (public.is_admin() or public.is_editor()) with check (public.is_admin() or public.is_editor());
create policy if not exists agenda_delete_admin on public.agenda for delete using (public.is_admin());

-- Configuracoes policies: selectable by public (site needs it), only admins can modify
create policy if not exists configuracoes_select_public on public.configuracoes for select using (true);
create policy if not exists configuracoes_insert_admin on public.configuracoes for insert with check (public.is_admin());
create policy if not exists configuracoes_update_admin on public.configuracoes for update using (public.is_admin()) with check (public.is_admin());
create policy if not exists configuracoes_delete_admin on public.configuracoes for delete using (public.is_admin());

-- Done
raise notice 'RLS policies created. Review and adjust as needed.';
