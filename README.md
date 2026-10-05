# Website Doanh nghiệp xã hội Việt Úc (VUSE)

Next.js 16 (App Router) + Tailwind 4 + Supabase (DB/Storage/Auth làm CMS) + Vercel + GitHub.

```
GitHub (source code)  →  Vercel (build/host/CDN)  →  Supabase (Postgres + Storage + Auth = CMS)
```

- **GitHub**: source code; mỗi PR có preview deploy trên Vercel.
- **Vercel**: build & host Next.js, ISR (`revalidate = 300`) cho trang công khai.
- **Supabase**: Postgres (nội dung + dữ liệu form), Storage bucket `media`, Auth cho `/admin`.

Nội dung/sitemap gốc: `Website_Viet_Uc/CAU TRUC WEB VIET UC.docx`. Bộ nhận diện: `Website_Viet_Uc/NHAN DIEN THUONG HIEU/`.

## Chạy thử ngay (không cần Supabase)

```bash
npm install
npm run dev      # http://localhost:3000
```

Chưa có `.env.local` → site dùng **dữ liệu mẫu** (`src/lib/sample-data.ts`), các form chạy **chế độ demo** (không lưu), `/admin` chưa đăng nhập được.

## Sitemap

| Route | Nội dung |
|---|---|
| `/` | Hero slider 5 slide, giới thiệu, 4 nhóm đối tượng, lĩnh vực, dự án, tầm nhìn/sứ mệnh, giá trị, đối tác, tin tức, CTA |
| `/ve-chung-toi` | Câu chuyện, ý nghĩa logo, tầm nhìn/sứ mệnh, 5 giá trị cốt lõi |
| `/linh-vuc` | 4 lĩnh vực: Giáo dục, Sức khỏe, Việc làm & Sinh kế, Cộng đồng yếu thế |
| `/du-an`, `/du-an/[slug]` | Danh sách & chi tiết dự án |
| `/tin-tuc`, `/tin-tuc/[slug]` | Danh sách & chi tiết bài viết |
| `/tham-gia?tab=volunteer\|partner\|donate` | Form tình nguyện viên / hợp tác / donate (kèm thông tin chuyển khoản) |
| `/lien-he` | Thông tin liên hệ, form, Google Maps |
| `/chinh-sach-bao-mat`, `/dieu-khoan` | Chính sách bảo mật (theo NĐ 13/2023), điều khoản sử dụng |
| `/admin` | CMS: dự án, tin tức, xem form & donate (cần đăng nhập) |

## Thiết kế

- Font: **Plus Jakarta Sans** (`next/font`, subset `vietnamese`).
- Màu: theo bộ nhận diện v1.0 — token ở `src/app/globals.css` (`@theme`).
- Hiệu ứng: `motion` (reveal, tilt 3D, slider), aurora/grain thuần CSS, tôn trọng `prefers-reduced-motion`.
- Hướng "Câu chuyện thật": ảnh lớn, nền sáng, chữ ≥ 15px. Hiệu ứng: banner ảnh Ken Burns, chữ sáng dần theo cuộn, ảnh mở rộng khi cuộn, thẻ lĩnh vực xếp chồng (sticky), dải ảnh chạy, thanh tiến độ gây quỹ, nút chia sẻ Facebook/Zalo.
- **Ảnh cố định** (banner, nhóm đối tượng, lĩnh vực, khoảnh khắc…) khai báo ở `src/lib/media.ts`, file ở `public/images/site/`. Hiện là **ảnh minh hoạ từ Pexels** (`px-<mã>.jpg`) — thay bằng ảnh thật rồi sửa tên file trong `media.ts`.
- Ảnh dự án / tin tức: tải lên ở `/admin` (Supabase Storage bucket `media`); chưa có thì dùng ảnh tạm.

## Cấu trúc thư mục

```
src/
  app/                    # trang công khai + admin/(dashboard)
  components/             # UI dùng chung (HeroSlider, JoinTabs, Header...)
  lib/
    supabase/             # client.ts (browser), server.ts (cookies + public client)
    data.ts               # đọc dữ liệu công khai (fallback sample-data)
    actions.ts            # Server Actions cho form công khai
    admin-actions.ts      # Server Actions cho CMS (yêu cầu đăng nhập)
    sample-data.ts, site.ts, types.ts, email.ts
  proxy.ts                # Next 16: bảo vệ /admin/*
supabase/migrations/      # 0001 bảng+RLS, 0002 storage, 0003 seed, 0004 gây quỹ dự án
```

## Cài Supabase

1. Tạo project tại [supabase.com](https://supabase.com).
2. **SQL Editor** → chạy lần lượt `0001_init.sql`, `0002_storage.sql`, `0003_seed.sql`, `0004_project_funding.sql` (mục tiêu gây quỹ cho dự án).
   RLS: nội dung ai cũng đọc (bài nháp thì không); khách chỉ **gửi** được form (không đọc); admin đăng nhập mới đọc/ghi.
3. **Authentication → Users**: tạo tài khoản admin (tắt đăng ký công khai ở Providers → Email).
4. Copy `.env.example` → `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. (Tuỳ chọn) `RESEND_API_KEY` để gửi email thông báo về `info@vu-se.com` và email cảm ơn cho nhà hảo tâm.

## Deploy Vercel

1. Import repo GitHub vào Vercel (tự nhận Next.js).
2. Khai báo env vars ở **Project Settings → Environment Variables** (các biến trong `.env.example`).
3. Push nhánh chính → production; mỗi PR → preview URL.
4. Gắn domain `www.vu-se.com` trong **Domains**.

> Lưu ý: một tài khoản GitHub chỉ liên kết được với **một** tài khoản Vercel. Nếu GitHub hiện tại đã gắn với Vercel khác, xem mục dưới.

## Chuyển sang tài khoản GitHub mới

Dùng khi tài khoản GitHub hiện tại đã liên kết với một tài khoản Vercel khác.

1. Tạo tài khoản GitHub mới (email khác, bật 2FA).
2. Đưa repo sang tài khoản mới — chọn một cách:
   - **Transfer ownership** (giữ nguyên lịch sử): repo → Settings → Danger Zone → *Transfer ownership* → nhập tên tài khoản mới → tài khoản mới chấp nhận qua email.
   - **Hoặc push sang repo mới:**
     ```bash
     git clone https://github.com/<tai-khoan-cu>/vuse-website.git
     cd vuse-website
     git remote set-url origin https://github.com/<tai-khoan-moi>/vuse-website.git
     git push -u origin main
     ```
3. Vercel: **Account Settings → Authentication** → kết nối GitHub mới → *Add New → Project* → Import `vuse-website`.
4. Thêm biến môi trường theo `.env.example`, Deploy, rồi gắn domain.
5. Sau khi chuyển: cập nhật `origin` trên máy (`git remote set-url origin ...`) và cấp lại quyền repo cho công cụ/AI đang dùng.

## Thứ tự triển khai khuyến nghị

1. ~~Chuyển GitHub~~ (đã xong: `asiffoundation/vuse-website`) → 2. Tạo Supabase, chạy `0001`–`0003`, tạo user admin → 3. Import Vercel + env vars → 4. Đăng nhập `/admin` kiểm tra → 5. Gắn domain `www.vu-se.com` → 6. Thay thông tin thật (danh sách dưới).

## Việc cần thay bằng thông tin thật

> Danh sách đầy đủ, chi tiết từng mục: [`NOI-DUNG-CAN-BO-SUNG.md`](NOI-DUNG-CAN-BO-SUNG.md).

- [ ] Thông tin chuyển khoản trong `src/lib/site.ts` (đang là mẫu).
- [ ] Link nhúng Google Maps (`site.mapEmbed`) và link Fanpage chính xác.
- [ ] Ảnh thật: thay file trong `public/images/site/` (danh sách ở `src/lib/media.ts`); ảnh dự án/tin tức và logo đối tác upload qua `/admin`.
- [ ] Câu chuyện nhân vật (`story`) trong `src/lib/sample-data.ts` — đang là **câu chuyện mẫu**.
- [ ] Mục tiêu & số đã quyên góp của từng dự án (nhập ở `/admin` sau khi chạy `0004`).
- [ ] Nội dung dự án/tin tức thật (hiện là mẫu trong `0003_seed.sql`).
- [ ] Quyết định cổng thanh toán online (hiện: form cam kết + chuyển khoản thủ công + email biên nhận).
- [x] Trang chính sách bảo mật / điều khoản (bản nháp — cần rà soát pháp lý).
- [ ] Thông tin pháp lý thật ở footer (`site.legal` trong `src/lib/site.ts`: tên pháp lý, MST, nơi/ngày cấp).
