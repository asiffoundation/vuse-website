import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Facebook } from "@/components/Icon";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Liên hệ" };

const items = [
  { icon: MapPin, label: "Địa chỉ", value: site.address, href: undefined },
  { icon: Phone, label: "Điện thoại", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Globe, label: "Website", value: "www.vu-se.com", href: site.url },
  { icon: Facebook, label: "Fanpage", value: "facebook.com/vu-se.com", href: site.facebook },
];

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Liên hệ" title="Hãy nói chuyện với Việt Úc." sub="Câu hỏi, ý tưởng hợp tác hay chỉ một lời chào — chúng tôi luôn lắng nghe." />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-2">
        <Reveal className="space-y-3">
          {items.map((it) => (
            <div key={it.label} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-mist text-viet"><it.icon className="size-5" /></span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{it.label}</p>
                {it.href ? <a href={it.href} className="break-words font-bold hover:text-viet" target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{it.value}</a> : <p className="font-bold">{it.value}</p>}
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-3xl ring-1 ring-line">
            <iframe title="Bản đồ văn phòng Việt Úc" src={site.mapEmbed} loading="lazy" className="h-72 w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-forest/5 ring-1 ring-line md:p-10">
            <h2 className="mb-6 text-2xl font-extrabold">Gửi lời nhắn</h2>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
