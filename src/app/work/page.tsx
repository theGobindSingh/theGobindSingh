import CaseStudies from "@app/work/case-studies";
import Cta from "@app/work/cta";
import Endorsements from "@app/work/endorsements";
import Experience from "@app/work/experience";
import Projects from "@app/work/projects";
import JsonLd from "@components/json-ld";
import { fullName } from "@data";
import { OG_IMAGE, SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Case Studies, Projects & Track Record",
  description:
    "Case studies, shipped projects, and career track record from Gobind Singh, a full stack developer specializing in React, Next.js, TypeScript, and Node.js.",
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    title: `Work — Case Studies, Projects & Track Record | ${fullName}`,
    description:
      "Case studies, shipped projects, and career track record. See how I approach architecture, constraints, and shipping real systems.",
    type: "website",
    url: `${SITE_URL}/work`,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Work — Case Studies, Projects & Track Record | ${fullName}`,
    description:
      "Case studies, shipped projects, and career track record. See how I approach architecture, constraints, and shipping real systems.",
    images: [OG_IMAGE.url],
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
      name: "Work",
      item: `${SITE_URL}/work`,
    },
  ],
};

const collectionSchema = {
  "@type": "CollectionPage",
  name: "Work",
  url: `${SITE_URL}/work`,
  description:
    "Case studies, shipped projects, and career track record from Gobind Singh.",
  isPartOf: {
    "@type": "WebSite",
    name: fullName,
    url: SITE_URL,
  },
};

const WorkPage = () => {
  return (
    <main>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <CaseStudies titleNumber="01" />
      <Projects titleNumber="02" />
      <Experience titleNumber="03" />
      <Endorsements titleNumber="04" />
      <Cta />
    </main>
  );
};

export default WorkPage;
