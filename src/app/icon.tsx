import { ImageResponse } from "next/og";

// Must live at the app root, not in the (app) route group — Next resolves the
// icon convention against the effective root layout, and a route-group-scoped
// file wouldn't cover routes under the sibling (payload) group.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Same brand colors as src/lib/og/card.tsx's OG card.
const COLOR_BG = "#0b0e0f";
const COLOR_INK = "#f5f5f6";

const Icon = () => {
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
        fontSize: 20,
        fontWeight: 700,
      }}
    >
      GS
    </div>,
    size,
  );
};

export default Icon;
