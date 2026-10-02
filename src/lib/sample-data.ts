import type { Partner, Post, Program, Project } from "./types";

// Dữ liệu MẪU để dựng khung. Khi Supabase có dữ liệu thật, site tự dùng dữ liệu thật.
export const sampleProjects: Project[] = [
  {
    id: "p1",
    slug: "dong-hanh-cung-em-den-truong",
    title: "Đồng hành cùng em đến trường",
    summary: "Học bổng, dụng cụ học tập và kỹ năng mềm để mỗi em nhỏ không phải dừng giấc mơ ở cổng trường.",
    body: "Dự án trao học bổng, xe đạp, sách vở và các lớp kỹ năng mềm cho học sinh, sinh viên có hoàn cảnh khó khăn.\n\n[Nội dung mẫu — sẽ được thay bằng nội dung thật qua trang quản trị.]",
    cover_image_url: null,
    audience: "Trẻ em, học sinh, sinh viên",
    status: "ongoing",
    goal_amount: 200000000, // SỐ MẪU
    raised_amount: 136000000, // SỐ MẪU
    published: true,
    created_at: "2026-01-10",
  },
  {
    id: "p2",
    slug: "ho-tro-tre-khuyet-tat",
    title: "Hỗ trợ trẻ khuyết tật",
    summary: "Phục hồi chức năng, dụng cụ trợ giúp và con đường hòa nhập cho trẻ khuyết tật.",
    body: "Kết nối chuyên gia, tài trợ dụng cụ trợ giúp và đồng hành cùng gia đình trẻ khuyết tật.\n\n[Nội dung mẫu.]",
    cover_image_url: null,
    audience: "Người khuyết tật",
    status: "ongoing",
    goal_amount: 150000000, // SỐ MẪU
    raised_amount: 58000000, // SỐ MẪU
    published: true,
    created_at: "2026-02-18",
  },
  {
    id: "p3",
    slug: "ho-tro-benh-nhi",
    title: "Hỗ trợ bệnh nhi",
    summary: "Chung tay chi phí điều trị, dinh dưỡng và tiếp sức tinh thần cho các em bệnh nhi và gia đình.",
    body: "Hỗ trợ viện phí, suất ăn dinh dưỡng và hoạt động tinh thần cho bệnh nhi.\n\n[Nội dung mẫu.]",
    cover_image_url: null,
    audience: "Bệnh nhi và gia đình",
    status: "ongoing",
    goal_amount: 300000000, // SỐ MẪU
    raised_amount: 214000000, // SỐ MẪU
    published: true,
    created_at: "2026-03-05",
  },
];

export const samplePosts: Post[] = [
  {
    id: "n1",
    slug: "viet-uc-ra-mat-website-moi",
    title: "Việt Úc ra mắt website mới — nơi mọi tấm lòng gặp nhau",
    excerpt: "Một không gian số để kết nối tình nguyện viên, đối tác và nhà hảo tâm với những dự án thật.",
    body: "[Bài viết mẫu — chỉnh sửa trong trang quản trị.]",
    cover_image_url: null,
    category: "Thông báo",
    published: true,
    published_at: "2026-10-01",
  },
  {
    id: "n2",
    slug: "mo-dang-ky-tinh-nguyen-vien-2026",
    title: "Mở đăng ký tình nguyện viên mùa mới",
    excerpt: "Bạn có thể dành vài giờ mỗi tháng? Hãy trở thành một mảnh ghép của vòng tròn tương trợ.",
    body: "[Bài viết mẫu.]",
    cover_image_url: null,
    category: "Tình nguyện",
    published: true,
    published_at: "2026-09-20",
  },
  {
    id: "n3",
    slug: "hoc-bong-dong-hanh-cung-em",
    title: "Trao 50 suất học bổng “Đồng hành cùng em đến trường”",
    excerpt: "Những cuốn vở mới, những đôi mắt sáng — hành trình trao tri thức tiếp tục.",
    body: "[Bài viết mẫu.]",
    cover_image_url: null,
    category: "Dự án",
    published: true,
    published_at: "2026-09-05",
  },
];

export const samplePartners: Partner[] = [
  "Đối tác 01", "Đối tác 02", "Đối tác 03", "Đối tác 04", "Đối tác 05", "Đối tác 06",
].map((name, i) => ({ id: `pt${i}`, name, logo_url: null, website: null, sort_order: i }));

export const samplePrograms: Program[] = [
  {
    id: "g1", slug: "giao-duc", title: "Giáo dục", icon: "GraduationCap", color: "sun", sort_order: 1,
    items: ["Đào tạo kỹ năng mềm cho học sinh, sinh viên", "Tư vấn hướng nghiệp", "Trao học bổng và hỗ trợ tài chính"],
  },
  {
    id: "g2", slug: "cham-soc-suc-khoe", title: "Chăm sóc sức khỏe", icon: "HeartPulse", color: "rose", sort_order: 2,
    items: [
      "Hỗ trợ mua bảo hiểm y tế cho học sinh, người khó khăn",
      "Tài trợ khám chữa bệnh, dinh dưỡng, chăm sóc sức khỏe",
      "Chương trình khám bệnh cộng đồng",
    ],
  },
  {
    id: "g3", slug: "viec-lam-sinh-ke", title: "Việc làm & Sinh kế", icon: "Briefcase", color: "leaf", sort_order: 3,
    items: [
      "Đào tạo nghề cho phụ nữ, thanh niên, người khuyết tật",
      "Kết nối doanh nghiệp để tạo việc làm ổn định",
      "Hỗ trợ tài chính khởi nghiệp nhỏ",
    ],
  },
  {
    id: "g4", slug: "cong-dong-yeu-the", title: "Hỗ trợ cộng đồng yếu thế", icon: "HandHeart", color: "amber", sort_order: 4,
    items: [
      "Người di cư: hỗ trợ pháp lý, giấy tờ, thông tin",
      "Người già, người khuyết tật: chăm sóc đời sống và tinh thần",
      "Nạn nhân dễ bị tổn thương xã hội: bảo vệ, đồng hành",
    ],
  },
];

// 5 slide banner (docx): slide 1 là khẩu hiệu, 4 slide sau là 4 nhóm đối tượng.
export const slides = [
  { key: "hero", eyebrow: "DNXH Việt Úc", title: "Kết nối yêu thương – Lan tỏa hạnh phúc", sub: "Một vòng tròn tương trợ, nơi không ai bị bỏ lại phía sau.", tone: "viet" },
  { key: "kids", eyebrow: "Đối tượng phục vụ", title: "Trẻ em, học sinh, sinh viên", sub: "Tri thức và cơ hội để mỗi em tự tin làm chủ tương lai.", tone: "sun" },
  { key: "elder", eyebrow: "Đối tượng phục vụ", title: "Người cao tuổi", sub: "Chăm sóc đời sống và sưởi ấm tinh thần tuổi xế chiều.", tone: "amber" },
  { key: "disabled", eyebrow: "Đối tượng phục vụ", title: "Người khuyết tật", sub: "Hòa nhập, tự lập và được tôn trọng trọn vẹn.", tone: "leaf" },
  { key: "hard", eyebrow: "Đối tượng phục vụ", title: "Người có hoàn cảnh khó khăn", sub: "Sinh kế bền vững để tự đứng vững bằng đôi chân mình.", tone: "forest" },
] as const;

// SỐ MẪU — thay bằng số liệu thật trước khi công bố.
export const stats = [
  { value: 1200, suffix: "+", label: "Người được hỗ trợ" },
  { value: 35, suffix: "", label: "Dự án đã triển khai" },
  { value: 300, suffix: "+", label: "Tình nguyện viên" },
  { value: 100, suffix: "%", label: "Minh bạch tài chính" },
];

// CÂU CHUYỆN MẪU — thay bằng câu chuyện thật (có sự đồng ý của nhân vật).
export const story = {
  quote: "Nhờ học bổng của Việt Úc, em không phải nghỉ học giữa chừng. Giờ em muốn trở thành cô giáo để giúp lại những bạn nhỏ như em ngày trước.",
  name: "Em Lan (nhân vật mẫu)",
  role: "Học sinh lớp 9 · Chương trình Đồng hành cùng em đến trường",
};

export const values = [
  { en: "Humanity", vi: "Nhân ái", text: "Lấy con người làm gốc rễ của mọi hành động; đặt phẩm giá và hạnh phúc của mỗi cá nhân lên hàng đầu." },
  { en: "Empowerment", vi: "Trao quyền", text: "Không ban phát — kiến tạo cơ hội, trao công cụ về tri thức, sức khỏe và sinh kế để mỗi người làm chủ tương lai." },
  { en: "Sustainability", vi: "Bền vững", text: "Theo đuổi tác động dài lâu, giải pháp đi từ gốc rễ, tạo giá trị bền vững cho cộng đồng." },
  { en: "Connection", vi: "Kết nối", text: "Sức mạnh đến từ sự chung tay — những tấm lòng, nguồn lực và khát vọng cùng được kết nối." },
  { en: "Integrity", vi: "Liêm chính", text: "Minh bạch trong mọi hoạt động, giữ trọn trách nhiệm với cộng đồng, đối tác và sứ mệnh." },
];

export const cloverValues = [
  { vi: "Niềm tin", en: "Faith", text: "Tiếp thêm sức mạnh tinh thần, vững vàng trước thử thách." },
  { vi: "Hy vọng", en: "Hope", text: "Thắp sáng con đường vượt qua khó khăn, hướng đến tương lai." },
  { vi: "Tình yêu", en: "Love", text: "Kết nối con người bằng sự sẻ chia và nhân ái." },
  { vi: "May mắn", en: "Luck", text: "Mang đến cơ hội và những điều tốt đẹp trong cuộc sống." },
];
