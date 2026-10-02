import type { Metadata } from "next";
import Clover from "@/components/Clover";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { media, pick } from "@/lib/media";
import Reveal from "@/components/Reveal";
import { getPrograms } from "@/lib/data";
import { cx } from "@/components/ui";

export const metadata: Metadata = { title: "Lĩnh vực hoạt động" };
export const revalidate = 300;


export default async function Programs() {
  const programs = await getPrograms();
  return (
    <>
      <PageHero eyebrow="Lĩnh vực hoạt động" title="Bốn lĩnh vực — một sứ mệnh." sub="Tri thức, sức khỏe, sinh kế và sự đồng hành: bộ công cụ để mỗi người làm chủ tương lai của mình." image={media.page.programs} />
      <section className="mx-auto max-w-7xl space-y-8 px-5 py-20 md:py-28">
        {programs.map((g, i) => (
          <Reveal key={g.id}>
            <article id={g.slug} className="isolate grid scroll-mt-28 overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-forest/5 ring-1 ring-line md:grid-cols-[1fr_1.3fr]">
              <div className={cx("relative flex min-h-72 flex-col justify-end overflow-hidden p-8 text-white md:min-h-96 md:p-10", i % 2 === 1 && "md:order-2")}>
                <Photo src={pick(media.program, i).src} alt={pick(media.program, i).alt} fill sizes="(max-width:768px) 100vw, 560px" className="-z-10" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />
                <span className="absolute left-8 top-8 text-[15px] font-bold text-white/90 md:left-10 md:top-10">0{i + 1} / 0{programs.length}</span>
                <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur"><Icon name={g.icon} className="size-7" /></span>
                <h2 className="text-3xl font-extrabold md:text-4xl">{g.title}</h2>
              </div>
              <ul className="flex flex-col justify-center gap-4 p-8 md:p-12">
                {g.items.map((t) => (
                  <li key={t} className="flex gap-4 text-lg font-semibold leading-relaxed text-ink">
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
