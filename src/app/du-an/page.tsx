import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = { title: "Các dự án" };
export const revalidate = 300;

export default async function Projects() {
  const projects = await getProjects();
  return (
    <>
      <PageHero eyebrow="Các dự án" title="Những hành trình đang được viết tiếp." sub="Mỗi dự án là một lời hứa: không ai bị bỏ lại phía sau." />
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}><ProjectCard p={p} index={i} /></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
