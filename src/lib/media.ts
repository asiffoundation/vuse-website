/**
 * TẤT CẢ ẢNH CỐ ĐỊNH CỦA WEBSITE — sửa ở đây khi có ảnh thật.
 *
 * Hiện là ẢNH TẠM (SVG màu thương hiệu) trong `public/images/site/`.
 * Thay ảnh thật: chép file vào `public/images/site/` (vd. `hero-1.jpg`, nên ≥ 1920px
 * cho ảnh ngang, ≥ 1200px cho ảnh dọc) rồi đổi đuôi `.svg` → `.jpg` ở dòng tương ứng
 * và viết lại `alt` mô tả đúng nội dung ảnh.
 *
 * Ảnh dự án / tin tức không nằm ở đây: tải lên trong /admin (ảnh bìa).
 */
export type Media = { src: string; alt: string };

const m = (file: string, alt: string): Media => ({ src: `/images/site/${file}`, alt });

export const media = {
  // 5 slide banner trang chủ — ảnh ngang 16:9
  hero: [
    m("hero-1.svg", "Tình nguyện viên Việt Úc cùng cộng đồng"),
    m("hero-2.svg", "Các em học sinh trong chương trình học bổng"),
    m("hero-3.svg", "Chăm sóc người cao tuổi"),
    m("hero-4.svg", "Hoạt động hòa nhập cho người khuyết tật"),
    m("hero-5.svg", "Hỗ trợ sinh kế cho gia đình khó khăn"),
  ],
  // 4 nhóm đối tượng — ảnh dọc 3:4
  audience: [
    m("audience-1.svg", "Trẻ em, học sinh, sinh viên"),
    m("audience-2.svg", "Người cao tuổi"),
    m("audience-3.svg", "Người khuyết tật"),
    m("audience-4.svg", "Người có hoàn cảnh khó khăn"),
  ],
  // 4 lĩnh vực (theo thứ tự lĩnh vực) — ảnh ngang 16:10
  program: [
    m("program-1.svg", "Lớp kỹ năng cho học sinh"),
    m("program-2.svg", "Khám sức khỏe cộng đồng"),
    m("program-3.svg", "Lớp đào tạo nghề"),
    m("program-4.svg", "Đồng hành cùng cộng đồng yếu thế"),
  ],
  // Ảnh bìa dự phòng cho dự án / tin tức chưa có ảnh trong /admin
  project: [m("project-1.svg", ""), m("project-2.svg", ""), m("project-3.svg", "")],
  post: [m("post-1.svg", ""), m("post-2.svg", ""), m("post-3.svg", "")],
  // Khoảnh khắc — dải ảnh chạy ở trang chủ (vuông)
  moments: Array.from({ length: 8 }, (_, i) => m(`moment-${i + 1}.svg`, `Khoảnh khắc hoạt động ${i + 1}`)),
  story: m("story.svg", "Chân dung nhân vật câu chuyện"),
  storyWide: m("story-wide.svg", "Một ngày cùng Việt Úc"),
  cta: m("cta.svg", "Cộng đồng Việt Úc"),
  about: [m("about-1.svg", "Đội ngũ Việt Úc"), m("about-2.svg", "Hoạt động của Việt Úc")],
  // Ảnh đầu trang con
  page: {
    about: m("page-about.svg", "Đội ngũ Việt Úc"),
    programs: m("page-programs.svg", "Hoạt động theo lĩnh vực"),
    projects: m("page-projects.svg", "Các dự án của Việt Úc"),
    news: m("page-news.svg", "Tin tức Việt Úc"),
    join: m("page-join.svg", "Tình nguyện viên Việt Úc"),
    contact: m("page-contact.svg", "Văn phòng Việt Úc"),
  },
};

export const pick = (list: Media[], i: number) => list[((i % list.length) + list.length) % list.length];
