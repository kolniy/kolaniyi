# Engineer Portfolio

A dark-first, accessible portfolio for a generalist software engineer. Next.js 15 (App Router), TypeScript, Tailwind CSS v4. Almost no client JavaScript: motion is CSS-only (scroll-driven animations with graceful fallback, all disabled under `prefers-reduced-motion`).

> **All personal content is placeholder.** Nothing in this repo claims a name, employer, metric, or credential on your behalf. Sample entries carry a visible “Sample” badge until you replace them.

## Setup

Requires **Node 20+** (`nvm use` reads `.nvmrc`).

```bash
cd portfolio
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

Quality gates: `npm run typecheck`, `npm run lint`, `npm run build`.

## Personalise it (all in `src/content/`)

| File | What to edit |
| --- | --- |
| `site.ts` | Name, title, availability, hero copy, email, LinkedIn, GitHub username, résumé URL, about text, skills, philosophy, process, experience, education |
| `projects.ts` | Featured projects and full case-study content (`sample: true` → `false` once real; leave `result` empty until you have a verified outcome) |

- **Résumé:** drop a PDF in `public/` and set `contact.resumeUrl` to `"/your-file.pdf"`. The button appears only when set.
- **Screenshots:** the cards use abstract illustrations (`components/project-visual.tsx`). Swap in real images with `next/image` once you have them.
- **Links** (email, LinkedIn, GitHub, live/source) are hidden until configured, so there are no dead buttons.
- **Skills:** only list technologies you can discuss in depth; edit `disciplines` in `site.ts`.

## Integrations needing your credentials

| Feature | Needed | Status without it |
| --- | --- | --- |
| Contact form | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verified sender) | Form shows a “not connected” notice; API returns `503` |
| GitHub section | `contact.githubUsername` in `site.ts` (optional `GITHUB_TOKEN` with no scopes to raise rate limits) | Shows a setup notice |
| SEO URLs | `NEXT_PUBLIC_SITE_URL` | Defaults to `http://localhost:3000` |

The contact API (`src/app/api/contact/route.ts`) does server-side validation, honeypot + minimum-fill-time spam checks, same-origin enforcement, and a best-effort in-memory rate limit (use Redis/Upstash for multi-instance production).

## Deploy

**Vercel (simplest):** import the repo, set the root directory to `portfolio`, add the env vars above, deploy.
Any Node host works too: `npm run build && npm start`.

## Structure

```
src/
  app/            layout, home, /projects/[slug], api/contact, sitemap, robots, OG image, icon
  components/     one file per section + shared UI
  content/        site.ts, projects.ts  ← your content
  lib/            contact validation, GitHub client, helpers
```

## Accessibility & performance notes

Skip link, semantic landmarks, ARIA tabs with arrow-key support, visible focus rings, labelled form with focus-to-first-error, reduced-motion support, self-hosted fonts via `next/font`, SVG/CSS visuals (no image weight, no layout shift).
