export const site = {
  name: "Doanh nghiệp xã hội Việt Úc",
  short: "VUSE",
  tagline: "Kết nối yêu thương – Lan tỏa hạnh phúc",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vu-se.com",
  email: "info@vu-se.com",
  phone: "0942 550 092",
  address: "62 Tân Canh, P. Tân Sơn Hòa, Q. Tân Bình, TP. Hồ Chí Minh",
  facebook: "https://facebook.com/vu-se.com",
  // Toạ độ gần đúng khu vực Tân Bình — thay bằng link nhúng Google Maps thật khi có.
  mapEmbed:
    "https://www.google.com/maps?q=62+T%C3%A2n+Canh,+T%C3%A2n+B%C3%ACnh,+H%E1%BB%93+Ch%C3%AD+Minh&output=embed",
  // Thông tin chuyển khoản MẪU — thay bằng tài khoản thật.
  bank: {
    name: "[Tên ngân hàng]",
    account: "0000 0000 0000",
    holder: "DNXH VIỆT ÚC",
    note: "HOTEN - SDT - DONATE",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/linh-vuc", label: "Lĩnh vực" },
  { href: "/du-an", label: "Dự án" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/tham-gia", label: "Tham gia" },
  { href: "/lien-he", label: "Liên hệ" },
];
