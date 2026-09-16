import Endorsements from "@app/home/endorsements";
import HomeFreelance from "@app/home/freelance";
import Hero from "@app/home/hero";
import HomeManifesto from "@app/home/manifesto";
import HomeProjectsSection from "@app/home/projects";
import HomeSkills from "@app/home/skills";
import HomeWorkSection from "@app/home/work";
import JsonLd from "@components/json-ld";
import { personSchema, websiteSchema } from "@lib/schema";
import { SITE_URL } from "@lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gobind Singh — Full Stack Developer | React, Next.js & TypeScript",
  description:
    "Full stack developer based in Punjab, India. I build, rebuild, and integrate performant web apps using React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "full stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Node.js developer",
    "frontend engineer",
    "web developer India",
    "freelance developer",
    "Gobind Singh",
    "micro-frontend architecture",
    "monorepo",
    "web performance optimization",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Gobind Singh — Full Stack Developer | React, Next.js & TypeScript",
    description:
      "I build, rebuild, and integrate performant web apps. React, Next.js, TypeScript, and Node.js specialist with 3+ years of production experience.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Gobind Singh — Full Stack Developer | React, Next.js & TypeScript",
    description:
      "I build, rebuild, and integrate performant web apps. React, Next.js, TypeScript, and Node.js specialist.",
  },
};

const HomePage = () => {
  return (
    <main>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <Hero />
      <HomeWorkSection titleNumber="02" />
      <HomeManifesto titleNumber="03" />
      <HomeSkills titleNumber="04" />
      <HomeFreelance titleNumber="05" />
      <HomeProjectsSection titleNumber="06" />
      <Endorsements titleNumber="07" />
    </main>
  );
};

export default HomePage;
