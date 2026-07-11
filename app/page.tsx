import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { HeroGraphic } from "@/components/hero-graphic";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const stats = [
  {
    value: "0.05s",
    label: "How long a visitor takes to form an opinion of your site",
    source: "1",
  },
  {
    value: "75%",
    label: "Judge a company’s credibility by its website design alone",
    source: "2",
  },
  {
    value: "94%",
    label: "Of first impressions are design-related",
    source: "3",
  },
  {
    value: "88%",
    label: "Of visitors won’t return after a bad website experience",
    source: "4",
  },
];

const differences = [
  {
    title: "Strategy before pixels",
    body: "We learn how you actually win customers before we design a single screen.",
  },
  {
    title: "Design that directs",
    body: "Clear messaging and one obvious next step on every page.",
  },
  {
    title: "Speed as standard",
    body: "Hand-coded pages that load fast — because slow sites lose impatient customers.",
  },
  {
    title: "Measured in leads",
    body: "Success is calls, bookings, and quote requests — not compliments on the colors.",
  },
];

const services = [
  {
    id: "lead-generation",
    title: "Lead-generation websites",
    outcome: "A new site built around one job: turning visitors into enquiries.",
  },
  {
    id: "redesigns",
    title: "Redesigns & rebuilds",
    outcome:
      "Keep what works, fix what’s costing you customers — without losing the rankings you’ve earned.",
  },
  {
    id: "local-seo",
    title: "Local SEO foundations",
    outcome: "Show up when people nearby search for exactly what you do.",
  },
  {
    id: "landing-pages",
    title: "Landing pages",
    outcome:
      "Purpose-built pages for ads and campaigns, so every click has somewhere to convert.",
  },
  {
    id: "optimization",
    title: "Ongoing optimization",
    outcome: "Small monthly improvements that compound into measurably more leads.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "A working session on your customers, competitors, and what a lead is worth to you.",
  },
  {
    number: "02",
    title: "Design",
    body: "Structure and words first, then design built around how your customers decide.",
  },
  {
    number: "03",
    title: "Build",
    body: "Fast, hand-coded pages. No bloated themes, no plugin roulette.",
  },
  {
    number: "04",
    title: "Grow",
    body: "Launch, measure, and improve whatever the numbers say to improve.",
  },
];

/*
 * TODO: Replace these three placeholder testimonials with real client quotes
 * before launch. Keep the structure: quote, attribution name, business type.
 */
const placeholderTestimonials = [
  {
    quote:
      "The old site got compliments. This one gets calls. We booked more work in the first two months than the old site brought in all of last year.",
    name: "Client Name",
    business: "Owner, plumbing & heating company",
  },
  {
    quote:
      "They asked sharper questions than anyone else we talked to. The site launched on schedule and our quote requests roughly doubled.",
    name: "Client Name",
    business: "Managing partner, family law firm",
  },
  {
    quote:
      "New patients keep telling us they chose us because booking was so easy. That never happened with the old website.",
    name: "Client Name",
    business: "Practice manager, dental clinic",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="kicker text-accent">Web design for small business</p>
              <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,13.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance md:text-7xl md:leading-none">
                Your website should be your best salesperson.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                We design and build websites for small businesses with one
                goal: turning the people who visit into customers who pay.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/contact" className="btn btn-primary">
                  Get a free website audit
                </Link>
                <Link
                  href="/process"
                  className="text-[15px] font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  See how we work <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
              <HeroGraphic />
            </div>
          </div>
          <p className="mt-16 border-t border-line pt-6 text-sm text-ink-soft">
            Built for contractors, dental &amp; medical practices, law firms,
            home services, restaurants — any business that lives on local
            customers.
          </p>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="kicker text-accent-bright">The case for better design</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Visitors judge you in the blink of an eye.
              </h2>
              <p className="mt-5 leading-relaxed text-[#a3a29b]">
                These aren’t our numbers — they’re what independent researchers
                found when they studied how people react to websites.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:col-span-7">
              {stats.map((stat, i) => (
                <Reveal key={stat.value} delay={i * 80}>
                  <p className="font-display text-5xl font-semibold tracking-tight text-accent-bright md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#d6d5cf]">
                    {stat.label}
                    <sup className="text-[#8f8e88]"> {stat.source}</sup>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <p className="mt-16 max-w-3xl font-display text-2xl font-semibold tracking-tight text-balance md:mt-20 md:text-3xl">
              Most business websites convert fewer than 3 in 100 visitors into a
              lead.<sup className="text-[#8f8e88]"> 5</sup> We build sites
              designed to beat that number.
            </p>
          </Reveal>
          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-[#8f8e88]">
            Sources: 1. Lindgaard et al., “Attention web designers: You have 50
            milliseconds to make a good first impression,” Behaviour &amp;
            Information Technology. 2. Stanford Web Credibility Research, Fogg
            et al. 3. Sillence et al., Northumbria University. 4. Gomez, “Why
            Web Performance Matters” consumer research. 5. WordStream landing
            page benchmarks (median conversion rate ≈ 2.35%).
          </p>
        </div>
      </section>

      {/* Problem / solution */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-12 md:py-28 lg:px-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Your site looks fine. So why isn’t the phone ringing?
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Most small-business websites are built to be looked at, not
                acted on. They list your services, show a few photos, and leave
                visitors to figure out the next step on their own. Visitors
                don’t figure it out — they hit the back button and call whoever
                made it easy.
              </p>
              <p>
                We start from the action you want a visitor to take — call,
                book, request a quote — and design every page to lead there.
                Everything else earns its place or gets cut.
              </p>
            </div>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {differences.map((item) => (
                <div key={item.title} className="grid gap-1 py-5 sm:grid-cols-5 sm:gap-6">
                  <h3 className="text-[15px] font-semibold sm:col-span-2">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft sm:col-span-3">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              What we do
            </h2>
            <Link
              href="/services"
              className="text-[15px] font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
            >
              See all services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ol className="mt-12 border-t border-line">
            {services.map((service, i) => (
              <li key={service.id} className="border-b border-line">
                <Link
                  href={`/services#${service.id}`}
                  className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
                >
                  <span className="text-sm font-semibold text-accent tabular-nums md:col-span-1">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent md:col-span-4">
                    {service.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft md:col-span-6">
                    {service.outcome}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden text-ink-soft transition-colors group-hover:text-accent md:col-span-1 md:block md:text-right"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process strip */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Four steps. No mystery.
            </h2>
            <Link
              href="/process"
              className="text-[15px] font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
            >
              See the full process <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <p className="text-sm font-semibold text-accent tabular-nums">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof — placeholder content, see TODO above the array */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            What owners say
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {placeholderTestimonials.map((testimonial) => (
              <Reveal key={testimonial.business}>
                <figure className="border-l-2 border-accent pl-6">
                  <blockquote className="text-[17px] leading-relaxed">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="block text-ink-soft">
                      {testimonial.business}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
