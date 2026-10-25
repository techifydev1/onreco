"use client";

import { useState } from "react";

import { ApiError } from "@/services/api/client";

import { sendContactMessage } from "../api";
import { contactPage } from "../content";
import { Footer } from "./Footer";
import { Eyebrow, LoraHeading } from "./primitives";
import { Nav } from "./Nav";
import { ScrollReveal } from "./ScrollReveal";

const fieldClass =
  "h-12 w-full rounded border border-hairline-strong bg-paper-card px-3.5 text-[14px] text-ink " +
  "placeholder:text-stone outline-none transition-colors duration-200 " +
  "focus:border-forest focus:ring-2 focus:ring-forest/12";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setError(null);

    try {
      await sendContactMessage({ name, email, message, company });
      setState("sent");
    } catch (cause) {
      setState("idle");
      setError(cause instanceof ApiError ? cause.message : contactPage?.error ?? "That did not send.");
    }
  }

  return (
    <div className="bg-paper">
      <Nav />

      <main className="pt-24">
        <section className="px-(--page-x) pt-17 pb-21 max-[961px]:pb-16">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start gap-17.5 max-[961px]:grid-cols-1 max-[961px]:gap-12">
            <div className="flex flex-col gap-6">
              <Eyebrow>{contactPage?.eyebrow ?? "CONTACT"}</Eyebrow>
              <LoraHeading size="50" as="h1">
                {(contactPage?.heading?.[0] ?? "Tell us what your")}
                <br />
                {(contactPage?.heading?.[1] ?? "payments look like.")}
              </LoraHeading>
              <p className="max-w-[52ch] text-[16px] leading-[1.7] text-moss">
                {contactPage?.sub ?? "Send a note and we will reply from hello@onreco.xyz."}
              </p>

              <p className="text-[14px] leading-[1.7] text-moss">
                {(contactPage?.fallback?.label ?? "Prefer email?")}{" "}
                <a
                  href={contactPage?.fallback?.href ?? "mailto:hello@onreco.xyz"}
                  className="text-forest underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-ink"
                >
                  {contactPage?.fallback?.text ?? "hello@onreco.xyz"}
                </a>
              </p>

              <div className="mt-4 flex flex-col gap-3.5 border-t border-hairline pt-6">
                <Eyebrow>{contactPage?.aside?.eyebrow ?? "ELSEWHERE"}</Eyebrow>
                <p className="max-w-[44ch] text-[14px] leading-[1.7] text-moss">
                  {contactPage?.aside?.body ?? "Short updates on what we are building."}
                </p>
                <div className="flex items-center gap-5">
                  {(contactPage?.aside?.links ?? []).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13px] text-forest underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded border border-hairline bg-paper-card p-7.5 max-[560px]:p-6">
              {state === "sent" ? (
                <div className="flex flex-col gap-4" aria-live="polite">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-forest">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path
                        d="M3.5 9.5 7 13l7.5-8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h2 className="font-serif text-[28px] leading-[1.2] text-ink">
                    {contactPage?.success?.heading ?? "Message sent."}
                  </h2>
                  <p className="text-[14px] leading-[1.7] text-moss">
                    {contactPage?.success?.body ?? "We will reply from hello@onreco.xyz."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setState("idle");
                      setMessage("");
                    }}
                    className="mt-2 w-fit text-[13px] text-forest underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-ink"
                  >
                    {contactPage?.success?.again ?? "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-[13px] font-medium text-ink">
                      {contactPage?.form?.name?.label ?? "Name"}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={contactPage?.form?.name?.placeholder ?? "Amina Bello"}
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-[13px] font-medium text-ink">
                      {contactPage?.form?.email?.label ?? "Email"}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={contactPage?.form?.email?.placeholder ?? "you@company.com"}
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-[13px] font-medium text-ink">
                      {contactPage?.form?.message?.label ?? "Message"}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={20}
                      maxLength={4000}
                      rows={6}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={contactPage?.form?.message?.placeholder ?? "We take USDC..."}
                      className={`${fieldClass} min-h-42 resize-y py-3 leading-[1.6]`}
                    />
                  </div>

                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded border border-status-red-text/25 bg-status-red-bg px-3.5 py-2.5 text-[13px] text-status-red-text"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="inline-flex h-12 w-fit items-center justify-center rounded bg-forest px-5.75 text-[14px] font-medium text-paper-card transition-[opacity,transform] duration-200 hover:opacity-[0.88] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "sending" ? contactPage?.form?.submitting ?? "Sending..." : contactPage?.form?.submit ?? "Send message"}
                  </button>

                  <p className="text-[11px] leading-[1.6] text-stone">{contactPage?.form?.note ?? "We use your email only to reply to this message."}</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollReveal />
    </div>
  );
}
