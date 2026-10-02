import ImageUpload from "./ImageUpload";

type Item = Record<string, string | boolean | null | undefined>;
const input = "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm";

// Form dùng chung cho Dự án / Tin tức (server component, submit bằng Server Action).
export default function ContentForm({ action, item, kind }: { action: (fd: FormData) => Promise<void>; item?: Item; kind: "project" | "post" }) {
  const v = (k: string) => String(item?.[k] ?? "");
  return (
    <form action={action} className="max-w-2xl space-y-4 rounded-2xl bg-white p-6 ring-1 ring-line">
      {item?.id && <input type="hidden" name="id" value={v("id")} />}
      <label className="block text-sm font-bold">Tiêu đề<input name="title" required defaultValue={v("title")} className={input} /></label>
      <label className="block text-sm font-bold">Slug (đường dẫn, để trống = tự tạo)<input name="slug" defaultValue={v("slug")} className={input} /></label>
      <label className="block text-sm font-bold">{kind === "project" ? "Tóm tắt" : "Mô tả ngắn"}<textarea name="summary" rows={2} defaultValue={kind === "project" ? v("summary") : v("excerpt")} className={input} /></label>
      {kind === "project" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold">Đối tượng<input name="audience" defaultValue={v("audience")} className={input} /></label>
          <label className="block text-sm font-bold">Trạng thái
            <select name="status" defaultValue={v("status") || "ongoing"} className={input}><option value="ongoing">Đang triển khai</option><option value="completed">Đã hoàn thành</option></select>
          </label>
        </div>
      ) : null}
      {kind === "project" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold">Mục tiêu gây quỹ (VNĐ, để trống = ẩn)<input name="goal_amount" type="number" min={0} step={1000} defaultValue={v("goal_amount")} className={input} /></label>
          <label className="block text-sm font-bold">Đã quyên góp (VNĐ)<input name="raised_amount" type="number" min={0} step={1000} defaultValue={v("raised_amount")} className={input} /></label>
        </div>
      ) : (
        <label className="block text-sm font-bold">Danh mục<input name="category" defaultValue={v("category")} className={input} /></label>
      )}
      <div className="text-sm font-bold">Ảnh bìa<ImageUpload name="cover_image_url" defaultValue={v("cover_image_url")} /></div>
      <label className="block text-sm font-bold">Nội dung<textarea name="body" rows={10} defaultValue={v("body")} className={input} /></label>
      <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="published" defaultChecked={item ? Boolean(item.published) : true} className="size-4" /> Hiển thị công khai</label>
      <button className="rounded-xl bg-viet px-6 py-3 font-bold text-white">Lưu</button>
    </form>
  );
}
