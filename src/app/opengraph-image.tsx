import { ImageResponse } from "next/og";

import { siteConfig } from "@/shared/config/site";

export const alt = "Website overview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#173c32",
        color: "white",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 32 }}>
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 32, lineHeight: 1.5 }}>
        {siteConfig.description}
      </div>
    </div>,
    size,
  );
}
