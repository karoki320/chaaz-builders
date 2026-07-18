-- Storage bucket for product and blog images
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

create policy "authenticated upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

create policy "authenticated update media" on storage.objects
  for update to authenticated using (bucket_id = 'media');

create policy "authenticated delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

-- Real uploaded image URLs, replacing emoji-only placeholders
alter table products add column if not exists image_url text;
alter table blog_posts add column if not exists cover_image_url text;
