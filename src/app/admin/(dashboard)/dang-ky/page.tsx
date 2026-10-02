import { deleteRow, setDonationStatus } from "@/lib/admin-actions";
import { createClient } from "@/lib/supabase/server";

type Row = Record<string, string | number | null>;

const sections = [
  { table: "donations", title: "Cam kết donate", cols: ["donor_name", "email", "phone", "amount", "message", "status"] },
  { table: "volunteer_applications", title: "Đăng ký tình nguyện viên", cols: ["full_name", "email", "phone", "city", "skills", "availability", "message"] },
  { table: "partnership_requests", title: "Đề xuất hợp tác", cols: ["organization", "contact_name", "email", "phone", "focus_area", "proposal"] },
  { table: "contact_messages", title: "Liên hệ", cols: ["full_name", "email", "message"] },
] as const;

const statusLabel: Record<string, string> = { pending: "Chờ chuyển khoản", received: "Đã nhận tiền", receipt_sent: "Đã gửi biên nhận" };

export default async function Submissions() {
  const supabase = await createClient();
  const results = await Promise.all(sections.map((s) => supabase.from(s.table).select("*").order("created_at", { ascending: false }).limit(100)));
  return (
    <>
      <h1 className="text-3xl font-extrabold">Form & Donate</h1>
      <p className="mt-1 text-sm text-ink-soft">Dữ liệu khách gửi từ website (mới nhất ở trên).</p>
      {sections.map((s, i) => {
        const rows = (results[i].data ?? []) as Row[];
        return (
          <section key={s.table} className="mt-10">
            <h2 className="mb-3 text-xl font-extrabold">{s.title} <span className="text-sm font-semibold text-ink-soft">({rows.length})</span></h2>
            <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-mist text-xs uppercase tracking-wider text-ink-soft">
                  <tr>
                    <th className="p-3">Ngày</th>
                    {s.cols.map((c) => <th key={c} className="p-3">{c}</th>)}
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((r) => (
                    <tr key={String(r.id)} className="align-top">
                      <td className="whitespace-nowrap p-3 text-ink-soft">{new Date(String(r.created_at)).toLocaleDateString("vi-VN")}</td>
                      {s.cols.map((c) => (
                        <td key={c} className="max-w-xs p-3">
                          {c === "status" ? (
                            <div className="flex flex-col gap-1">
                              <span className="font-bold">{statusLabel[String(r[c])]}</span>
                              {r[c] !== "received" && <form action={setDonationStatus.bind(null, String(r.id), "received")}><button className="text-xs font-bold text-viet underline">Đánh dấu đã nhận</button></form>}
                              {r[c] !== "receipt_sent" && <form action={setDonationStatus.bind(null, String(r.id), "receipt_sent")}><button className="text-xs font-bold text-viet underline">Đã gửi biên nhận</button></form>}
                            </div>
                          ) : c === "amount" ? (
                            <b>{Number(r[c]).toLocaleString("vi-VN")}đ</b>
                          ) : (
                            String(r[c] ?? "")
                          )}
                        </td>
                      ))}
                      <td className="p-3"><form action={deleteRow.bind(null, s.table, String(r.id))}><button className="text-xs font-bold text-red-700">Xoá</button></form></td>
                    </tr>
                  ))}
                  {!rows.length && <tr><td colSpan={s.cols.length + 2} className="p-6 text-center text-ink-soft">Chưa có dữ liệu.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </>
  );
}
