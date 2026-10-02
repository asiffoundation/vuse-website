import type { Media } from "@/lib/media";
import Photo from "./Photo";

// Đầu trang con: ảnh nền tràn + lớp phủ tối, chữ lớn.
export default function PageHero({ eyebrow, title, sub, image }: { eyebrow: string; title: string; sub?: string; image?: Media }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep pb-20 pt-36 text-white md:pb-28 md:pt-48">
      {image && <Photo src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-10" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/95 via-forest-deep/70 to-forest-deep/30" />
      <div className="mx-auto max-w-7xl px-5">
        <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.16em] text-sun ring-1 ring-white/20 backdrop-blur">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight">{title}</h1>
        {sub && <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">{sub}</p>}
      </div>
    </section>
  );
}
