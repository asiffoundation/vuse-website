"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { slides } from "@/lib/sample-data";
import Clover from "./Clover";
import { btn, cx } from "./ui";

const DURATION = 6000;

// Mỗi slide một "cảnh" màu + hoạ tiết riêng (chưa có ảnh thật nên dùng hình khối).
const scene: Record<string, { bg: string; blob1: string; blob2: string }> = {
  viet: { bg: "from-forest-deep via-forest to-viet-dam", blob1: "bg-aura/50", blob2: "bg-sun/40" },
  sun: { bg: "from-[#3a2a00] via-amber to-[#e6a800]", blob1: "bg-sun/60", blob2: "bg-aura/30" },
  amber: { bg: "from-forest-deep via-[#5b3505] to-amber", blob1: "bg-sun/40", blob2: "bg-amber/60" },
  leaf: { bg: "from-forest-deep via-viet to-leaf", blob1: "bg-aura/60", blob2: "bg-sun/30" },
  forest: { bg: "from-[#041a11] via-forest to-[#145c3a]", blob1: "bg-leaf/50", blob2: "bg-amber/40" },
};

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  const s = slides[i];
  const sc = scene[s.tone];
  const words = s.title.split(" ");

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden text-white"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Banner Việt Úc"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={s.key}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={cx("absolute inset-0 -z-10 bg-gradient-to-br", sc.bg)}
        >
          <div className={cx("absolute -left-[10%] top-[10%] size-[55vw] max-w-[760px] animate-aurora rounded-full blur-[110px]", sc.blob1)} />
          <div className={cx("absolute -right-[8%] bottom-[0%] size-[48vw] max-w-[640px] animate-aurora rounded-full blur-[110px] [animation-delay:-8s]", sc.blob2)} />
        </motion.div>
      </AnimatePresence>
      <div className="dots absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="grain absolute inset-0 -z-10" />

      {/* Cỏ 4 lá khổng lồ xoay chậm */}
      <motion.div
        key={`c-${s.key}`}
        initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-[12vw] top-1/2 -z-10 hidden size-[56vw] max-w-[820px] -translate-y-1/2 md:block"
      >
        <Clover className="size-full animate-spin-slow text-white/[0.07]" />
        <Clover stroke strokeWidth={0.4} className="absolute inset-[8%] size-[84%] animate-spin-slow text-sun/50 [animation-direction:reverse]" />
      </motion.div>

      {/* Trái tim nổi */}
      {[
        { l: "8%", t: "22%", d: 0, s: 28 },
        { l: "46%", t: "14%", d: 1.5, s: 18 },
        { l: "70%", t: "70%", d: 3, s: 34 },
        { l: "24%", t: "78%", d: 4.5, s: 22 },
      ].map((h, k) => (
        <span key={k} aria-hidden className="absolute animate-float text-sun/60" style={{ left: h.l, top: h.t, animationDelay: `${h.d}s`, fontSize: h.s }}>
          ♥
        </span>
      ))}

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-32 pt-32">
        <AnimatePresence mode="wait">
          <motion.div key={s.key} exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }} className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.16em]"
            >
              <span className="size-2 animate-pulse rounded-full bg-aura" /> {s.eyebrow}
            </motion.span>
            <h1 className="mt-6 text-[clamp(2.6rem,8vw,6.5rem)] font-extrabold leading-[1.06] tracking-tight">
              {words.map((w, k) => (
                <span key={k} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={cx("inline-block", k >= words.length - 2 && "text-gradient")}
                    initial={{ y: "110%", rotate: 6 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ delay: 0.3 + k * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
              {s.sub}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-9 flex flex-wrap gap-3">
              <Link href="/tham-gia" className={cx(btn.base, btn.sun, "px-8 py-4 text-base")}>
                Cùng đồng hành <ArrowRight className="size-5" />
              </Link>
              <Link href="/du-an" className={cx(btn.base, btn.ghost, "px-8 py-4 text-base")}>
                Xem dự án
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Điều khiển slide */}
      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-7xl items-center justify-between gap-6 px-5">
        <div className="flex flex-1 gap-2" role="tablist" aria-label="Chọn slide">
          {slides.map((sl, k) => (
            <button key={sl.key} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${sl.title}`} onClick={() => go(k)} className="group h-8 max-w-24 flex-1">
              <span className="relative mt-3.5 block h-1 overflow-hidden rounded-full bg-white/25">
                {k < i && <span className="absolute inset-0 bg-white" />}
                {k === i && (
                  <motion.span
                    key={`${i}-${paused}`}
                    className="absolute inset-0 origin-left bg-sun"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0.001 : 1 }}
                    transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-bold tabular-nums text-white/70 sm:block">
            0{i + 1} <span className="text-white/30">/ 0{slides.length}</span>
          </span>
          <button onClick={() => go(i - 1)} aria-label="Slide trước" className="glass grid size-11 place-items-center rounded-full transition hover:bg-white/20"><ChevronLeft className="size-5" /></button>
          <button onClick={() => go(i + 1)} aria-label="Slide sau" className="glass grid size-11 place-items-center rounded-full transition hover:bg-white/20"><ChevronRight className="size-5" /></button>
        </div>
      </div>
    </section>
  );
}
