"use server";

import { escapeHtml, sendEmail } from "./email";
import { createClient, isSupabaseConfigured } from "./supabase/server";
import { site } from "./site";
import type { FormResult } from "./types";

type Row = Record<string, string>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(fd: FormData, keys: string[]): Row {
  const out: Row = {};
  for (const k of keys) out[k] = String(fd.get(k) ?? "").trim().slice(0, 4000);
  return out;
}

function fail(message: string): FormResult {
  return { ok: false, message };
}

async function submit(
  table: string,
  row: Row,
  required: string[],
  subject: string,
  success: string,
  replyEmail?: string,
): Promise<FormResult> {
  for (const k of required) if (!row[k]) return fail("Vui lòng điền đầy đủ các trường bắt buộc.");
  if (row.email && !EMAIL_RE.test(row.email)) return fail("Email chưa hợp lệ.");

  if (!isSupabaseConfigured) {
    // Chế độ demo: chưa kết nối Supabase.
    return { ok: true, demo: true, message: `${success} (Chế độ demo — chưa kết nối Supabase nên dữ liệu chưa được lưu.)` };
  }

  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(row);
  if (error) return fail("Không gửi được lúc này. Vui lòng thử lại hoặc liên hệ info@vu-se.com.");

  const html = `<h3>${escapeHtml(subject)}</h3><table cellpadding="6">${Object.entries(row)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  await sendEmail({ to: process.env.EMAIL_TO ?? site.email, subject: `[Website] ${subject}`, html, replyTo: replyEmail });

  return { ok: true, message: success };
}

export async function sendContact(_: FormResult | null, fd: FormData): Promise<FormResult> {
  if (fd.get("website")) return { ok: true, message: "Đã gửi." }; // honeypot
  const r = read(fd, ["full_name", "email", "message"]);
  return submit("contact_messages", r, ["full_name", "email", "message"], "Liên hệ mới", "Cảm ơn bạn! Việt Úc sẽ phản hồi sớm nhất có thể.", r.email);
}

export async function sendVolunteer(_: FormResult | null, fd: FormData): Promise<FormResult> {
  if (fd.get("website")) return { ok: true, message: "Đã gửi." };
  const r = read(fd, ["full_name", "email", "phone", "city", "skills", "availability", "message"]);
  return submit("volunteer_applications", r, ["full_name", "email", "phone"], "Đăng ký tình nguyện viên", "Cảm ơn bạn đã muốn đồng hành! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.", r.email);
}

export async function sendPartnership(_: FormResult | null, fd: FormData): Promise<FormResult> {
  if (fd.get("website")) return { ok: true, message: "Đã gửi." };
  const r = read(fd, ["organization", "contact_name", "email", "phone", "focus_area", "proposal"]);
  return submit("partnership_requests", r, ["organization", "contact_name", "email", "proposal"], "Đề xuất hợp tác dự án", "Cảm ơn bạn! Đội ngũ Việt Úc sẽ liên hệ để cùng trao đổi.", r.email);
}

export async function sendDonation(_: FormResult | null, fd: FormData): Promise<FormResult> {
  if (fd.get("website")) return { ok: true, message: "Đã gửi." };
  const r = read(fd, ["donor_name", "email", "phone", "amount", "message"]);
  const amount = Number(r.amount.replace(/\D/g, ""));
  if (!amount || amount < 10000) return fail("Số tiền tối thiểu là 10.000đ.");
  r.amount = String(amount);
  const res = await submit("donations", r, ["donor_name", "email", "amount"], "Cam kết đóng góp mới", "Cảm ơn tấm lòng của bạn!", r.email);

  if (res.ok && !res.demo && isSupabaseConfigured) {
    // Email xác nhận cho nhà hảo tâm (kèm thông tin chuyển khoản).
    await sendEmail({
      to: r.email,
      subject: "Việt Úc — Cảm ơn bạn đã đồng hành",
      html: `<p>Chào ${escapeHtml(r.donor_name)},</p>
<p>Cảm ơn bạn đã gửi cam kết đóng góp <b>${amount.toLocaleString("vi-VN")}đ</b> cho DNXH Việt Úc.</p>
<p>Thông tin chuyển khoản:<br>${escapeHtml(site.bank.name)} · STK ${escapeHtml(site.bank.account)} · ${escapeHtml(site.bank.holder)}<br>${escapeHtml(site.bank.note)}</p>
<p>Sau khi nhận được khoản đóng góp, chúng tôi sẽ gửi biên nhận xác nhận tới email này.</p>
<p>Trân trọng,<br>DNXH Việt Úc — ${site.tagline}</p>`,
    });
  }
  return res;
}
