-- Run in Supabase: SQL Editor > New query > paste > Run. Safe to re-run.
-- Contact-form messages:
--   * anon (public key): INSERT only, can never read, update or delete.
--   * authenticated admin (only the email below): read, mark read/unread, delete.
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
grant select, delete on public.messages to authenticated;
grant update (is_read) on public.messages to authenticated;  -- only the read flag is editable

drop policy if exists "anon can insert messages" on public.messages;
create policy "anon can insert messages" on public.messages
  for insert to anon with check (true);

-- Admin policies: change the email here if the admin account email changes.
drop policy if exists "admin can read messages" on public.messages;
create policy "admin can read messages" on public.messages
  for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'mansourqasqous@gmail.com');

drop policy if exists "admin can update messages" on public.messages;
create policy "admin can update messages" on public.messages
  for update to authenticated
  using (lower(auth.jwt() ->> 'email') = 'mansourqasqous@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'mansourqasqous@gmail.com');

drop policy if exists "admin can delete messages" on public.messages;
create policy "admin can delete messages" on public.messages
  for delete to authenticated
  using (lower(auth.jwt() ->> 'email') = 'mansourqasqous@gmail.com');
