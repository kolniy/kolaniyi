import { Suspense } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@/content/site";
import { fetchRepos } from "@/lib/github";
import { GithubIcon } from "./icons";
import { SectionHeading } from "./section-heading";

function Skeleton() {
  return (
    <ul
      className="mt-10 grid gap-4 md:grid-cols-3"
      aria-busy="true"
      aria-label="Loading repositories"
    >
      {[0, 1, 2].map((i) => (
        <li key={i} className="card h-36 animate-pulse p-5" />
      ))}
    </ul>
  );
}

async function Repos() {
  const result = await fetchRepos(
    site.contact.githubUsername,
    site.featuredRepos,
  );

  if (!result.ok) {
    return (
      <p role="status" className="card mt-10 p-6 text-muted">
        GitHub activity is temporarily unavailable ({result.reason}). Visit the{" "}
        <a
          className="text-accent underline underline-offset-4"
          href={`https://github.com/${site.contact.githubUsername}`}
        >
          profile
        </a>{" "}
        directly.
      </p>
    );
  }
  if (result.repos.length === 0) {
    return (
      <p className="card mt-10 p-6 text-muted">
        No public repositories to show yet.
      </p>
    );
  }

  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-3">
      {result.repos.map((r) => (
        <li key={r.url}>
          <a href={r.url} className="card card-hover group block h-full p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="break-all font-mono text-sm font-medium">
                {r.name}
              </h3>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-subtle transition-colors group-hover:text-accent"
              />
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-muted">
              {r.description ?? "No description provided."}
            </p>
            <p className="mt-5 flex items-center gap-4 font-mono text-xs text-subtle">
              {r.language && <span>{r.language}</span>}
              <span className="inline-flex items-center gap-1">
                <Star size={12} aria-hidden /> {r.stars}
                <span className="sr-only"> stars</span>
              </span>
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Activity() {
  const user = site.contact.githubUsername;
  return (
    <section
      id="activity"
      className="section border-t border-line"
      aria-labelledby="activity-title"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="GitHub & open source"
          title={<span id="activity-title">Public engineering work.</span>}
        >
          Repositories pulled live from the GitHub API and cached hourly.
          Nothing here is hand-typed.
        </SectionHeading>

        {user ? (
          <>
            <Suspense fallback={<Skeleton />}>
              <Repos />
            </Suspense>
            <a
              href={`https://github.com/${user}`}
              className="btn btn-ghost mt-8"
            >
              <GithubIcon size={17} /> @{user} on GitHub
            </a>
          </>
        ) : (
          <div className="card mt-10 border-dashed p-6 text-muted">
            <p className="font-medium text-fg">GitHub isn’t connected yet.</p>
            <p className="mt-2 text-sm">
              Set{" "}
              <code className="font-mono text-accent">
                contact.githubUsername
              </code>{" "}
              in <code className="font-mono">src/content/site.ts</code> to show
              your public repositories here.
            </p>
          </div>
        )}

        {site.activityLinks.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {site.activityLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="chip text-fg! hover:border-accent!">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
