"use client";

import Image from "next/image";
import { useActionState } from "react";
import { signIn } from "@/lib/admin-actions";

export default function Login() {
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <div className="grain relative grid min-h-screen place-items-center bg-gradient-to-br from-forest-deep via-forest to-viet-dam px-5">
      <form action={action} className="relative w-full max-w-sm space-y-4 rounded-3xl bg-white p-8 shadow-2xl">
        <Image src="/images/vietuc-logo-core.png" alt="Việt Úc" width={80} height={78} className="mx-auto h-20 w-auto" />
        <h1 className="text-center text-xl font-extrabold">Quản trị website</h1>
        {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <p className="rounded-xl bg-sun/30 p-3 text-xs font-semibold">Chưa cấu hình Supabase (.env.local) — chưa thể đăng nhập.</p>
        )}
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-line px-4 py-3" />
        <input name="password" type="password" required placeholder="Mật khẩu" className="w-full rounded-xl border border-line px-4 py-3" />
        {state?.error && <p role="alert" className="text-sm font-semibold text-red-600">{state.error}</p>}
        <button disabled={pending} className="w-full rounded-xl bg-viet py-3 font-bold text-white disabled:opacity-60">{pending ? "Đang đăng nhập…" : "Đăng nhập"}</button>
      </form>
    </div>
  );
}
