import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col justify-between gap-3 text-sm text-subtle sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p className="font-mono">Built with Next.js, TypeScript &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
