import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Art from "@/components/Art";
import PageHero from "@/components/PageHero";
import { fmtDate } from "@/components/PostCard";
import { btn, cx } from "@/components/ui";
import { getPost, getPosts } from "@/lib/data";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero eyebrow={`${p.category ?? "Tin tức"} · ${fmtDate(p.published_at)}`} title={p.title} sub={p.excerpt} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="relative -mt-32 mb-12 aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-forest/30">
          {p.cover_image_url ? <Image src={p.cover_image_url} alt={p.title} fill priority sizes="(max-width:768px) 100vw, 768px" className="object-cover" /> : <Art seed={p.slug} className="size-full" />}
        </div>
        <div className="whitespace-pre-line text-lg leading-relaxed text-ink-soft">{p.body}</div>
        <Link href="/tin-tuc" className={cx(btn.base, btn.dark, "mt-12")}><ArrowLeft className="size-4" /> Tất cả tin tức</Link>
      </article>
    </>
  );
}
