import { ArrowLeft, Heart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FundingBar from "@/components/FundingBar";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import ShareButtons from "@/components/ShareButtons";
import { btn, cx } from "@/components/ui";
import { getProject, getProjects } from "@/lib/data";
import { media, pick } from "@/lib/media";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProject((await params).slug);
  if (!p) return {};
  // Ảnh xem trước khi chia sẻ link lên Facebook/Zalo
  const images = p.cover_image_url ? [{ url: p.cover_image_url }] : undefined;
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary, images }, twitter: { card: "summary_large_image" } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const idx = projects.findIndex((x) => x.slug === slug);
  const p = projects[idx];
  if (!p) notFound();
  const cover = p.cover_image_url ?? pick(media.project, idx).src;
  return (
    <>
      <PageHero eyebrow={p.audience ?? "Dự án"} title={p.title} sub={p.summary} image={{ src: cover, alt: p.title }} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[1fr_340px]">
        <article>
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-xl shadow-forest/15">
            <Photo src={cover} alt={p.title} fill sizes="(max-width:1024px) 100vw, 720px" />
          </div>
          <div className="whitespace-pre-line text-lg leading-relaxed text-ink-soft">{p.body}</div>
          <div className="mt-10 border-t border-line pt-8"><ShareButtons url={`${site.url}/du-an/${p.slug}`} title={p.title} /></div>
          <Link href="/du-an" className={cx(btn.base, btn.dark, "mt-8 text-[15px]")}><ArrowLeft className="size-4" /> Tất cả dự án</Link>
        </article>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-forest/10 ring-1 ring-line">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-amber-ink">{p.status === "completed" ? "Đã hoàn thành" : "Đang gây quỹ"}</p>
            {p.goal_amount ? <div className="mt-4"><FundingBar goal={p.goal_amount} raised={p.raised_amount ?? 0} size="lg" /></div> : null}
            <p className="mt-5 text-base leading-relaxed text-ink-soft">Mỗi đóng góp, dù nhỏ, đều giúp dự án đi xa hơn. Việt Úc gửi biên nhận cho mọi khoản ủng hộ.</p>
            <Link href="/tham-gia?tab=donate" className={cx(btn.base, btn.sun, "mt-6 w-full py-4 text-base")}><Heart className="size-5 fill-current" /> Ủng hộ dự án</Link>
            <Link href="/tham-gia" className={cx(btn.base, "mt-3 w-full bg-mist py-4 text-base text-viet hover:bg-line")}>Tham gia tình nguyện</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
