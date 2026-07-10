import Approach from "@app/about/approach";
import Cta from "@app/about/cta";
import Hero from "@app/about/hero";
import Intro from "@app/about/intro";
import Stack from "@app/about/stack";
import Values from "@app/about/values";
import JsonLd from "@components/json-ld";
import { email, fullName, SOCIAL_KEYS, socialLinks } from "@data";
import { OG_IMAGE, SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Gobind Singh works: background, approach, stack, and values. Full stack developer based in Punjab, India.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About | ${fullName}`,
    description: "Background, approach, stack, and values.",
    type: "website",
    url: `${SITE_URL}/about`,
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
    title: `About | ${fullName}`,
    description: "Background, approach, stack, and values.",
    images: [OG_IMAGE.url],
  },
};

const personSchema = {
  "@type": "Person",
  name: fullName,
  url: `${SITE_URL}/about`,
  email,
  jobTitle: "Full Stack Developer",
  description:
    "Full stack developer who designs and ships polished, performant web apps using React, Next.js, TypeScript, and Node.js.",
  image: `${SITE_URL}/assets/images/me.jpeg`,
  sameAs: [
    socialLinks[SOCIAL_KEYS.LINKEDIN]?.url,
    socialLinks[SOCIAL_KEYS.GITHUB]?.url,
  ].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
};

const websiteSchema = {
  "@type": "WebSite",
  name: fullName,
  url: SITE_URL,
  description:
    "Portfolio of Gobind Singh, a full stack developer specializing in React, Next.js, TypeScript, and Node.js.",
  publisher: {
    "@type": "Person",
    name: fullName,
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
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
};

const AboutPage = () => {
  return (
    <main>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero />
      <Intro />
      <Approach titleNumber="01" />
      <Values titleNumber="02" />
      <Stack titleNumber="03" />
      <Cta />
    </main>
  );
};

export default AboutPage;
