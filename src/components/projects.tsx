"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, projects, type Category } from "@/content/projects";
import { ProjectVisual } from "./project-visual";
import { SectionHeading } from "./section-heading";

export function Projects() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  // Only offer filters that have at least one project.
  const available = categories.filter((c) => c === "All" || projects.some((p) => p.category === c));
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="section border-t border-line" aria-labelledby="projects-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Featured projects" title={<span id="projects-title">Problems solved, with the engineering shown.</span>}>
            Each project has a case study covering the problem, the design decisions, the trade-offs and what I’d do next.
          </SectionHeading>

          <div role="group" aria-label="Filter projects by category" className="reveal flex flex-wrap gap-2">
            {available.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === c ? "border-accent bg-accent text-accent-ink" : "border-line-strong text-muted hover:border-fg hover:text-fg"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {shown.length} project{shown.length === 1 ? "" : "s"}
        </p>

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {shown.map((p, i) => (
            <li key={p.slug} className={`${i === 0 && shown.length % 2 === 1 ? "md:col-span-2" : ""}`}>
              <article
                className={`card card-hover enter group relative h-full overflow-hidden p-5 sm:p-6 ${
                  i === 0 && shown.length % 2 === 1 ? "md:grid md:grid-cols-2 md:items-center md:gap-10" : ""
                }`}
              >
                <ProjectVisual kind={p.visual} label={p.name} />
                <div className={i === 0 && shown.length % 2 === 1 ? "mt-6 md:mt-0" : "mt-6"}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow">{p.category}</span>
                    {p.sample && <span className="sample-badge">Sample content</span>}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-muted">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
                    {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Read case study <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
