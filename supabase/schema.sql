-- ═══════════════════════════════════════════════════════════════════════════
--  Jonathan Rivas — Portfolio · Supabase Schema
--  Ejecutar en SQL editor de Supabase (Dashboard → SQL → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "uuid-ossp";

-- ───────────────────────────────────────────────────────────────────────────
--  PROJECTS
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text not null unique,
  description     text not null,
  long_description text,
  preview_image   text not null,
  technologies    text[] not null default '{}',
  github_url      text,
  live_url        text,
  category        text not null check (category in ('web','ai-automation','systems','ui-ux')),
  featured        boolean not null default false,
  year            int not null,
  order_index     int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists projects_category_idx on public.projects(category);
create index if not exists projects_featured_idx on public.projects(featured);

-- ───────────────────────────────────────────────────────────────────────────
--  CERTIFICATIONS
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.certifications (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  organization  text not null,
  year          int not null,
  verify_url    text,
  badge_url     text,
  order_index   int not null default 0,
  created_at    timestamptz not null default now()
);

-- ───────────────────────────────────────────────────────────────────────────
--  EXPERIENCE
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.experience (
  id           uuid primary key default uuid_generate_v4(),
  role         text not null,
  organization text not null,
  period       text not null,
  description  text not null,
  highlights   text[] not null default '{}',
  type         text not null check (type in ('leadership','tech','academic')),
  order_index  int not null default 0,
  created_at   timestamptz not null default now()
);

-- ───────────────────────────────────────────────────────────────────────────
--  SITE SETTINGS — single row, contiene hero image, CV, textos dinámicos
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  id              uuid primary key default uuid_generate_v4(),
  hero_image_url  text,
  hero_image_alt  text,
  cv_pdf_url      text,
  hero_tagline    text,
  about_text      text,
  updated_at      timestamptz not null default now()
);

-- Insert default row
insert into public.site_settings (hero_tagline)
  select 'Building intelligent digital systems with modern technologies.'
  where not exists (select 1 from public.site_settings);

-- ───────────────────────────────────────────────────────────────────────────
--  CONTACT MESSAGES (opcional — guarda los mensajes del formulario)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
--    - Lectura pública para todas las tablas de contenido
--    - Escritura solo para usuarios autenticados (admin)
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.projects         enable row level security;
alter table public.certifications   enable row level security;
alter table public.experience       enable row level security;
alter table public.site_settings    enable row level security;
alter table public.contact_messages enable row level security;

-- Public read
create policy "public_read_projects"       on public.projects       for select using (true);
create policy "public_read_certs"          on public.certifications for select using (true);
create policy "public_read_experience"     on public.experience     for select using (true);
create policy "public_read_settings"       on public.site_settings  for select using (true);

-- Authenticated write
create policy "auth_write_projects"  on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "auth_write_certs" on public.certifications
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "auth_write_experience" on public.experience
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "auth_write_settings" on public.site_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Contact messages: insertable por cualquiera, solo lectura para auth
create policy "anyone_insert_contact" on public.contact_messages
  for insert with check (true);
create policy "auth_read_contact" on public.contact_messages
  for select using (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════════════════
--  STORAGE BUCKETS
--    Ejecutar en SQL editor o crear manualmente desde Dashboard → Storage
-- ═══════════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public) values
  ('hero',         'hero',         true),
  ('projects',     'projects',     true),
  ('certificates', 'certificates', true),
  ('cv',           'cv',           true)
on conflict (id) do nothing;

-- Storage policies — lectura pública, escritura solo autenticado
create policy "public_read_hero"  on storage.objects for select using (bucket_id = 'hero');
create policy "public_read_proj"  on storage.objects for select using (bucket_id = 'projects');
create policy "public_read_cert"  on storage.objects for select using (bucket_id = 'certificates');
create policy "public_read_cv"    on storage.objects for select using (bucket_id = 'cv');

create policy "auth_write_hero"  on storage.objects for all
  using (bucket_id = 'hero' and auth.role() = 'authenticated')
  with check (bucket_id = 'hero' and auth.role() = 'authenticated');

create policy "auth_write_proj"  on storage.objects for all
  using (bucket_id = 'projects' and auth.role() = 'authenticated')
  with check (bucket_id = 'projects' and auth.role() = 'authenticated');

create policy "auth_write_cert"  on storage.objects for all
  using (bucket_id = 'certificates' and auth.role() = 'authenticated')
  with check (bucket_id = 'certificates' and auth.role() = 'authenticated');

create policy "auth_write_cv"    on storage.objects for all
  using (bucket_id = 'cv' and auth.role() = 'authenticated')
  with check (bucket_id = 'cv' and auth.role() = 'authenticated');
