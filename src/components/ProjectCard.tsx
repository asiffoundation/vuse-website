import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { media, pick } from "@/lib/media";
import type { Project } from "@/lib/types";
import FundingBar from "./FundingBar";
import Photo from "./Photo";

export default function ProjectCard({ p, index = 0, className = "" }: { p: Project; index?: number; className?: string }) {
  const img = p.cover_image_url ?? pick(media.project, index).src;
  return (
    <Link
      href={`/du-an/${p.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-forest/5 ring-1 ring-line transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-viet/20 ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo src={img} alt={p.title} fill sizes="(max-width:768px) 90vw, 420px" className="transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" />
        {p.audience && <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-viet">{p.audience}</span>}
        <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur transition group-hover:rotate-45 group-hover:bg-sun group-hover:text-ink">
          <ArrowUpRight className="size-5" />
        </span>
        {p.status === "completed" && <span className="absolute bottom-4 left-4 rounded-full bg-viet px-3 py-1 text-xs font-bold text-white">Đã hoàn thành</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-snug text-ink transition-colors group-hover:text-viet md:text-2xl">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-ink-soft">{p.summary}</p>
        {p.goal_amount ? (
          <div className="mt-auto pt-6"><FundingBar goal={p.goal_amount} raised={p.raised_amount ?? 0} /></div>
        ) : (
          <span className="mt-auto pt-5 text-[15px] font-bold text-viet">Xem dự án →</span>
        )}
      </div>
    </Link>
  );
}
