-- Tables for admin panel

-- profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique,
  email text unique,
  full_name text,
  role text,
  avatar_url text,
  created_at timestamptz default now()
);

-- noticias
create table if not exists noticias (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text,
  cover text,
  category text,
  author_id uuid references profiles(id) on delete set null,
  slug text unique,
  meta_title text,
  meta_description text,
  published boolean default false,
  featured boolean default false,
  date timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- galeria
create table if not exists galeria (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  cover text,
  created_at timestamptz default now()
);

-- fotos
create table if not exists fotos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references galeria(id) on delete cascade,
  url text,
  caption text,
  position int default 0,
  created_at timestamptz default now()
);

-- eventos
create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image text,
  location text,
  date timestamptz,
  time text,
  category text,
  organizer text,
  signup boolean default false,
  link text,
  created_at timestamptz default now()
);

-- agenda
create table if not exists agenda (
  id uuid primary key default gen_random_uuid(),
  type text,
  title text,
  description text,
  date timestamptz,
  time text,
  location text,
  created_at timestamptz default now()
);

-- configuracoes
create table if not exists configuracoes (
  id uuid primary key default gen_random_uuid(),
  key text unique,
  value jsonb,
  created_at timestamptz default now()
);
