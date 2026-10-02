"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { btn, cx } from "./ui";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid || open ? "bg-forest-deep/95 shadow-lg shadow-black/20 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:h-20">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label="Việt Úc — Trang chủ">
            <Image src="/images/vietuc-clover.png" alt="" width={44} height={43} className="size-10 md:size-11" priority />
            <span className="leading-none text-white">
              <span className="block text-lg font-extrabold tracking-tight">VIỆT ÚC</span>
              <span className="block text-[10px] font-semibold tracking-[0.28em] text-sun">SOCIAL ENTERPRISE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu chính">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cx(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive(n.href) ? "text-forest-deep" : "text-white/80 hover:text-white",
                )}
              >
                {isActive(n.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-sun" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/tham-gia?tab=donate" className={cx(btn.base, btn.sun, "px-5 py-2.5 max-sm:hidden")}>
              <Heart className="size-4 fill-current" /> Quyên góp
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-white/25 text-white lg:hidden"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-gradient-to-r from-aura via-sun to-amber" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-forest-deep px-8 pt-20 lg:hidden"
          >
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={cx("block py-2 text-4xl font-extrabold tracking-tight", isActive(n.href) ? "text-gradient" : "text-white")}
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link href="/tham-gia?tab=donate" onClick={() => setOpen(false)} className={cx(btn.base, btn.sun, "mt-8 w-full py-4 text-base")}>
              <Heart className="size-5 fill-current" /> Quyên góp ngay
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
