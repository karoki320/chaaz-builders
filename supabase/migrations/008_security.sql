-- Security tidy-up after switching admin login to a PIN (no Supabase Auth users).
-- Uploads now use one-time signed URLs issued by the server, so nobody needs
-- the old "any logged-in Supabase user can write to storage" policies.
-- Without this, anyone who signs up for a Supabase account on this project
-- with the public anon key could upload, overwrite or delete product images.

drop policy if exists "authenticated upload media" on storage.objects;
drop policy if exists "authenticated update media" on storage.objects;
drop policy if exists "authenticated delete media" on storage.objects;

-- Make sure every table keeps Row Level Security on (public can only read
-- products, categories and published blog posts).
alter table if exists categories enable row level security;
alter table if exists products enable row level security;
alter table if exists customers enable row level security;
alter table if exists orders enable row level security;
alter table if exists order_items enable row level security;
alter table if exists contact_messages enable row level security;
alter table if exists admins enable row level security;
alter table if exists blog_posts enable row level security;
alter table if exists newsletter_subscribers enable row level security;
