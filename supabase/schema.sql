-- Run once in Supabase: SQL Editor > New query > paste > Run.
-- Contact-form messages: the public (anon) key can INSERT only; it can never read, update or delete.
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name)    between 1 and 100),
  email      text not null check (char_length(email)   between 3 and 254),
  subject    text          check (char_length(subject) <= 150),
  message    text not null check (char_length(message) between 1 and 2000),
  lang       text          check (lang in ('ar','en')),
  is_read    boolean not null default false
);

alter table public.messages enable row level security;

revoke all on public.messages from anon, authenticated;
grant insert on public.messages to anon;

drop policy if exists "anon can insert messages" on public.messages;
create policy "anon can insert messages" on public.messages
  for insert to anon with check (true);

-- No SELECT policy on purpose: read messages from Table Editor (dashboard) only.
