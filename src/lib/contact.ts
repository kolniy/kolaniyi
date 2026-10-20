/** Validation shared by the client form (fast feedback) and the API route (authoritative). */
export type ContactInput = { name: string; email: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 100, email: 254, message: 4000, minMessage: 10 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>): {
  value?: ContactInput;
  errors?: FieldErrors;
} {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const errors: FieldErrors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email address doesn’t look right.";

  if (message.length < LIMITS.minMessage) errors.message = `Tell me a little more (at least ${LIMITS.minMessage} characters).`;
  else if (message.length > LIMITS.message) errors.message = `Please keep the message under ${LIMITS.message} characters.`;

  return Object.keys(errors).length ? { errors } : { value: { name, email, message } };
}
