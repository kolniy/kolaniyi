import { ArrowRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { hasResume } from "@/lib/utils";
import { HeroVisual } from "./hero-visual";
import { TiltFrame } from "./tilt-frame";

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  const [line1, line2] = site.hero.headline;
  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-20 pt-32"
    >
      <div className="ambient" aria-hidden />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <div
            className="rise flex flex-wrap items-center gap-3"
            style={idx(0)}
          >
            <span className="annot rounded-full border border-line-strong px-3 py-1.5">
              {site.hero.label}
            </span>
            {site.availability.available && (
              <p className="inline-flex items-center gap-2.5 text-sm text-muted">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                {site.availability.label}
              </p>
            )}
          </div>

          <h1 className="h-display mt-7">
            <span className="clip-line">
              <span className="clip-inner" style={idx(1)}>
                {line1}
              </span>
            </span>
            <span className="clip-line text-accent">
              <span className="clip-inner" style={idx(2)}>
                {line2}
              </span>
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted"
            style={idx(4)}
          >
            {site.hero.summary}
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={idx(5)}>
            <a href="#projects" className="btn btn-primary">
              Explore My Work <ArrowRight size={18} className="arrow" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
            {hasResume() && (
              <a
                href={site.contact.resumeUrl}
                className="btn btn-ghost"
                download
              >
                <Download size={17} /> Résumé
              </a>
            )}
          </div>

          <dl
            className="rise mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-6 annot"
            style={idx(6)}
          >
            {["01 Frontend", "02 Backend", "03 Full-stack"].map((d) => (
              <div key={d}>
                <dt className="sr-only">Discipline</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise" style={idx(3)}>
          <TiltFrame>
            <HeroVisual />
          </TiltFrame>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-subtle transition-colors hover:text-fg md:block"
      >
        <span className="relative block h-9 w-5 rounded-full border border-line-strong">
          <span className="scroll-cue-dot absolute left-1/2 top-2 h-1.5 w-1 -translate-x-1/2 rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
