import Link from "next/link";

export function CtaBand() {
  return (
    <section className="bg-accent-deep text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Stop losing customers to a website that doesn’t work.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-[#cde8d4]">
            Get a free, no-obligation audit of your current site — what’s
            costing you leads, and exactly how to fix it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn btn-light">
              Get a free website audit
            </Link>
            <p className="text-sm text-[#cde8d4]">
              Straight answers within one business day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
