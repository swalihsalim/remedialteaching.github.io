-- Remedial Teaching: Stage 2 schema
-- Run this in Supabase SQL Editor after creating your project.
-- Admins are provisioned by a trusted project owner, never by public signup.

create type public.account_type as enum ('student', 'guardian');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 1 and 100),
  account_type public.account_type not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Admin IDs are managed only by trusted database owners.
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- A guardian relationship is created/approved by an administrator.
-- No public client policy permits arbitrary link creation.
create table public.guardian_student_links (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'approved' check (status in ('pending', 'approved', 'revoked')),
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  unique (guardian_id, student_id),
  check (guardian_id <> student_id)
);

create index guardian_links_guardian_idx on public.guardian_student_links(guardian_id);
create index guardian_links_student_idx on public.guardian_student_links(student_id);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Create a profile after auth signup. Only student/guardian are accepted.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_type text;
  safe_type public.account_type;
  safe_name text;
begin
  requested_type := coalesce(new.raw_user_meta_data ->> 'account_type', 'student');
  if requested_type not in ('student', 'guardian') then
    safe_type := 'student';
  else
    safe_type := requested_type::public.account_type;
  end if;

  safe_name := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  if safe_name = '' then
    safe_name := 'New learner';
  end if;

  insert into public.profiles (id, full_name, account_type)
  values (new.id, left(safe_name, 100), safe_type);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.guardian_student_links enable row level security;

-- Profiles: users can read their own profile; admins can manage all profiles.
create policy "Users read own profile"
on public.profiles for select to authenticated
using (id = (select auth.uid()) or public.is_admin());

create policy "Users update own basic profile"
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (
  id = (select auth.uid())
  and account_type = (select p.account_type from public.profiles p where p.id = (select auth.uid()))
);

create policy "Admins manage profiles"
on public.profiles for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Admin membership is private; no client-side insert/update/delete policies.
create policy "Admins read admin list"
on public.admin_users for select to authenticated
using (public.is_admin());

-- Guardians see only their own approved/pending relationship rows.
-- Students can see relationships attached to their own account.
create policy "Related users read link rows"
on public.guardian_student_links for select to authenticated
using (
  guardian_id = (select auth.uid())
  or student_id = (select auth.uid())
  or public.is_admin()
);

create policy "Admins manage guardian links"
on public.guardian_student_links for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- No policy lets guardians read student profiles. A later parent view will
-- expose only specifically approved fields through carefully scoped queries/views.
-- Do not add broad policies such as guardian_id-based access to all student data.

-- IMPORTANT: Add the first administrator manually after registering their account:
-- insert into public.admin_users (user_id)
-- values ('AUTH_USER_UUID_HERE');
-- Find the UUID in Supabase Dashboard > Authentication > Users.
