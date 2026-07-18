import { freelanceData, projectData, type WorkItem } from "@data";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
  type CaseStudyWithSlug,
} from "@lib/case-studies";
import { getAllExperience } from "@lib/experience";

const byMostRecent = <T extends { sortDate: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    return b.sortDate.localeCompare(a.sortDate);
  });
};

export const freelanceSection = {
  title: "Freelance Work",
  description:
    "Client projects delivered end to end, from brief to production.",
  items: byMostRecent(freelanceData),
};

export const getCaseStudiesSection = async () => {
  return {
    title: "Case Studies",
    description:
      "Deeper looks at how I approach architecture, constraints, and shipping real systems.",
    items: await getAllCaseStudies(),
  };
};

export const projectsSection = {
  title: "Projects",
  description: "Independent projects, built and shipped end to end.",
  items: byMostRecent(projectData),
};

export const getExperienceSection = async () => {
  return {
    title: "Experience",
    description: "Where I've worked, and what I shipped there.",
    items: await getAllExperience(),
  };
};

export const workHero = {
  eyebrow: "Selected Work",
  titleLead: "Built to",
  titleAccent: "stay shipped.",
  description:
    "Client projects, case studies, and the track record behind them. Made to hold up after launch, not just through it.",
};

export const ctaSection = {
  title: "Have something like this in mind?",
  description:
    "I'm currently available for freelance and full-time opportunities. Reach out and let's talk about what you're building.",
};

export type WorkDetailResult =
  | { kind: "case-study"; data: CaseStudyWithSlug }
  | { kind: "project"; data: WorkItem };

export const getWorkItemBySlug = async (
  slug: string,
): Promise<WorkDetailResult | undefined> => {
  const caseStudy = await getCaseStudyBySlug(slug);
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

export const getWorkItemSlugs = async (): Promise<string[]> => {
  return [
    ...(await getCaseStudySlugs()),
    ...projectData
      .map((item) => {
        return item.slug;
      })
      .filter((slug): slug is string => {
        return Boolean(slug);
      }),
  ];
};
