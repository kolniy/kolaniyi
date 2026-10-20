import { site } from "@/content/site";

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export type SocialLink = { label: string; href: string; icon: "mail" | "linkedin" | "github" };

/** Only configured channels are returned: no dead links. */
export function socialLinks(): SocialLink[] {
  const { email, linkedin, githubUsername } = site.contact;
  const out: SocialLink[] = [];
  if (email) out.push({ label: "Email", href: `mailto:${email}`, icon: "mail" });
  if (linkedin) out.push({ label: "LinkedIn", href: linkedin, icon: "linkedin" });
  if (githubUsername) out.push({ label: "GitHub", href: `https://github.com/${githubUsername}`, icon: "github" });
  return out;
}

export const hasResume = () => Boolean(site.contact.resumeUrl);
