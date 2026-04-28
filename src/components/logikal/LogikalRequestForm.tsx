"use client";

import { useState } from "react";
import { formFields } from "@/config/form.config";

const interestConfig = formFields.find((f) => f.id === "interest");
const byId = (id: string) => formFields.find((f) => f.id === id);

export function LogikalRequestForm() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/submit", { method: "POST", body: fd });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && j.ok) {
        setDone(true);
        e.currentTarget.reset();
      } else {
        setError(j.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="success-state">
        <div className="success-icon" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path
              d="M4 11.5l5 5L18 6"
              stroke="#EC6335"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>Thanks for connecting!</h3>
        <p>We&apos;ve received your details and our team will be in touch with you soon.</p>
      </div>
    );
  }

  const firstName = byId("firstName")!;
  const lastName = byId("lastName")!;
  const email = byId("email")!;
  const company = byId("company")!;
  const jobTitle = byId("jobTitle")!;
  const phone = byId("phone")!;
  const message = byId("message")!;

  return (
    <form onSubmit={onSubmit} className="form-card relative" noValidate>
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor="logikal-hp">Website</label>
        <input
          type="text"
          id="logikal-hp"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            placeholder={firstName.placeholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            placeholder={lastName.placeholder}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Work email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder={email.placeholder}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            type="text"
            id="company"
            name="company"
            required
            autoComplete="organization"
            placeholder={company.placeholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Job title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            autoComplete="organization-title"
            placeholder={jobTitle.placeholder}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder={phone.placeholder}
        />
      </div>
      <div className="form-group">
        <label htmlFor="interest">I&apos;m interested in</label>
        <select
          id="interest"
          name="interest"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option…
          </option>
          {interestConfig?.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Tell us about your challenge</label>
        <textarea
          id="message"
          name="message"
          placeholder={message.placeholder}
        />
      </div>
      <button className="submit-btn" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Submit & request demo →"}
      </button>
      {error ? <div className="form-error" role="alert">{error}</div> : null}
    </form>
  );
}
