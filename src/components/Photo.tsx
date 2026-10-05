"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// next/image dùng chung. Ảnh SVG (ảnh tạm) không qua tối ưu; ảnh từ xa lỗi thì tự chuyển sang `fallback`.
export default function Photo({ src, fallback, alt, className = "", ...rest }: Omit<ImageProps, "src"> & { src: string; fallback?: string }) {
  const [failed, setFailed] = useState(false);
  const fb = fallback;
  const s = failed && fb ? fb : src;
  return <Image src={s} alt={alt} unoptimized={s.endsWith(".svg")} onError={() => setFailed(true)} className={`object-cover ${className}`} {...rest} />;
}
