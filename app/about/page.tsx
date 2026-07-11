import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gro Websites is a small web design studio with one measure of success: the customers your website brings in. No awards talk, no jargon — just results.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "A website is an employee",
    body: "It should show up every day and bring in business — or be replaced. We build sites that earn their keep and prove it in the numbers.",
  },
  {
    title: "Clarity beats cleverness",
    body: "If a visitor has to think, they leave. We write and design for instant understanding — what you do, who it’s for, what to do next.",
  },
  {
    title: "Speed is respect",
    body: "Fast pages respect your visitor’s time. Google rewards it, customers reward it, and slow sites quietly bleed both.",
  },
  {
    title: "Proof over promises",
    body: "We’d rather show you numbers than adjectives. Every claim on this site is sourced, and every project is measured.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20 lg:px-8">
          <p className="kicker text-accent">About</p>
          <h1 className="mt-6 max-w-[15ch] font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
            We measure our work in your customers.
          </h1>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:py-24 lg:px-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Why Gro exists
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
            <p>
              Too many small businesses pay good money for websites that do
              nothing. The industry sells design awards and buzzwords; owners
              need customers. Gro exists to close that gap.
            </p>
            <p>
              We’re a small studio on purpose. You talk to the people doing the
              work, decisions get made in days instead of weeks, and nobody
              hands your project to a junior the moment you sign.
            </p>
            <p>
              Everything we build follows the same playbook we used on this
              site: plain language, fast pages, one clear action, and claims
              backed by sources — because credibility is the product we sell.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            What we believe
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="border-t-2 border-accent pt-5">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
