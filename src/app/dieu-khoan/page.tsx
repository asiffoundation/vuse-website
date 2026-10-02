import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Điều khoản sử dụng" };

// Bản nháp — cần rà soát pháp lý trước khi công bố chính thức.
const sections: LegalSection[] = [
  {
    title: "Chấp nhận điều khoản",
    body: [
      `Khi truy cập và sử dụng website của ${site.name}, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website.`,
    ],
  },
  {
    title: "Nội dung và bản quyền",
    body: [
      "Logo, bộ nhận diện thương hiệu, hình ảnh và bài viết trên website thuộc quyền sở hữu của Việt Úc hoặc được sử dụng với sự cho phép của chủ sở hữu.",
      "Bạn có thể chia sẻ nội dung với mục đích phi thương mại, kèm ghi rõ nguồn và đường dẫn về website. Mọi hình thức sử dụng khác cần có sự đồng ý bằng văn bản của Việt Úc.",
    ],
  },
  {
    title: "Thông tin bạn gửi",
    body: [
      "Bạn cam kết thông tin cung cấp qua các biểu mẫu là chính xác và thuộc về bạn (hoặc bạn được phép cung cấp).",
      "Không sử dụng biểu mẫu để gửi nội dung vi phạm pháp luật, xúc phạm, quảng cáo không mong muốn hoặc mã độc.",
    ],
  },
  {
    title: "Đóng góp và tài trợ",
    body: [
      "Cam kết đóng góp trên website là thông tin ghi nhận thiện chí; khoản đóng góp chỉ được xác nhận khi Việt Úc nhận được tiền chuyển khoản vào tài khoản chính thức công bố tại trang Tham gia.",
      "Việt Úc sử dụng các khoản đóng góp đúng mục đích hoạt động xã hội đã công bố và gửi biên nhận cho nhà hảo tâm. Vui lòng chỉ chuyển khoản tới tài khoản đứng tên tổ chức được công bố trên website.",
    ],
  },
  {
    title: "Giới hạn trách nhiệm",
    body: [
      "Chúng tôi nỗ lực đảm bảo thông tin trên website chính xác và cập nhật, nhưng không bảo đảm website luôn hoạt động liên tục, không lỗi.",
      "Website có thể chứa liên kết tới trang của bên thứ ba; Việt Úc không chịu trách nhiệm về nội dung của các trang đó.",
    ],
  },
  {
    title: "Luật áp dụng và liên hệ",
    body: [
      "Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam.",
      `Mọi thắc mắc xin gửi về ${site.email} hoặc ${site.address}.`,
    ],
  },
];

export default function Terms() {
  return <LegalPage eyebrow="Pháp lý" title="Điều khoản sử dụng" updated="02/10/2026" sections={sections} />;
}
