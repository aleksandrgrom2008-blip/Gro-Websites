"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navLinks } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight"
        >
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[1px] bg-accent" />
          Gro Websites
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-sm font-medium text-ink underline decoration-accent decoration-2 underline-offset-8"
                    : "text-sm text-ink-soft transition-colors hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-primary btn-sm">
            Get a free audit
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="px-2 py-1 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id={panelId} hidden={!open} className="border-t border-line md:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-6 py-6">
          {[...navLinks, { href: "/contact", label: "Contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-2xl font-semibold tracking-tight last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-6 self-start"
          >
            Get a free audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
