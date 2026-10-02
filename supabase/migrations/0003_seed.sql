-- 0003 — Dữ liệu mẫu ban đầu (sửa/xoá trong /admin sau).
insert into programs (slug, title, icon, color, sort_order, items) values
 ('giao-duc', 'Giáo dục', 'GraduationCap', 'sun', 1, '["Đào tạo kỹ năng mềm cho học sinh, sinh viên","Tư vấn hướng nghiệp","Trao học bổng và hỗ trợ tài chính"]'),
 ('cham-soc-suc-khoe', 'Chăm sóc sức khỏe', 'HeartPulse', 'rose', 2, '["Hỗ trợ mua bảo hiểm y tế cho học sinh, người khó khăn","Tài trợ khám chữa bệnh, dinh dưỡng, chăm sóc sức khỏe","Chương trình khám bệnh cộng đồng"]'),
 ('viec-lam-sinh-ke', 'Việc làm & Sinh kế', 'Briefcase', 'leaf', 3, '["Đào tạo nghề cho phụ nữ, thanh niên, người khuyết tật","Kết nối doanh nghiệp để tạo việc làm ổn định","Hỗ trợ tài chính khởi nghiệp nhỏ"]'),
 ('cong-dong-yeu-the', 'Hỗ trợ cộng đồng yếu thế', 'HandHeart', 'amber', 4, '["Người di cư: hỗ trợ pháp lý, giấy tờ, thông tin","Người già, người khuyết tật: chăm sóc đời sống và tinh thần","Nạn nhân dễ bị tổn thương xã hội: bảo vệ, đồng hành"]')
on conflict (slug) do nothing;

insert into projects (slug, title, summary, audience, body) values
 ('dong-hanh-cung-em-den-truong', 'Đồng hành cùng em đến trường', 'Học bổng, dụng cụ học tập và kỹ năng mềm để mỗi em nhỏ không phải dừng giấc mơ ở cổng trường.', 'Trẻ em, học sinh, sinh viên', '[Nội dung mẫu]'),
 ('ho-tro-tre-khuyet-tat', 'Hỗ trợ trẻ khuyết tật', 'Phục hồi chức năng, dụng cụ trợ giúp và con đường hòa nhập cho trẻ khuyết tật.', 'Người khuyết tật', '[Nội dung mẫu]'),
 ('ho-tro-benh-nhi', 'Hỗ trợ bệnh nhi', 'Chung tay chi phí điều trị, dinh dưỡng và tiếp sức tinh thần cho các em bệnh nhi và gia đình.', 'Bệnh nhi và gia đình', '[Nội dung mẫu]')
on conflict (slug) do nothing;

insert into posts (slug, title, excerpt, category, body) values
 ('viet-uc-ra-mat-website-moi', 'Việt Úc ra mắt website mới — nơi mọi tấm lòng gặp nhau', 'Một không gian số để kết nối tình nguyện viên, đối tác và nhà hảo tâm với những dự án thật.', 'Thông báo', '[Bài viết mẫu]')
on conflict (slug) do nothing;
