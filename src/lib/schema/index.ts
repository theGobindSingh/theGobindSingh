import {
  designation,
  email,
  firstName,
  fullName,
  lastName,
  professionalPhoto,
  skillCategories,
  skillsList,
  SOCIAL_KEYS,
  socialLinks,
  testimonials,
} from "@data";
import { SITE_URL } from "@lib/site-config";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const personDescription =
  "Full stack developer who designs and ships polished, performant web apps using React, Next.js, TypeScript, and Node.js.";

const sameAs = (Object.entries(socialLinks) as [SOCIAL_KEYS, { url: string }][])
  .filter(([key]) => {
    return key !== SOCIAL_KEYS.EMAIL;
  })
  .map(([, link]) => {
    return link.url;
  });

// Collapses near-duplicate skill names (e.g. "Turborepo" / "Turborepos",
// "Emotion" / "Emotion / CSS", "CI/CD" / "CI/CD Pipelines") that arise from
// skillsList and skillCategories using slightly different labels for the
// same skill, keeping the first occurrence's casing.
const normalizeSkill = (skill: string): string => {
  return skill
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+\/\s.*/, "")
    .replace(/\s+pipelines$/, "")
    .replace(/s$/, "")
    .trim();
};

const dedupeSkills = (skills: string[]): string[] => {
  const seen = new Set<string>();
  return skills.filter((skill) => {
    const key = normalizeSkill(skill);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const knowsAbout = dedupeSkills([
  ...skillsList,
  ...Object.values(skillCategories).flat(),
]);

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: fullName,
  givenName: firstName,
  familyName: lastName,
  url: SITE_URL,
  email,
  jobTitle: designation,
  description: personDescription,
  image: `${SITE_URL}${professionalPhoto.src}`,
  sameAs,
  knowsAbout,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "SRM Institute of Science and Technology",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
  },
  review: testimonials.map((testimonial) => {
    return {
      "@type": "Review",
      reviewBody: testimonial.quote,
      author: {
        "@type": "Person",
        name: testimonial.authorName,
        ...(testimonial.role ? { jobTitle: testimonial.role } : {}),
        ...(testimonial.company
          ? { worksFor: { "@type": "Organization", name: testimonial.company } }
          : {}),
      },
    };
  }),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: fullName,
  url: SITE_URL,
  description:
    "Portfolio of Gobind Singh, a full stack developer specializing in React, Next.js, TypeScript, and Node.js.",
  publisher: { "@id": PERSON_ID },
};
