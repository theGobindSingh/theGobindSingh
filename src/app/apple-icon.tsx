import { ImageResponse } from "next/og";

// Must live at the app root, not in the (app) route group — same reasoning as
// icon.tsx.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same brand colors as src/lib/og/card.tsx's OG card.
const COLOR_BG = "#0b0e0f";
const COLOR_INK = "#f5f5f6";

const AppleIcon = () => {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: COLOR_BG,
        color: COLOR_INK,
        fontSize: 84,
        fontWeight: 700,
      }}
    >
      GS
    </div>,
    size,
  );
};

export default AppleIcon;
