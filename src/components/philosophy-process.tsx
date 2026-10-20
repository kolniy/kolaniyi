import { principles, processSteps } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Philosophy() {
  return (
    <section id="philosophy" className="section border-t border-line" aria-labelledby="philosophy-title">
      <div className="container-page">
        <SectionHeading eyebrow="Engineering philosophy" title={<span id="philosophy-title">Systems fail. Good design plans for it.</span>}>
          The principles I lean on when trade-offs aren’t obvious and the failure modes are expensive.
        </SectionHeading>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.title} className="reveal group relative bg-surface p-6 transition-colors hover:bg-surface-2">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section border-t border-line" aria-labelledby="process-title">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Development process" title={<span id="process-title">From ambiguous problem to production.</span>}>
            How I approach a problem: understand it, design for failure, prove it works, then keep it healthy.
          </SectionHeading>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-line" />
          {processSteps.map((s) => (
            <li key={s.n} className="reveal relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong bg-bg font-mono text-xs text-accent">
                {s.n}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-xl text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
