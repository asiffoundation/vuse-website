import Clover from "./Clover";

export type Tone = "viet" | "sun" | "amber" | "leaf" | "forest" | "rose";

export const toneBg: Record<Tone, string> = {
  viet: "from-viet via-viet-dam to-forest",
  sun: "from-sun via-[#ffb347] to-amber",
  amber: "from-amber via-[#d98b1f] to-forest",
  leaf: "from-leaf via-viet to-forest",
  forest: "from-forest via-viet-dam to-forest-deep",
  rose: "from-[#ff8aa1] via-[#e0527a] to-amber",
};

const order: Tone[] = ["viet", "sun", "leaf", "amber", "rose", "forest"];
export const toneFor = (seed: string): Tone => order[[...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % order.length];

// Ảnh bìa tạo bằng gradient + hoạ tiết cỏ 4 lá khi chưa có ảnh thật.
export default function Art({
  tone,
  seed = "",
  className = "",
  children,
}: {
  tone?: Tone;
  seed?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const t = tone ?? toneFor(seed);
  return (
    <div className={`relative isolate overflow-hidden bg-gradient-to-br ${toneBg[t]} ${className}`}>
      <div className="dots absolute inset-0 opacity-60" />
      <Clover className="absolute -right-10 -top-10 size-[70%] animate-spin-slow text-white/15" />
      <Clover stroke className="absolute -bottom-16 -left-10 size-[60%] text-white/25" />
      <div className="absolute left-[12%] top-[58%] size-24 rounded-full bg-white/20 blur-2xl" />
      {children}
    </div>
  );
}
