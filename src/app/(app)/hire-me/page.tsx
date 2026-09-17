import { pageMetadata } from "@app/hire-me/constants";
import Contact from "@app/hire-me/contact";
import Engagement from "@app/hire-me/engagement";
import Faq from "@app/hire-me/faq";
import Hero from "@app/hire-me/hero";
import IdealClients from "@app/hire-me/ideal-clients";
import Process from "@app/hire-me/process";
import Proof from "@app/hire-me/proof";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@app/hire-me/schema";
import SelectedWork from "@app/hire-me/selected-work";
import Services from "@app/hire-me/services";
import Testimonials from "@app/hire-me/testimonials";
import WhyOnePerson from "@app/hire-me/why-one-person";
import JsonLd from "@components/json-ld";
import { fullName } from "@data";
import { personSchema } from "@lib/schema";
import { SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: {
    canonical: `${SITE_URL}${pageMetadata.canonicalPath}`,
  },
  openGraph: {
    title: `${pageMetadata.title} | ${fullName}`,
    description: pageMetadata.description,
    type: "website",
    url: `${SITE_URL}${pageMetadata.canonicalPath}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageMetadata.title} | ${fullName}`,
    description: pageMetadata.description,
  },
};

const HirePage = () => {
  return (
    <main>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqPageSchema} />
      <Hero />
      <Proof />
      <SelectedWork titleNumber="01" />
      <Services titleNumber="02" />
      <Process titleNumber="03" />
      <Testimonials titleNumber="04" />
      <WhyOnePerson titleNumber="05" />
      <IdealClients titleNumber="06" />
      <Engagement titleNumber="07" />
      <Faq titleNumber="08" />
      <Contact />
    </main>
  );
};

export default HirePage;
