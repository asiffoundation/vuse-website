import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { fmtDate } from "@/components/PostCard";
import ShareButtons from "@/components/ShareButtons";
import { btn, cx } from "@/components/ui";
import { getPost, getPosts } from "@/lib/data";
import { media, pick } from "@/lib/media";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return {};
  const images = p.cover_image_url ? [{ url: p.cover_image_url }] : undefined;
  return { title: p.title, description: p.excerpt, openGraph: { type: "article", title: p.title, description: p.excerpt, images }, twitter: { card: "summary_large_image" } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getPosts();
  const idx = posts.findIndex((x) => x.slug === slug);
  const p = posts[idx];
  if (!p) notFound();
  const cover = p.cover_image_url ?? pick(media.post, idx).src;
  return (
    <>
      <PageHero eyebrow={`${p.category ?? "Tin tức"} · ${fmtDate(p.published_at)}`} title={p.title} sub={p.excerpt} image={{ src: cover, alt: p.title }} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-xl shadow-forest/15">
          <Photo src={cover} alt={p.title} fill sizes="(max-width:768px) 100vw, 768px" />
        </div>
        <div className="whitespace-pre-line text-lg leading-relaxed text-ink-soft">{p.body}</div>
        <div className="mt-10 border-t border-line pt-8"><ShareButtons url={`${site.url}/tin-tuc/${p.slug}`} title={p.title} /></div>
        <Link href="/tin-tuc" className={cx(btn.base, btn.dark, "mt-8 text-[15px]")}><ArrowLeft className="size-4" /> Tất cả tin tức</Link>
      </article>
    </>
  );
}
