# Nội dung cần bổ sung trước khi công bố

Danh sách mọi thứ trên website **đang là mẫu / tạm**. Đánh dấu `[x]` khi đã thay.
Cột "Sửa ở đâu": **/admin** = trang quản trị (không cần code); **file** = sửa trong mã nguồn (gửi cho người kỹ thuật hoặc Claude).

## 1. Bắt buộc — sai lệch nếu để nguyên

| | Nội dung | Hiện tại | Sửa ở đâu |
|---|---|---|---|
| [ ] | **Tài khoản nhận quyên góp**: tên ngân hàng, số tài khoản, chủ tài khoản, cú pháp chuyển khoản | `[Tên ngân hàng]`, `0000 0000 0000` | file `src/lib/site.ts` → `bank` |
| [ ] | **Thông tin pháp lý ở footer**: tên pháp lý đầy đủ, mã số doanh nghiệp, nơi & ngày cấp | `[Tên pháp lý…]`, `[Mã số doanh nghiệp]` | file `src/lib/site.ts` → `legal` |
| [ ] | **Câu chuyện nhân vật** ở trang chủ (trích dẫn, tên, vai trò) — cần sự đồng ý của nhân vật; nếu chưa có, báo để **ẩn khung này** | "Em Lan (nhân vật mẫu)", nhãn "Câu chuyện thật" | file `src/lib/sample-data.ts` → `story` |
| [ ] | **3 dự án** (tên, tóm tắt, nội dung, đối tượng) | Mẫu: "Đồng hành cùng em đến trường", "Hỗ trợ trẻ khuyết tật", "Hỗ trợ bệnh nhi" — nội dung `[Nội dung mẫu]` | /admin → Dự án (sửa hoặc xoá) |
| [ ] | **Mục tiêu gây quỹ & số đã quyên góp** từng dự án — chỉ nhập khi có số thật; để trống thì thanh tiến độ tự ẩn | Số mẫu 136/200tr, 58/150tr, 214/300tr (chỉ hiện khi chưa nối Supabase) | /admin → Dự án (sau khi chạy migration `0004`) |
| [ ] | **Tin tức** | Mẫu, trong đó có bài "Trao 50 suất học bổng" là **sự kiện chưa xảy ra** | /admin → Tin tức (sửa hoặc xoá) |

## 2. Ảnh — đang là ảnh minh hoạ mẫu từ Unsplash

Hiện website dùng **ảnh minh hoạ miễn phí từ Unsplash** (giấy phép Unsplash cho phép dùng thương mại). Đây **không phải ảnh hoạt động của Việt Úc**, chỉ để xem bố cục — cần thay bằng ảnh thật trước khi công bố. Ảnh chân dung nhân vật câu chuyện cố ý để trống (không gán ảnh người lạ cho câu chuyện có tên). Nếu ảnh Unsplash không tải được, website tự hiện ảnh tạm màu thương hiệu.

Chép ảnh thật vào `public/images/site/` với đúng tên, rồi trong `src/lib/media.ts` xoá mã Unsplash ở dòng đó và đổi đuôi `.svg` → `.jpg` (file ghi rõ từng ảnh dùng ở đâu, kèm ví dụ). Ảnh có người: cần sự đồng ý của người trong ảnh, đặc biệt với trẻ em.

| | Ảnh | Số lượng | Khổ gợi ý | Tên file |
|---|---|---|---|---|
| [ ] | Banner trang chủ (5 slide) | 5 | Ngang 16:9, ≥ 1920px | `hero-1` … `hero-5` |
| [ ] | 4 nhóm đối tượng | 4 | Dọc 3:4, ≥ 900px | `audience-1` … `audience-4` |
| [ ] | 4 lĩnh vực | 4 | Ngang 16:10, ≥ 1600px | `program-1` … `program-4` |
| [ ] | Ảnh lớn mở rộng khi cuộn ("Kết nối yêu thương…") | 1 | Ngang, ≥ 1920px | `story-wide` |
| [ ] | Chân dung nhân vật câu chuyện | 1 | Dọc 4:5 | `story` |
| [ ] | Khoảnh khắc (dải ảnh chạy) | 8 | Vuông/ngang | `moment-1` … `moment-8` |
| [ ] | Nền khối kêu gọi cuối trang chủ | 1 | Ngang | `cta` |
| [ ] | Trang Về chúng tôi | 2 | 1 dọc + 1 ngang | `about-1`, `about-2` |
| [ ] | Ảnh nền đầu trang con (Về chúng tôi, Lĩnh vực, Dự án, Tin tức, Tham gia, Liên hệ) | 6 | Ngang | `page-about`, `page-programs`, `page-projects`, `page-news`, `page-join`, `page-contact` |
| [ ] | Ảnh bìa từng dự án / tin tức | theo số bài | Ngang | /admin → tải ảnh bìa |
| [ ] | Logo đối tác (phần Đối tác **đang ẩn**, tự hiện khi có logo) | tuỳ | PNG nền trong | /admin |

## 3. Cần kiểm tra lại cho đúng

| | Nội dung | Hiện tại | Sửa ở đâu |
|---|---|---|---|
| [ ] | Link Fanpage Facebook | `https://facebook.com/vu-se.com` (có thể sai định dạng) | file `src/lib/site.ts` → `facebook` |
| [ ] | Bản đồ Google Maps | Tìm theo địa chỉ, chưa phải link nhúng chính xác | file `src/lib/site.ts` → `mapEmbed` (Google Maps → Chia sẻ → Nhúng bản đồ → copy link `src`) |
| [ ] | Số điện thoại, email, địa chỉ | 0942 550 092 · info@vu-se.com · 62 Tân Canh, Tân Bình | file `src/lib/site.ts` |
| [ ] | Hashtag chiến dịch | `#VietUcLanToa` | file `src/app/page.tsx` → `HASHTAG` |
| [ ] | Cam kết "Việt Úc gửi biên nhận cho mọi khoản ủng hộ" (trang dự án, form donate) | Đang hiển thị | Xác nhận quy trình có làm được không |
| [ ] | Mức quyên góp gợi ý | 100.000 / 200.000 / 500.000 / 1.000.000đ, tối thiểu 10.000đ | file `src/components/JoinTabs.tsx` |
| [ ] | Chính sách bảo mật & Điều khoản sử dụng | **Bản nháp**, cần người có chuyên môn pháp lý rà soát | file `src/app/chinh-sach-bao-mat/page.tsx`, `src/app/dieu-khoan/page.tsx` |

## 4. Cấu hình kỹ thuật

| | Việc | Ghi chú |
|---|---|---|
| [x] | Chạy migration `supabase/migrations/0004_project_funding.sql` | Để có ô "Mục tiêu gây quỹ" trong /admin |
| [ ] | Tạo tài khoản admin, **tắt đăng ký công khai** trên Supabase | Ai đăng nhập được đều có quyền admin |
| [ ] | Biến môi trường trên Vercel | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` |
| [ ] | (Tuỳ chọn) Gửi email qua Resend | `RESEND_API_KEY`, xác thực domain `vu-se.com` |
| [ ] | Gắn domain `www.vu-se.com` trên Vercel | |
| [ ] | Quyết định cổng thanh toán online | Hiện: form cam kết + chuyển khoản thủ công |
