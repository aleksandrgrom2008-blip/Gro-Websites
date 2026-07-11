import { ImageResponse } from "next/og";

export const alt = "Gro Websites — web design that wins customers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#4ade80",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              fontSize: 38,
              color: "#fafaf7",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Gro Websites
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              color: "#fafaf7",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 950,
            }}
          >
            Websites that win customers.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a3a29b" }}>
            Web design and lead generation for small business
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
