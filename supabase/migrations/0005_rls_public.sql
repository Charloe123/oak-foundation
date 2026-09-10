-- RLS: programme / partners / docs are public-read, admin-write.
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
