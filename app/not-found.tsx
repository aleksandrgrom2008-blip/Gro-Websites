import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36 lg:px-8">
        <p className="kicker text-accent">404</p>
        <h1 className="mt-6 max-w-[16ch] font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-6xl">
          This page doesn’t exist.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Broken links cost websites customers — so this one keeps the exits
          obvious. Here’s where you probably wanted to go:
        </p>
        <nav aria-label="Suggested pages" className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <Link
            href="/"
            className="text-[15px] font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-[15px] font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-[15px] font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Contact
          </Link>
        </nav>
      </div>
    </section>
  );
}
