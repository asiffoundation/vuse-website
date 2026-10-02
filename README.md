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
| `/admin` | CMS: dự án, tin tức, xem form & donate (cần đăng nhập) |

## Thiết kế

- Font: **Plus Jakarta Sans** (`next/font`, subset `vietnamese`).
- Màu: theo bộ nhận diện v1.0 — token ở `src/app/globals.css` (`@theme`).
- Hiệu ứng: `motion` (reveal, tilt 3D, slider), aurora/grain thuần CSS, tôn trọng `prefers-reduced-motion`.
- Ảnh bìa chưa có → `Art` tự sinh gradient + cỏ 4 lá. Có ảnh thật (upload ở `/admin`) thì tự dùng.
- Ảnh cố định (logo…) ở `public/images/`; ảnh admin tải lên ở Supabase Storage bucket `media`.

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
supabase/migrations/      # 0001 bảng+RLS, 0002 storage, 0003 seed
```

## Cài Supabase

1. Tạo project tại [supabase.com](https://supabase.com).
2. **SQL Editor** → chạy lần lượt `0001_init.sql`, `0002_storage.sql`, `0003_seed.sql`.
   RLS: nội dung ai cũng đọc (bài nháp thì không); khách chỉ **gửi** được form (không đọc); admin đăng nhập mới đọc/ghi.
3. **Authentication → Users**: tạo tài khoản admin (tắt đăng ký công khai ở Providers → Email).
4. Copy `.env.example` → `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. (Tuỳ chọn) `RESEND_API_KEY` để gửi email thông báo về `info@vu-se.com` và email cảm ơn cho nhà hảo tâm.

## Deploy Vercel

1. Import repo GitHub vào Vercel (tự nhận Next.js).
2. Khai báo env vars ở **Project Settings → Environment Variables** (các biến trong `.env.example`).
3. Push nhánh chính → production; mỗi PR → preview URL.
4. Gắn domain `www.vu-se.com` trong **Domains**.

## Việc cần thay bằng thông tin thật

- [ ] Thông tin chuyển khoản trong `src/lib/site.ts` (đang là mẫu).
- [ ] Link nhúng Google Maps (`site.mapEmbed`) và link Fanpage chính xác.
- [ ] Ảnh thật cho 5 slide banner, dự án, đối tác (logo) — upload qua `/admin`.
- [ ] Nội dung dự án/tin tức thật (hiện là mẫu trong `0003_seed.sql`).
- [ ] Quyết định cổng thanh toán online (hiện: form cam kết + chuyển khoản thủ công + email biên nhận).
- [ ] Trang chính sách bảo mật / điều khoản; thông tin pháp lý ở footer.
