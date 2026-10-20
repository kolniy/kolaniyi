/**
 * TECHNOLOGY MAP DATA
 * Neutral descriptions of what each technology is for. These are NOT proficiency
 * claims. No levels, percentages or years. "Used in" links are derived from the
 * `stack` of entries in projects.ts, so they only show what the projects state.
 */
export type Tech = {
  name: string;
  summary: string;
  /** Names of related technologies (highlighted together on selection). */
  related: string[];
};

export type TechCategory = {
  id: string;
  label: string;
  role: string;
  items: Tech[];
};

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    role: "Interface",
    items: [
      { name: "React", summary: "Component-based UI library for building interactive interfaces.", related: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { name: "Next.js", summary: "React framework with routing, server rendering and API routes.", related: ["React", "TypeScript", "Node.js"] },
      { name: "TypeScript", summary: "Typed JavaScript that catches contract mistakes before runtime, on both client and server.", related: ["React", "Next.js", "Node.js", "Prisma", "TypeORM"] },
      { name: "Tailwind CSS", summary: "Utility-first CSS framework driven by a design-token scale.", related: ["React", "Next.js"] },
    ],
  },
  {
    id: "runtime",
    label: "Runtime",
    role: "Execution",
    items: [
      { name: "Node.js", summary: "JavaScript runtime used to run server-side applications and tooling.", related: ["Express.js", "Koa", "Next.js", "TypeScript"] },
    ],
  },
  {
    id: "frameworks",
    label: "Backend frameworks",
    role: "HTTP layer",
    items: [
      { name: "Express.js", summary: "Minimal, widely used Node.js web framework built around middleware.", related: ["Node.js", "Prisma", "TypeORM", "PostgreSQL", "MongoDB"] },
      { name: "Koa", summary: "Lean Node.js framework using async middleware composition.", related: ["Node.js", "PostgreSQL", "MongoDB"] },
    ],
  },
  {
    id: "nosql",
    label: "NoSQL database",
    role: "Document data",
    items: [
      { name: "MongoDB", summary: "Document database storing flexible, JSON-like records.", related: ["Node.js", "Express.js", "Koa"] },
    ],
  },
  {
    id: "relational",
    label: "Relational database",
    role: "Relational data",
    items: [
      { name: "PostgreSQL", summary: "Relational database with strong constraints, transactions and rich querying.", related: ["Prisma", "TypeORM", "Express.js", "Koa"] },
    ],
  },
  {
    id: "orm",
    label: "ORM / data access",
    role: "Data access",
    items: [
      { name: "Prisma", summary: "Schema-first ORM that generates a type-safe client and migrations.", related: ["PostgreSQL", "TypeScript", "Node.js"] },
      { name: "TypeORM", summary: "Decorator-based ORM supporting multiple SQL databases.", related: ["PostgreSQL", "TypeScript", "Node.js"] },
    ],
  },
];
