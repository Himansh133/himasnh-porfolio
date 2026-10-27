import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// The card shown when a link to the site is shared
export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = `data:image/png;base64,${await readFile(join(process.cwd(), "src/app/apple-icon.png"), "base64")}`;

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "84px 96px",
        background: "#f5f5f7",
        color: "#18181b",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <img src={photo} width={128} height={128} alt="" style={{ borderRadius: 9999 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -1.5 }}>{site.name}</div>
          <div style={{ fontSize: 30, color: "#71717a" }}>{site.role}</div>
        </div>
      </div>
      <div style={{ fontSize: 36, lineHeight: 1.35, color: "#3f3f46", maxWidth: 960 }}>{site.description}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#71717a" }}>
        <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#A8192F" }} />
        {site.url.replace("https://", "")}
      </div>
    </div>,
    size,
  );
}
