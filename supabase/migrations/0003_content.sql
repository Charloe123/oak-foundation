-- programme / speakers / partners / documentation / admin profiles.

create table if not exists public.programme_days (
  id uuid primary key default gen_random_uuid(),
  event_date date not null unique check (event_date in ('2026-11-09','2026-11-10','2026-11-11')),
  title text not null,
  sort_order int not null default 0
);

create table if not exists public.programme_sessions (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references public.programme_days (id) on delete cascade,
  start_time time not null,
  end_time time,
  title text not null,
  venue text,
  description text,
  sort_order int not null default 0
);

create index if not exists programme_sessions_day_idx on public.programme_sessions (day_id, sort_order);

create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text,
  organization text,
  bio text,
  photo_url text
);

create table if not exists public.session_speakers (
  session_id uuid not null references public.programme_sessions (id) on delete cascade,
  speaker_id uuid not null references public.speakers (id) on delete cascade,
  primary key (session_id, speaker_id)
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text,
  overview text,
  areas_of_work text[],
  website text,
  logo_url text,
  public_contact text,
  created_at timestamptz not null default now()
);

create table if not exists public.documentation_posts (
  id uuid primary key default gen_random_uuid(),
  event_date date not null check (event_date in ('2026-11-09','2026-11-10','2026-11-11')),
  session_id uuid references public.programme_sessions (id) on delete set null,
  title text not null,
  notes text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.documentation_photos (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.documentation_posts (id) on delete cascade,
  storage_path text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

insert into public.programme_days (event_date, title, sort_order) values
  ('2026-11-09', 'Day 1 - 9 November', 1),
  ('2026-11-10', 'Day 2 - 10 November', 2),
  ('2026-11-11', 'Day 3 - 11 November', 3)
on conflict (event_date) do nothing;
