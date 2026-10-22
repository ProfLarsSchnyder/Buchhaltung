-- BOOKIT · Supabase-Grundschema (noch NICHT ausgerollt)
-- Zum Ausführen im SQL Editor eines eigenen Supabase-Projekts.
-- Auth und Row Level Security verhindern, dass Lernende fremde Daten sehen.
-- Hinweis: Die Fallstudien sind Übungsmaterial, keine geheimen Prüfungsaufgaben.

create table if not exists public.bookit_case_definitions (
  world text not null,
  case_id text not null,
  version integer not null default 1 check (version > 0),
  title text not null,
  story text not null,
  opening jsonb not null check (jsonb_typeof(opening) = 'object'),
  transactions jsonb not null check (jsonb_typeof(transactions) = 'array'),
  epilogue text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (world, case_id, version)
);
alter table public.bookit_case_definitions enable row level security;
drop policy if exists bookit_cases_public_read on public.bookit_case_definitions;
create policy bookit_cases_public_read on public.bookit_case_definitions
 for select to anon, authenticated using (published = true);
-- Kein insert/update/delete via Browser: Inhalte nur über den SQL Editor
-- oder mit einer serverseitigen Funktion und Rollenprüfung bearbeiten.

create table if not exists public.bookit_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  world text not null,
  case_id text not null,
  case_version integer not null default 1 check (case_version > 0),
  draft jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, world, case_id)
);
alter table public.bookit_progress enable row level security;
drop policy if exists bookit_progress_owner_select on public.bookit_progress;
drop policy if exists bookit_progress_owner_insert on public.bookit_progress;
drop policy if exists bookit_progress_owner_update on public.bookit_progress;
drop policy if exists bookit_progress_owner_delete on public.bookit_progress;
create policy bookit_progress_owner_select on public.bookit_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy bookit_progress_owner_insert on public.bookit_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy bookit_progress_owner_update on public.bookit_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy bookit_progress_owner_delete on public.bookit_progress for delete to authenticated using ((select auth.uid()) = user_id);

create table if not exists public.bookit_training_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  world text not null,
  module text not null,
  difficulty text not null,
  question_id text not null,
  correct boolean not null,
  hint_used boolean not null default false,
  solution_shown boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.bookit_training_attempts enable row level security;
drop policy if exists bookit_attempts_owner_select on public.bookit_training_attempts;
drop policy if exists bookit_attempts_owner_insert on public.bookit_training_attempts;
drop policy if exists bookit_attempts_owner_delete on public.bookit_training_attempts;
create policy bookit_attempts_owner_select on public.bookit_training_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy bookit_attempts_owner_insert on public.bookit_training_attempts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy bookit_attempts_owner_delete on public.bookit_training_attempts for delete to authenticated using ((select auth.uid()) = user_id);
-- Versuchsdaten sind nach Erstellung unveränderlich (kein UPDATE).

create index if not exists bookit_progress_recent_idx on public.bookit_progress (user_id, updated_at desc);
create index if not exists bookit_attempts_recent_idx on public.bookit_training_attempts (user_id, created_at desc);

-- Bei einer echten Verbindung zuerst Auth aktivieren, mit Testkonten
-- SELECT/INSERT/UPDATE/DELETE unter verschiedenen Users testen.
-- Niemals service_role Schlüssel im Frontend oder GitHub speichern.
