create table if not exists blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_icon text default '📝',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_published_idx on blog_posts(published);

alter table blog_posts enable row level security;

create policy "public read published posts" on blog_posts
  for select using (published = true);

-- Writes go through server-side admin routes using the service role key.
