import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Best-effort per-instance rate limit. For production at scale use a shared store (Redis/Upstash).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

const json = (body: Record<string, unknown>, status: number) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    return json({ ok: false, code: "not_configured", message: "The contact form isn’t connected to an email service yet." }, 503);
  }

  // Same-origin only.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return json({ ok: false, code: "forbidden", message: "Cross-origin requests are not allowed." }, 403);
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Expected JSON." }, 415);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return json({ ok: false, code: "rate_limited", message: "Too many messages. Please try again later." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: "Invalid JSON." }, 400);
  }

  // Spam traps: a hidden field humans never fill, and a minimum fill time.
  const tooFast = typeof body.t === "number" && Date.now() - body.t < 2500;
  if (body.website || tooFast) {
    return json({ ok: true }, 200); // pretend success so bots don't adapt
  }

  const result = validateContact(body);
  if (!result.value) return json({ ok: false, code: "validation_failed", errors: result.errors }, 422);
  const { name, email, message } = result.value;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
        html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        text: `${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`provider ${res.status}`);
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] delivery failed:", err instanceof Error ? err.message : err);
    return json({ ok: false, code: "delivery_failed", message: "Couldn’t send your message right now. Please try again or use email." }, 502);
  }
}
