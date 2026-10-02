import { createPublicClient, isSupabaseConfigured } from "./supabase/server";
import { samplePartners, samplePosts, samplePrograms, sampleProjects } from "./sample-data";
import type { Partner, Post, Program, Project } from "./types";

/**
 * Đọc dữ liệu công khai từ Supabase. Chưa cấu hình Supabase (hoặc lỗi kết nối)
 * thì dùng dữ liệu mẫu để site vẫn chạy được lúc phát triển.
 */
async function load<T>(
  table: string,
  fallback: T[],
  build: (q: ReturnType<ReturnType<typeof createPublicClient>["from"]>) => PromiseLike<{ data: unknown; error: unknown }>,
): Promise<T[]> {
  if (!isSupabaseConfigured) return fallback;
  try {
    const { data, error } = await build(createPublicClient().from(table));
    if (error || !data) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}

export const getProjects = () =>
  load<Project>("projects", sampleProjects, (q) =>
    q.select("*").eq("published", true).order("created_at", { ascending: false }),
  );

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug) ?? null;
}

export const getPosts = () =>
  load<Post>("posts", samplePosts, (q) =>
    q.select("*").eq("published", true).order("published_at", { ascending: false }),
  );

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

export const getPartners = () =>
  load<Partner>("partners", samplePartners, (q) => q.select("*").order("sort_order"));

export const getPrograms = () =>
  load<Program>("programs", samplePrograms, (q) => q.select("*").order("sort_order"));
