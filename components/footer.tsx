import Link from "next/link";
import { navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-accent font-display text-[15px] font-bold text-white"
              >
                G
              </span>
              Gro Websites
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Websites built to win customers — designed, written, and coded for
              small businesses that live on leads.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm md:col-span-3">
            {[...navLinks, { href: "/contact", label: "Contact" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm md:col-span-3">
            <Link
              href="/privacy"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              Privacy policy
            </Link>
            <p className="text-ink-soft">No cookies. No trackers.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6 text-xs text-ink-soft">
          <p>© {new Date().getFullYear()} Gro Websites. All rights reserved.</p>
          <p>Fast, accessible, and built to convert — like every site we ship.</p>
        </div>
      </div>
    </footer>
  );
}
