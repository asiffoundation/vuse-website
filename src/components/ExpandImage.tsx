"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import Photo from "./Photo";

// Ảnh "mở rộng" từ khung bo góc ra tràn màn hình khi cuộn, chữ hiện dần ở giữa.
export default function ExpandImage({ src, alt, children }: { src: string; alt: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 1], [40, 0]);
  return (
    <div ref={ref} className="relative h-[85svh] min-h-[520px] overflow-hidden">
      <motion.div style={{ clipPath }} className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Photo src={src} alt={alt} fill sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/35 to-forest-deep/20" />
      </motion.div>
      <motion.div style={{ opacity: textOpacity, y: textY }} className="relative flex h-full items-center justify-center px-5 text-center text-white">
        {children}
      </motion.div>
    </div>
  );
}
