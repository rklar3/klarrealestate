"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/cn";

const INTENT_OPTIONS = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "both", label: "Both" },
  { value: "exploring", label: "Just exploring" },
] as const;

const BUDGET_OPTIONS = [
  "Under $600,000",
  "$600,000–$900,000",
  "$900,000–$1,200,000",
  "$1,200,000–$2,000,000",
  "$2,000,000+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  listingSlug,
  heading = "Send a message",
}: {
  listingSlug?: string;
  heading?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const budgetId = useId();
  const timelineId = useId();
  const messageId = useId();
  const consentId = useId();
  const companyId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      intent: String(formData.get("intent") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      message: String(formData.get("message") ?? ""),
      listingSlug: listingSlug ?? "",
      consent: formData.get("consent") === "on",
      company: String(formData.get("company") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setFirstName(payload.name.split(" ")[0] ?? payload.name);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again, or call/email directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card bg-success/10 p-8 text-center">
        <p className="text-xl font-semibold text-success">Thanks, {firstName}!</p>
        <p className="mt-2 text-muted-1">
          Your message is in. Sanam typically replies within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="@container space-y-5">
      <h3 className="text-2xl">{heading}</h3>

      {/* Honeypot — hidden from real users, left blank by them; bots often fill it in. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={companyId}>Company</label>
        <input id={companyId} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 @md:grid-cols-2">
        <div>
          <label htmlFor={nameId} className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className="mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink"
          />
          {errors.name && (
            <p id={`${nameId}-error`} className="mt-1 text-sm text-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={phoneId} className="text-sm font-medium text-ink">
            Phone <span className="text-muted-2">(optional)</span>
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink"
          />
        </div>
      </div>

      <div>
        <label htmlFor={emailId} className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          className="mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink"
        />
        {errors.email && (
          <p id={`${emailId}-error`} className="mt-1 text-sm text-error">
            {errors.email}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          What are you looking to do?
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTENT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-full border border-muted-3/50 px-4 py-2 text-sm has-[:checked]:border-terracotta has-[:checked]:bg-terracotta has-[:checked]:text-cream"
            >
              <input
                type="radio"
                name="intent"
                value={option.value}
                required
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.intent && <p className="mt-1 text-sm text-error">{errors.intent}</p>}
      </fieldset>

      <div className="grid gap-5 @md:grid-cols-2">
        <div>
          <label htmlFor={budgetId} className="text-sm font-medium text-ink">
            Budget <span className="text-muted-2">(optional)</span>
          </label>
          <select
            id={budgetId}
            name="budget"
            defaultValue=""
            className="mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink"
          >
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={timelineId} className="text-sm font-medium text-ink">
            Timeline <span className="text-muted-2">(optional)</span>
          </label>
          <select
            id={timelineId}
            name="timeline"
            defaultValue=""
            className="mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink"
          >
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className="text-sm font-medium text-ink">
          Message <span className="text-muted-2">(optional)</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          className="mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink"
        />
      </div>

      <div>
        <label htmlFor={consentId} className="flex items-start gap-3 text-sm text-muted-1">
          <input id={consentId} name="consent" type="checkbox" required className="mt-1" />
          <span>
            I agree to be contacted about my inquiry and have read the{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-error">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "w-full rounded-full bg-terracotta px-6 py-3 font-semibold text-cream transition-colors hover:bg-terracotta-dark disabled:opacity-60 sm:w-auto",
        )}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
