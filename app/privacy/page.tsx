import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Gro Websites handles the information you send through our contact form — collected minimally, used only to reply, never sold. No cookies, no trackers.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy policy", path: "/privacy" }])} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-16 lg:px-8">
          <p className="kicker text-accent">Privacy</p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-sm text-ink-soft">Last updated: July 2026</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
          <div className="max-w-2xl space-y-10 leading-relaxed">
            <p className="text-lg text-ink-soft">
              This policy covers the Gro Websites site. It’s short because we
              collect almost nothing — and it’s written in plain English,
              because that’s how we do everything.
            </p>

            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                What we collect
              </h2>
              <p className="mt-3 text-ink-soft">
                Only what you type into the contact form: your name, business
                name, email address, phone number (if you choose to give it),
                and your message. That’s it. This site sets no cookies, runs no
                analytics, and uses no third-party trackers of any kind.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                How we use it
              </h2>
              <p className="mt-3 text-ink-soft">
                Your enquiry is delivered to our inbox by an email delivery
                service that processes contact-form submissions on our behalf.
                We use your details for one thing: replying to you. We don’t
                sell them, share them, or add you to a mailing list.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                How long we keep it
              </h2>
              <p className="mt-3 text-ink-soft">
                Enquiries stay in our email for as long as we need them to
                handle your request and keep reasonable business records. Ask
                us to delete your details at any time and we will.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Your rights
              </h2>
              <p className="mt-3 text-ink-soft">
                You can ask what we hold about you, ask us to correct it, or
                ask us to delete it. Send the request through the{" "}
                <Link href="/contact" className="underline decoration-accent underline-offset-4">
                  contact form
                </Link>{" "}
                and we’ll sort it out promptly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Changes to this policy
              </h2>
              <p className="mt-3 text-ink-soft">
                If anything here changes, we’ll update this page and the date at
                the top. We won’t quietly weaken it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
