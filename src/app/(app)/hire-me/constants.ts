import { email } from "@data";

export const pageMetadata = {
  title: "Hire a React & Next.js Developer",
  description:
    "Looking to hire a React or Next.js developer? I'm Gobind Singh, a full stack engineer in Punjab, India. Three years in production, and I reply in a day.",
  canonicalPath: "/hire-me",
} as const;

// wa.me wants country code + number with no separators.
const whatsappDigits = "919415507316";
// Display form of the same number, for showing on the page.
export const whatsappNumber = "+91 9415507316";
// Visitor's voice: they are the sender. Assumes nothing about budget, timeline,
// or project type, so one prefill works from any entry point.
const whatsappPrefill =
  "Hi Gobind, I found your site and I'm looking for a developer. Can we talk about my project?";

export const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappPrefill)}`;

export const emailHref = `mailto:${email}?subject=${encodeURIComponent("Project enquiry via thegobindsingh.com")}`;

export const whatsappCtaLabel = "Message me on WhatsApp";

export const heroSection = {
  eyebrow: "AVAILABLE FOR FREELANCE WORK",
  title: "Hire a React & Next.js developer who works directly with you.",
  subhead:
    "I'm Gobind Singh. I build and improve production web applications with React, Next.js, TypeScript, and Node.js.",
  credibility:
    "No agency, no account manager, no handoff between sales and development.",
  availability:
    "Based in India. Available for remote freelance work worldwide.",
  microcopy: "No pitch. I usually reply within 24 hours.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See my work", href: "#selected-work" },
};
