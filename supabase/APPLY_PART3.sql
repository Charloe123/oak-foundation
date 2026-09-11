-- Section C: RLS (kept enabled) + public-read content + schema-cache reload.
alter table public.session_notes enable row level security;
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
notify pgrst, 'reload schema';
