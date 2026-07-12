import {
  experienceData,
  projectData,
  testimonials,
  type WorkItem,
} from "@data";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
  type CaseStudyWithSlug,
} from "@lib/case-studies";

const byMostRecent = <T extends { sortDate: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    return b.sortDate.localeCompare(a.sortDate);
  });
};

export const caseStudiesSection = {
  title: "Case Studies",
  description:
    "Deeper looks at how I approach architecture, constraints, and shipping real systems.",
  items: getAllCaseStudies(),
};

export const projectsSection = {
  title: "Projects",
  description: "Independent projects, built and shipped end to end.",
  items: byMostRecent(projectData),
};

export const experienceSection = {
  title: "Experience",
  description:
    "Complexity is inevitable. Confusion is optional. I structure systems that teams can actually understand and scale.",
  items: byMostRecent(experienceData),
};

export const endorsementsSection = {
  title: "Endorsements",
  description: "What people I've worked with have to say.",
  testimonials,
};

export const ctaSection = {
  title: "Have something like this in mind?",
  description:
    "I'm currently available for freelance and full-time opportunities. Reach out and let's talk about what you're building.",
};

export type WorkDetailResult =
  | { kind: "case-study"; data: CaseStudyWithSlug }
  | { kind: "project"; data: WorkItem };

export const getWorkItemBySlug = (
  slug: string,
): WorkDetailResult | undefined => {
  const caseStudy = getCaseStudyBySlug(slug);
  if (caseStudy) {
    return { kind: "case-study", data: caseStudy };
  }

  const project = projectData.find((item) => {
    return item.slug === slug;
  });
  if (project) {
    return { kind: "project", data: project };
  }

  return undefined;
};

export const workItemSlugs: string[] = [
  ...getCaseStudySlugs(),
  ...projectData
    .map((item) => {
      return item.slug;
    })
    .filter((slug): slug is string => {
      return Boolean(slug);
    }),
];
