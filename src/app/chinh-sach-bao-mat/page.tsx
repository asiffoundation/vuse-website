import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Chính sách bảo mật" };

// Bản nháp — cần rà soát pháp lý trước khi công bố chính thức.
const sections: LegalSection[] = [
  {
    title: "Phạm vi áp dụng",
    body: [
      `Chính sách này giải thích cách ${site.name} (“Việt Úc”, “chúng tôi”) thu thập, sử dụng và bảo vệ dữ liệu cá nhân khi bạn truy cập ${site.url.replace(/^https?:\/\//, "")} và gửi thông tin qua các biểu mẫu trên website.`,
      "Chúng tôi xử lý dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và các quy định pháp luật Việt Nam liên quan.",
    ],
  },
  {
    title: "Dữ liệu chúng tôi thu thập",
    body: [
      "Thông tin bạn tự cung cấp qua biểu mẫu liên hệ, đăng ký tình nguyện viên, đề xuất hợp tác và cam kết đóng góp: họ tên, email, số điện thoại, tỉnh/thành, tổ chức, kỹ năng, số tiền cam kết và nội dung lời nhắn.",
      "Website không yêu cầu tạo tài khoản đối với khách truy cập và không thu thập thông tin thẻ thanh toán. Các khoản đóng góp được thực hiện bằng chuyển khoản ngân hàng trực tiếp.",
      "Dữ liệu kỹ thuật cơ bản (địa chỉ IP, loại trình duyệt, thời điểm truy cập) có thể được nhà cung cấp hạ tầng ghi nhận tự động để vận hành và bảo mật hệ thống.",
    ],
  },
  {
    title: "Mục đích sử dụng",
    body: [
      "Phản hồi câu hỏi, liên hệ với tình nguyện viên và đối tác; xác nhận và gửi biên nhận cho các khoản đóng góp; báo cáo minh bạch về hoạt động của Việt Úc.",
      "Chúng tôi không bán, cho thuê hay trao đổi dữ liệu cá nhân của bạn cho bên thứ ba vì mục đích thương mại.",
    ],
  },
  {
    title: "Lưu trữ và bên xử lý dữ liệu",
    body: [
      "Dữ liệu được lưu trữ trên hạ tầng của các nhà cung cấp dịch vụ: Supabase (cơ sở dữ liệu), Vercel (lưu trữ website) và Resend (gửi email thông báo). Các nhà cung cấp này có thể đặt máy chủ ngoài lãnh thổ Việt Nam.",
      "Chỉ nhân sự được Việt Úc phân quyền mới truy cập được dữ liệu bạn gửi. Chúng tôi lưu trữ dữ liệu trong thời gian cần thiết cho mục đích nêu trên hoặc theo yêu cầu của pháp luật.",
    ],
  },
  {
    title: "Quyền của bạn",
    body: [
      "Bạn có quyền được biết, truy cập, chỉnh sửa, yêu cầu xoá dữ liệu cá nhân, rút lại sự đồng ý hoặc phản đối việc xử lý dữ liệu của mình.",
      `Để thực hiện các quyền này, vui lòng gửi email tới ${site.email} hoặc gọi ${site.phone}. Chúng tôi sẽ phản hồi trong thời hạn luật định.`,
    ],
  },
  {
    title: "Cookie",
    body: [
      "Website công khai không sử dụng cookie quảng cáo hay theo dõi. Cookie chỉ được dùng cho phiên đăng nhập của quản trị viên tại khu vực quản trị.",
    ],
  },
  {
    title: "Thay đổi chính sách",
    body: [
      "Chúng tôi có thể cập nhật chính sách này theo thời gian. Phiên bản mới sẽ được đăng tại trang này kèm ngày cập nhật.",
    ],
  },
];

export default function Privacy() {
  return <LegalPage eyebrow="Pháp lý" title="Chính sách bảo mật" updated="02/10/2026" sections={sections} />;
}
