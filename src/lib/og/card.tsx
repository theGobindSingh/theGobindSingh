import { designation, fullName } from "@data";
import { SITE_URL } from "@lib/site-config";
import { ImageResponse } from "next/og";

export const OG_ALT = "Gobind Singh — Full Stack Developer portfolio";
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const COLOR_BG = "#0b0e0f";
const COLOR_INK = "#f5f5f6";
const COLOR_MUTED = "#cbd0d3";
const COLOR_ACCENT = "#f04600";

const TAGS = ["React", "Next.js", "TypeScript", "Node.js", "NestJS"];

const loadGoogleFont = async (family: string, weight: number) => {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
    )
  ).text();
  const src = /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/.exec(css);
  if (!src?.[1]) throw new Error(`Could not load font: ${family}`);
  const res = await fetch(src[1]);
  return res.arrayBuffer();
};

export const renderOgCard = async () => {
  const [anton, epilogue] = await Promise.all([
    loadGoogleFont("Anton", 400),
    loadGoogleFont("Epilogue", 600),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: COLOR_BG,
        padding: "5%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `3px solid ${COLOR_INK}`,
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Epilogue",
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: COLOR_MUTED,
          }}
        >
          <div style={{ display: "flex" }}>
            {SITE_URL.replace("https://", "")}
          </div>
          <div style={{ display: "flex", color: COLOR_ACCENT }}>
            Available for work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Anton",
              fontWeight: 400,
              fontSize: 108,
              lineHeight: 1,
              letterSpacing: -2,
              color: COLOR_INK,
            }}
          >
            {fullName}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Epilogue",
              fontWeight: 600,
              fontSize: 42,
              color: COLOR_MUTED,
              marginTop: 20,
            }}
          >
            {designation}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Epilogue",
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: COLOR_MUTED,
          }}
        >
          {TAGS.join(" · ")}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Epilogue", data: epilogue, weight: 600, style: "normal" },
      ],
    },
  );
};
