import PageHero from "./PageHero";

export type LegalSection = { title: string; body: string[] };

export default function LegalPage({ eyebrow, title, updated, sections }: { eyebrow: string; title: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} sub={`Cập nhật lần cuối: ${updated}`} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <ol className="space-y-10">
          {sections.map((s, i) => (
            <li key={s.title}>
              <h2 className="mb-3 text-2xl font-extrabold">
                <span className="text-viet">{i + 1}.</span> {s.title}
              </h2>
              <div className="space-y-3 text-lg leading-relaxed text-ink-soft">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </article>
    </>
  );
}
