import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 80, background: "#09090b", color: "#f2f2f3",
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(79,139,255,0.22), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#4f8bff" }}>
          {"</>"} <span style={{ color: "#a1a1aa" }}>{site.title}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
          <span>{site.hero.headline[0]}</span>
          <span style={{ color: "#4f8bff" }}>{site.hero.headline[1]}</span>
        </div>
        <div style={{ fontSize: 34, color: "#a1a1aa" }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
