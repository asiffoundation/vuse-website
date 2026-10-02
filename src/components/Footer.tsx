"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook } from "./Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Footer() {
  if (usePathname().startsWith("/admin")) return null;
  return (
    <footer className="grain relative isolate overflow-hidden bg-forest-deep pt-20 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center text-[22vw] font-black leading-none tracking-tighter outline-text">
        VIỆT ÚC
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-40 md:grid-cols-[1.4fr_1fr_1.2fr] md:pb-56">
        <div>
          <Image src="/images/vietuc-logo-white.png" alt="Việt Úc Social Enterprise" width={120} height={117} className="mb-5 h-24 w-auto" />
          <p className="max-w-sm text-lg font-semibold leading-snug">
            <span className="text-gradient">{site.tagline}</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-white/60">Một vòng tròn tương trợ — nơi không ai bị bỏ lại phía sau.</p>
        </div>
        <nav aria-label="Liên kết nhanh">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sun">Khám phá</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/70 transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sun">Liên hệ</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-aura" />{site.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-aura" /><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-aura" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-3"><Facebook className="mt-0.5 size-4 shrink-0 text-aura" /><a href={site.facebook} target="_blank" rel="noreferrer">Fanpage Việt Úc</a></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
