import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/data";
import { nav, site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  return [
    ...nav.map((n) => ({ url: `${site.url}${n.href}` })),
    ...projects.map((p) => ({ url: `${site.url}/du-an/${p.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/tin-tuc/${p.slug}` })),
  ];
}
