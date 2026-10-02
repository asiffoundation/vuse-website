import type { ReactNode } from "react";

// Băng chữ chạy vô tận. Nội dung được nhân đôi để lặp liền mạch.
export default function Marquee({ children, className = "", reverse = false }: { children: ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={`flex overflow-hidden ${className}`} aria-hidden>
      {[0, 1].map((i) => (
        <div key={i} className="flex shrink-0 animate-marquee items-center gap-10 pr-10" style={reverse ? { animationDirection: "reverse" } : undefined}>
          {children}
        </div>
      ))}
    </div>
  );
}
