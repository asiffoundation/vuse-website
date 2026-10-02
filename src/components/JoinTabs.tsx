"use client";

import { AnimatePresence, motion } from "motion/react";
import { Building2, Copy, HeartHandshake, Sparkles } from "lucide-react";
import { useActionState, useState } from "react";
import { sendDonation, sendPartnership, sendVolunteer } from "@/lib/actions";
import { site } from "@/lib/site";
import { Field, FormShell } from "./FormBits";
import { cx } from "./ui";

export type Tab = "volunteer" | "partner" | "donate";

const tabs = [
  { id: "volunteer" as const, icon: Sparkles, title: "Tình nguyện viên", sub: "Dành thời gian & kỹ năng", color: "from-leaf to-viet" },
  { id: "partner" as const, icon: Building2, title: "Hợp tác dự án", sub: "Doanh nghiệp & tổ chức", color: "from-amber to-[#d98b1f]" },
  { id: "donate" as const, icon: HeartHandshake, title: "Quyên góp", sub: "Chung tay bằng tài chính", color: "from-sun to-[#ffb347]" },
];

const presets = [100000, 200000, 500000, 1000000];

function Volunteer() {
  const [state, action, pending] = useActionState(sendVolunteer, null);
  return (
    <FormShell action={action} pending={pending} state={state} submitLabel="Đăng ký làm tình nguyện viên">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Họ tên" name="full_name" required />
        <Field label="Số điện thoại" name="phone" type="tel" inputMode="tel" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Khu vực / Thành phố" name="city" placeholder="TP. Hồ Chí Minh" />
      </div>
      <Field label="Kỹ năng bạn có thể đóng góp" name="skills" placeholder="Dạy học, y tế, thiết kế, truyền thông…" />
      <Field label="Thời gian có thể tham gia" name="availability" placeholder="Cuối tuần, 4 giờ/tháng…" />
      <Field label="Lời nhắn" name="message" rows={3} />
    </FormShell>
  );
}

function Partner() {
  const [state, action, pending] = useActionState(sendPartnership, null);
  return (
    <FormShell action={action} pending={pending} state={state} submitLabel="Gửi đề xuất hợp tác">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên tổ chức / doanh nghiệp" name="organization" required />
        <Field label="Người liên hệ" name="contact_name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Số điện thoại" name="phone" type="tel" inputMode="tel" />
      </div>
      <Field label="Lĩnh vực muốn hợp tác" name="focus_area" placeholder="Giáo dục, sức khỏe, sinh kế…" />
      <Field label="Đề xuất của bạn" name="proposal" rows={4} required />
    </FormShell>
  );
}

function Donate() {
  const [state, action, pending] = useActionState(sendDonation, null);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <FormShell action={action} pending={pending} state={state} submitLabel="Gửi cam kết đóng góp" tone="sun">
        <div>
          <span className="mb-1.5 block text-sm font-bold">Chọn số tiền <span className="text-amber">*</span></span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presets.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setAmount(String(p))}
                className={cx("rounded-2xl border px-3 py-3 text-sm font-extrabold transition", amount === String(p) ? "border-sun bg-sun text-ink shadow-lg shadow-sun/40" : "border-line bg-white hover:border-viet")}
              >
                {p.toLocaleString("vi-VN")}đ
              </button>
            ))}
          </div>
          <input name="amount" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} inputMode="numeric" required placeholder="Hoặc nhập số tiền khác (VNĐ)" className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3.5 outline-none focus:border-viet focus:ring-4 focus:ring-viet/15" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Họ tên" name="donor_name" required />
          <Field label="Email nhận biên nhận" name="email" type="email" required />
        </div>
        <Field label="Số điện thoại" name="phone" type="tel" inputMode="tel" />
        <Field label="Lời nhắn" name="message" rows={2} />
      </FormShell>

      <aside className="relative overflow-hidden rounded-3xl bg-forest p-7 text-white">
        <div className="dots absolute inset-0 opacity-40" />
        <div className="relative">
          <h4 className="text-lg font-extrabold text-sun">Thông tin chuyển khoản</h4>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-white/55">Ngân hàng</dt><dd className="font-bold">{site.bank.name}</dd></div>
            <div>
              <dt className="text-white/55">Số tài khoản</dt>
              <dd className="flex items-center gap-2 text-xl font-extrabold tracking-wider">
                {site.bank.account}
                <button type="button" aria-label="Sao chép số tài khoản" onClick={() => { navigator.clipboard?.writeText(site.bank.account.replace(/\s/g, "")); setCopied(true); setTimeout(() => setCopied(false), 1800); }} className="glass rounded-lg p-1.5"><Copy className="size-4" /></button>
                {copied && <span className="text-xs font-semibold text-aura">Đã chép</span>}
              </dd>
            </div>
            <div><dt className="text-white/55">Chủ tài khoản</dt><dd className="font-bold">{site.bank.holder}</dd></div>
            <div><dt className="text-white/55">Nội dung</dt><dd className="font-bold">{site.bank.note}</dd></div>
          </dl>
          <p className="mt-5 rounded-xl bg-white/10 p-3 text-xs leading-relaxed text-white/75">
            Sau khi nhận được khoản đóng góp, Việt Úc sẽ gửi biên nhận xác nhận qua email của bạn. Mọi khoản đóng góp được công khai, minh bạch.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default function JoinTabs({ initial = "volunteer" }: { initial?: Tab }) {
  const [tab, setTab] = useState<Tab>(initial);
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3" role="tablist">
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t.id)}
              className={cx("group relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-500", on ? `bg-gradient-to-br ${t.color} text-white shadow-2xl shadow-viet/25 md:-translate-y-1` : "bg-white ring-1 ring-line hover:ring-viet")}
            >
              <t.icon className={cx("size-8", on ? "text-white" : "text-viet")} />
              <p className={cx("mt-3 text-lg font-extrabold", t.id === "donate" && on && "text-ink")}>{t.title}</p>
              <p className={cx("text-sm", on ? (t.id === "donate" ? "text-ink/70" : "text-white/80") : "text-ink-soft")}>{t.sub}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-forest/5 ring-1 ring-line md:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {tab === "volunteer" && <Volunteer />}
            {tab === "partner" && <Partner />}
            {tab === "donate" && <Donate />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
