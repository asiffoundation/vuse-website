"use client";

import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Tải ảnh thẳng lên Supabase Storage (bucket `media`), tự điền URL công khai vào ô nhập.
export default function ImageUpload({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(file: File) {
    setBusy(true);
    setErr("");
    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000" });
    if (error) setErr(error.message);
    else setUrl(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    setBusy(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input name={name} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… (hoặc tải ảnh lên)" className="w-full rounded-xl border border-line px-3 py-2.5 text-sm" />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-forest px-4 text-sm font-bold text-white">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Tải lên
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
      </div>
      {err && <p className="text-xs text-red-600">{err}</p>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url && <img src={url} alt="" className="h-28 rounded-xl object-cover" />}
    </div>
  );
}
