"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { Facebook } from "./Icon";

// Nút chia sẻ: Facebook, Zalo, sao chép link, chia sẻ gốc của điện thoại.
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent(url);
  const item = "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[15px] font-bold text-ink ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[15px] font-bold text-ink-soft">Lan tỏa:</span>
      <a className={item} href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`} target="_blank" rel="noreferrer"><Facebook className="size-4 text-[#1877f2]" /> Facebook</a>
      <a className={item} href={`https://sp.zalo.me/share_inline?d=${encodeURIComponent(JSON.stringify({ url }))}`} target="_blank" rel="noreferrer"><span className="grid size-4 place-items-center rounded bg-[#0068ff] text-[9px] font-black text-white">Z</span> Zalo</a>
      <button
        type="button"
        className={item}
        onClick={async () => {
          try {
            if (navigator.share) return await navigator.share({ title, url });
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4 text-viet" /> : <Share2 className="size-4" />}
        {copied ? "Đã chép link" : "Chia sẻ"}
      </button>
    </div>
  );
}
