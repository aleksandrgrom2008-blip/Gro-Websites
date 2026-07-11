/**
 * Decorative hero illustration: a lead-generation website with enquiries
 * arriving and a rising leads chart — the product, drawn in the brand
 * system. Inline SVG so it ships with zero requests, scales crisply, and
 * inherits the site fonts. Marked decorative by the parent (aria-hidden).
 */
export function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 520 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full font-sans"
    >
      {/* Browser window */}
      <rect x="1" y="25" width="414" height="438" rx="6" className="fill-white stroke-line" />
      <line x1="1" y1="68" x2="415" y2="68" className="stroke-line" />
      <circle cx="22" cy="46" r="3.5" className="fill-line" />
      <circle cx="38" cy="46" r="3.5" className="fill-line" />
      <circle cx="54" cy="46" r="3.5" className="fill-line" />
      <rect x="76" y="36" width="180" height="20" rx="10" className="fill-mist" />
      <circle cx="90" cy="46" r="3" className="fill-accent" />
      <rect x="102" y="43" width="90" height="6" rx="3" className="fill-line" />

      {/* Page content: kicker, headline, copy */}
      <rect x="28" y="100" width="64" height="8" rx="2" className="fill-accent" />
      <rect x="28" y="124" width="300" height="16" rx="2" className="fill-ink" />
      <rect x="28" y="148" width="232" height="16" rx="2" className="fill-ink" />
      <rect x="28" y="184" width="256" height="7" rx="2" className="fill-line" />
      <rect x="28" y="197" width="208" height="7" rx="2" className="fill-line" />

      {/* Call to action */}
      <rect x="28" y="226" width="152" height="40" rx="2" className="fill-accent" />
      <text
        x="104"
        y="251"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        className="fill-white"
      >
        Get a free quote
      </text>
      <rect x="196" y="243" width="88" height="7" rx="2" className="fill-line" />

      {/* Service cards */}
      <line x1="28" y1="298" x2="388" y2="298" className="stroke-line" />
      <rect x="28" y="314" width="100" height="76" rx="3" className="fill-mist" />
      <rect x="42" y="332" width="44" height="7" rx="2" className="fill-ink" />
      <rect x="42" y="347" width="60" height="6" rx="2" className="fill-line" />
      <rect x="42" y="359" width="52" height="6" rx="2" className="fill-line" />
      <rect x="148" y="314" width="100" height="76" rx="3" className="fill-mist" />
      <rect x="162" y="332" width="44" height="7" rx="2" className="fill-ink" />
      <rect x="162" y="347" width="60" height="6" rx="2" className="fill-line" />
      <rect x="162" y="359" width="52" height="6" rx="2" className="fill-line" />
      <rect x="268" y="314" width="100" height="76" rx="3" className="fill-mist" />
      <rect x="282" y="332" width="44" height="7" rx="2" className="fill-ink" />
      <rect x="282" y="347" width="60" height="6" rx="2" className="fill-line" />
      <rect x="282" y="359" width="52" height="6" rx="2" className="fill-line" />

      {/* Incoming enquiry notifications */}
      <rect x="308" y="92" width="210" height="58" rx="5" className="fill-white stroke-line" />
      <circle cx="330" cy="121" r="4.5" className="fill-accent-bright" />
      <text x="346" y="117" fontSize="13" fontWeight="600" className="fill-ink">
        New enquiry
      </text>
      <text x="346" y="135" fontSize="11" className="fill-ink-soft">
        Quote request · 2 min ago
      </text>
      <rect x="336" y="166" width="182" height="50" rx="5" className="fill-white stroke-line" />
      <circle cx="356" cy="191" r="4" className="fill-accent-bright" />
      <rect x="370" y="180" width="92" height="8" rx="2" className="fill-ink" />
      <rect x="370" y="194" width="64" height="6" rx="2" className="fill-line" />

      {/* Leads chart */}
      <rect x="268" y="330" width="250" height="162" rx="6" className="fill-ink" />
      <text x="290" y="360" fontSize="12" className="fill-[#a3a29b]">
        Leads this month
      </text>
      <text x="290" y="396" fontSize="28" fontWeight="600" className="fill-paper">
        38
      </text>
      <text x="334" y="396" fontSize="12" fontWeight="600" className="fill-accent-bright">
        +46%
      </text>
      <polyline
        points="290,466 324,458 358,462 392,440 426,446 460,424 496,404"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent-bright"
      />
      <circle cx="496" cy="404" r="4" className="fill-accent-bright" />
    </svg>
  );
}
