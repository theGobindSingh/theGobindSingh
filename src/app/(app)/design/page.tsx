import DesignBrowser from "@app/design/browser";
import JsonLd from "@components/json-ld";
import { fullName } from "@data";
import { SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "The live design system behind this portfolio: color ramps, type scale, spacing, elevation, motion, and layout tokens, browsable and searchable.",
  alternates: {
    canonical: `${SITE_URL}/design`,
  },
  openGraph: {
    title: `Design system | ${fullName}`,
    description:
      "Color ramps, type scale, spacing, elevation, motion, and layout tokens, browsable and searchable.",
    type: "website",
    url: `${SITE_URL}/design`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Design system | ${fullName}`,
    description:
      "Color ramps, type scale, spacing, elevation, motion, and layout tokens, browsable and searchable.",
  },
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Design system",
      item: `${SITE_URL}/design`,
    },
  ],
};

const DesignPage = () => {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <DesignBrowser />
    </>
  );
};

export default DesignPage;
