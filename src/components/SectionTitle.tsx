import Reveal from "./Reveal";

export default function SectionTitle({
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className={`text-xs font-extrabold uppercase tracking-[0.28em] ${dark ? "text-sun" : "text-amber-ink"}`}>{eyebrow}</span>
      <h2 className={`mt-3 text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-ink-soft"}`}>{sub}</p>}
    </Reveal>
  );
}
