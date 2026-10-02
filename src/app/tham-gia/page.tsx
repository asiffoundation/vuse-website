import type { Metadata } from "next";
import JoinTabs, { type Tab } from "@/components/JoinTabs";
import PageHero from "@/components/PageHero";
import { media } from "@/lib/media";

export const metadata: Metadata = { title: "Tham gia cùng chúng tôi" };

export default async function Join({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams;
  const initial: Tab = tab === "donate" || tab === "partner" ? tab : "volunteer";
  return (
    <>
      <PageHero eyebrow="Tham gia cùng chúng tôi" title="Mỗi cách đồng hành đều thắp thêm một ngọn đèn." sub="Trở thành tình nguyện viên, hợp tác triển khai dự án xã hội hoặc đóng góp tài chính — chọn cách phù hợp với bạn." image={media.page.join} />
      <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <JoinTabs initial={initial} />
      </section>
    </>
  );
}
