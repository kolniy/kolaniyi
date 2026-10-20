import type { VisualKind } from "@/content/projects";

/**
 * Original, abstract product visualisations: placeholders for real screenshots.
 * To use a real screenshot, add `image` handling in ProjectCard / the case-study page.
 */
const bar = "rounded-full bg-line-strong/70";

export function ProjectVisual({ kind, label }: { kind: VisualKind; label: string }) {
  return (
    <div
      role="img"
      aria-label={`Abstract interface illustration for ${label}`}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-[#0b0b0e] p-4"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgb(79_139_255/0.10),transparent)]" />
      <div aria-hidden className="relative h-full">
        {kind === "dashboard" && (
          <div className="grid h-full grid-cols-[3rem_1fr] gap-3">
            <div className="space-y-2 border-r border-line pr-3 pt-1">
              {[1, 2, 3, 4].map((i) => <div key={i} className={`h-2 ${bar} ${i === 1 ? "!bg-accent" : ""}`} />)}
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {["MRR", "Seats", "Plan"].map((t) => (
                  <div key={t} className="rounded-md border border-line bg-surface p-2">
                    <div className="font-mono text-[9px] text-subtle">{t}</div>
                    <div className={`mt-2 h-2.5 w-2/3 ${bar}`} />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-end gap-1.5 rounded-md border border-line bg-surface p-3">
                {[35, 50, 42, 68, 55, 80, 72, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-accent/70" style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {kind === "components" && (
          <div className="grid h-full grid-cols-2 gap-3">
            <div className="space-y-2.5 rounded-md border border-line bg-surface p-3">
              <div className="h-6 w-20 rounded-full bg-accent" />
              <div className="h-6 w-20 rounded-full border border-line-strong" />
              <div className="flex gap-1.5">{[1, 2, 3].map((i) => <div key={i} className="h-5 w-10 rounded-md border border-line-strong" />)}</div>
              <div className="h-2 w-full rounded-full bg-line"><div className="h-2 w-2/3 rounded-full bg-accent" /></div>
            </div>
            <div className="rounded-md border border-line bg-surface p-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
                  <div className={`h-2 w-2 rounded-sm ${i === 1 ? "bg-accent" : "bg-line-strong"}`} />
                  <div className={`h-1.5 flex-1 ${bar}`} /> <div className={`h-1.5 w-6 ${bar}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {kind === "api" && (
          <pre className="font-mono text-[10px] leading-5 text-muted sm:text-xs">
            <span className="text-accent">POST</span> /v1/orders{"\n"}
            <span className="text-signal-blue">Authorization:</span> Bearer ••••{"\n\n"}
            {"{ "}<span className="text-signal-violet">&quot;items&quot;</span>: [ … ] {"}"}{"\n\n"}
            <span className="text-accent">201</span> Created{"\n"}
            <span className="text-subtle">{"{ \"id\": \"ord_…\", \"status\": \"pending\" }"}</span>
          </pre>
        )}

        {kind === "booking" && (
          <div className="grid h-full grid-cols-7 content-start gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-md border ${
                  [9, 10, 16].includes(i) ? "border-accent bg-accent/80" : [3, 4, 11, 18, 19, 24].includes(i) ? "border-line bg-line" : "border-line bg-surface"
                }`}
              />
            ))}
          </div>
        )}

        {kind === "cli" && (
          <pre className="font-mono text-[10px] leading-5 text-muted sm:text-xs">
            <span className="text-accent">$</span> release --dry-run{"\n"}
            <span className="text-subtle">✓ checks passed</span>{"\n"}
            <span className="text-subtle">✓ 2 feat, 3 fix → minor</span>{"\n"}
            <span className="text-signal-blue">→</span> v1.4.0 (planned){"\n"}
            <span className="text-accent">$</span> <span className="caret inline-block h-3 w-1.5 bg-accent align-middle" />
          </pre>
        )}
      </div>
    </div>
  );
}
