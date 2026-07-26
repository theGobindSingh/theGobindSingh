import cleantankMobileImage from "@images/cleantank-mobile.png";
import cleantankImage from "@images/cleantank-site.png";
import type { StaticImageData } from "next/image";

// ponytail: Payload's Freelance docs store an image *filename*, resolved here
// to the actual Next static import (so next/image keeps its blur placeholder
// and intrinsic size). Adding a new freelance cover means adding the static
// import + entry here AND setting the matching filename in the admin panel.
export const freelanceImages: Record<string, StaticImageData> = {
  "cleantank-site.png": cleantankImage,
  "cleantank-mobile.png": cleantankMobileImage,
};
