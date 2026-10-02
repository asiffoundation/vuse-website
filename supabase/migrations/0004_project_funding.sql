-- 0004 — Mục tiêu gây quỹ cho dự án (hiển thị thanh tiến độ). Chạy trên Supabase SQL Editor.
alter table projects add column if not exists goal_amount bigint check (goal_amount is null or goal_amount > 0);
alter table projects add column if not exists raised_amount bigint not null default 0 check (raised_amount >= 0);
