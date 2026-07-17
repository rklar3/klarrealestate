"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { valuationSchema } from "@/lib/validation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const PROPERTY_TYPES = ["House", "Condo", "Townhome", "Other"] as const;

const inputClass =
  "mt-2 w-full rounded-control border border-muted-3/50 bg-paper px-4 py-3 text-ink";

export function ValuationForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState<(typeof PROPERTY_TYPES)[number]>("House");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [approxSqft, setApproxSqft] = useState("");

  const addressId = useId();
  const cityId = useId();
  const bedsId = useId();
  const bathsId = useId();
  const sqftId = useId();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const consentId = useId();
  const companyId = useId();

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim() || !city) {
      setErrors({ address: !address.trim() ? "Please enter the property address" : "", city: !city ? "Please select a city" : "" });
      return;
    }
    setErrors({});
    setStep(2);
  }

  function goToStep3(e: React.FormEvent) {
    e.preventDefault();
    setStep(3);
  }

  async function handleFinalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      address,
      city,
      propertyType,
      beds,
      baths,
      approxSqft,
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      consent: formData.get("consent") === "on",
      company: String(formData.get("company") ?? ""),
    };

    const parsed = valuationSchema.safeParse(payload);
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
      const res = await fetch("/api/valuation", {
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
          Sanam will follow up with a valuation estimate within one business day.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-8 flex gap-2 text-xs font-semibold uppercase tracking-wide text-muted-2" aria-label="Form progress">
        {["Address", "Details", "Contact"].map((label, index) => (
          <li
            key={label}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-center",
              step === index + 1 ? "bg-terracotta text-cream" : "bg-sand",
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <form onSubmit={goToStep2} className="@container space-y-5">
          <div>
            <label htmlFor={addressId} className="text-sm font-medium text-ink">
              Property address
            </label>
            <input
              id={addressId}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={inputClass}
            />
            {errors.address && <p className="mt-1 text-sm text-error">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor={cityId} className="text-sm font-medium text-ink">
              City
            </label>
            <select
              id={cityId}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select a city</option>
              {siteConfig.serviceAreas.map((area) => (
                <option key={area.slug} value={area.name}>
                  {area.name}
                </option>
              ))}
              <option value="Other">Other Okanagan community</option>
            </select>
            {errors.city && <p className="mt-1 text-sm text-error">{errors.city}</p>}
          </div>
          <button
            type="submit"
            className="rounded-full bg-terracotta px-6 py-3 font-semibold text-cream hover:bg-terracotta-dark"
          >
            Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={goToStep3} className="@container space-y-5">
          <div>
            <span className="text-sm font-medium text-ink">Property type</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => (
                <label
                  key={type}
                  className="cursor-pointer rounded-full border border-muted-3/50 px-4 py-2 text-sm has-[:checked]:border-terracotta has-[:checked]:bg-terracotta has-[:checked]:text-cream"
                >
                  <input
                    type="radio"
                    name="propertyType"
                    className="sr-only"
                    checked={propertyType === type}
                    onChange={() => setPropertyType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-5 @md:grid-cols-3">
            <div>
              <label htmlFor={bedsId} className="text-sm font-medium text-ink">
                Bedrooms
              </label>
              <input
                id={bedsId}
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={bathsId} className="text-sm font-medium text-ink">
                Bathrooms
              </label>
              <input
                id={bathsId}
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={sqftId} className="text-sm font-medium text-ink">
                Approx. sqft
              </label>
              <input
                id={sqftId}
                value={approxSqft}
                onChange={(e) => setApproxSqft(e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-muted-3/50 px-6 py-3 font-semibold text-ink hover:border-ink"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded-full bg-terracotta px-6 py-3 font-semibold text-cream hover:bg-terracotta-dark"
            >
              Continue
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleFinalSubmit} className="@container space-y-5">
          <div className="hidden" aria-hidden="true">
            <label htmlFor={companyId}>Company</label>
            <input id={companyId} name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor={nameId} className="text-sm font-medium text-ink">
              Name
            </label>
            <input id={nameId} name="name" required className={inputClass} />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>
          <div className="grid gap-5 @md:grid-cols-2">
            <div>
              <label htmlFor={emailId} className="text-sm font-medium text-ink">
                Email
              </label>
              <input id={emailId} name="email" type="email" required className={inputClass} />
              {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor={phoneId} className="text-sm font-medium text-ink">
                Phone <span className="text-muted-2">(optional)</span>
              </label>
              <input id={phoneId} name="phone" type="tel" className={inputClass} />
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-ink">
              When are you thinking of selling? <span className="text-muted-2">(optional)</span>
            </span>
            <select name="timeline" defaultValue="" className={inputClass}>
              <option value="">Select a timeline</option>
              <option value="Immediately">Immediately</option>
              <option value="1–3 months">1–3 months</option>
              <option value="3–6 months">3–6 months</option>
              <option value="Just curious">Just curious</option>
            </select>
          </div>
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
          {errors.consent && <p className="text-sm text-error">{errors.consent}</p>}

          {status === "error" && (
            <p role="alert" className="text-sm text-error">
              {errorMessage}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full border border-muted-3/50 px-6 py-3 font-semibold text-ink hover:border-ink"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-terracotta px-6 py-3 font-semibold text-cream hover:bg-terracotta-dark disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Get my valuation"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
