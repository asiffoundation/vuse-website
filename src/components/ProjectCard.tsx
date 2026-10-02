import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import Art from "./Art";

export default function ProjectCard({ p, index = 0, className = "" }: { p: Project; index?: number; className?: string }) {
  return (
    <Link
      href={`/du-an/${p.slug}`}
      className={`group relative block overflow-hidden rounded-[2rem] bg-forest text-white shadow-xl shadow-forest/20 transition-transform duration-500 hover:-translate-y-2 ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {p.cover_image_url ? (
          <Image src={p.cover_image_url} alt={p.title} fill sizes="(max-width:768px) 85vw, 420px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <Art seed={p.slug} className="size-full transition-transform duration-700 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />
        <span className="absolute left-5 top-5 text-7xl font-black leading-none text-white/25">{String(index + 1).padStart(2, "0")}</span>
        <span className="glass absolute right-5 top-5 grid size-12 place-items-center rounded-full transition group-hover:rotate-45 group-hover:bg-sun group-hover:text-ink">
          <ArrowUpRight className="size-5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          {p.audience && <span className="mb-3 inline-block rounded-full bg-sun px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink">{p.audience}</span>}
          <h3 className="text-2xl font-extrabold leading-tight">{p.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/75">{p.summary}</p>
        </div>
      </div>
    </Link>
  );
}
