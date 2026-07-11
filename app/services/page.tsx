import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Lead-generation web design, redesigns, local SEO foundations, landing pages, and ongoing optimization — every service aimed at one outcome: more customers.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    id: "lead-generation",
    number: "01",
    title: "Lead-generation websites",
    paragraphs: [
      "This is the core of what we do: a website designed from the first wireframe to do one job — turn visitors into enquiries. Every page has a purpose, every section earns its place, and every path leads to a call, a booking, or a quote request.",
      "You get a fast, hand-built site with clear messaging, proof where it matters, and contact points that are impossible to miss.",
    ],
    goodFor:
      "New businesses, and established ones whose current site has never produced a lead.",
  },
  {
    id: "redesigns",
    number: "02",
    title: "Redesigns & rebuilds",
    paragraphs: [
      "If your site looks dated, loads slowly, or simply doesn’t ring the phone, we rebuild it — keeping what’s working and fixing what’s quietly costing you customers.",
      "We handle redirects and on-page SEO during the switch, so the rankings and traffic you’ve already earned come with you.",
    ],
    goodFor: "Businesses with an underperforming site and traffic they can’t afford to lose.",
  },
  {
    id: "local-seo",
    number: "03",
    title: "Local SEO foundations",
    paragraphs: [
      "Most of your customers search with a place in mind — “near me,” a suburb, a city. We build the technical foundations that help you show up: structured data, service pages, Google Business Profile alignment, and load times search engines reward.",
      "No promises of “#1 on Google” — anyone guaranteeing that is guessing. We build the foundations rankings are earned on.",
    ],
    goodFor: "Any business that serves a defined area.",
  },
  {
    id: "landing-pages",
    number: "04",
    title: "Landing pages",
    paragraphs: [
      "Sending ad traffic to your homepage is how budgets disappear. We build dedicated landing pages matched to a single offer and a single audience, so every click lands on a page built to convert it.",
      "One message, one action, measurable results — and a page you can reuse for the next campaign.",
    ],
    goodFor: "Businesses running Google or Meta ads, or promoting seasonal offers.",
  },
  {
    id: "optimization",
    number: "05",
    title: "Ongoing optimization",
    paragraphs: [
      "A website is never finished — it’s either improving or decaying. Each month we look at what visitors actually do on your site, then strengthen the weakest point: a headline, a form, a slow page.",
      "Small changes, made consistently, compound into measurably more leads.",
    ],
    goodFor: "Owners who want the site to keep earning its keep after launch.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20 lg:px-8">
          <p className="kicker text-accent">Services</p>
          <h1 className="mt-6 max-w-[16ch] font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
            Everything we build is priced against one outcome: more customers.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            No feature lists, no jargon. Here’s what each service does for your
            business — and who it’s for.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl divide-y divide-line px-6 lg:px-8">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="grid scroll-mt-10 gap-6 py-14 md:grid-cols-12 md:gap-10 md:py-20"
          >
            <div className="md:col-span-4">
              <p className="text-sm font-semibold text-accent tabular-nums">
                {service.number}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                {service.title}
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-5 leading-relaxed text-ink-soft">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 text-[15px]">
                <span className="font-semibold">Good for: </span>
                <span className="text-ink-soft">{service.goodFor}</span>
              </p>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
