/**
 * FEATURED PROJECTS
 *
 * ⚠ Every entry below is SAMPLE CONTENT that illustrates the case-study
 * structure. The architecture notes and code excerpts are illustrative, not
 * claims about work you've shipped. Replace each entry with a real project,
 * then set `sample: false`. Leave `result` undefined until you have a verified
 * outcome; never invent metrics.
 */

export type Category = "Frontend" | "Backend" | "Full Stack" | "SaaS" | "Developer Tools";
export type VisualKind = "dashboard" | "components" | "api" | "booking" | "cli";

export type Project = {
  slug: string;
  name: string;
  category: Category;
  visual: VisualKind;
  summary: string;
  stack: string[];
  users: string;
  requirements: string[];
  problem: string;
  approach: string;
  /** Verified outcome only. */
  result?: string;
  links: { live?: string; source?: string };
  architecture: { label: string; detail: string }[];
  decisions: { title: string; body: string }[];
  techChoices: { tech: string; why: string }[];
  implementation: { frontend: string; backend: string; database: string };
  challenge: string;
  tradeoffs: string[];
  qualities: { performance: string; reliability: string; security: string };
  lessons: string[];
  future: string[];
  code: { filename: string; language: string; code: string };
  schema?: { filename: string; code: string };
  /** true = placeholder content, rendered with a "Sample" badge. */
  sample: boolean;
};

export const categories: ("All" | Category)[] = ["All", "SaaS", "Frontend", "Backend", "Full Stack", "Developer Tools"];

export const projects: Project[] = [
  {
    slug: "saas-billing-platform",
    name: "Subscription SaaS Platform",
    category: "SaaS",
    visual: "dashboard",
    summary: "Multi-tenant SaaS with authentication, plan-based entitlements, Stripe-style subscription billing and an account dashboard.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    users: "Small teams that need self-serve sign-up, plan upgrades and invoices without contacting sales.",
    problem: "Billing state lives in two places: the payment provider and your database. When they drift, customers get the wrong access, or are charged without it.",
    approach: "Treat the provider as the source of truth for money and the database as the source of truth for access. Reconcile through idempotent webhook handlers and derive entitlements from a single subscription record.",
    links: {},
    architecture: [
      { label: "Browser", detail: "Next.js app router, server components for data, client islands for forms." },
      { label: "App server", detail: "Route handlers: session auth, tenant scoping, entitlement checks." },
      { label: "PostgreSQL", detail: "Tenants, users, subscriptions, webhook event log (unique event id)." },
      { label: "Billing provider", detail: "Checkout, customer portal, signed webhooks back to the app." },
    ],
    decisions: [
      { title: "Entitlements derived, not stored", body: "A pure function maps subscription status + plan to feature flags, so there is nothing to keep in sync and the logic is trivially unit-testable." },
      { title: "Row-level tenant scoping", body: "Every query goes through a tenant-bound repository, and Postgres RLS acts as a second line of defence against cross-tenant leaks." },
      { title: "Webhook event log", body: "Events are inserted with a unique provider id before processing, which makes retries and out-of-order delivery safe." },
    ],
    requirements: ["Self-serve sign-up and plan changes", "Access always matches billing state", "Tenant data isolation", "Auditable billing events"],
    techChoices: [
      { tech: "Next.js", why: "Server components keep the dashboard fast; route handlers host webhooks next to the UI." },
      { tech: "PostgreSQL", why: "Transactions and constraints protect billing invariants." },
      { tech: "Prisma", why: "Type-safe queries and migrations keep the schema and code in step." },
    ],
    implementation: {
      frontend: "Server-rendered account and billing pages, with client islands only for the plan switcher and checkout redirect. Explicit pending, success and failure states for every billing action.",
      backend: "Route handlers verify session and tenant, call a billing service, and process signature-verified webhooks idempotently.",
      database: "Tenants, users, subscriptions and a webhook event log accessed through Prisma; the event id is a unique key.",
    },
    challenge: "Out-of-order and duplicate webhooks. A ‘subscription.updated’ can arrive before ‘created’, and retries can replay either.",
    tradeoffs: [
      "Processing webhooks synchronously keeps the system simple but couples latency to the database; a queue would add durability at the cost of infrastructure.",
      "Server components reduce client JavaScript, but interactive billing UIs still need client islands and careful loading states.",
    ],
    qualities: {
      performance: "Server-rendered dashboard; per-tenant aggregate queries are indexed and cached briefly.",
      reliability: "Idempotent handlers, a replayable event log, and reconciliation jobs for drift.",
      security: "Signature-verified webhooks, least-privilege API keys, CSRF-safe mutations, RLS.",
    },
    lessons: ["Model the failure paths of money flows first.", "Make every external event idempotent by construction."],
    future: ["Move webhook processing onto a durable queue.", "Usage-based billing meters.", "Audit log UI."],
    code: {
      filename: "lib/billing/entitlements.ts",
      language: "ts",
      code: `type Plan = "free" | "team" | "business";
type Status = "active" | "trialing" | "past_due" | "canceled";

const FEATURES: Record<Plan, readonly string[]> = {
  free: ["projects:3"],
  team: ["projects:50", "sso:false", "export"],
  business: ["projects:unlimited", "sso:true", "export", "audit-log"],
};

/** Pure + deterministic: easy to test, impossible to drift. */
export function entitlementsFor(plan: Plan, status: Status) {
  const grace = status === "past_due"; // keep access during dunning
  const effective: Plan = status === "canceled" ? "free" : plan;
  return { plan: effective, features: FEATURES[effective], grace };
}`,
    },
    schema: {
      filename: "schema.sql",
      code: `create table subscriptions (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references tenants(id),
  provider_id   text not null unique,
  plan          text not null check (plan in ('free','team','business')),
  status        text not null,
  current_period_end timestamptz
);

create table webhook_events (
  provider_event_id text primary key,   -- idempotency key
  received_at       timestamptz default now(),
  processed_at      timestamptz
);`,
    },
    sample: true,
  },
  {
    slug: "component-library-dashboard",
    name: "Design System & Data-Heavy UI",
    category: "Frontend",
    visual: "components",
    summary: "Accessible component library plus a data-dense analytics interface with virtualised tables and URL-driven state.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    users: "Product teams who need consistent, accessible UI and analysts working with large tables.",
    problem: "Inconsistent components and heavy tables made the interface slow, hard to navigate by keyboard, and costly to change.",
    approach: "Build primitives with accessibility baked in, compose them into patterns, and push view state into the URL so every screen is shareable and testable.",
    links: {},
    architecture: [
      { label: "Tokens", detail: "Colour, spacing, radius and type scales as CSS variables." },
      { label: "Primitives", detail: "Button, Dialog, Menu, Tabs; focus management and ARIA handled once." },
      { label: "Patterns", detail: "DataTable, FilterBar, EmptyState built on the primitives." },
      { label: "Screens", detail: "Routes read filters from the URL and render patterns." },
    ],
    decisions: [
      { title: "URL as state", body: "Filters, sort and pagination live in search params, giving deep links, back-button support and simple tests." },
      { title: "Row virtualisation", body: "Only visible rows mount, keeping interaction latency flat as data grows." },
      { title: "Visual + a11y regression tests", body: "Storybook stories double as Playwright and axe checks in CI." },
    ],
    requirements: ["Keyboard-operable everywhere", "Stay responsive with very large tables", "Shareable view state", "Consistent look across screens"],
    techChoices: [
      { tech: "React", why: "Composable primitives and predictable state for a shared component layer." },
      { tech: "TypeScript", why: "Typed props make component contracts explicit and refactors safe." },
      { tech: "Tailwind CSS", why: "Design tokens map directly to utilities, so consistency is enforced by the system." },
    ],
    implementation: {
      frontend: "Primitives own focus management and ARIA; patterns compose them; routes only wire data and URL state.",
      backend: "The UI consumes a paginated, filterable JSON API; cursor pagination keeps requests small.",
      database: "No database of its own; the API’s indexes are shaped around the filters the UI exposes.",
    },
    challenge: "Keeping a virtualised table keyboard- and screen-reader-accessible while rows mount and unmount.",
    tradeoffs: [
      "Virtualisation limits native browser find-in-page; server-side search compensates.",
      "A thin in-house primitive layer costs maintenance but avoids fighting a heavy third-party API.",
    ],
    qualities: {
      performance: "Windowed rendering, memoised cells, code-split routes and measured interaction budgets.",
      reliability: "Component contracts covered by stories and snapshot-free behavioural tests.",
      security: "No dangerouslySetInnerHTML; user content escaped and CSP-friendly.",
    },
    lessons: ["Accessibility is cheapest when it lives in the primitive.", "State in the URL removes a surprising amount of code."],
    future: ["Publish tokens as a package.", "Add column pinning and saved views."],
    code: {
      filename: "hooks/useUrlState.ts",
      language: "ts",
      code: `export function useUrlState<T extends string>(key: string, fallback: T) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const value = (params.get(key) as T | null) ?? fallback;

  const set = useCallback(
    (next: T) => {
      const q = new URLSearchParams(params);
      next === fallback ? q.delete(key) : q.set(key, next);
      router.replace(\`\${pathname}?\${q}\`, { scroll: false });
    },
    [params, router, pathname, key, fallback],
  );

  return [value, set] as const;
}`,
    },
    sample: true,
  },
  {
    slug: "secure-rest-api",
    name: "Authenticated REST API",
    category: "Backend",
    visual: "api",
    summary: "Versioned REST API with token auth, role-based access, schema validation and uniform error responses.",
    stack: ["Node.js", "Express.js", "TypeScript", "PostgreSQL", "TypeORM"],
    users: "Frontend and mobile clients, and third-party integrators consuming a stable contract.",
    problem: "Ad-hoc validation and inconsistent errors made the API hard to consume and easy to misuse.",
    approach: "Define each endpoint’s contract as a schema, validate at the edge, centralise error mapping, and test the contract rather than the implementation.",
    links: {},
    architecture: [
      { label: "Router", detail: "Versioned routes (/v1) composed from feature modules." },
      { label: "Middleware", detail: "Auth, rate limiting, request id, schema validation." },
      { label: "Services", detail: "Business rules, independent of HTTP." },
      { label: "Repositories", detail: "Parameterised SQL and transactions." },
    ],
    decisions: [
      { title: "Schema-first validation", body: "One schema yields runtime validation and TypeScript types, so docs, code and tests cannot disagree." },
      { title: "Problem-details errors", body: "Every failure returns the same JSON shape with a stable code, so clients branch on codes, not message strings." },
      { title: "Short-lived access tokens", body: "Rotating refresh tokens limit the blast radius of leaks." },
    ],
    requirements: ["Stable, versioned contract", "Role-based access", "Predictable errors", "Safe concurrent writes"],
    techChoices: [
      { tech: "Express.js", why: "Minimal and middleware-based, so auth, validation and errors compose cleanly." },
      { tech: "PostgreSQL", why: "Relational integrity for users, roles and orders." },
      { tech: "TypeORM", why: "Entities and migrations map the domain model to tables; repositories hide query details." },
    ],
    implementation: {
      frontend: "Consumed by web and mobile clients; error codes drive client behaviour instead of message strings.",
      backend: "Versioned Express.js routes → validation middleware → services → repositories. Auth middleware attaches the principal; a central error handler maps failures to a single JSON shape.",
      database: "Entities for users, roles and orders with foreign keys and indexes; multi-step writes run inside transactions.",
    },
    challenge: "Making refresh-token rotation safe under concurrent requests without logging users out spuriously.",
    tradeoffs: [
      "Stateless tokens scale easily but make instant revocation harder; a small deny-list trades some state for control.",
      "Strict validation rejects sloppy clients early, which is stricter than some consumers expect.",
    ],
    qualities: {
      performance: "Indexed queries, pagination by cursor, short-TTL caching for read-heavy endpoints.",
      reliability: "Transactions around multi-step writes; idempotency keys on unsafe retries.",
      security: "Argon2id hashes, parameterised queries, per-route rate limits, least-privilege DB role.",
    },
    lessons: ["A uniform error contract is the best documentation.", "Test through the HTTP boundary."],
    future: ["Generate OpenAPI from schemas.", "Add structured tracing."],
    code: {
      filename: "http/validate.ts",
      language: "ts",
      code: `export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!parsed.success) {
      return res.status(422).json({
        type: "https://api.example.com/problems/validation",
        code: "validation_failed",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      });
    }
    Object.assign(req, parsed.data);
    next();
  };`,
    },
    schema: {
      filename: "POST /v1/orders",
      code: `// request
{ "items": [{ "sku": "A-100", "qty": 2 }], "couponCode": "SPRING" }

// 201
{ "id": "ord_01H…", "status": "pending", "total": { "amount": 4800, "currency": "USD" } }

// 422
{ "code": "validation_failed", "issues": [{ "path": "items.0.qty", "message": "Must be ≥ 1" }] }`,
    },
    sample: true,
  },
  {
    slug: "booking-marketplace",
    name: "Booking Marketplace",
    category: "Full Stack",
    visual: "booking",
    summary: "Two-sided marketplace with availability search, double-booking-proof reservations and payments.",
    stack: ["Next.js", "TypeScript", "Node.js", "Koa", "PostgreSQL"],
    users: "Providers publishing availability, and customers booking and paying online.",
    problem: "Two customers must never hold the same slot, even under concurrent requests and payment delays.",
    approach: "Hold slots with a short-lived reservation enforced by a database constraint, confirm on payment, and release automatically on expiry.",
    links: {},
    architecture: [
      { label: "Web", detail: "Search and booking flows with optimistic UI and clear failure states." },
      { label: "API", detail: "Reservation, payment and notification services." },
      { label: "PostgreSQL", detail: "Exclusion constraint prevents overlapping bookings." },
      { label: "Redis + jobs", detail: "Expiry of held slots, email and reminders." },
    ],
    decisions: [
      { title: "Constraint over code", body: "A Postgres exclusion constraint guarantees no overlaps regardless of app bugs or races." },
      { title: "Hold, then confirm", body: "A 10-minute hold decouples payment latency from slot safety." },
      { title: "Jobs for side-effects", body: "Emails and reminders run in a queue so a provider outage never fails a booking." },
    ],
    requirements: ["Never double-book a slot", "Fast availability search", "Payment confirmation", "Reliable notifications"],
    techChoices: [
      { tech: "Koa", why: "Small async-first core suits a focused reservation service." },
      { tech: "PostgreSQL", why: "Exclusion constraints enforce non-overlapping bookings in the database." },
      { tech: "Next.js", why: "Server-rendered search pages with a lightweight booking flow." },
    ],
    implementation: {
      frontend: "Search, slot picker with a visible hold timer, and clear expiry and payment-failure states.",
      backend: "Koa service: create hold → confirm on payment callback → release on expiry; side-effects run as background jobs.",
      database: "A bookings table with a time-range column and a GiST exclusion constraint scoped to held and confirmed rows.",
    },
    challenge: "Guaranteeing no double-booking while keeping the checkout fast and the expiry job correct.",
    tradeoffs: [
      "Holds can briefly make slots look unavailable; the UI explains this and shows a timer.",
      "Redis adds an operational dependency, accepted for reliable scheduled work.",
    ],
    qualities: {
      performance: "Availability search served from indexed ranges and cached for seconds.",
      reliability: "Constraints, retries with backoff, and a dead-letter queue for failed jobs.",
      security: "Server-side price calculation, signed payment callbacks, ownership checks on every booking.",
    },
    lessons: ["Let the database enforce invariants.", "Design the unhappy checkout paths as carefully as the happy one."],
    future: ["Calendar sync.", "Provider payouts dashboard."],
    code: {
      filename: "db/bookings.sql",
      language: "sql",
      code: `create extension if not exists btree_gist;

create table bookings (
  id          uuid primary key default gen_random_uuid(),
  provider_id uuid not null,
  slot        tstzrange not null,
  status      text not null default 'held',  -- held | confirmed | expired
  expires_at  timestamptz,
  exclude using gist (provider_id with =, slot with &&)
    where (status in ('held','confirmed'))
);`,
    },
    sample: true,
  },
  {
    slug: "release-automation-cli",
    name: "Release Automation CLI",
    category: "Developer Tools",
    visual: "cli",
    summary: "Command-line tool that validates, versions and publishes releases, with changelog generation from commit history.",
    stack: ["Node.js", "TypeScript"],
    users: "Engineering teams that want repeatable, low-ceremony releases.",
    problem: "Manual releases are slow, inconsistent and easy to get wrong.",
    approach: "Encode the release checklist as composable steps with a dry-run mode, so the pipeline and the laptop behave identically.",
    links: {},
    architecture: [
      { label: "CLI", detail: "Argument parsing, dry-run and verbose flags." },
      { label: "Planner", detail: "Reads commits, computes the next version and changelog." },
      { label: "Executor", detail: "Runs steps with rollback hooks." },
      { label: "CI", detail: "Same binary invoked from GitHub Actions." },
    ],
    decisions: [
      { title: "Plan, then execute", body: "A pure planning phase produces a reviewable plan; execution only follows the plan." },
      { title: "Dry-run by default in CI previews", body: "Pull requests show what would be released." },
    ],
    requirements: ["Same behaviour locally and in CI", "Reviewable before it runs", "Recoverable on failure"],
    techChoices: [
      { tech: "Node.js", why: "Shares the language and package ecosystem of the projects it releases." },
      { tech: "TypeScript", why: "Typed step contracts keep the planner and executor in sync." },
    ],
    implementation: {
      frontend: "Terminal output only: clear step status, dry-run summaries and actionable errors.",
      backend: "A pure planner computes versions and changelog; an executor runs steps with rollback hooks.",
      database: "None. State is derived from git history, which keeps the tool stateless.",
    },
    challenge: "Making multi-step publishes recoverable when a later step fails.",
    tradeoffs: ["Strict commit conventions give accurate versions but need team buy-in."],
    qualities: {
      performance: "Streams git history and runs independent checks concurrently.",
      reliability: "Rollback hooks and idempotent steps allow safe re-runs.",
      security: "Tokens read from the environment only and never logged.",
    },
    lessons: ["Dry-run modes make tools trustworthy.", "Separate planning from side effects."],
    future: ["Monorepo support.", "Plugin API."],
    code: {
      filename: "plan.ts",
      language: "ts",
      code: `export function nextVersion(current: string, commits: Commit[]) {
  const bump = commits.some((c) => c.breaking) ? "major"
             : commits.some((c) => c.type === "feat") ? "minor"
             : commits.length ? "patch" : null;
  return bump ? increment(current, bump) : current;
}`,
    },
    sample: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
