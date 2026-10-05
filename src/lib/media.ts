/**
 * TẤT CẢ ẢNH CỐ ĐỊNH CỦA WEBSITE — sửa ở đây khi có ảnh thật.
 *
 * Hiện là ẢNH TẠM (SVG màu thương hiệu) trong `public/images/site/`.
 * Mã Unsplash ở tham số thứ 3 chỉ để GHI CHÚ ảnh minh hoạ gợi ý (unsplash.com/photos/<mã>) —
 * Unsplash chặn tải ảnh tự động nên website không nhúng trực tiếp được.
 *
 * Thay ảnh: chép file vào `public/images/site/` (vd. `hero-1.jpg`; ảnh ngang ≥ 1920px,
 * ảnh dọc ≥ 1200px), rồi đổi đuôi `.svg` → `.jpg` ở dòng tương ứng và sửa mô tả cho đúng ảnh.
 *
 * Ảnh dự án / tin tức không nằm ở đây: tải lên trong /admin (ảnh bìa).
 */
export type Media = { src: string; alt: string; fallback?: string };

/** file = ảnh trong public/images/site; _unsplash = mã ảnh gợi ý (chỉ để ghi chú) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const m = (file: string, alt: string, _unsplash?: string): Media => ({ src: `/images/site/${file}`, alt });

export const media = {
  // 5 slide banner trang chủ — ảnh ngang 16:9
  hero: [
    m("hero-1.svg", "Các em nhỏ vùng cao Gia Lai cười tươi", "AEaTUnvneik"),
    m("hero-2.svg", "Trẻ em vui chơi trên cánh đồng", "0DPyb8t_KfI"),
    m("hero-3.svg", "Cụ bà đội nón lá mỉm cười", "P-NKvMEzA2A"),
    m("hero-4.svg", "Người phụ nữ ngồi xe lăn trong công viên", "UlG-z-Kz_AI"),
    m("hero-5.svg", "Người nông dân đội nón lá trên đồng lúa", "4trSs-cdM6c"),
  ],
  // 4 nhóm đối tượng — ảnh dọc 3:4
  audience: [
    m("audience-1.svg", "Trẻ em, học sinh, sinh viên", "cqG5fcZQHQg"),
    m("audience-2.svg", "Người cao tuổi", "P-NKvMEzA2A"),
    m("audience-3.svg", "Người khuyết tật", "GIJWGUXKEzY"),
    m("audience-4.svg", "Người có hoàn cảnh khó khăn", "DdnLKP_Yc2Y"),
  ],
  // 4 lĩnh vực (theo thứ tự lĩnh vực) — ảnh ngang 16:10
  program: [
    m("program-1.svg", "Lớp học của các em nhỏ", "cqG5fcZQHQg"),
    m("program-2.svg", "Bác sĩ khám sức khỏe cho trẻ", "QY8-IuUV3wk"),
    m("program-3.svg", "Học nghề may", "S49g-JZK_7g"),
    m("program-4.svg", "Hai bàn tay nắm lấy nhau", "mwGrAl1X514"),
  ],
  // Ảnh bìa dự phòng cho dự án / tin tức chưa có ảnh trong /admin
  project: [m("project-1.svg", "", "cqG5fcZQHQg"), m("project-2.svg", "", "GIJWGUXKEzY"), m("project-3.svg", "", "QY8-IuUV3wk")],
  post: [m("post-1.svg", "", "HQlVeK0wb_w"), m("post-2.svg", "", "FQEYqBdXj2g"), m("post-3.svg", "", "0DPyb8t_KfI")],
  // Khoảnh khắc — dải ảnh chạy ở trang chủ
  moments: [
    m("moment-1.svg", "", "AEaTUnvneik"),
    m("moment-2.svg", "", "cJfHT9XjOoU"),
    m("moment-3.svg", "", "ibZ2QiKkEsg"),
    m("moment-4.svg", "", "8wiECX4Cga4"),
    m("moment-5.svg", "", "FQEYqBdXj2g"),
    m("moment-6.svg", "", "dliEVD2QhKQ"),
    m("moment-7.svg", "", "rXqfl7MKEJ4"),
    m("moment-8.svg", "", "HQlVeK0wb_w"),
  ],
  // Chân dung nhân vật: CỐ Ý để ảnh tạm — không gán ảnh người lạ cho một câu chuyện có tên
  story: m("story.svg", "Chân dung nhân vật câu chuyện"),
  storyWide: m("story-wide.svg", "Những bàn tay nắm lấy nhau", "bZQJLStVYWs"),
  cta: m("cta.svg", "Những bàn tay cùng chung sức", "Db-stA8meJY"),
  about: [m("about-1.svg", "Cụ bà đội nón lá", "P-NKvMEzA2A"), m("about-2.svg", "Trẻ em vui chơi", "0DPyb8t_KfI")],
  // Ảnh đầu trang con
  page: {
    about: m("page-about.svg", "Những bàn tay cùng chung sức", "Db-stA8meJY"),
    programs: m("page-programs.svg", "Người dân trên đồng lúa", "DdnLKP_Yc2Y"),
    projects: m("page-projects.svg", "Các em nhỏ cười tươi", "AEaTUnvneik"),
    news: m("page-news.svg", "Khoảnh khắc đời thường", "HQlVeK0wb_w"),
    join: m("page-join.svg", "Những bàn tay đoàn kết", "FQEYqBdXj2g"),
    contact: m("page-contact.svg", "Cánh đồng lúa Việt Nam", "4trSs-cdM6c"),
  },
};

export const pick = (list: Media[], i: number) => list[((i % list.length) + list.length) % list.length];
