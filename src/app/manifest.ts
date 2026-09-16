import { fullName } from "@data";
import { SITE_DESCRIPTION, SITE_NAME } from "@lib/site-config";
import type { MetadataRoute } from "next";

// Must live at the app root, not in the (app) route group — Next does not resolve
// manifest.ts inside a route group, and it silently 404s rather than erroring.
const manifest = (): MetadataRoute.Manifest => {
  /* eslint-disable camelcase -- Web App Manifest keys are spec-mandated snake_case */
  return {
    name: fullName,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    // Hex value derived from --color-grey-50-base in the .dark block of
    // src/styles/globals.css (hsl(204, 17.5%, 5%)) — the <html> element
    // defaults to the dark class, and a manifest can't reference CSS custom
    // properties.
    background_color: "#0b0d0f",
    theme_color: "#0b0d0f",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
};

export default manifest;
