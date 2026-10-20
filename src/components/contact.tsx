import { ArrowUpRight, Download, Mail } from "lucide-react";
import { site } from "@/content/site";
import { hasResume, socialLinks } from "@/lib/utils";
import { ContactForm } from "./contact-form";
import { GithubIcon, LinkedinIcon } from "./icons";

const icons = { mail: Mail, linkedin: LinkedinIcon, github: GithubIcon } as const;

export function Contact() {
  const links = socialLinks();
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);

  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line" aria-labelledby="contact-title">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-page relative grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="h-display mt-6 !text-[clamp(2.2rem,5.5vw,4.25rem)]">
            Have a hard problem? <span className="text-accent">Let&apos;s design the fix.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Whether you’re hiring, scaling a product, or chasing a stubborn reliability or security issue in a distributed system, I’d like to hear what you’re working on.
          </p>

          {site.availability.available && (
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> {site.availability.label}
            </p>
          )}

          <ul className="mt-10 flex flex-col gap-3">
            {links.map((l) => {
              const Icon = icons[l.icon];
              const external = !l.href.startsWith("mailto:");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card card-hover group flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={18} />
                      <span>
                        <span className="block text-sm text-subtle">{l.label}</span>
                        <span className="block break-all">{l.icon === "mail" ? site.contact.email : l.href.replace(/^https?:\/\/(www\.)?/, "")}</span>
                      </span>
                    </span>
                    <ArrowUpRight size={18} className="text-subtle transition-colors group-hover:text-accent" />
                  </a>
                </li>
              );
            })}
            {links.length === 0 && (
              <li className="card border-dashed p-5 text-sm text-muted">
                <strong className="text-fg">No contact channels configured.</strong> Add <code className="font-mono text-accent">email</code>,{" "}
                <code className="font-mono text-accent">linkedin</code> and <code className="font-mono text-accent">githubUsername</code> under{" "}
                <code className="font-mono">contact</code> in <code className="font-mono">src/content/site.ts</code>.
              </li>
            )}
          </ul>

          {hasResume() && (
            <a href={site.contact.resumeUrl} download className="btn btn-ghost mt-6">
              <Download size={17} /> Download résumé
            </a>
          )}
        </div>

        <div className="reveal">
          <ContactForm configured={configured} />
        </div>
      </div>
    </section>
  );
}
