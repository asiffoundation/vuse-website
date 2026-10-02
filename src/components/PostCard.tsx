import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import Art from "./Art";

export const fmtDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/tin-tuc/${p.slug}`} className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lg shadow-forest/5 ring-1 ring-line transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-viet/20">
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.cover_image_url ? (
          <Image src={p.cover_image_url} alt={p.title} fill sizes="(max-width:768px) 100vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <Art seed={p.slug} className="size-full transition-transform duration-700 group-hover:scale-110" />
        )}
        {p.category && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-viet">{p.category}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time className="text-sm font-semibold text-ink-soft">{fmtDate(p.published_at)}</time>
        <h3 className="mt-2 text-xl font-extrabold leading-snug text-ink transition-colors group-hover:text-viet">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{p.excerpt}</p>
        <span className="mt-auto pt-5 text-sm font-bold text-viet">Đọc tiếp →</span>
      </div>
    </Link>
  );
}
