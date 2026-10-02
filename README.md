# Website [TÊN DỰ ÁN]

Next.js (App Router) + Supabase (DB/Storage/Auth làm CMS) + Vercel + GitHub.

## Kiến trúc

```
GitHub (source code, version control)
   │  mỗi push → trigger build
   ▼
Vercel (hosting + build + CDN)
   │  gọi API lúc runtime
   ▼
Supabase (Postgres DB + Storage + Auth) = "CMS" không cần code riêng
```

- **GitHub**: chứa source code, mỗi PR tự có preview deploy trên Vercel.
- **Vercel**: build & host Next.js, ISR (`revalidate`) cho các trang cần cập nhật định kỳ.
- **Supabase**:
  - Postgres: các bảng nội dung tuỳ dự án (ví dụ `posts`, `products`, `programs`...),
    `contact_messages` (liên hệ/đăng ký), `newsletter_subscribers` (nếu có).
  - Storage: bucket `media` (public) cho ảnh/video admin tải lên.
  - Auth: bảo vệ trang `/admin` — người quản trị đăng nhập bằng email/password để quản lý nội dung, không cần đụng code.

## Nguyên tắc dữ liệu: Supabase Storage vs. ảnh trong code

| Loại ảnh | Lưu ở đâu | Khi nào dùng |
|---|---|---|
| Ảnh cố định có sẵn lúc code (hero, logo, ảnh minh hoạ tĩnh...) | `public/images/` trong repo, deploy kèm code | Nhanh, miễn phí băng thông, không cần upload lại |
| Ảnh admin tự tải lên sau này (bài viết mới, sản phẩm mới...) | Supabase Storage bucket `media` | Cho phép người không biết code tự thêm nội dung |

Code luôn ưu tiên: `cover_image_url` (từ DB/Storage) → nếu rỗng thì fallback về ảnh mặc định trong `public/images/`.

## Cấu trúc thư mục

```
src/
  app/
    (public pages)/           # các trang công khai
    admin/
      login/                  # trang đăng nhập
      (dashboard)/            # layout có check auth, các trang CRUD nội dung
  components/                 # UI dùng chung
  lib/
    supabase/
      client.ts               # supabase client phía browser
      server.ts               # supabase client phía server (dùng cookies)
    types.ts                  # TypeScript types khớp với bảng DB
supabase/
  migrations/                 # file SQL đánh số thứ tự 0001, 0002... chạy tay trên Supabase SQL Editor
  templates/                  # file SQL mẫu để điền nội dung thật (fill-in-the-blank)
public/
  images/                     # ảnh xử lý sẵn, bundle theo code (KHÔNG qua Supabase Storage)
```

## Cài đặt local

1. Tạo project tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy lần lượt các file trong `supabase/migrations/` theo đúng thứ tự số. Mỗi file nên:
   - Tạo bảng (`create table if not exists ...`)
   - Bật RLS (`alter table ... enable row level security`)
   - Policy đọc công khai: `create policy "... are publicly readable" on ... for select using (true);` (hoặc `using (published = true)` nếu có nháp/chưa publish)
   - Policy ghi chỉ cho user đã đăng nhập: `create policy "authenticated users manage ..." on ... for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');`
3. Tạo Storage bucket public (`media`) + policy tương tự (đọc công khai, ghi cần đăng nhập).
4. Vào **Authentication → Users**, tạo tài khoản cho người sẽ quản trị nội dung (không mở đăng ký công khai).
5. Copy `.env.example` thành `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
6. Chạy:

   ```bash
   npm install
   npm run dev
   ```

7. Trang công khai: [http://localhost:3000](http://localhost:3000). Trang quản trị: [http://localhost:3000/admin](http://localhost:3000/admin).

## Quy trình Admin CMS

- Middleware (`proxy.ts` ở Next.js 16, hoặc `middleware.ts` ở bản cũ hơn) check session Supabase cho mọi route `/admin/*`; chưa login → redirect `/admin/login`.
- Mỗi loại nội dung có: trang danh sách, form thêm mới, form sửa — dùng **Server Actions** của Next.js để insert/update/delete thẳng vào Supabase, không cần viết API route riêng.
- Form upload ảnh: component client tải file thẳng lên Supabase Storage, tự điền URL công khai vào input text (vẫn cho sửa tay nếu cần paste URL ngoài).

## Deploy lên Vercel

1. Import repo GitHub này vào Vercel (framework tự nhận diện Next.js).
2. Khai báo 2 biến môi trường ở trên trong **Project Settings → Environment Variables**.
3. Mỗi lần push lên nhánh chính sẽ tự deploy production; mỗi PR có preview URL riêng.

## Checklist khi bắt đầu dự án mới từ template này

1. Tạo repo GitHub → khởi tạo Next.js app (App Router + TypeScript + Tailwind).
2. Tạo Supabase project → viết migration cho bảng dữ liệu riêng của site.
3. Chạy migration trên SQL Editor, tạo Storage bucket, tạo user admin.
4. Set env vars local (`.env.local`) + trên Vercel.
5. Build trang công khai đọc dữ liệu qua `createClient()` phía server, dùng `revalidate` theo nhu cầu.
6. Build `/admin` với middleware auth + form CRUD + upload ảnh.
7. Import vào Vercel, deploy, kiểm tra preview trước khi merge vào nhánh chính.

## Sitemap (ví dụ — chỉnh theo dự án thật)

```
Trang Chủ
├── Trang A              /duong-dan-a
├── Trang B              /duong-dan-b
│   └── /duong-dan-b/[slug]   chi tiết
├── Tin Tức              /tin-tuc, /tin-tuc/[slug]
├── Liên Hệ              /lien-he
└── Tìm Kiếm             /tim-kiem

/admin — khu vực quản trị (yêu cầu đăng nhập): quản lý từng loại nội dung.
```
