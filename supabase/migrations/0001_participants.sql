-- OAK Foundation Partner Gathering – initial schema (Phase 2 proposal)
-- Event: 9-11 November 2026, Cresta Lodge Msasa, ~110 participants.
-- Apply in Supabase SQL editor or via Supabase CLI after project is linked.

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
  phone text not null,
  sub_partner_program_area text,
  dietary_requirements text,
  accessibility_requirements text,
  travel_requirements text,
  accommodation_requirements text,
  consent_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists participants_role_idx on public.participants (role);
create index if not exists participants_org_idx on public.participants (organization);
create index if not exists participants_registration_id_idx on public.participants (registration_id);
create index if not exists participants_qr_token_idx on public.participants (qr_token);
