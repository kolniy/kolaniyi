import { site } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-title">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="About" title={<span id="about-title">Zoom out to the system, zoom in to the root cause.</span>} />
          {site.about.facts.length > 0 && (
            <dl className="reveal mt-10 divide-y divide-line border-y border-line font-mono text-sm">
              {site.about.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-3">
                  <dt className="text-subtle">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
              {site.location && (
                <div className="flex justify-between gap-6 py-3">
                  <dt className="text-subtle">Location</dt>
                  <dd className="text-right">{site.location}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
        <div className="reveal space-y-6 text-lg leading-relaxed text-muted">
          {site.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="border-l-2 border-accent pl-5 text-fg">{site.about.aspirations}</p>
        </div>
      </div>
    </section>
  );
}
