-- 0001 — Bảng nội dung + bảng form + RLS. Chạy trên Supabase SQL Editor.
create extension if not exists "pgcrypto";

-- ===== Nội dung do admin quản lý =====
create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  icon text not null default 'Heart',
  color text not null default 'leaf',
  items jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  body text,
  cover_image_url text,
  audience text,
  status text not null default 'ongoing' check (status in ('ongoing', 'completed')),
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  body text,
  cover_image_url text,
  category text,
  published boolean not null default true,
  published_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website text,
  sort_order int not null default 0
);

-- ===== Dữ liệu khách gửi lên từ các form =====
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text,
  skills text,
  availability text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists partnership_requests (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  contact_name text not null,
  email text not null,
  phone text,
  focus_area text,
  proposal text not null,
  created_at timestamptz not null default now()
);

create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null,
  email text not null,
  phone text,
  amount bigint not null check (amount >= 10000),
  message text,
  status text not null default 'pending' check (status in ('pending', 'received', 'receipt_sent')),
  created_at timestamptz not null default now()
);

-- ===== RLS =====
alter table programs enable row level security;
alter table projects enable row level security;
alter table posts enable row level security;
alter table partners enable row level security;
alter table contact_messages enable row level security;
alter table volunteer_applications enable row level security;
alter table partnership_requests enable row level security;
alter table donations enable row level security;

-- Nội dung: ai cũng đọc được (bài nháp thì không), chỉ user đăng nhập mới ghi.
create policy "programs are publicly readable" on programs for select using (true);
create policy "partners are publicly readable" on partners for select using (true);
create policy "published projects are publicly readable" on projects for select using (published = true or auth.role() = 'authenticated');
create policy "published posts are publicly readable" on posts for select using (published = true or auth.role() = 'authenticated');

create policy "authenticated users manage programs" on programs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated users manage projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated users manage posts" on posts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated users manage partners" on partners for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Form: khách (anon) chỉ được GỬI, không đọc được; admin đọc/sửa/xoá.
create policy "anyone can send contact" on contact_messages for insert with check (true);
create policy "anyone can apply volunteer" on volunteer_applications for insert with check (true);
create policy "anyone can request partnership" on partnership_requests for insert with check (true);
create policy "anyone can pledge donation" on donations for insert with check (status = 'pending');

create policy "authenticated users manage contact" on contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated users manage volunteers" on volunteer_applications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated users manage partnerships" on partnership_requests for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated users manage donations" on donations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
