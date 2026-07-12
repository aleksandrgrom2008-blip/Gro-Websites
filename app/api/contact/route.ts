import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteUrl } from "@/lib/site";

/*
 * Contact form endpoint. Only POST is exported, so Next.js automatically
 * responds 405 to every other method.
 *
 * Defense layers, in order:
 *   1. Content-Type must be application/json          → 415
 *   2. Body size cap (10 KB)                          → 413
 *   3. Zod schema — the source of truth for input     → 400
 *   4. Per-IP sliding-window rate limit               → 429
 *   5. Honeypot + minimum-time-to-submit              → silent fake success
 *   6. CR/LF stripping before values reach email      → header-injection guard
 *
 * The email is sent as plain text, so there is no HTML-injection surface in
 * the message body. The destination address lives in CONTACT_EMAIL (server
 * env only) and never appears in any client-delivered asset.
 */

const GENERIC_ERROR = "Something went wrong on our end. Please try again in a few minutes.";
const MAX_BODY_BYTES = 10_000;
const MIN_ELAPSED_MS = 3_000;

/*
 * In-memory sliding-window rate limiter: 5 submissions per IP per 10 minutes.
 *
 * Serverless limitation, documented deliberately: on Vercel this Map lives
 * per lambda instance, so the limit resets on cold starts and isn't shared
 * across concurrent instances. For a small marketing site this is an
 * acceptable speed bump against casual abuse; if the site ever needs a hard
 * guarantee, swap this for a shared store (e.g. Upstash Redis) without
 * changing the handler's shape.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);

  // Keep the map from growing unbounded on a long-lived instance.
  if (requestLog.size > 500) {
    for (const [key, timestamps] of requestLog) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }
  return false;
}

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  business: z.string().trim().min(1).max(100),
  email: z.string().trim().max(200).email(),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  need: z.enum(["new-website", "redesign", "not-sure"]),
  // Honeypot field — must be empty for a legitimate submission.
  website: z.string().max(200).optional().default(""),
  // Milliseconds between form render and submit, reported by the client.
  elapsedMs: z.number().int().nonnegative().optional().default(0),
});

const needLabels: Record<z.infer<typeof contactSchema>["need"], string> = {
  "new-website": "New website",
  redesign: "Redesign",
  "not-sure": "Not sure",
};

/** Strip CR/LF so user input can never smuggle extra email headers. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 415 });
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 413 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }
    const data = parsed.data;

    const ip = (request.headers.get("x-forwarded-for") ?? "unknown")
      .split(",")[0]
      .trim();
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 },
      );
    }

    // Spam heuristics. Respond with a fake success so bots learn nothing.
    if (data.website.length > 0 || data.elapsedMs < MIN_ELAPSED_MS) {
      console.warn(`[contact] Silently rejected suspected bot submission (ip=${ip}).`);
      return NextResponse.json({ ok: true });
    }

    const name = singleLine(data.name);
    const business = singleLine(data.business);
    const email = singleLine(data.email);
    const phone = singleLine(data.phone);

    const text = [
      "New enquiry from the Gro Websites contact form",
      "",
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Looking for: ${needLabels[data.need]}`,
      "",
      "Message:",
      data.message.trim(),
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      // In local development, complete the flow so the form can be
      // exercised end-to-end — the enquiry is printed to the terminal
      // instead of emailed. Production still fails safely: the fix there
      // is setting CONTACT_EMAIL in Vercel.
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[contact] DEV MODE — CONTACT_EMAIL is not set, so NO EMAIL was sent. " +
            "The enquiry that would have been delivered:\n\n" +
            text +
            "\n",
        );
        return NextResponse.json({ ok: true });
      }
      console.error(
        "[contact] CONTACT_EMAIL is not set — cannot deliver this enquiry. " +
          "Add it under Vercel → Project → Settings → Environment Variables and redeploy.",
      );
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    if (apiKey) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        // TODO: switch to your own verified domain in Resend (e.g.
        // "Gro Websites <hello@growebsites.com>") once DNS is verified.
        from: "Gro Websites <onboarding@resend.dev>",
        to: contactEmail,
        replyTo: email,
        subject: `New website enquiry — ${name}, ${business}`,
        text,
      });

      if (error) {
        console.error("[contact] Resend rejected the send:", error);
        return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    /*
     * Interim delivery without a Resend key: relay the enquiry through
     * FormSubmit.co, which forwards to CONTACT_EMAIL with no account or
     * API key. The address is only ever used server-side, so it still
     * never reaches the client. First-ever submission triggers a one-time
     * activation email that must be confirmed in the inbox.
     *
     * TODO: this is a stopgap — a free relay has weaker deliverability
     * than a real provider. Add RESEND_API_KEY when ready and this branch
     * stops being used automatically.
     */
    const relayResponse = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // FormSubmit rejects requests without a source page; identify
          // ourselves as this site since the relay call is server-side.
          Origin: siteUrl,
          Referer: `${siteUrl}/contact`,
        },
        body: JSON.stringify({
          _subject: `New website enquiry — ${name}, ${business}`,
          _template: "box",
          _captcha: "false",
          _replyto: email,
          name,
          business,
          email,
          phone: phone || "—",
          "looking for": needLabels[data.need],
          message: data.message.trim(),
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );

    const relayResult = (await relayResponse.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    // FormSubmit reports failures (including pending activation) in its
    // JSON body even on HTTP 200 — trust the success flag, not the status.
    const relayed =
      relayResponse.ok &&
      relayResult !== null &&
      String(relayResult.success).toLowerCase() === "true";

    if (!relayed) {
      console.error(
        "[contact] FormSubmit relay did not accept the enquiry:",
        relayResponse.status,
        relayResult?.message ?? "(no detail)",
      );
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    console.log(
      `[contact] Enquiry relayed via FormSubmit: ${relayResult?.message ?? "ok"}`,
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
