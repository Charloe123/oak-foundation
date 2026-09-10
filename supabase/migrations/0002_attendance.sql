-- attendance: one row per participant per event day.
-- UNIQUE(participant_id, attendance_date) prevents duplicate check-ins
-- at the database level, even under concurrent scans / retries.

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
