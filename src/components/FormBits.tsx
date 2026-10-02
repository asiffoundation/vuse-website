"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import type { FormResult } from "@/lib/types";
import { btn, cx } from "./ui";

const field =
  "w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-viet focus:ring-4 focus:ring-viet/15";

export function Field({ label, name, type = "text", required, placeholder, rows, inputMode }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; rows?: number; inputMode?: "numeric" | "tel" | "email" | "text";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-ink">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      {rows ? (
        <textarea name={name} rows={rows} required={required} placeholder={placeholder} className={field} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} inputMode={inputMode} className={field} />
      )}
    </label>
  );
}

export function FormShell({ action, pending, state, submitLabel, children, tone = "green" }: {
  action: (fd: FormData) => void;
  pending: boolean;
  state: FormResult | null;
  submitLabel: string;
  children: ReactNode;
  tone?: "green" | "sun";
}) {
  if (state?.ok) {
    return (
      <div className="grid place-items-center rounded-3xl bg-mist p-10 text-center" role="status">
        <CheckCircle2 className="size-14 text-viet" />
        <p className="mt-4 text-xl font-extrabold text-ink">Đã gửi thành công!</p>
        <p className="mt-2 max-w-md text-ink-soft">{state.message}</p>
      </div>
    );
  }
  return (
    <form action={action} className="space-y-4">
      {/* honeypot chống spam: người thật không thấy */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {children}
      {state && !state.ok && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{state.message}</p>}
      <button type="submit" disabled={pending} className={cx(btn.base, tone === "sun" ? btn.sun : btn.green, "w-full py-4 text-base disabled:opacity-60")}>
        {pending ? <Loader2 className="size-5 animate-spin" /> : null}
        {pending ? "Đang gửi…" : submitLabel}
      </button>
    </form>
  );
}
