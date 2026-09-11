-- STEP 1 of 2 — run this FIRST in Supabase Dashboard > SQL Editor > New query > Run.
-- Creates ONLY public.participants (+ RLS insert policy) so /register works.
-- After success, run STEP2_ATTENDANCE_AND_CONTENT.sql.
create extension if not exists "pgcrypto";
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
  created_at timestamptz not null default now(),
  phone_number text,
  registration_date timestamptz not null default now(),
  qr_code_id text unique,
  registration_status text not null default 'registered',
  attendance_status text not null default 'not_attended',
  check_in_time timestamptz,
  check_in_date date
);
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
do $$ begin
  alter table public.participants add constraint participants_qr_partner_only
    check (role = 'Partner' or qr_code_id is null);
exception when duplicate_object then null;
end $$;
alter table public.participants enable row level security;
drop policy if exists "public_registration_insert" on public.participants;
create policy "public_registration_insert"
  on public.participants for insert
  to anon, authenticated
  with check (consent_accepted = true);
notify pgrst, 'reload schema';
-- VERIFY: run this select afterwards, expect one row "participants":
-- select tablename from pg_tables where schemaname='public' and tablename='participants';
