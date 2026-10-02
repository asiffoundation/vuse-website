import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { media } from "@/lib/media";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = { title: "Tin tức" };
export const revalidate = 300;

export default async function News() {
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="Tin tức" title="Câu chuyện từ vòng tròn tương trợ." sub="Cập nhật hoạt động, dự án và những khoảnh khắc đáng nhớ của Việt Úc." image={media.page.news} />
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        {posts.length === 0 ? (
          <p className="text-center text-ink-soft">Chưa có bài viết nào.</p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (<Reveal key={p.id} delay={(i % 3) * 0.08}><PostCard p={p} index={i} /></Reveal>))}
          </div>
        )}
      </section>
    </>
  );
}
