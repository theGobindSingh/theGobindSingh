import Connect from "@app/contact/connect";
import { formSection } from "@app/contact/constants";
import Cta from "@app/contact/cta";
import ContactForm from "@app/contact/form";
import Hero from "@app/contact/hero";
import JsonLd from "@components/json-ld";
import Section from "@components/section";
import { fullName } from "@data";
import { SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Gobind Singh for freelance web development, full-time roles, or project inquiries. Based in Punjab, India, available remotely.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact | ${fullName}`,
    description:
      "Get in touch for freelance web development, full-time roles, or project inquiries. Based in Punjab, India, available remotely.",
    type: "website",
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${fullName}`,
    description:
      "Get in touch for freelance web development, full-time roles, or project inquiries.",
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
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
};

const ContactPage = () => {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <Hero />
      <Section
        title="Get in touch"
        description={formSection.description}
        wrapperProps={{
          "aria-label": "Contact form and details",
          id: "contact",
        }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Connect />
          </div>
          <div className="md:col-span-8 md:border-l md:border-grey-300 md:pl-12">
            <ContactForm />
          </div>
        </div>
      </Section>
      <Cta />
    </main>
  );
};

export default ContactPage;
