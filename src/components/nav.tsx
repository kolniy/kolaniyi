"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/content/site";
import { initials } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section nearest the top of the viewport.
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,padding] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/85 py-3 backdrop-blur-md" : "border-b border-transparent py-5"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-6">
        <a href="#home" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-surface-2 font-mono text-sm font-semibold text-accent transition-colors group-hover:border-accent">
            {initials(site.name)}
          </span>
          <span className="hidden font-medium tracking-tight sm:inline">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors hover:text-fg ${
                    active === item.href ? "text-fg" : "text-muted"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ${
                      active === item.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary !min-h-10 !px-4 !py-2 text-sm">
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="container-page mt-4 border-t border-line pb-6 pt-4 lg:hidden"
      >
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-4 text-xl tracking-tight"
              >
                {item.label}
                <span className="font-mono text-xs text-subtle">{item.href.slice(1)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
