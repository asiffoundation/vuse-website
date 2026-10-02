"use client";

import { motion } from "motion/react";

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "đ";
const short = (n: number) => (n >= 1e9 ? `${+(n / 1e9).toFixed(1)} tỷ` : n >= 1e6 ? `${Math.round(n / 1e6)} triệu` : vnd(n));

// Thanh tiến độ gây quỹ — chạy từ 0 khi xuất hiện trên màn hình.
export default function FundingBar({ goal, raised, dark = false, size = "sm" }: { goal: number; raised: number; dark?: boolean; size?: "sm" | "lg" }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div>
      <div className={`flex items-baseline justify-between gap-3 font-bold ${size === "lg" ? "text-lg" : "text-[15px]"}`}>
        <span className={dark ? "text-white" : "text-ink"}>
          {short(raised)} <span className={`font-semibold ${dark ? "text-white/70" : "text-ink-soft"}`}>/ {short(goal)}</span>
        </span>
        <span className={dark ? "text-sun" : "text-viet"}>{pct}%</span>
      </div>
      <div className={`mt-2 overflow-hidden rounded-full ${size === "lg" ? "h-3" : "h-2"} ${dark ? "bg-white/20" : "bg-mist"}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-leaf via-sun to-[#ffb347]"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
