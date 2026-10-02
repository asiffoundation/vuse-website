import Link from "next/link";
import type { Post } from "@/lib/types";
import { media, pick } from "@/lib/media";
import Photo from "./Photo";

export const fmtDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function PostCard({ p, index = 0 }: { p: Post; index?: number }) {
  return (
    <Link href={`/tin-tuc/${p.slug}`} className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lg shadow-forest/5 ring-1 ring-line transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-viet/20">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo src={p.cover_image_url ?? pick(media.post, index).src} alt={p.title} fill sizes="(max-width:768px) 100vw, 400px" className="transition-transform duration-700 group-hover:scale-110" />
        {p.category && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-viet">{p.category}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time className="text-sm font-semibold text-ink-soft">{fmtDate(p.published_at)}</time>
        <h3 className="mt-2 text-xl font-extrabold leading-snug text-ink transition-colors group-hover:text-viet">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-ink-soft">{p.excerpt}</p>
        <span className="mt-auto pt-5 text-[15px] font-bold text-viet">Đọc tiếp →</span>
      </div>
    </Link>
  );
}
