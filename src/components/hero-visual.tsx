/**
 * Decorative system diagram inside an editor-style frame.
 * Pure server component: motion is CSS-only and disabled for reduced motion.
 */
const nodes = [
  { id: "client", x: 20, y: 28, w: 92, label: "Client", sub: "React · Next.js", tone: "#67e8f9" },
  { id: "api", x: 164, y: 28, w: 92, label: "API", sub: "Node · REST", tone: "#4f8bff" },
  { id: "db", x: 308, y: 4, w: 92, label: "Database", sub: "PostgreSQL", tone: "#b79cff" },
  { id: "queue", x: 308, y: 76, w: 92, label: "Workers", sub: "Jobs · Queue", tone: "#b79cff" },
];

const edges = [
  "M112 52 H164",
  "M256 46 C282 46 282 28 308 28",
  "M256 58 C282 58 282 100 308 100",
];

export function HeroVisual() {
  return (
    <figure
      className="code-block relative shadow-[0_30px_80px_-30px_rgb(79_139_255/0.18)]"
      aria-label="Illustration: a client, API, database and worker queue connected as one system"
    >
      <div className="code-bar">
        <span className="dot" /> <span className="dot" /> <span className="dot" />
        <span className="ml-2">system.ts</span>
        <span className="ml-auto hidden sm:inline">end-to-end</span>
      </div>

      <div className="px-4 pt-6 sm:px-6">
        <svg viewBox="0 0 420 128" className="h-auto w-full" role="presentation">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          {edges.map((d) => (
            <g key={d}>
              <path d={d} fill="none" stroke="#3a3a42" strokeWidth="1.5" />
              <path d={d} fill="none" stroke="#4f8bff" strokeWidth="1.5" strokeDasharray="4 8" className="flow" opacity=".9" />
            </g>
          ))}
          {nodes.map((n) => (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={n.w} height="48" rx="10" fill="#111115" stroke="#2c2c33" />
              <rect x={n.x} y={n.y} width="3" height="48" rx="1.5" fill={n.tone} />
              <text x={n.x + 14} y={n.y + 21} fill="#f2f2f3" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-sans)">
                {n.label}
              </text>
              <text x={n.x + 14} y={n.y + 37} fill="#8a8a94" fontSize="8.5" fontFamily="var(--font-geist-mono)">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <pre className="!pt-2 text-[0.78rem] leading-7" aria-hidden>
        <code>
          <span className="text-subtle">{"// one engineer, the whole path"}</span>
          {"\n"}
          <span className="text-signal-violet">const</span> product = <span className="text-signal-blue">ship</span>({"{"}
          {"\n  "}ui: <span className="text-accent">&quot;accessible, fast&quot;</span>,
          {"\n  "}api: <span className="text-accent">&quot;validated, secure&quot;</span>,
          {"\n  "}data: <span className="text-accent">&quot;modelled, migrated&quot;</span>,
          {"\n  "}ops: <span className="text-accent">&quot;observable&quot;</span>,
          {"\n"}
          {"}"});<span className="caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-accent" />
        </code>
      </pre>
    </figure>
  );
}
