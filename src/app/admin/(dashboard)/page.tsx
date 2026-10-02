import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const tables = [
    ["projects", "Dự án", "/admin/du-an"],
    ["posts", "Bài viết", "/admin/tin-tuc"],
    ["volunteer_applications", "Tình nguyện viên", "/admin/dang-ky"],
    ["partnership_requests", "Đề xuất hợp tác", "/admin/dang-ky"],
    ["donations", "Cam kết donate", "/admin/dang-ky"],
    ["contact_messages", "Liên hệ", "/admin/dang-ky"],
  ] as const;
  const counts = await Promise.all(tables.map(([t]) => supabase.from(t).select("*", { count: "exact", head: true })));
  return (
    <>
      <h1 className="text-3xl font-extrabold">Tổng quan</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tables.map(([t, label, href], i) => (
          <Link key={t} href={href} className="rounded-2xl bg-white p-6 ring-1 ring-line transition hover:shadow-lg">
            <p className="text-4xl font-black text-viet">{counts[i].count ?? 0}</p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">{label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
