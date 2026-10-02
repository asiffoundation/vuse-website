"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook } from "./Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { legalNav, nav, site } from "@/lib/site";

export default function Footer() {
  if (usePathname().startsWith("/admin")) return null;
  return (
    <footer className="grain relative isolate overflow-hidden bg-forest-deep pt-20 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center text-[22vw] font-black leading-none tracking-tighter outline-text">
        VIỆT ÚC
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-36 md:grid-cols-[1.4fr_1fr_1.2fr] md:pb-[22vw]">
        <div>
          <Image src="/images/vietuc-logo-white.png" alt="Việt Úc Social Enterprise" width={120} height={117} className="mb-5 h-24 w-auto" />
          <p className="max-w-sm text-lg font-semibold leading-snug">
            <span className="text-gradient">{site.tagline}</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-white/60">Một vòng tròn tương trợ — nơi không ai bị bỏ lại phía sau.</p>
        </div>
        <nav aria-label="Liên kết nhanh">
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-sun">Khám phá</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] md:grid-cols-1">
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
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-sun">Liên hệ</h3>
          <ul className="space-y-3 text-[15px] text-white/80">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-aura" />{site.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-aura" /><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-aura" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-3"><Facebook className="mt-0.5 size-4 shrink-0 text-aura" /><a href={site.facebook} target="_blank" rel="noreferrer">Fanpage Việt Úc</a></li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 bg-forest-deep/85 py-5 text-[13px] text-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} {site.name}. Mọi quyền được bảo lưu.</p>
            <p>{site.legal.entity} · MST: {site.legal.taxCode} · {site.legal.issued}</p>
          </div>
          <ul className="flex gap-5">
            {legalNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
