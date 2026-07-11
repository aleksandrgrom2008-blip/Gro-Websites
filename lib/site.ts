export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const siteName = "Gro Websites";

export const siteDescription =
  "Gro Websites designs and builds fast, conversion-focused websites for small and mid-sized businesses — sites built to turn visitors into calls, bookings, and paying customers.";

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;
