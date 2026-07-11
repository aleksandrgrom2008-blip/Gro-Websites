# Gro Websites

Production marketing site for Gro Websites — a web design agency that builds
lead-generating websites for small and mid-sized businesses. The site is
itself the proof of claim: statically rendered, self-hosted everything, strict
security headers, and a hardened contact pipeline.

## Stack

- **Next.js 16** (App Router, React Server Components, TypeScript strict)
- **Tailwind CSS 4**
- **Resend** for contact-form email delivery (server-side only)
- **Zod** for server-side input validation
- Zero databases, zero custom servers, zero third-party scripts or trackers.
  Fonts are self-hosted through `next/font`.

## Local setup

Requires Node.js 20.9+.

```bash
npm install
copy .env.example .env.local   # macOS/Linux: cp .env.example .env.local
# fill in the values (see table below)
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build — must pass before deploying
npm run start   # serve the production build locally
npm run lint    # ESLint
```

## Environment variables

| Variable | Required | Exposed to browser? | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Yes (for email) | **No** | API key from [resend.com/api-keys](https://resend.com/api-keys). Without it the contact form fails gracefully: the visitor sees a generic error, the real cause is logged server-side. |
| `CONTACT_EMAIL` | Yes (for email) | **No** | Destination inbox for enquiries. Read only inside `app/api/contact/route.ts` at request time — it never appears in HTML, the JS bundle, or the sitemap. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Yes (by design) | Canonical site URL, no trailing slash. Drives `metadataBase`, canonical tags, Open Graph URLs, `sitemap.xml`, and `robots.txt`. |

Never prefix a secret with `NEXT_PUBLIC_` — that prefix inlines the value
into the client bundle.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the
   repository. Vercel auto-detects Next.js — leave build settings untouched.
3. Before clicking **Deploy**, expand **Environment Variables** and add all
   three variables from the table above. (Or add them afterwards under
   **Project → Settings → Environment Variables**, then redeploy.)
   - Apply `RESEND_API_KEY` and `CONTACT_EMAIL` to **Production** and
     **Preview**.
   - Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g.
     `https://www.growebsites.com`) for **Production**. For Preview you can
     leave it unset or point it at your preview domain.
4. Click **Deploy**.
5. Custom domain: **Project → Settings → Domains → Add**, then follow the DNS
   instructions. Update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

The security headers in `next.config.ts` are served automatically by Vercel —
no extra configuration needed.

### Resend domain setup

The form currently sends from Resend's shared onboarding address
(`onboarding@resend.dev`), which works immediately but looks generic and, on
some Resend plans, only delivers to your own verified account email. To send
from your own domain:

1. In Resend: **Domains → Add Domain**, add your domain, and create the DNS
   records it gives you (SPF + DKIM).
2. Once verified, change the `from` address in
   `app/api/contact/route.ts` (marked with a `TODO`) to something like
   `Gro Websites <hello@growebsites.com>`.

## Security notes

- Security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy,
  Permissions-Policy) are set in `next.config.ts`. The CSP allows inline
  scripts without eval — the reasoning is documented in a comment there.
- The contact route accepts only `POST` + `application/json`, caps body size
  at 10 KB, validates with Zod, rate-limits per IP (in-memory sliding window —
  per-instance on serverless, see comment in the route), silently drops
  honeypot/too-fast submissions, and strips CR/LF from anything that touches
  an email header.
- The only `dangerouslySetInnerHTML` in the codebase is the JSON-LD component,
  which serializes data authored in `lib/schema.ts` — never user input.

## Before launch — open TODOs

- [ ] Replace the three placeholder testimonials in `app/page.tsx`
      (marked with a `TODO` comment).
- [ ] Verify your domain in Resend and update the `from` address in
      `app/api/contact/route.ts`.
- [ ] Review `areaServed` in `lib/schema.ts` (currently "United States").
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real production domain in Vercel.
