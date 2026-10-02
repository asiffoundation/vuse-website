import Clover from "./Clover";

export default function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-gradient-to-br from-forest-deep via-forest to-viet-dam pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <div className="absolute -left-20 top-0 -z-10 size-[420px] animate-aurora rounded-full bg-aura/30 blur-[100px]" />
      <div className="absolute -right-10 bottom-0 -z-10 size-[360px] animate-aurora rounded-full bg-sun/25 blur-[100px] [animation-delay:-9s]" />
      <Clover className="absolute -right-24 -top-24 -z-10 size-[420px] animate-spin-slow text-white/[0.06]" />
      <div className="dots absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto max-w-7xl px-5">
        <span className="glass inline-flex rounded-full px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.16em] text-sun">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold leading-[1.08] tracking-tight">{title}</h1>
        {sub && <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">{sub}</p>}
      </div>
    </section>
  );
}
