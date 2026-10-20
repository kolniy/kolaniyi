/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single place to personalise the portfolio.
 *
 *  • Anything marked `REPLACE` is a placeholder and must be edited.
 *  • Empty strings are intentional: the UI hides links that aren't configured
 *    instead of rendering dead buttons.
 *  • Only list skills you can confidently speak to in an interview.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Link = { label: string; href: string };

export const site = {
  /** Brand name (rendered lowercase on purpose). */
  name: "kolaniyi",
  /** REPLACE: professional title. */
  title: "Software Engineer · Systems Design",
  /** Optional. Leave "" to hide. */
  location: "Abuja, Nigeria",
  /** Production URL; override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  seo: {
    description:
      "kolaniyi is a software engineer who designs and debugs distributed systems, from fraud and identity-verification pipelines to APIs and data layers, and ships fixes that measurably move reliability.",
  },

  availability: {
    /** Toggle the hero indicator and the contact-section status. */
    available: true,
    label: "Available for select opportunities",
  },

  hero: {
    label: "Software Engineer · Systems Design",
    headline: ["From interface to infrastructure.", "I engineer what holds up"],
    summary:
      "I’m kolaniyi, a software engineer who designs and debugs systems end to end, from interfaces and APIs to data layers and CI/CD. I trace problems to their root cause and build reliable, testable solutions, with experience across fintech, enterprise platforms and web products.",
  },

  contact: {
    /** REPLACE: public contact email. Leave "" to hide mailto links. */
    email: "kolniysoft@gmail.com",
    /** REPLACE: full URL, e.g. https://www.linkedin.com/in/your-handle */
    linkedin: "https://www.linkedin.com/in/kolaniyi/",
    /** REPLACE: your GitHub username (powers the GitHub section and link). */
    githubUsername: "kolniy",
    /** REPLACE: e.g. "/resume.pdf" (place the file in /public) or an absolute URL. */
    resumeUrl: "/aa-kolaniyi-resume-global-2026.pdf",
  },

  /** Extra profiles/writing. Rendered in the GitHub/Activity section. */
  activityLinks: [] as Link[],

  /**
   * Repos to feature (format "owner/name"). Fetched live from the GitHub API
   * (cached 1h). If empty, your most recently updated public repos are shown.
   */
  featuredRepos: [
    "kolniy/cicd-labs",
    "kolniy/Eshopper",
    "kolniy/Spotlight",
    "kolniy/echo",
    "kolniy/sentimental",
    "kolniy/everytindiscount",
  ] as string[],

  about: {
    /** REPLACE/verify: keep it factual. No claims about seniority or employers unless true. */
    paragraphs: [
      "I’m drawn to problems where the symptom and the cause live in different places: a failed verification that is really an exploitable gap in a pipeline, or a flaky integration that is really a missing retry and timeout policy. I start from evidence (traces, payloads, session records), find the actual failure mode, and fix that rather than patching around it.",
      "Day to day at ChipperCash I work on fraud prevention, identity verification and KYC onboarding across distributed services. I design for failure up front: clear service boundaries, defensive handling of third-party vendors, and automated tests that cover the unhappy paths as thoroughly as the happy one.",
      "I’ve worked across the whole stack, from React interfaces to GraphQL gateways, Prisma/SQL data layers and CI/CD, so I can reason about how a decision in one layer shows up in another. I work closely with risk, compliance, product and design, and I write decisions down so the next engineer inherits context, not guesswork.",
    ],
    aspirations:
      "I’m looking for hard, high-stakes problems in distributed systems, reliability and security, on a team that values clear thinking and shipping measurable improvements.",
    facts: [
      {
        label: "Focus",
        value: "Systems design · Reliability · Fraud & identity",
      },
      {
        label: "Working style",
        value: "Root-cause first, tested, written decisions",
      },
    ] as { label: string; value: string }[],
  },
} as const;

export const navItems: Link[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ───────────────────────────── Expertise ───────────────────────────── */

export type Discipline = {
  id: "frontend" | "backend" | "fullstack";
  index: string;
  name: string;
  tagline: string;
  description: string;
  /** Technology names; must match names in skills.ts. Empty = not shown. */
  stack: string[];
  capabilities: string[];
  /** Slugs from projects.ts */
  projects: string[];
};

export const disciplines: Discipline[] = [
  {
    id: "frontend",
    index: "01",
    name: "Interface Engineering",
    tagline: "Where users meet the system.",
    description:
      "Interfaces that stay fast, accessible and honest about system state, with loading, failure and empty states designed in rather than bolted on.",
    // Tailwind CSS: confirm it is part of your working stack, or remove it.
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    capabilities: [
      "Component architecture",
      "Responsive design",
      "UI state management",
      "API integration",
      "Performance optimization",
      "Accessibility",
      "Reusable design systems",
    ],
    projects: ["component-library-dashboard", "saas-billing-platform"],
  },
  {
    id: "backend",
    index: "02",
    name: "Backend & Systems Design",
    tagline: "Where correctness is decided.",
    description:
      "Designing services, APIs and data models that hold up under failure: clear boundaries, defensive integrations, and behaviour I can reason about and test.",
    stack: [
      "Node.js",
      "Express.js",
      "Koa",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "TypeORM",
    ],
    capabilities: [
      "REST API design",
      "Authentication and authorization",
      "Data modeling",
      "Input validation",
      "Database queries and relationships",
      "Failure modes, retries and timeouts",
      "Third-party and vendor integrations",
      "Fraud prevention and identity verification",
      "Reliability and security",
    ],
    projects: ["secure-rest-api", "booking-marketplace"],
  },
  {
    id: "fullstack",
    index: "03",
    name: "End-to-End Ownership",
    tagline: "Following a problem across layers.",
    description:
      "Tracing an issue from the screen to the queue to the database, then fixing it at the layer where it actually originates.",
    stack: [],
    capabilities: [
      "Root-cause investigation",
      "Service and API architecture",
      "Authentication and KYC workflows",
      "Database and API integration",
      "Automated testing in CI/CD",
      "Observability and debugging",
      "Cross-functional delivery",
      "Maintainability and performance",
    ],
    projects: ["saas-billing-platform", "booking-marketplace"],
  },
];

/* ──────────────────────────── Philosophy ──────────────────────────── */

export const principles = [
  {
    title: "Design from requirements and constraints",
    body: "Choose the simplest architecture that meets the real load, risk and team constraints, and add layers only when a measured need demands them.",
  },
  {
    title: "Readable, with clear responsibilities",
    body: "Code is read far more than it’s written. Clear names and boundaries make the next change cheaper.",
  },
  {
    title: "Design for failure first",
    body: "Timeouts, retries, partial outages and bad vendor responses are part of the design. Decide how it fails before it does.",
  },
  {
    title: "Assume an adversary",
    body: "Validate at every boundary, default to least privilege, and treat spoofing and abuse as expected traffic.",
  },
  {
    title: "Model the data carefully",
    body: "Schemas and relationships outlive UI code. Constraints in the database beat conventions in the app.",
  },
  {
    title: "Operable beats clever",
    body: "Prefer the boring solution a teammate can debug at 2am, with traces and logs that explain what happened.",
  },
  {
    title: "Root cause, not symptoms",
    body: "Reproduce, trace and measure first. Fix the cause that’s actually there, then verify the numbers moved.",
  },
  {
    title: "Test what matters",
    body: "Cover critical paths and contracts first; tests should protect behaviour, not implementation details.",
  },
  {
    title: "Improve through feedback",
    body: "Ship small, learn from real usage, write down why decisions were made, and iterate.",
  },
];

/* ───────────────────────────── Workflow ───────────────────────────── */

export const processSteps = [
  {
    n: "01",
    title: "Understand",
    body: "Define the problem, the failure being reported, the users affected, and the constraints.",
  },
  {
    n: "02",
    title: "Investigate & design",
    body: "Trace the root cause from logs and payloads, then define service boundaries, data models, APIs and trade-offs.",
  },
  {
    n: "03",
    title: "Build",
    body: "Implement the fix across services, data and interfaces in small, reviewable changes.",
  },
  {
    n: "04",
    title: "Connect",
    body: "Integrate APIs, queues, databases, authentication and third-party vendors with explicit failure handling.",
  },
  {
    n: "05",
    title: "Validate",
    body: "Automated tests for happy and failure paths, security review, and measured performance.",
  },
  {
    n: "06",
    title: "Deliver",
    body: "Ship through CI/CD, monitor the outcome, document decisions, and iterate on the data.",
  },
];

/* ───────────────────────────── Experience ───────────────────────────── */

export type ExperienceEntry = {
  kind:
    | "Employment"
    | "Freelance"
    | "Internship"
    | "Open source"
    | "Independent";
  role: string;
  org: string;
  dates: string;
  summary: string;
  responsibilities: string[];
  /** Only verified outcomes. */
  outcomes?: string[];
  stack: string[];
  /** Shows a "Sample" badge. Remove once the entry is real. */
  sample?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    kind: "Employment",
    role: "Software Engineer",
    org: "ChipperCash",
    dates: "2024 – Present",
    summary:
      "Engineering fraud prevention, identity verification, and KYC onboarding pipelines across distributed fintech services with a quality-first approach.",
    responsibilities: [
      "Designed and implemented fraud prevention and identity verification flows with a quality-first approach — including testability for spoofing detection, liveness checks, and document validation edge cases.",
      "Wrote and maintained automated test coverage for the onboarding and KYC pipeline, covering happy paths, failure modes, and third-party stub scenarios for biometric vendors.",
      "Investigated failed verification sessions end to end (request traces, vendor response payloads, session records) to identify exact exploitation vectors and ship targeted backend countermeasures.",
      "Collaborated cross-functionally with risk, compliance, and product teams to translate requirements into test plans and production-ready, quality-gated solutions.",
      "Worked across time zones within a distributed engineering team, adapting quickly to varying codebases and service boundaries.",
    ],
    outcomes: [
      "Reduced selfie spoofing attempts by ~95% by re-engineering the liveness and identity verification pipeline and shipping targeted backend countermeasures.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Microservices",
      "REST APIs",
      "Jest",
      "Supertest",
      "Playwright",
      "CI/CD",
      "Redis",
      "RabbitMQ",
    ],
  },
  {
    kind: "Employment",
    role: "Fullstack Developer",
    org: "DabbleLab Inc",
    dates: "2023 – 2024",
    summary:
      "Built and optimized reliable RESTful and GraphQL APIs, database architectures, and automated CI/CD integration testing across production-grade enterprise systems.",
    responsibilities: [
      "Built and optimized RESTful APIs with a focus on reliability and correctness — ensuring high code quality through testing, code reviews, and adherence to best practices.",
      "Authored integration and regression tests as part of CI/CD delivery pipelines for enterprise clients, including United Talent Agency (UTA).",
      "Audited error handling, retry logic, and timeout configurations across client integrations to diagnose and fix root causes rather than patching around them.",
      "Architected federated GraphQL and Prisma/SQL data access layers with automatic schema migrations and end-to-end type safety.",
      "Collaborated across distributed teams, championing testing discipline, reviewing test code, and driving coverage for critical user flows.",
    ],
    outcomes: [
      "Improved API response reliability by 35% across client integrations by correcting root-cause error handling, retry, and timeout issues.",
      "Modularized service architecture with federated GraphQL and Prisma ORM, streamlining deployments and schema migrations.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "REST APIs",
      "GraphQL",
      "Prisma",
      "SQL",
      "Jest",
      "CI/CD",
    ],
  },
  {
    kind: "Employment",
    role: "Fullstack Developer",
    org: "Degraphe",
    dates: "2021 – 2023",
    summary:
      "Developed, secured, and maintained full-stack MERN web applications from responsive UI components to backend APIs, database optimization, and cloud deployment.",
    responsibilities: [
      "Developed and maintained web applications using the MERN stack, ensuring responsive and accessible user experiences.",
      "Utilized MongoDB to manage and optimize database schemas and queries for dynamic data storage.",
      "Built responsive UI components matching design specifications using React, Tailwind CSS, and Bootstrap.",
      "Implemented security best practices including JWT authentication and input validation to safeguard applications from vulnerabilities and threats.",
      "Mentored junior developers through pair programming and knowledge-sharing sessions, while monitoring application performance and uptime across DigitalOcean and GitHub Actions CI/CD pipelines.",
    ],
    outcomes: [
      "Successfully built, secured, and shipped multi-talent web applications with automated CI/CD deployment workflows.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Bootstrap",
      "REST APIs",
      "JWT",
      "GitHub Actions",
      "DigitalOcean",
    ],
  },
  {
    kind: "Employment",
    role: "Front-End Web Design Instructor",
    org: "Gention Global Resources",
    dates: "2016 – 2018",
    summary:
      "Mentored and trained aspiring software developers in core modern web technologies, responsive layout techniques, and standard development workflows.",
    responsibilities: [
      "Delivered hands-on technical curriculum and tutoring in HTML5, CSS3, and vanilla JavaScript.",
      "Guided students through practical web application projects, Git version control, and browser debugging workflows.",
      "Conducted code reviews and provided targeted feedback to reinforce web standards and accessible layout design.",
    ],
    outcomes: [
      "Mentored multiple cohorts of aspiring developers, equipping them with foundational skills to build responsive web applications.",
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Git", "Responsive Design"],
  },
];

export const education: {
  title: string;
  org: string;
  dates: string;
  sample?: boolean;
}[] = [
  {
    title: "The Andela Bootcamp",
    org: "Andela",
    dates: "2018",
  },
  {
    title: "MERN Stack Front to Back: Full Stack React, Redux & Node.js",
    org: "Udemy",
    dates: "2020",
  },
  {
    title: "The Complete React Developer Course (w/ Hooks and Redux)",
    org: "Udemy",
    dates: "2019",
  },
  {
    title: "The Complete Node.js Developer Course (3rd Edition)",
    org: "Udemy",
    dates: "2019",
  },
];
