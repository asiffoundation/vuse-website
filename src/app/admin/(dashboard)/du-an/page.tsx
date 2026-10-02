import Link from "next/link";
import { deleteRow } from "@/lib/admin-actions";
import { createClient } from "@/lib/supabase/server";

export default async function List({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Dự án</h1>
        <Link href="/admin/du-an/new" className="rounded-xl bg-viet px-5 py-2.5 text-sm font-bold text-white">+ Thêm mới</Link>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <ul className="mt-6 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
        {(data ?? []).map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-bold">{r.title}</p>
              <p className="text-xs text-ink-soft">/{r.slug} · {r.published ? "Công khai" : "Nháp"}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link href={`/admin/du-an/${r.id}`} className="rounded-lg bg-mist px-3 py-1.5 text-sm font-bold text-viet">Sửa</Link>
              <form action={deleteRow.bind(null, "projects", r.id)}><button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700">Xoá</button></form>
            </div>
          </li>
        ))}
        {!data?.length && <li className="p-6 text-center text-ink-soft">Chưa có mục nào.</li>}
      </ul>
    </>
  );
}
