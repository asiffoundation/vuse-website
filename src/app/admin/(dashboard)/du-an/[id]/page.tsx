import { notFound } from "next/navigation";
import ContentForm from "@/components/ContentForm";
import { saveProject } from "@/lib/admin-actions";
import { createClient } from "@/lib/supabase/server";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let item;
  if (id !== "new") {
    const { data } = await (await createClient()).from("projects").select("*").eq("id", id).single();
    if (!data) notFound();
    item = data;
  }
  return (
    <>
      <h1 className="mb-6 text-3xl font-extrabold">{item ? "Sửa" : "Thêm"} Dự án</h1>
      <ContentForm kind="project" action={saveProject} item={item} />
    </>
  );
}
