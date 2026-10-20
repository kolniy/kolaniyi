"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "cursor-pref";

/**
 * Optional desktop cursor follower. The native cursor is never hidden; this is
 * an additive ring. Off for touch, reduced motion, or when the user opts out.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const ok =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        localStorage.getItem(KEY) !== "off";
      setOn(ok);
    };
    evaluate();
    window.addEventListener("cursor-pref", evaluate);
    return () => window.removeEventListener("cursor-pref", evaluate);
  }, []);

  useEffect(() => {
    if (!on) return;
    const el = ring.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          el.style.opacity = "1";
        });
      }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      el.dataset.active = t?.closest("a, button, [role=tab], input, textarea, [data-cursor]") ? "true" : "false";
    };
    const leave = () => { el.style.opacity = "0"; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [on]);

  if (!on) return null;
  return (
    <div ref={ring} aria-hidden className="cursor-ring" style={{ opacity: 0 }}>
      <span />
    </div>
  );
}

export function CursorToggle() {
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setAvailable(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    setEnabled(localStorage.getItem(KEY) !== "off");
  }, []);

  if (!available) return null;
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => {
        const next = !enabled;
        localStorage.setItem(KEY, next ? "on" : "off");
        setEnabled(next);
        window.dispatchEvent(new Event("cursor-pref"));
      }}
      className="font-mono text-xs underline-offset-4 hover:text-fg hover:underline"
    >
      Cursor effect: {enabled ? "on" : "off"}
    </button>
  );
}
