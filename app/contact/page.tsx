import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a free website audit",
  description:
    "Request a free website audit. Tell us about your business and get a plain-English reply within one business day — no pressure, no obligation.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  {
    title: "We reply within one business day",
    body: "A real reply from the person who’d do the work — not an autoresponder.",
  },
  {
    title: "A short call, if it looks like a fit",
    body: "Twenty minutes, no slides. We ask about your business; you ask us anything.",
  },
  {
    title: "You get honest recommendations",
    body: "Useful whether or not you hire us. If we’re not the right fit, we’ll say so.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-16 lg:px-8">
          <p className="kicker text-accent">Contact</p>
          <h1 className="mt-6 max-w-[15ch] font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
            Get a free website audit.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Tell us a little about your business. You’ll get a plain-English
            reply within one business day — no pressure, no jargon, no
            obligation.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-14 md:grid-cols-12 md:py-20 lg:px-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What happens next
            </h2>
            <ol className="mt-8 space-y-8">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="text-sm font-semibold text-accent tabular-nums">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold">{step.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-ink-soft">
              Your details go straight to our inbox and nowhere else — no
              mailing lists, no cookies, no trackers. Details in our{" "}
              <Link href="/privacy" className="underline decoration-accent underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
