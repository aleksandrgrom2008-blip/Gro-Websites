import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Discover, Design, Build, Grow — a four-step web design process with no mystery and no jargon. Most sites go live within three to five weeks.",
  alternates: { canonical: "/process" },
};

const steps = [
  {
    number: "01",
    title: "Discover",
    timeframe: "Week 1",
    paragraphs: [
      "We start with a working session on your business — your customers, your competitors, your margins, and what a new lead is actually worth to you. You’d be surprised how many agencies never ask.",
      "This is where most of the value gets created. A website built on the wrong assumptions converts nobody, no matter how good it looks.",
    ],
    deliverable:
      "A one-page strategy: who the site must convince, and what it must get them to do.",
  },
  {
    number: "02",
    title: "Design",
    timeframe: "Weeks 1–2",
    paragraphs: [
      "Structure and words come first — wireframes and messaging before colors and photos. You approve copy that speaks to your customers in their language, then we design page by page around it.",
      "Nothing moves to build until you’ve seen and approved exactly what your site will say and how it will look.",
    ],
    deliverable: "Finished page designs to review — nothing built on assumptions.",
  },
  {
    number: "03",
    title: "Build",
    timeframe: "Weeks 2–4",
    paragraphs: [
      "We hand-code your site for speed and accessibility — no bloated themes, no plugin roulette. Forms, click-to-call, and booking paths are wired and tested on real phones.",
      "On-page SEO is written in from the start: titles, descriptions, structured data, and clean semantic markup search engines can actually read.",
    ],
    deliverable: "A private staging link, plus a launch checklist we work through together.",
  },
  {
    number: "04",
    title: "Grow",
    timeframe: "Ongoing",
    paragraphs: [
      "Launch is the starting line, not the finish. We watch how real visitors behave, then improve what the numbers say to improve — a headline here, a form there.",
      "You’ll always know what’s happening in plain English: how many leads, what changed, what’s next.",
    ],
    deliverable: "A monthly plain-English report: leads in, changes made, next moves.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Process", path: "/process" }])} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20 lg:px-8">
          <p className="kicker text-accent">Process</p>
          <h1 className="mt-6 max-w-[16ch] font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
            Four steps, start to finish. You’ll know where we are at every one.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Most sites go live within three to five weeks. Here’s exactly what
            happens in between — and what you get at each step.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl divide-y divide-line px-6 lg:px-8">
        {steps.map((step) => (
          <section
            key={step.number}
            className="grid gap-6 py-14 md:grid-cols-12 md:gap-10 md:py-20"
          >
            <div className="md:col-span-4">
              <p className="font-display text-5xl font-semibold tracking-tight text-accent tabular-nums md:text-6xl">
                {step.number}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {step.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-ink-soft">
                {step.timeframe}
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-5 leading-relaxed text-ink-soft">
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 border-l-2 border-accent pl-5 text-[15px]">
                <span className="font-semibold">You get: </span>
                <span className="text-ink-soft">{step.deliverable}</span>
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-12 md:py-24 lg:px-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              What we need from you
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="space-y-4 text-[15px] leading-relaxed text-ink-soft">
              <li>About two hours of your time in week one — the discovery session.</li>
              <li>Honest answers about your customers, your pricing, and what’s worked before.</li>
              <li>Examples of sites you like and sites you don’t. Gut reactions welcome.</li>
              <li>Feedback within a couple of days at each review point, so we keep your launch date.</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
