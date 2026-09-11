-- OAK Foundation baseline — reproducible schema for NEW empty Supabase project.
-- Event: 9-11 Nov 2026, Cresta Lodge Msasa. Applies cleanly on empty DB and
-- idempotently on a DB where 0001-0005 were partially applied.
-- Frontend compatibility: keeps phone / created_at / qr_token names used by
-- src/app/actions.ts and types/event.ts, and ADDS the requested aliases
-- (phone_number, registration_date, qr_code_id, statuses, check-in fields).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- participants
create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  registration_id text not null unique,
  qr_token uuid not null unique default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 1 and 100),
  last_name text not null check (char_length(last_name) between 1 and 100),
  organization text not null check (char_length(organization) between 1 and 200),
  role text not null check (role in ('Partner','OAK Staff','Coordination Team','Presenter','Observer')),
  email text not null,
  phone text,
  sub_partner_program_area text,
  dietary_requirements text,
  accessibility_requirements text,
  travel_requirements text,
  accommodation_requirements text,
  consent_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

-- Requested spec columns (additive, nullable/defaulted so old inserts keep working).
alter table public.participants add column if not exists phone_number text;
alter table public.participants add column if not exists registration_date timestamptz not null default now();
alter table public.participants add column if not exists qr_code_id text unique;
alter table public.participants add column if not exists registration_status text not null default 'registered';
alter table public.participants add column if not exists attendance_status text not null default 'not_attended';
alter table public.participants add column if not exists check_in_time timestamptz;
alter table public.participants add column if not exists check_in_date date;

-- Backfill aliases from legacy columns (one-off, safe to re-run).
update public.participants set phone_number = coalesce(phone_number, phone)
  where phone_number is null and phone is not null;
update public.participants set phone = coalesce(phone, phone_number)
  where phone is null and phone_number is not null;
update public.participants set registration_date = coalesce(registration_date, created_at)
  where registration_date is null;

-- Keep phone / phone_number in sync on future writes.
create or replace function public.sync_participant_phone_alias()
returns trigger language plpgsql as $$
begin
  if new.phone is not null and new.phone_number is distinct from new.phone then
    new.phone_number := new.phone;
  elsif new.phone_number is not null and new.phone is distinct from new.phone_number then
    new.phone := new.phone_number;
  end if;
  return new;
end $$;
drop trigger if exists trg_sync_participant_phone on public.participants;
create trigger trg_sync_participant_phone
  before insert or update of phone, phone_number on public.participants
  for each row execute function public.sync_participant_phone_alias();

-- QR codes are Partner-only: non-Partners must have NULL qr_code_id.
do $$ begin
  alter table public.participants
    add constraint participants_qr_partner_only
    check (role = 'Partner' or qr_code_id is null);
exception when duplicate_object then null;
end $$;
do $$ begin
  alter table public.participants
    add constraint participants_registration_status_check
    check (registration_status in ('registered','cancelled','waitlisted'));
exception when duplicate_object then null;
end $$;
do $$ begin
  alter table public.participants
    add constraint participants_attendance_status_check
    check (attendance_status in ('not_attended','checked_in','cancelled'));
exception when duplicate_object then null;
end $$;

create index if not exists participants_role_idx on public.participants (role);
create index if not exists participants_org_idx on public.participants (organization);
create index if not exists participants_registration_id_idx on public.participants (registration_id);
create index if not exists participants_qr_token_idx on public.participants (qr_token);
create index if not exists participants_qr_code_id_idx on public.participants (qr_code_id);

-- ---------------------------------------------------------------- attendance
-- One row per participant per event day. UNIQUE prevents duplicate check-ins
-- even under concurrent scans/retries. This is the attendance source of truth;
-- participants.attendance_status / check_in_* are flat mirrors for the spec.
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants (id) on delete cascade,
  attendance_date date not null check (attendance_date in ('2026-11-09','2026-11-10','2026-11-11')),
  checked_in_at timestamptz not null default now(),
  checked_in_by uuid references auth.users (id),
  unique (participant_id, attendance_date)
);
create index if not exists attendance_date_idx on public.attendance (attendance_date);
create index if not exists attendance_participant_idx on public.attendance (participant_id);

-- Flat mirror: when Coordination checks someone in, update participants row too.
create or replace function public.mirror_attendance_to_participant()
returns trigger language plpgsql as $$
begin
  update public.participants
    set attendance_status = 'checked_in',
        check_in_time = coalesce(check_in_time, new.checked_in_at),
        check_in_date = coalesce(check_in_date, new.attendance_date)
    where id = new.participant_id;
  return new;
end $$;
drop trigger if exists trg_mirror_attendance on public.attendance;
create trigger trg_mirror_attendance
  after insert on public.attendance
  for each row execute function public.mirror_attendance_to_participant();

-- ---------------------------------------------------------------- programme
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
insert into public.programme_days (event_date, title, sort_order) values
  ('2026-11-09', 'Day 1 - 9 November', 1),
  ('2026-11-10', 'Day 2 - 10 November', 2),
  ('2026-11-11', 'Day 3 - 11 November', 3)
on conflict (event_date) do nothing;

-- Personal participant notes for sessions (frontend ProgrammeDocsScreen).
create table if not exists public.session_notes (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants (id) on delete cascade,
  session_id uuid not null references public.programme_sessions (id) on delete cascade,
  note text not null check (char_length(note) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists session_notes_participant_idx on public.session_notes (participant_id);
create index if not exists session_notes_session_idx on public.session_notes (session_id);

-- ---------------------------------------------------------------- partners
-- Covers requested partner_name/logo/description/website/contact/areas_of_work.
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

-- ---------------------------------------------------------------- docs/admin
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

-- ---------------------------------------------------------------- RLS
-- Participants: anon/authenticated can INSERT (registration flow, custom cookie
-- auth — no Supabase Auth for participants), but cannot SELECT/UPDATE/DELETE.
-- Coordination/admin reads go through service-role server client.
alter table public.participants enable row level security;
drop policy if exists "public_registration_insert" on public.participants;
create policy "public_registration_insert"
  on public.participants for insert
  to anon, authenticated
  with check (consent_accepted = true);
drop policy if exists "admin_select_participants" on public.participants;
create policy "admin_select_participants"
  on public.participants for select
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()));
drop policy if exists "admin_update_participants" on public.participants;
create policy "admin_update_participants"
  on public.participants for update
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

alter table public.attendance enable row level security;
drop policy if exists "admin_all_attendance" on public.attendance;
create policy "admin_all_attendance"
  on public.attendance for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

alter table public.session_notes enable row level security;

create or replace view public.participants_public as
  select id, registration_id, first_name, last_name, organization, role, created_at
  from public.participants;

alter table public.programme_days enable row level security;
alter table public.programme_sessions enable row level security;
alter table public.speakers enable row level security;
alter table public.session_speakers enable row level security;
alter table public.partners enable row level security;
alter table public.documentation_posts enable row level security;
alter table public.documentation_photos enable row level security;
alter table public.admin_profiles enable row level security;

drop policy if exists "public_read_programme_days" on public.programme_days;
create policy "public_read_programme_days" on public.programme_days for select to anon, authenticated using (true);
drop policy if exists "public_read_programme_sessions" on public.programme_sessions;
create policy "public_read_programme_sessions" on public.programme_sessions for select to anon, authenticated using (true);
drop policy if exists "public_read_speakers" on public.speakers;
create policy "public_read_speakers" on public.speakers for select to anon, authenticated using (true);
drop policy if exists "public_read_session_speakers" on public.session_speakers;
create policy "public_read_session_speakers" on public.session_speakers for select to anon, authenticated using (true);
drop policy if exists "public_read_partners" on public.partners;
create policy "public_read_partners" on public.partners for select to anon, authenticated using (true);
drop policy if exists "public_read_docs" on public.documentation_posts;
create policy "public_read_docs" on public.documentation_posts for select to anon, authenticated using (true);



