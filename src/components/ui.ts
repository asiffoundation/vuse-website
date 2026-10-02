export const btn = {
  base: "btn-shine inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
  sun: "bg-sun text-ink shadow-[0_10px_30px_-8px_rgba(255,212,22,.7)] hover:shadow-[0_16px_40px_-8px_rgba(255,212,22,.9)]",
  green: "bg-viet text-white shadow-[0_10px_30px_-10px_rgba(11,123,72,.8)] hover:bg-viet-dam",
  ghost: "border border-white/30 text-white hover:bg-white/10",
  dark: "bg-forest text-white hover:bg-forest-deep",
};
export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
