import "server-only";

export type Repo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
};
export type RepoResult =
  | { ok: true; repos: Repo[] }
  | { ok: false; reason: string };

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
};

const headers = (): HeadersInit => ({
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
});

const toRepo = (r: ApiRepo): Repo => ({
  name: r.name,
  url: r.html_url,
  description: r.description,
  language: r.language,
  stars: r.stargazers_count,
});

const get = async <T>(path: string): Promise<T> => {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: headers(),
    next: { revalidate: 3600 }, // cache for 1 hour
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok)
    throw new Error(res.status === 403 ? "rate limited" : `HTTP ${res.status}`);
  return (await res.json()) as T;
};

/** Official REST API; never fabricates data; failures surface as a typed result. */
export async function fetchRepos(
  username: string,
  featured: readonly string[],
): Promise<RepoResult> {
  try {
    if (featured.length > 0) {
      const settled = await Promise.allSettled(
        featured.slice(0, 6).map((full) => get<ApiRepo>(`/repos/${full}`)),
      );
      const repos = settled
        .filter(
          (r): r is PromiseFulfilledResult<ApiRepo> => r.status === "fulfilled",
        )
        .map((r) => toRepo(r.value));
      if (repos.length === 0) {
        const firstErr = settled.find(
          (r): r is PromiseRejectedResult => r.status === "rejected",
        )?.reason;
        throw firstErr instanceof Error
          ? firstErr
          : new Error("No featured repositories found");
      }
      return { ok: true, repos };
    }
    const all = await get<ApiRepo[]>(
      `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`,
    );
    return {
      ok: true,
      repos: all
        .filter((r) => !r.fork && !r.archived)
        .slice(0, 6)
        .map(toRepo),
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "unknown error",
    };
  }
}
