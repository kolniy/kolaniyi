"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { disciplines } from "@/content/site";
import { getProject } from "@/content/projects";
import { SectionHeading } from "./section-heading";

export function Expertise() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = disciplines[active]!;

  // Roving-tabindex keyboard support per the ARIA tabs pattern.
  const onKey = (e: React.KeyboardEvent) => {
    const last = disciplines.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="expertise" className="section border-t border-line" aria-labelledby="expertise-title">
      <div className="container-page">
        <SectionHeading eyebrow="Technical expertise" title={<span id="expertise-title">Three lenses on the same systems.</span>}>
          Select a lens to see the stack, the capabilities, and where it shows up in my work.
        </SectionHeading>

        <div className="reveal mt-14 grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <div role="tablist" aria-label="Engineering disciplines" aria-orientation="vertical" onKeyDown={onKey} className="flex flex-col gap-3">
            {disciplines.map((d, i) => {
              const selected = i === active;
              return (
                <button
                  key={d.id}
                  ref={(el) => { tabs.current[i] = el; }}
                  role="tab"
                  id={`${uid}-tab-${d.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`card group relative overflow-hidden p-5 text-left transition-colors ${selected ? "!border-accent/60" : "hover:!border-line-strong"}`}
                >
                  <span aria-hidden className={`absolute inset-y-0 left-0 w-0.5 bg-accent transition-opacity ${selected ? "opacity-100" : "opacity-0"}`} />
                  <span className="font-mono text-xs text-subtle">{d.index}</span>
                  <span className="mt-1 block text-lg font-medium tracking-tight">{d.name}</span>
                  <span className="mt-1 block text-sm text-muted">{d.tagline}</span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${current.id}`}
            tabIndex={0}
            className="card relative overflow-hidden p-7 sm:p-9"
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <p className="eyebrow">{current.index} · {current.name}</p>
            <p className="mt-5 max-w-2xl text-xl leading-snug tracking-tight">{current.description}</p>

            <h3 className="mt-9 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Core stack</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.stack.map((s) => (
                <li key={s} className="chip !border-line-strong !text-fg">{s}</li>
              ))}
            </ul>

            <h3 className="mt-9 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Capabilities</h3>
            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {current.capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-muted">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                  {c}
                </li>
              ))}
            </ul>

            <h3 className="mt-9 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Seen in</h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {current.projects.map((slug) => {
                const p = getProject(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <Link href={`/projects/${slug}`} className="btn btn-ghost !min-h-10 !px-4 !py-2 text-sm">
                      {p.name} <ArrowUpRight size={15} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
