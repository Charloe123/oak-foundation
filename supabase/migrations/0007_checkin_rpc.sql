-- 0007: secure check-in RPC. Runs as SECURITY DEFINER so the anon-key
-- frontend can check in via a controlled function without SELECT on participants.
-- Returns public participant info + whether this scan created a new row.
drop function if exists public.check_in_participant(uuid, date);
create function public.check_in_participant(
  p_qr_token uuid,
  p_attendance_date date
)
returns table (
  out_participant_id uuid,
  out_registration_id text,
  out_first_name text,
  out_last_name text,
  out_organization text,
  out_role text,
  out_attendance_date date,
  out_already_checked_in boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_participant public.participants%rowtype;
  v_exists boolean;
begin
  if p_attendance_date not in ('2026-11-09','2026-11-10','2026-11-11') then
    raise exception 'Invalid attendance date: %', p_attendance_date;
  end if;

  select * into v_participant
    from public.participants p
    where p.qr_token = p_qr_token
    limit 1;

  if not found then
    raise exception 'QR_NOT_RECOGNISED';
  end if;

  select exists (
    select 1 from public.attendance a
    where a.participant_id = v_participant.id
      and a.attendance_date = p_attendance_date
  ) into v_exists;

  if not v_exists then
    insert into public.attendance (participant_id, attendance_date)
      values (v_participant.id, p_attendance_date)
    on conflict (participant_id, attendance_date) do nothing;
  end if;

  return query
    select v_participant.id, v_participant.registration_id,
           v_participant.first_name, v_participant.last_name,
           v_participant.organization, v_participant.role,
           check_in_participant.p_attendance_date, v_exists;
end $$;

-- Allow anon + authenticated callers to execute ONLY this function.
-- (Table RLS stays locked; the function runs with definer privileges.)
revoke all on function public.check_in_participant(uuid, date) from public;
grant execute on function public.check_in_participant(uuid, date) to anon, authenticated;

-- Attendance overview for Coordination (counts only, no PII).
create or replace function public.attendance_overview(p_attendance_date date)
returns table (checked_in bigint, total_participants bigint)
language sql
security definer
set search_path = public
as $$
  select
    (select count(*) from public.attendance where attendance_date = p_attendance_date),
    (select count(*) from public.participants);
$$;
revoke all on function public.attendance_overview(date) from public;
grant execute on function public.attendance_overview(date) to anon, authenticated;

notify pgrst, 'reload schema';
