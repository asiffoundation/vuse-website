import { ArrowRight, Heart, Quote } from "lucide-react";
import Link from "next/link";
import ExpandImage from "@/components/ExpandImage";
import HeroSlider from "@/components/HeroSlider";
import Icon from "@/components/Icon";
import Marquee from "@/components/Marquee";
import PartnerLogo from "@/components/PartnerLogo";
import Photo from "@/components/Photo";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import ScrollText from "@/components/ScrollText";
import SectionTitle from "@/components/SectionTitle";
import { btn, cx } from "@/components/ui";
import { getPartners, getPosts, getPrograms, getProjects } from "@/lib/data";
import { media, pick } from "@/lib/media";
import { story } from "@/lib/sample-data";

export const revalidate = 300;

const audiences = [
  { t: "Trẻ em, học sinh, sinh viên", d: "Tri thức, học bổng & kỹ năng để tự tin làm chủ tương lai." },
  { t: "Người cao tuổi", d: "Chăm sóc đời sống và sưởi ấm tinh thần tuổi xế chiều." },
  { t: "Người khuyết tật", d: "Hòa nhập, tự lập và được tôn trọng trọn vẹn." },
  { t: "Người có hoàn cảnh khó khăn", d: "Sinh kế bền vững để tự đứng vững bằng đôi chân mình." },
];

const HASHTAG = "#VietUcLanToa";

export default async function Home() {
  const [programs, projects, posts, partners] = await Promise.all([getPrograms(), getProjects(), getPosts(), getPartners()]);
  const realPartners = partners.filter((p) => p.logo_url);

  return (
    <>
      <HeroSlider />

      {/* Tuyên ngôn — chữ sáng dần theo cuộn */}
      <section className="mx-auto max-w-5xl px-5 py-24 md:py-36">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-amber-ink">Về Việt Úc</p>
        <ScrollText
          className="mt-5 text-[clamp(1.6rem,3.6vw,2.9rem)] font-bold leading-[1.3] tracking-tight text-ink"
          highlight={["vòng", "tròn", "tương", "trợ"]}
          text="Việt Úc không chỉ là một tổ chức, mà là một vòng tròn tương trợ — nơi mỗi người là một mảnh ghép quan trọng, nơi sức mạnh được tạo nên từ sự chung tay, và không ai bị bỏ lại phía sau."
        />
        <Reveal className="mt-10">
          <Link href="/ve-chung-toi" className={cx(btn.base, btn.green, "px-7 py-3.5 text-[15px]")}>Câu chuyện của chúng tôi <ArrowRight className="size-4" /></Link>
        </Reveal>
      </section>

      {/* 4 nhóm đối tượng — thẻ ảnh */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="4 chiếc lá — 4 trái tim" title={<>Chúng tôi đồng hành cùng <span className="text-viet">bốn nhóm đối tượng</span></>} />
          <div className="mt-12 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => {
              const img = pick(media.audience, i);
              return (
                <Reveal key={a.t} delay={i * 0.08} className="w-[78%] shrink-0 snap-start sm:w-auto">
                  <article className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] text-white shadow-xl shadow-forest/10">
                    <Photo src={img.src} alt={img.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/35 to-transparent" />
                    <span className="absolute left-5 top-5 grid size-10 place-items-center rounded-full bg-white/20 text-[15px] font-black ring-1 ring-white/40 backdrop-blur">0{i + 1}</span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-extrabold leading-tight">{a.t}</h3>
                      <p className="mt-2 text-base leading-relaxed text-white/90 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-32 lg:group-hover:opacity-100">{a.d}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ảnh mở rộng theo cuộn */}
      <ExpandImage src={media.storyWide.src} alt={media.storyWide.alt}>
        <div className="max-w-4xl">
          <Heart className="mx-auto size-10 fill-sun text-sun" />
          <p className="mt-6 text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight">Kết nối yêu thương — <span className="text-sun">Lan tỏa hạnh phúc</span></p>
        </div>
      </ExpandImage>

      {/* Lĩnh vực — thẻ xếp chồng khi cuộn */}
      <section className="bg-mist py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Lĩnh vực hoạt động" title={<>Bốn trụ cột <span className="text-viet">tạo thay đổi thật</span></>} />
            <Link href="/linh-vuc" className={cx(btn.base, btn.dark, "text-[15px]")}>Tất cả lĩnh vực <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 space-y-6">
            {programs.map((g, i) => {
              const img = pick(media.program, i);
              return (
                <div key={g.id} className="md:sticky" style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}>
                  <Link href={`/linh-vuc#${g.slug}`} className="group grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-forest/10 ring-1 ring-line md:grid-cols-[1.1fr_1fr]">
                    <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]">
                      <Photo src={img.src} alt={img.alt} fill sizes="(max-width:768px) 100vw, 600px" className="transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center p-7 md:p-10">
                      <div className="flex items-center gap-3">
                        <span className="grid size-12 place-items-center rounded-2xl bg-mist text-viet"><Icon name={g.icon} className="size-6" /></span>
                        <span className="text-[15px] font-bold text-ink-soft">0{i + 1} / 0{programs.length}</span>
                      </div>
                      <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{g.title}</h3>
                      <ul className="mt-4 space-y-2.5 text-base leading-relaxed text-ink-soft md:text-lg">
                        {g.items.map((t) => (
                          <li key={t} className="flex gap-3"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-leaf" />{t}</li>
                        ))}
                      </ul>
                      <span className="mt-6 text-[15px] font-bold text-viet">Tìm hiểu thêm →</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dự án nổi bật — có tiến độ gây quỹ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Dự án đang gây quỹ" title={<>Mỗi đóng góp là <span className="text-viet">một câu chuyện</span></>} />
            <Link href="/du-an" className={cx(btn.base, btn.dark, "text-[15px]")}>Tất cả dự án <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="flex w-[85%] shrink-0 snap-start sm:w-auto"><ProjectCard p={p} index={i} className="w-full" /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Câu chuyện nhân vật */}
      <section className="relative isolate overflow-hidden bg-forest-deep py-24 text-white md:py-32">
        <div className="absolute -left-40 top-0 -z-10 size-[520px] animate-aurora rounded-full bg-viet/40 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Photo src={media.story.src} alt={media.story.alt} fill sizes="(max-width:1024px) 90vw, 450px" />
            </div>
            <span className="absolute -bottom-5 -right-3 rounded-2xl bg-sun px-5 py-3 text-[15px] font-extrabold text-ink shadow-xl md:-right-8">Câu chuyện thật</span>
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="size-14 fill-sun text-sun" />
            <blockquote className="mt-6 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-[1.35] tracking-tight">“{story.quote}”</blockquote>
            <p className="mt-8 text-lg font-extrabold text-sun">{story.name}</p>
            <p className="text-base text-white/80">{story.role}</p>
            <Link href="/du-an" className={cx(btn.base, btn.sun, "mt-9 px-7 py-3.5 text-[15px]")}>Viết tiếp những câu chuyện <ArrowRight className="size-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Khoảnh khắc — dải ảnh chạy + hashtag */}
      <section className="overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle center eyebrow="Khoảnh khắc" title={<>Lan tỏa cùng <span className="text-viet">{HASHTAG}</span></>} sub="Chia sẻ khoảnh khắc tình nguyện của bạn kèm hashtag để thắp thêm cảm hứng cho cộng đồng." />
        </div>
        <div className="mt-12 space-y-4">
          {[0, 1].map((row) => (
            <Marquee key={row} reverse={row === 1}>
              {media.moments.slice(row * 4, row * 4 + 4).map((img, k) => (
                <div key={k} className={cx("relative shrink-0 overflow-hidden rounded-[1.75rem]", (k + row) % 2 ? "size-56 md:size-72" : "h-56 w-80 md:h-72 md:w-[26rem]")}>
                  <Photo src={img.src} alt="" fill sizes="420px" />
                </div>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      {/* Tin tức */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Tin tức" title={<>Câu chuyện <span className="text-viet">mới nhất</span></>} />
            <Link href="/tin-tuc" className={cx(btn.base, btn.dark, "text-[15px]")}>Tất cả tin tức <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}><PostCard p={p} index={i} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Đối tác — chỉ hiện khi đã có logo thật */}
      {realPartners.length > 0 && (
        <section className="pb-20">
          <p className="mb-8 text-center text-[13px] font-extrabold uppercase tracking-[0.16em] text-amber-ink">Đối tác đồng hành</p>
          <Marquee>
            {realPartners.map((p) => (
              <div key={p.id} className="grid h-20 min-w-48 place-items-center rounded-2xl bg-white px-8 ring-1 ring-line">
                <PartnerLogo src={p.logo_url!} alt={p.name} />
              </div>
            ))}
          </Marquee>
        </section>
      )}

      {/* CTA lớn trên nền ảnh */}
      <section className="px-5 pb-24">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[3rem] px-6 py-24 text-center text-white md:py-32">
          <Photo src={media.cta.src} alt={media.cta.alt} fill sizes="(max-width:1280px) 100vw, 1280px" className="-z-10" />
          <div className="absolute inset-0 -z-10 bg-forest-deep/70" />
          <h2 className="mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.25rem)] font-extrabold leading-[1.08] tracking-tight">
            Bạn là <span className="text-sun">mảnh ghép</span> tiếp theo?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90 md:text-xl">Tình nguyện, hợp tác hay quyên góp — mọi cách đồng hành đều thắp thêm một ngọn đèn.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/tham-gia?tab=donate" className={cx(btn.base, btn.sun, "px-8 py-4 text-base")}><Heart className="size-5 fill-current" /> Quyên góp</Link>
            <Link href="/tham-gia" className={cx(btn.base, "bg-white/15 px-8 py-4 text-base text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25")}>Làm tình nguyện viên</Link>
          </div>
        </div>
      </section>
    </>
  );
}
