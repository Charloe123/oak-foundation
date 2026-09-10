-- RLS: participants (public insert for registration, admin read/update).
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

-- Attendance: admins only.
alter table public.attendance enable row level security;

drop policy if exists "admin_all_attendance" on public.attendance;
create policy "admin_all_attendance"
  on public.attendance for all
  to authenticated
  using (exists (select 1 from public.admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_profiles where user_id = auth.uid()));

-- Public-safe participant view: NO email/phone/requirements columns.
create or replace view public.participants_public as
  select id, registration_id, first_name, last_name, organization, role, created_at
  from public.participants;
