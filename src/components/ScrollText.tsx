"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// Đoạn văn "sáng dần" từng chữ theo thanh cuộn (hiệu ứng scroll-reveal).
export default function ScrollText({ text, highlight = [], className = "" }: { text: string; highlight?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} hl={highlight.some((h) => w.toLowerCase().includes(h))}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, hl }: { children: string; progress: MotionValue<number>; range: [number, number]; hl: boolean }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={hl ? "text-viet" : undefined}>{children}</motion.span>
    </span>
  );
}
