-- 0002 — Bucket ảnh `media` (public đọc, đăng nhập mới ghi).
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media is publicly readable" on storage.objects for select using (bucket_id = 'media');
create policy "authenticated users upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "authenticated users update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "authenticated users delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
