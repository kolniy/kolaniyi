"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { LIMITS, validateContact, type FieldErrors } from "@/lib/contact";

type State = { status: "idle" | "sending" | "success" | "error"; message?: string };

export function ContactForm({ configured }: { configured: boolean }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>({ status: "idle" });
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const check = validateContact({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
    if (!check.value) {
      setErrors(check.errors ?? {});
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const first = (["name", "email", "message"] as const).find((k) => check.errors?.[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return;
    }
    setErrors({});
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.value, website: data.get("website"), t: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (res.ok && body.ok) {
        setState({ status: "success" });
        formRef.current?.reset();
      } else if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setState({ status: "idle" });
      } else {
        setState({ status: "error", message: body.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setState({ status: "error", message: "Network error. Check your connection and try again." });
    }
  }

  if (state.status === "success") {
    return (
      <div role="status" className="card flex flex-col items-start gap-3 p-8">
        <CheckCircle2 className="text-accent" size={28} />
        <p className="text-xl font-medium">Message sent. Thank you.</p>
        <p className="text-muted">I’ll reply as soon as I can.</p>
        <button type="button" className="btn btn-ghost mt-2" onClick={() => setState({ status: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  const field = "w-full rounded-xl border bg-bg px-4 py-3 text-fg placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50";
  const ring = (k: keyof FieldErrors) => (errors[k] ? "border-red-400" : "border-line-strong");

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8" aria-describedby="form-note">
      {!configured && (
        <p id="form-note" className="rounded-xl border border-dashed border-line-strong p-4 text-sm text-muted">
          <strong className="text-fg">Not connected yet.</strong> Set <code className="font-mono text-accent">RESEND_API_KEY</code>,{" "}
          <code className="font-mono text-accent">CONTACT_TO_EMAIL</code> and <code className="font-mono text-accent">CONTACT_FROM_EMAIL</code> to
          enable delivery. Until then, submissions are rejected with a clear error.
        </p>
      )}

      {(["name", "email"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={`c-${k}`} className="mb-2 block text-sm font-medium">
            {k === "name" ? "Name" : "Email"}
          </label>
          <input
            id={`c-${k}`}
            name={k}
            type={k === "email" ? "email" : "text"}
            autoComplete={k === "email" ? "email" : "name"}
            maxLength={k === "email" ? LIMITS.email : LIMITS.name}
            required
            aria-invalid={Boolean(errors[k])}
            aria-describedby={errors[k] ? `c-${k}-err` : undefined}
            className={`${field} ${ring(k)}`}
          />
          {errors[k] && <p id={`c-${k}-err`} className="mt-2 text-sm text-red-300">{errors[k]}</p>}
        </div>
      ))}

      <div>
        <label htmlFor="c-message" className="mb-2 block text-sm font-medium">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "c-message-err" : undefined}
          className={`${field} resize-y ${ring("message")}`}
        />
        {errors.message && <p id="c-message-err" className="mt-2 text-sm text-red-300">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="hp" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">
        {state.status === "error" && (
          <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">
            {state.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={state.status === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
        {state.status === "sending" ? <><Loader2 size={17} className="animate-spin" /> Sending…</> : <>Send message <Send size={16} /></>}
      </button>
    </form>
  );
}
