import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.short} — ${site.tagline}`, template: `%s | ${site.name}` },
  description:
    "Doanh nghiệp xã hội Việt Úc — kết nối cộng đồng, sẻ chia yêu thương, chung tay xây dựng một cộng đồng nhân ái, bền vững.",
  openGraph: { type: "website", locale: "vi_VN", siteName: site.name, title: site.tagline },
};

export const viewport: Viewport = { themeColor: "#075530" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={jakarta.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
