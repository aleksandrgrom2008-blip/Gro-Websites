/**
 * Renders a JSON-LD structured-data script tag.
 *
 * This is the one sanctioned use of dangerouslySetInnerHTML in the codebase:
 * `data` is always an object we author in code (see lib/schema.ts) — user
 * input never reaches it. `<` is escaped so the payload can never close the
 * script tag early even if a value ever contained markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
