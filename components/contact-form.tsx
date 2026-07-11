"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "business" | "email" | "phone" | "message" | "need";

type Errors = Partial<Record<FieldName, string>>;

const NEED_OPTIONS = [
  { value: "new-website", label: "New website" },
  { value: "redesign", label: "Redesign" },
  { value: "not-sure", label: "Not sure" },
] as const;

/**
 * Client-side validation exists purely for fast feedback. The server-side
 * Zod schema in app/api/contact/route.ts is the source of truth.
 */
function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};

  if (!values.name) errors.name = "Please tell us your name.";
  else if (values.name.length > 100)
    errors.name = "Please keep this under 100 characters.";

  if (!values.business) errors.business = "Please tell us your business name.";
  else if (values.business.length > 100)
    errors.business = "Please keep this under 100 characters.";

  if (!values.email) errors.email = "Please enter your email so we can reply.";
  else if (
    values.email.length > 200 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  )
    errors.email = "That email doesn’t look right — please double-check it.";

  if (values.phone && values.phone.length > 40)
    errors.phone = "Please keep the phone number under 40 characters.";

  if (!values.message || values.message.length < 10)
    errors.message = "Please tell us a little more — a sentence or two is plenty.";
  else if (values.message.length > 2000)
    errors.message = "Please keep your message under 2,000 characters.";

  if (!NEED_OPTIONS.some((option) => option.value === values.need))
    errors.need = "Please choose an option.";

  return errors;
}

const inputClass = (invalid: boolean) =>
  `mt-1.5 w-full rounded-[2px] border bg-white px-3.5 py-2.5 text-[15px] ${
    invalid ? "border-red-700" : "border-ink/25"
  }`;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  // Used for the minimum-time-to-submit spam check on the server.
  const [renderedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const values: Record<FieldName, string> = {
      name: String(formData.get("name") ?? "").trim(),
      business: String(formData.get("business") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      need: String(formData.get("need") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(formData.get("website") ?? ""),
          elapsedMs: Date.now() - renderedAt,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }
      setServerError(
        response.status === 429
          ? "You’ve sent a few messages in a row — please wait a little while and try again."
          : "Something went wrong sending your message. Please try again in a minute.",
      );
      setStatus("error");
    } catch {
      setServerError(
        "We couldn’t reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-line bg-white p-8">
        <p className="font-display text-2xl font-semibold tracking-tight">
          Thanks — I’ll get back to you within one business day.
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Your message is on its way. No newsletters, no follow-up sequences —
          just a straight answer.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-business" className="text-sm font-medium">
            Business name
          </label>
          <input
            id="contact-business"
            name="business"
            type="text"
            autoComplete="organization"
            maxLength={100}
            required
            aria-invalid={errors.business ? true : undefined}
            aria-describedby={errors.business ? "contact-business-error" : undefined}
            className={inputClass(Boolean(errors.business))}
          />
          {errors.business && (
            <p id="contact-business-error" className="mt-1.5 text-sm text-red-700">
              {errors.business}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-sm text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium">
            Phone <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1.5 text-sm text-red-700">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-need" className="text-sm font-medium">
          What do you need?
        </label>
        <select
          id="contact-need"
          name="need"
          required
          defaultValue="new-website"
          aria-invalid={errors.need ? true : undefined}
          aria-describedby={errors.need ? "contact-need-error" : undefined}
          className={inputClass(Boolean(errors.need))}
        >
          {NEED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.need && (
          <p id="contact-need-error" className="mt-1.5 text-sm text-red-700">
            {errors.need}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          required
          placeholder="What does your business do, and what should your website be doing better?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={inputClass(Boolean(errors.message))}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from real users via CSS; bots that fill it are
          silently discarded by the server. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request my free audit"}
        </button>
        <p className="text-sm text-ink-soft">
          We reply to every message within one business day.
        </p>
      </div>
    </form>
  );
}
