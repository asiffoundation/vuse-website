import type { Metadata } from "next";
import Image from "next/image";
import Clover from "@/components/Clover";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { cloverValues, values } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Về chúng tôi" };

const logoMeaning = [
  { t: "Vòng tròn ánh sáng xanh", d: "Biểu trưng cho hào quang và sự kết nối — sự trọn vẹn, bền vững; gợi nhắc tinh thần đoàn kết, hợp tác và khát vọng lan tỏa giá trị nhân văn." },
  { t: "Màu xanh lá & vàng", d: "Xanh lá là sức sống, khởi đầu mới và phát triển bền vững; vàng là thịnh vượng và may mắn — hai màu gắn liền với nước Úc, khẳng định mối liên kết cộng đồng Việt – Úc." },
  { t: "Nâu & xanh", d: "Tượng trưng cho cây và đất: mọi việc làm bắt nguồn từ gốc rễ, từ tâm. Từ mảnh đất yêu thương, những mầm xanh vươn lên và lan tỏa sự sống." },
  { t: "Chữ V cách điệu", d: "Hình chiếc lá non và cánh chim — khởi đầu, sức sống mới, gắn liền triết lý phát triển xanh, bền vững, thân thiện môi trường." },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="Về chúng tôi" title="Một vòng tròn tương trợ — nơi không ai bị bỏ lại phía sau." sub="Khởi nguồn từ lòng Nhân ái, chúng tôi hành động với sự thấu cảm và tôn trọng, đặt phẩm giá và hạnh phúc của mỗi con người lên hàng đầu." />

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2">
          <SectionTitle eyebrow="Câu chuyện" title={<>Giá trị cuộc đời tạo ra từ <span className="text-gradient-green">chính những điều ta làm được.</span></>} />
          <Reveal delay={0.1} className="space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>Chúng tôi không chỉ nhìn thấy những khó khăn, mà còn nhìn thấy khát vọng và sức mạnh tiềm tàng bên trong mỗi người.</p>
            <p>Việt Úc kiến tạo cơ hội, trao đi những công cụ cần thiết về <b className="text-ink">tri thức, sức khỏe và sinh kế</b> để mỗi người tự tin khai phá tiềm năng và làm chủ tương lai.</p>
            <p>Chúng tôi theo đuổi sự phát triển bền vững từ gốc rễ và cam kết hoạt động với sự liêm chính cao nhất — mọi hoạt động đều minh bạch, xuất phát từ trách nhiệm và tình yêu thương.</p>
          </Reveal>
        </div>
      </section>

      {/* Ý nghĩa logo */}
      <section className="grain relative isolate overflow-hidden bg-forest-deep py-24 text-white md:py-32">
        <div className="absolute -right-24 top-1/3 -z-10 size-[460px] animate-aurora rounded-full bg-aura/20 blur-[110px]" />
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle dark eyebrow="Ý nghĩa logo" title={<>Cỏ bốn lá — <span className="text-gradient">bốn giá trị nhân văn</span></>} sub="Logo là sự kết hợp hài hòa giữa biểu tượng, màu sắc và đường nét, thể hiện trọn vẹn tinh thần của DNXH Việt Úc." />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[360px_1fr]">
            <Reveal className="mx-auto">
              <Image src="/images/vietuc-logo-ring.png" alt="Logo vòng hào quang Việt Úc" width={360} height={360} className="size-72 animate-float md:size-[360px]" />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {cloverValues.map((c, i) => (
                <Reveal key={c.en} delay={i * 0.08}>
                  <div className="glass h-full rounded-3xl p-6">
                    <Clover className="size-9 text-sun" />
                    <p className="mt-3 text-[13px] font-bold uppercase tracking-[0.16em] text-aura">{c.en}</p>
                    <h3 className="text-2xl font-extrabold">{c.vi}</h3>
                    <p className="mt-2 text-sm text-white/70">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {logoMeaning.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.06}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h4 className="text-lg font-extrabold text-sun">{m.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
          <Reveal><div className="h-full rounded-[2.5rem] bg-forest p-10 text-white"><p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-sun">Tầm nhìn</p><p className="mt-4 text-2xl font-bold leading-snug">Vì một xã hội nơi không ai bị bỏ lại phía sau, nơi mọi tiềm năng được khai phá và mọi trái tim được sưởi ấm bằng tình yêu thương.</p></div></Reveal>
          <Reveal delay={0.1}><div className="h-full rounded-[2.5rem] bg-sun p-10"><p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-amber-ink">Sứ mệnh</p><p className="mt-4 text-2xl font-bold leading-snug">Kết nối cộng đồng, chia sẻ yêu thương, chung tay xây dựng một cộng đồng nhân ái, bền vững, nơi mỗi con người có cơ hội tỏa sáng và sống hạnh phúc.</p></div></Reveal>
        </div>
      </section>

      <section className="bg-mist pb-24 pt-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Giá trị cốt lõi" title={<>Năm giá trị <span className="text-gradient-green">của Việt Úc</span></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.en} delay={i * 0.06}>
                <div className="group h-full rounded-[2rem] bg-white p-7 shadow-lg shadow-forest/5 ring-1 ring-line transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-viet/15">
                  <span className="text-6xl font-black text-viet/15 transition group-hover:text-sun">0{i + 1}</span>
                  <p className="mt-2 text-[13px] font-extrabold uppercase tracking-[0.16em] text-amber-ink">{v.en}</p>
                  <h3 className="text-2xl font-extrabold">{v.vi}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
