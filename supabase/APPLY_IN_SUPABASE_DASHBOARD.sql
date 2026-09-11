-- OAK Foundation — RUN THIS IN SUPABASE DASHBOARD > SQL EDITOR (New query > Run).
-- Section A: participants + requested spec columns.
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
alter table public.participants add column if not exists phone_number text;
alter table public.participants add column if not exists registration_date timestamptz not null default now();
alter table public.participants add column if not exists qr_code_id text unique;
alter table public.participants add column if not exists registration_status text not null default 'registered';
alter table public.participants add column if not exists attendance_status text not null default 'not_attended';
alter table public.participants add column if not exists check_in_time timestamptz;
alter table public.participants add column if not exists check_in_date date;
update public.participants set phone_number = coalesce(phone_number, phone)
  where phone_number is null and phone is not null;
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
do $$ begin
  alter table public.participants add constraint participants_registration_status_check
    check (registration_status in ('registered','cancelled','waitlisted'));
exception when duplicate_object then null;
end $$;
do $$ begin
  alter table public.participants add constraint participants_attendance_status_check
    check (attendance_status in ('not_attended','checked_in','cancelled'));
exception when duplicate_object then null;
end $$;
