/**
 * TẤT CẢ ẢNH CỐ ĐỊNH CỦA WEBSITE — sửa ở đây khi có ảnh thật.
 *
 * Hiện dùng ẢNH MINH HOẠ từ Pexels (giấy phép Pexels: dùng miễn phí, kể cả thương mại, không bắt buộc ghi nguồn),
 * file `public/images/site/px-<mã>.jpg` — ảnh gốc tại pexels.com/photo/<mã>.
 * Đây KHÔNG phải ảnh hoạt động của Việt Úc — nên thay bằng ảnh thật trước khi công bố chính thức.
 *
 * Thay ảnh: chép file vào `public/images/site/` (ảnh ngang ≥ 1920px, ảnh dọc ≥ 1200px),
 * rồi sửa tên file và mô tả ở dòng tương ứng bên dưới.
 *
 * Ảnh dự án / tin tức không nằm ở đây: tải lên trong /admin (ảnh bìa).
 */
export type Media = { src: string; alt: string; fallback?: string };

const m = (file: string, alt: string): Media => ({ src: `/images/site/${file}`, alt });

export const media = {
  // 5 slide banner trang chủ — ảnh ngang 16:9
  hero: [
    m("px-14316313.jpg", "Hai em nhỏ ở Lào Cai cười tươi"),
    m("px-35131382.jpg", "Học sinh tiểu học trong lớp học"),
    m("px-29482552.jpg", "Cụ bà đội nón lá ở Hội An"),
    m("px-8415672.jpg", "Người ngồi xe lăn dạo công viên cùng người thân"),
    m("px-29677340.jpg", "Người nông dân cùng trâu trên đồng lúa chín"),
  ],
  // 4 nhóm đối tượng — ảnh dọc 3:4
  audience: [
    m("px-33985331.jpg", "Hai em nhỏ vùng cao Hà Giang học bài"),
    m("px-27246756.jpg", "Cụ bà đội nón lá ở chợ"),
    m("px-6194683.jpg", "Người phụ nữ ngồi xe lăn"),
    m("px-8703380.jpg", "Nông dân cấy lúa"),
  ],
  // 4 lĩnh vực (theo thứ tự lĩnh vực) — ảnh ngang 16:10
  program: [
    m("px-18395403.jpg", "Giờ học trong lớp"),
    m("px-7446997.jpg", "Bác sĩ khám sức khỏe cho em nhỏ"),
    m("px-7147642.jpg", "Người phụ nữ học may"),
    m("px-6995244.jpg", "Tình nguyện viên phát suất ăn"),
  ],
  // Ảnh bìa dự phòng cho dự án / tin tức chưa có ảnh trong /admin
  project: [m("px-33985331.jpg", ""), m("px-8415672.jpg", ""), m("px-5998445.jpg", "")],
  post: [m("px-34022738.jpg", ""), m("px-6646918.jpg", ""), m("px-18395403.jpg", "")],
  // Khoảnh khắc — dải ảnh chạy ở trang chủ
  moments: [
    m("px-30481773.jpg", ""),
    m("px-34663391.jpg", ""),
    m("px-9488193.jpg", ""),
    m("px-16495497.jpg", ""),
    m("px-34022738.jpg", ""),
    m("px-25584155.jpg", ""),
    m("px-8731906.jpg", ""),
    m("px-6646918.jpg", ""),
  ],
  // Chân dung nhân vật: CỐ Ý để ảnh tạm — không gán ảnh người lạ cho một câu chuyện có tên
  story: m("story.svg", "Chân dung nhân vật câu chuyện"),
  storyWide: m("px-28157387.jpg", "Cánh đồng lúa lúc hoàng hôn"),
  cta: m("px-9488193.jpg", "Hai em nhỏ khoác vai nhau cười"),
  about: [m("px-30481773.jpg", "Hai em nhỏ mặc áo dài"), m("px-6995244.jpg", "Tình nguyện viên phát suất ăn")],
  // Ảnh đầu trang con
  page: {
    about: m("px-6646918.jpg", "Tình nguyện viên"),
    programs: m("px-8703380.jpg", "Nông dân cấy lúa"),
    projects: m("px-35131382.jpg", "Học sinh trong lớp học"),
    news: m("px-16495497.jpg", "Đời sống nông thôn"),
    join: m("px-7156178.jpg", "Tình nguyện viên đóng gói quà"),
    contact: m("px-28157387.jpg", "Cánh đồng lúa"),
  },
};

export const pick = (list: Media[], i: number) => list[((i % list.length) + list.length) % list.length];
