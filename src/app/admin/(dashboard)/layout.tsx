import { FileText, FolderHeart, Inbox, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/admin-actions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Quản trị", robots: { index: false } };

const links = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/du-an", label: "Dự án", icon: FolderHeart },
  { href: "/admin/tin-tuc", label: "Tin tức", icon: FileText },
  { href: "/admin/dang-ky", label: "Form & Donate", icon: Inbox },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const { data } = await (await createClient()).auth.getUser();
  if (!data.user) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-paper md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-forest-deep p-5 text-white md:min-h-screen">
        <p className="text-lg font-extrabold">VIỆT ÚC <span className="text-sun">CMS</span></p>
        <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
              <l.icon className="size-4" /> {l.label}
            </Link>
          ))}
        </nav>
        <form action={signOut} className="mt-6">
          <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 hover:text-white"><LogOut className="size-4" /> Đăng xuất</button>
        </form>
        <p className="mt-4 truncate px-3 text-xs text-white/40">{data.user.email}</p>
      </aside>
      <div className="p-5 md:p-10">{children}</div>
    </div>
  );
}
