"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "./slug";
import { createClient } from "./supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");
  return supabase;
}

export async function signIn(_: { error?: string } | null, fd: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(fd.get("email") ?? ""),
    password: String(fd.get("password") ?? ""),
  });
  if (error) return { error: "Email hoặc mật khẩu không đúng." };
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function saveContent(table: "projects" | "posts", fd: FormData) {
  const supabase = await requireUser();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const row: Record<string, unknown> = {
    title,
    slug: str(fd, "slug") || slugify(title),
    body: str(fd, "body") || null,
    cover_image_url: str(fd, "cover_image_url") || null,
    published: fd.get("published") === "on",
  };
  if (table === "projects") {
    row.summary = str(fd, "summary");
    row.audience = str(fd, "audience") || null;
    row.status = str(fd, "status") === "completed" ? "completed" : "ongoing";
    const goal = Number(str(fd, "goal_amount"));
    row.goal_amount = goal > 0 ? Math.round(goal) : null;
    row.raised_amount = Math.max(0, Math.round(Number(str(fd, "raised_amount")) || 0));
  } else {
    row.excerpt = str(fd, "summary");
    row.category = str(fd, "category") || null;
  }
  const { error } = id ? await supabase.from(table).update(row).eq("id", id) : await supabase.from(table).insert(row);
  if (error) redirect(`/admin/${table === "projects" ? "du-an" : "tin-tuc"}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect(`/admin/${table === "projects" ? "du-an" : "tin-tuc"}`);
}

export const saveProject = saveContent.bind(null, "projects");
export const savePost = saveContent.bind(null, "posts");

const deletable = ["projects", "posts", "contact_messages", "volunteer_applications", "partnership_requests", "donations"] as const;

export async function deleteRow(table: string, id: string) {
  if (!(deletable as readonly string[]).includes(table)) return;
  const supabase = await requireUser();
  await supabase.from(table).delete().eq("id", id);
  revalidatePath("/", "layout");
}

export async function setDonationStatus(id: string, status: "pending" | "received" | "receipt_sent") {
  const supabase = await requireUser();
  await supabase.from("donations").update({ status }).eq("id", id);
  revalidatePath("/admin/dang-ky");
}
