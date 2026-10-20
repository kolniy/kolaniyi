import { education, experience } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="section border-t border-line" aria-labelledby="experience-title">
      <div className="container-page">
        <SectionHeading eyebrow="Experience" title={<span id="experience-title">Problems I’ve owned, and what changed.</span>}>
          Roles, the systems behind them, and the measurable outcomes.
        </SectionHeading>

        <ol className="mt-14 divide-y divide-line border-y border-line">
          {experience.map((e) => (
            <li key={`${e.org}-${e.role}`} className="reveal grid gap-6 py-9 md:grid-cols-[14rem_1fr] md:gap-12">
              <div>
                <p className="font-mono text-sm text-muted">{e.dates}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="eyebrow">{e.kind}</span>
                  {e.sample && <span className="sample-badge">Sample</span>}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-tight">
                  {e.role} <span className="text-muted">· {e.org}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{e.summary}</p>
                <ul className="mt-5 space-y-2">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-muted">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-line-strong" /> {r}
                    </li>
                  ))}
                </ul>
                {e.outcomes && e.outcomes.length > 0 && (
                  <ul className="mt-5 space-y-2 rounded-xl border border-line bg-surface p-4">
                    {e.outcomes.map((o) => (
                      <li key={o} className="flex gap-3 text-sm">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {o}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {e.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {education.length > 0 && (
          <div className="reveal mt-14">
            <h3 className="eyebrow">Education &amp; certifications</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {education.map((ed) => (
                <li key={ed.title} className="card p-5">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {ed.title} {ed.sample && <span className="sample-badge">Sample</span>}
                  </p>
                  <p className="mt-1 text-sm text-muted">{ed.org} · {ed.dates}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
