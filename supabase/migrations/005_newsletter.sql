create table if not exists newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table newsletter_subscribers enable row level security;
-- No public policies: signups go through the server-side API route using the service role key.
