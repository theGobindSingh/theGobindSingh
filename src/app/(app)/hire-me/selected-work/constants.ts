import { getAllFreelance, type FreelanceItem } from "@lib/freelance";

export const selectedWorkSection = {
  title: "A few things I've built",
  description: "Real projects, real code, and live products.",
  link: { label: "View all work", href: "/work" },
} as const;

// Page-local copy for /hire-me only. The CMS text is shared with /work, so the
// override is applied here, keyed by slug or title, and falls back to the CMS
// copy when nothing matches. The shared getter and card are never rewritten.
const copyOverrides: Record<
  string,
  { tagline: string; description: string; chips: string[] }
> = {
  "CleanTank Services": {
    tagline:
      "A production site built to turn visitors into service quotes and franchise leads.",
    description:
      "A multi-page Next.js site for an industrial water-tank cleaning company serving hospitals, government bodies, and franchise partners across India. Separate quote and franchise funnels, and a Contentful-backed content system so the team can update copy and photos without a developer.",
    chips: ["Next.js", "Contentful", "Lead generation"],
  },
  "Bakery Storefront Template": {
    tagline: "A reusable storefront for boutique bakeries.",
    description:
      "A themeable ordering experience built once to re-skin for new bakery clients instead of rebuilding the same flow each time, with WhatsApp ordering built into it.",
    chips: ["Next.js", "Ecommerce UI", "WhatsApp ordering"],
  },
};

export const withHireMeCopy = (item: FreelanceItem) => {
  const override = copyOverrides[item.slug] ?? copyOverrides[item.title];
  return override ? { ...item, ...override } : item;
};

// A CMS outage or an empty collection must not take the ad landing page down.
// Local guard only: the shared getter is never modified.
export const getSelectedWork = async (): Promise<FreelanceItem[]> => {
  try {
    return (await getAllFreelance()).slice(0, 2);
  } catch {
    return [];
  }
};
