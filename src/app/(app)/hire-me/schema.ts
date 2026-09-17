import { pageMetadata } from "@app/hire-me/constants";
import { faqSection } from "@app/hire-me/faq/constants";
import { servicesSection } from "@app/hire-me/services/constants";
import { PERSON_ID, WEBSITE_ID } from "@lib/schema";
import { SITE_URL } from "@lib/site-config";

export const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Hire a React Developer",
      item: `${SITE_URL}/hire-me`,
    },
  ],
};

export const webPageSchema = {
  "@type": "WebPage",
  "@id": `${SITE_URL}/hire-me#webpage`,
  url: `${SITE_URL}/hire-me`,
  name: pageMetadata.title,
  description: pageMetadata.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  primaryEntity: { "@id": PERSON_ID },
  inLanguage: "en",
};

export const serviceSchema = {
  "@type": "Service",
  provider: { "@id": PERSON_ID },
  serviceType: "React and Next.js Development",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Singapore" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: servicesSection.title,
    itemListElement: servicesSection.items.map((item) => {
      return {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
        },
      };
    }),
  },
};

export const faqPageSchema = {
  "@type": "FAQPage",
  mainEntity: faqSection.items.map(({ question, answer }) => {
    return {
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    };
  }),
};
