"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { media } from "@/lib/media";
import { slides } from "@/lib/sample-data";
import Photo from "./Photo";
import { btn, cx } from "./ui";

const DURATION = 7000;

// Banner ảnh tràn màn hình: ảnh zoom chậm (Ken Burns), chữ trồi lên từng từ.
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
  const img = media.hero[i % media.hero.length];
  const words = s.title.split(" ");

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-forest-deep text-white"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Banner Việt Úc"
    >
      <AnimatePresence mode="sync">
        <motion.div key={s.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 -z-10">
          <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }} className="absolute inset-0">
            <Photo src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {/* Lớp phủ tối để chữ luôn đọc rõ trên mọi ảnh */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/90 via-forest-deep/55 to-forest-deep/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-forest-deep/80 to-transparent" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-36 pt-32">
        <AnimatePresence mode="wait">
          <motion.div key={s.key} exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }} className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.16em] ring-1 ring-white/25 backdrop-blur"
            >
              <span className="size-2 animate-pulse rounded-full bg-aura" /> {s.eyebrow}
            </motion.span>
            <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.75rem)] font-extrabold leading-[1.06] tracking-tight">
              {words.map((w, k) => (
                <span key={k} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={cx("inline-block", k >= words.length - 2 && "text-sun")}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 + k * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
              {s.sub}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-9 flex flex-wrap gap-3">
              <Link href="/tham-gia?tab=donate" className={cx(btn.base, btn.sun, "px-8 py-4 text-base")}>
                <Heart className="size-5 fill-current" /> Quyên góp ngay
              </Link>
              <Link href="/du-an" className={cx(btn.base, "bg-white/15 px-8 py-4 text-base text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25")}>
                Xem dự án <ArrowRight className="size-5" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Điều khiển slide */}
      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-7xl items-center justify-between gap-6 px-5">
        <div className="flex flex-1 gap-2" role="tablist" aria-label="Chọn slide">
          {slides.map((sl, k) => (
            <button key={sl.key} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${sl.title}`} onClick={() => go(k)} className="h-8 max-w-24 flex-1">
              <span className="relative mt-3.5 block h-1 overflow-hidden rounded-full bg-white/30">
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
          <span className="hidden text-[15px] font-bold tabular-nums text-white/80 sm:block">
            0{i + 1} <span className="text-white/40">/ 0{slides.length}</span>
          </span>
          <button onClick={() => go(i - 1)} aria-label="Slide trước" className="grid size-11 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur transition hover:bg-white/30"><ChevronLeft className="size-5" /></button>
          <button onClick={() => go(i + 1)} aria-label="Slide sau" className="grid size-11 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur transition hover:bg-white/30"><ChevronRight className="size-5" /></button>
        </div>
      </div>
    </section>
  );
}
