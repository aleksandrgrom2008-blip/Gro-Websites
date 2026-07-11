import { siteDescription, siteName, siteUrl } from "./site";

/**
 * JSON-LD builders. Every value here is authored in code — user input never
 * flows into these objects, which is what makes the dangerouslySetInnerHTML
 * in <JsonLd/> safe.
 */

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: siteName,
        description: siteDescription,
        url: siteUrl,
        // TODO: tighten areaServed to your actual service area (e.g. a City
        // or State object) once you decide how wide you want to market.
        areaServed: { "@type": "Country", name: "United States" },
        knowsAbout: [
          "web design",
          "lead generation",
          "local SEO",
          "landing pages",
          "conversion rate optimization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#business` },
      },
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${siteUrl}${item.path}`,
      })),
    ],
  };
}
