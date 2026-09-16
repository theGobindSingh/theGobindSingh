import Approach from "@app/about/approach";
import Cta from "@app/about/cta";
import Faq from "@app/about/faq";
import { faqSection } from "@app/about/faq/constants";
import Hero from "@app/about/hero";
import Intro from "@app/about/intro";
import Stack from "@app/about/stack";
import Values from "@app/about/values";
import JsonLd from "@components/json-ld";
import { fullName } from "@data";
import { PERSON_ID, personSchema, websiteSchema } from "@lib/schema";
import { SITE_URL } from "@lib/site-config";
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
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${fullName}`,
    description: "Background, approach, stack, and values.",
  },
};

const profilePageSchema = {
  "@type": "ProfilePage",
  mainEntity: { "@id": PERSON_ID },
};

const faqPageSchema = {
  "@type": "FAQPage",
  mainEntity: faqSection.items.map(({ question, answer }) => {
    return {
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    };
  }),
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
      <JsonLd data={profilePageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqPageSchema} />
      <Hero />
      <Intro />
      <Approach titleNumber="01" />
      <Values titleNumber="02" />
      <Stack titleNumber="03" />
      <Faq titleNumber="04" />
      <Cta />
    </main>
  );
};

export default AboutPage;
