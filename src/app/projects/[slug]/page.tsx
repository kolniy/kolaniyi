import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { GithubIcon } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Case study`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} · ${site.name}`, description: p.summary, url: `/projects/${p.slug}`, type: "article" },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-12">
      <h2 className="eyebrow h-fit">{title}</h2>
      <div className="max-w-3xl text-lg leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Code({ filename, code }: { filename: string; code: string }) {
  return (
    <figure className="code-block mt-6">
      <figcaption className="code-bar">
        <span className="dot" /> <span className="dot" /> <span className="dot" />
        <span className="ml-2">{filename}</span>
      </figcaption>
      <pre tabIndex={0} aria-label={`Code excerpt: ${filename}`}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;

  return (
    <>
      <header className="border-b border-line py-5">
        <div className="container-page flex items-center justify-between">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={16} /> All projects
          </Link>
          <Link href="/" className="font-medium tracking-tight">{site.name}</Link>
        </div>
      </header>

      <main id="main" className="container-page py-16 sm:py-24">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{p.category} · Case study</span>
          {p.sample && <span className="sample-badge">Sample content: replace with a real project</span>}
        </div>
        <h1 className="h-display mt-5 !text-[clamp(2.4rem,6vw,4.5rem)]">{p.name}</h1>
        <p className="mt-6 max-w-3xl text-xl text-muted">{p.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {p.stack.map((s) => <li key={s} className="chip !text-fg">{s}</li>)}
        </ul>

        {(p.links.live || p.links.source) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.live && (
              <a href={p.links.live} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Live project <ArrowUpRight size={17} />
              </a>
            )}
            {p.links.source && (
              <a href={p.links.source} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={17} /> Source
              </a>
            )}
          </div>
        )}

        <div className="mt-12"><ProjectVisual kind={p.visual} label={p.name} /></div>

        <div className="mt-16">
          <Block title="Problem & users">
            <p>{p.problem}</p>
            <p className="mt-4"><span className="text-fg">Intended users:</span> {p.users}</p>
          </Block>

          <Block title="Approach">
            <p>{p.approach}</p>
          </Block>

          <Block title="Architecture">
            <ol className="mt-1 space-y-3">
              {p.architecture.map((a, i) => (
                <li key={a.label} className="card flex gap-5 p-5">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium text-fg">{a.label}</p>
                    <p className="mt-1 text-base">{a.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Key decisions">
            <ul className="space-y-6">
              {p.decisions.map((d) => (
                <li key={d.title}>
                  <h3 className="font-medium text-fg">{d.title}</h3>
                  <p className="mt-1">{d.body}</p>
                </li>
              ))}
            </ul>
            <Code filename={p.code.filename} code={p.code.code} />
            {p.schema && <Code filename={p.schema.filename} code={p.schema.code} />}
            <p className="mt-3 font-mono text-xs text-subtle">Illustrative excerpt.</p>
          </Block>

          <Block title="Hardest challenge">
            <p>{p.challenge}</p>
          </Block>

          <Block title="Trade-offs">
            <ul className="space-y-3">
              {p.tradeoffs.map((t) => (
                <li key={t} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />{t}</li>
              ))}
            </ul>
          </Block>

          <Block title="Performance, reliability, security">
            <dl className="space-y-5">
              {(["performance", "reliability", "security"] as const).map((k) => (
                <div key={k}>
                  <dt className="font-medium capitalize text-fg">{k}</dt>
                  <dd className="mt-1">{p.qualities[k]}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Results">
            {p.result ? (
              <p className="text-fg">{p.result}</p>
            ) : (
              <p className="rounded-xl border border-dashed border-line-strong p-4 text-base">
                No verified outcome has been recorded for this entry. Add a measured, factual result in <code className="font-mono text-accent">src/content/projects.ts</code>.
              </p>
            )}
          </Block>

          <Block title="Lessons & next steps">
            <h3 className="font-medium text-fg">Lessons learned</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">{p.lessons.map((l) => <li key={l}>{l}</li>)}</ul>
            <h3 className="mt-6 font-medium text-fg">Future improvements</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">{p.future.map((l) => <li key={l}>{l}</li>)}</ul>
          </Block>
        </div>

        <Link href={`/projects/${next.slug}`} className="card card-hover group mt-10 flex items-center justify-between gap-6 p-6">
          <span>
            <span className="eyebrow">Next case study</span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight">{next.name}</span>
          </span>
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
