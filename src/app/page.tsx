import { ArrowRight, Eye, Heart, Rocket } from "lucide-react";
import Link from "next/link";
import Art from "@/components/Art";
import Clover from "@/components/Clover";
import Counter from "@/components/Counter";
import HeroSlider from "@/components/HeroSlider";
import Icon from "@/components/Icon";
import Marquee from "@/components/Marquee";
import PartnerLogo from "@/components/PartnerLogo";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import TiltCard from "@/components/TiltCard";
import { btn, cx } from "@/components/ui";
import { getPartners, getPosts, getPrograms, getProjects } from "@/lib/data";
import { stats, values } from "@/lib/sample-data";

export const revalidate = 300;

const audiences = [
  { t: "Trẻ em, học sinh, sinh viên", d: "Tri thức, học bổng & kỹ năng", emoji: "🎒", tone: "from-sun to-[#ffb347] text-ink" },
  { t: "Người cao tuổi", d: "Chăm sóc đời sống & tinh thần", emoji: "🌻", tone: "from-amber to-[#d98b1f] text-white" },
  { t: "Người khuyết tật", d: "Hòa nhập & tự lập", emoji: "🤝", tone: "from-leaf to-viet text-white" },
  { t: "Người có hoàn cảnh khó khăn", d: "Sinh kế & cơ hội mới", emoji: "🌱", tone: "from-viet to-forest text-white" },
];

const bento = ["md:col-span-3 md:row-span-2", "md:col-span-3", "md:col-span-3", "md:col-span-6"];
const progTone: Record<string, string> = {
  sun: "from-sun to-[#ffb347] text-ink",
  rose: "from-[#ff8aa1] to-[#e0527a] text-white",
  leaf: "from-leaf to-viet text-white",
  amber: "from-amber to-[#7a4505] text-white",
};

export default async function Home() {
  const [programs, projects, posts, partners] = await Promise.all([getPrograms(), getProjects(), getPosts(), getPartners()]);

  return (
    <>
      <HeroSlider />

      {/* Băng chữ giá trị */}
      <div className="relative -mt-px overflow-hidden bg-sun py-5 text-forest-deep">
        <Marquee>
          {["Nhân ái", "Trao quyền", "Bền vững", "Kết nối", "Liêm chính"].map((v) => (
            <span key={v} className="flex items-center gap-10 text-3xl font-black uppercase tracking-tight md:text-5xl">
              {v} <Clover className="size-8 text-forest-deep md:size-11" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Giới thiệu */}
      <section className="dots-dark relative overflow-hidden py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionTitle
              eyebrow="Giới thiệu doanh nghiệp xã hội Việt Úc"
              title={<>Cuộc sống được tạo nên từ <span className="text-gradient-green">những điều giản dị.</span></>}
            />
            <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>Tại Việt Úc, chúng tôi tin rằng mỗi cá nhân đều là một mảnh ghép quan trọng, ẩn chứa những tiềm năng vô hạn và xứng đáng có một cuộc sống trọn vẹn, hạnh phúc.</p>
              <p>Việt Úc không chỉ là một tổ chức, mà là một <b className="text-ink">vòng tròn tương trợ</b> — nơi sức mạnh được tạo nên từ sự chung tay.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <Link href="/ve-chung-toi" className={cx(btn.base, btn.green, "px-7 py-3.5")}>Câu chuyện của chúng tôi <ArrowRight className="size-4" /></Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative">
            <TiltCard className="relative">
              <Art tone="viet" className="aspect-square rounded-[3rem] shadow-2xl shadow-viet/30">
                <div className="absolute inset-0 grid place-items-center">
                  <Clover className="size-[62%] animate-float text-sun drop-shadow-[0_20px_40px_rgba(0,0,0,.35)]" />
                </div>
              </Art>
              <div className="glass absolute -bottom-6 -left-4 rounded-2xl bg-forest-deep/80 p-5 text-white shadow-xl md:-left-10">
                <p className="text-4xl font-black text-sun"><Counter to={100} suffix="%" /></p>
                <p className="text-xs font-semibold text-white/70">Minh bạch & liêm chính</p>
              </div>
              <div className="absolute -right-3 -top-5 rounded-2xl bg-white p-4 shadow-xl md:-right-8">
                <p className="text-3xl font-black text-viet"><Counter to={4} /></p>
                <p className="text-xs font-semibold text-ink-soft">Nhóm đối tượng</p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* 4 nhóm đối tượng */}
      <section className="bg-mist py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle center eyebrow="4 chiếc lá — 4 trái tim" title={<>Chúng tôi đồng hành cùng <span className="text-gradient-green">bốn nhóm đối tượng</span></>} sub="Bốn chiếc lá trong hình trái tim của logo tượng trưng cho những mảnh đời mà Việt Úc luôn hướng đến." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className={cx("group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br p-7 shadow-xl", a.tone)}>
                    <Clover className="absolute -right-8 -top-8 size-40 text-white/15 transition-transform duration-700 group-hover:rotate-90 group-hover:scale-125" />
                    <span className="text-6xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">{a.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-extrabold leading-tight">{a.t}</h3>
                      <p className="mt-1 text-sm opacity-80">{a.d}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lĩnh vực — bento */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Lĩnh vực hoạt động" title={<>Bốn trụ cột <span className="text-gradient-green">tạo thay đổi thật</span></>} />
            <Link href="/linh-vuc" className={cx(btn.base, btn.dark)}>Tất cả lĩnh vực <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-6 md:auto-rows-[minmax(190px,auto)]">
            {programs.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.07} className={bento[i] ?? "md:col-span-3"}>
                <Link href={`/linh-vuc#${g.slug}`} className={cx("group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br p-7 shadow-lg transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl", progTone[g.color] ?? progTone.leaf)}>
                  <Clover className="absolute -bottom-12 -right-12 size-56 text-white/15 transition-transform duration-700 group-hover:rotate-45" />
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/25 backdrop-blur"><Icon name={g.icon} className="size-7" /></span>
                  <div className="relative">
                    <h3 className="text-2xl font-extrabold md:text-3xl">{g.title}</h3>
                    <ul className="mt-3 space-y-1 text-sm opacity-85">
                      {g.items.slice(0, 2).map((t) => <li key={t}>• {t}</li>)}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dự án — cuộn ngang */}
      <section className="grain relative isolate overflow-hidden bg-forest-deep py-24 text-white md:py-32">
        <div className="absolute -left-20 top-10 -z-10 size-96 animate-aurora rounded-full bg-aura/20 blur-[110px]" />
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle dark eyebrow="Các dự án" title={<>Mỗi dự án là một <span className="text-gradient">câu chuyện</span></>} />
            <Link href="/du-an" className={cx(btn.base, btn.sun)}>Xem tất cả <ArrowRight className="size-4" /></Link>
          </div>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] [&::-webkit-scrollbar]:hidden">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} className="w-[82vw] shrink-0 snap-start sm:w-[400px]" />
          ))}
        </div>
      </section>

      {/* Tầm nhìn / sứ mệnh */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
          {[
            { icon: Eye, t: "Tầm nhìn", d: "Vì một xã hội nơi không ai bị bỏ lại phía sau, nơi mọi tiềm năng được khai phá và mọi trái tim được sưởi ấm bằng tình yêu thương.", tone: "bg-forest text-white" },
            { icon: Rocket, t: "Sứ mệnh", d: "Kết nối cộng đồng, chia sẻ yêu thương, chung tay xây dựng một cộng đồng nhân ái, bền vững, nơi mỗi con người có cơ hội tỏa sáng và sống hạnh phúc.", tone: "bg-sun text-ink" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div className={cx("relative h-full overflow-hidden rounded-[2.5rem] p-9 md:p-12", c.tone)}>
                <Clover className="absolute -right-10 -top-10 size-52 animate-spin-slow opacity-10" />
                <c.icon className="size-10" />
                <h3 className="mt-6 text-4xl font-black tracking-tight">{c.t}</h3>
                <p className="mt-4 text-lg leading-relaxed opacity-85">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Giá trị cốt lõi — accordion ngang */}
      <section className="bg-mist py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Giá trị cốt lõi" title={<>Năm giá trị <span className="text-gradient-green">dẫn lối mọi hành động</span></>} />
          <div className="mt-12 flex flex-col gap-3 md:h-[420px] md:flex-row">
            {values.map((v, i) => (
              <div key={v.en} tabIndex={0} className="group relative flex-1 overflow-hidden rounded-[2rem] bg-forest p-6 text-white outline-none transition-all duration-700 hover:flex-[3] focus-visible:flex-[3] md:min-w-0" style={{ background: ["#0b7b48", "#0a3d27", "#b86d09", "#08603a", "#062218"][i] }}>
                <Clover className="absolute -bottom-10 -right-10 size-52 text-white/10 transition-transform duration-700 group-hover:rotate-90" />
                <span className="text-5xl font-black text-white/20 md:text-7xl">0{i + 1}</span>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-sun">{v.en}</p>
                  <h3 className="mt-1 text-3xl font-extrabold">{v.vi}</h3>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100 max-md:max-h-40 max-md:opacity-100">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chỉ số */}
      <section className="bg-viet py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="text-5xl font-black text-sun md:text-6xl"><Counter to={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm font-semibold text-white/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Đối tác */}
      <section className="py-20">
        <p className="mb-8 text-center text-xs font-extrabold uppercase tracking-[0.28em] text-amber-ink">Đối tác đồng hành</p>
        <Marquee>
          {partners.map((p) => (
            <div key={p.id} className="grid h-20 min-w-48 place-items-center rounded-2xl bg-white px-8 text-lg font-extrabold text-ink-soft shadow-sm ring-1 ring-line">
              {p.logo_url ? <PartnerLogo src={p.logo_url} alt={p.name} /> : p.name}
            </div>
          ))}
        </Marquee>
      </section>

      {/* Tin tức */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Tin tức" title={<>Câu chuyện <span className="text-gradient-green">mới nhất</span></>} />
            <Link href="/tin-tuc" className={cx(btn.base, btn.dark)}>Tất cả tin tức <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}><PostCard p={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA lớn */}
      <section className="px-5 pb-24">
        <div className="grain relative isolate mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-gradient-to-br from-viet via-forest to-forest-deep px-6 py-20 text-center text-white md:py-28">
          <div className="absolute left-1/2 top-0 -z-10 size-[600px] -translate-x-1/2 animate-aurora rounded-full bg-sun/25 blur-[120px]" />
          <Clover className="absolute -left-16 -top-16 -z-10 size-72 animate-spin-slow text-white/10" />
          <Clover className="absolute -bottom-20 -right-16 -z-10 size-80 animate-spin-slow text-white/10 [animation-direction:reverse]" />
          <Heart className="mx-auto size-12 animate-float fill-sun text-sun" />
          <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Bạn là <span className="text-gradient">mảnh ghép</span> tiếp theo?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">Tình nguyện, hợp tác hay quyên góp — mọi cách đồng hành đều thắp thêm một ngọn đèn.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/tham-gia?tab=donate" className={cx(btn.base, btn.sun, "px-8 py-4 text-base")}><Heart className="size-5 fill-current" /> Quyên góp</Link>
            <Link href="/tham-gia" className={cx(btn.base, btn.ghost, "px-8 py-4 text-base")}>Làm tình nguyện viên</Link>
          </div>
        </div>
      </section>
    </>
  );
}
