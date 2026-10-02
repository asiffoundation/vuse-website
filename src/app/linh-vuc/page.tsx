import type { Metadata } from "next";
import Clover from "@/components/Clover";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getPrograms } from "@/lib/data";
import { cx } from "@/components/ui";

export const metadata: Metadata = { title: "Lĩnh vực hoạt động" };
export const revalidate = 300;

const tone: Record<string, string> = {
  sun: "from-sun to-[#ffb347] text-ink",
  rose: "from-[#ff8aa1] to-[#e0527a] text-white",
  leaf: "from-leaf to-viet text-white",
  amber: "from-amber to-[#7a4505] text-white",
};

export default async function Programs() {
  const programs = await getPrograms();
  return (
    <>
      <PageHero eyebrow="Our Work" title="Bốn lĩnh vực — một sứ mệnh." sub="Tri thức, sức khỏe, sinh kế và sự đồng hành: bộ công cụ để mỗi người làm chủ tương lai của mình." />
      <section className="mx-auto max-w-7xl space-y-8 px-5 py-20 md:py-28">
        {programs.map((g, i) => (
          <Reveal key={g.id}>
            <article id={g.slug} className="grid scroll-mt-28 overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-forest/5 ring-1 ring-line md:grid-cols-[1fr_1.3fr]">
              <div className={cx("relative flex min-h-64 flex-col justify-between overflow-hidden bg-gradient-to-br p-8 md:p-10", tone[g.color] ?? tone.leaf, i % 2 === 1 && "md:order-2")}>
                <Clover className="absolute -bottom-16 -right-16 size-72 animate-spin-slow text-white/15" />
                <span className="text-7xl font-black opacity-25">0{i + 1}</span>
                <div className="relative">
                  <span className="mb-4 grid size-16 place-items-center rounded-2xl bg-white/25 backdrop-blur"><Icon name={g.icon} className="size-8" /></span>
                  <h2 className="text-3xl font-extrabold md:text-4xl">{g.title}</h2>
                </div>
              </div>
              <ul className="flex flex-col justify-center gap-4 p-8 md:p-12">
                {g.items.map((t) => (
                  <li key={t} className="flex gap-4 text-lg font-semibold">
                    <Clover className="mt-1 size-6 shrink-0 text-viet" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
