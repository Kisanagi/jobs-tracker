-- Run this in Supabase SQL Editor

create table public.applications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  company     text not null,
  position    text not null,
  role_track  text not null default 'Web Dev',
  source      text not null,
  status      text not null default 'Wishlist',
  applied_date date,
  job_url     text,
  salary_range text,
  notes       text,
  created_at  timestamptz not null default now()
);

-- RLS
alter table public.applications enable row level security;

create policy "Users see own rows" on public.applications
  for select using (auth.uid() = user_id);

create policy "Users insert own rows" on public.applications
  for insert with check (auth.uid() = user_id);

create policy "Users update own rows" on public.applications
  for update using (auth.uid() = user_id);

create policy "Users delete own rows" on public.applications
  for delete using (auth.uid() = user_id);
