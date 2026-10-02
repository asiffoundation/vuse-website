import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Art from "@/components/Art";
import PageHero from "@/components/PageHero";
import { btn, cx } from "@/components/ui";
import { getProject, getProjects } from "@/lib/data";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero eyebrow={p.audience ?? "Dự án"} title={p.title} sub={p.summary} />
      <article className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <div className="relative -mt-32 mb-12 aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-forest/30">
          {p.cover_image_url ? <Image src={p.cover_image_url} alt={p.title} fill priority sizes="(max-width:896px) 100vw, 896px" className="object-cover" /> : <Art seed={p.slug} className="size-full" />}
        </div>
        <div className="whitespace-pre-line text-lg leading-relaxed text-ink-soft">{p.body}</div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/du-an" className={cx(btn.base, btn.dark)}><ArrowLeft className="size-4" /> Tất cả dự án</Link>
          <Link href="/tham-gia" className={cx(btn.base, btn.green)}>Đồng hành cùng dự án</Link>
        </div>
      </article>
    </>
  );
}
