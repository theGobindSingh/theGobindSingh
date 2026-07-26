import CaseStudies from "@app/work/case-studies";
import DeepLinkOpener from "@app/work/components/deep-link-opener";
import Cta from "@app/work/cta";
import Experience from "@app/work/experience";
import Freelance from "@app/work/freelance";
import Hero from "@app/work/hero";
import Projects from "@app/work/projects";
import JsonLd from "@components/json-ld";
import { fullName } from "@data";
import { SITE_URL } from "@lib/site-config";
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
  },
  twitter: {
    card: "summary_large_image",
    title: `Work — Case Studies, Projects & Track Record | ${fullName}`,
    description:
      "Case studies, shipped projects, and career track record. See how I approach architecture, constraints, and shipping real systems.",
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
      <DeepLinkOpener />
      <Hero />
      <Freelance titleNumber="01" />
      <CaseStudies titleNumber="02" />
      <Projects titleNumber="03" />
      <Experience titleNumber="04" />
      <Cta />
    </main>
  );
};

export default WorkPage;
