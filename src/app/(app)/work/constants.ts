import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
  type CaseStudyWithSlug,
} from "@lib/case-studies";
import { getAllExperience } from "@lib/experience";
import { getAllFreelance } from "@lib/freelance";
import { getPageCta } from "@lib/page-cta";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
  type ProjectItem,
} from "@lib/projects";

export const getFreelanceSection = async () => {
  return {
    title: "Freelance Work",
    description:
      "Client projects delivered end to end, from brief to production.",
    items: await getAllFreelance(),
  };
};

export const getCaseStudiesSection = async () => {
  return {
    title: "Case Studies",
    description:
      "Deeper looks at how I approach architecture, constraints, and shipping real systems.",
    items: await getAllCaseStudies(),
  };
};

export const getProjectsSection = async () => {
  return {
    title: "Projects",
    description: "Independent projects, built and shipped end to end.",
    items: await getAllProjects(),
  };
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

export const getWorkCta = async () => {
  return getPageCta("work");
};

export type WorkDetailResult =
  | { kind: "case-study"; data: CaseStudyWithSlug }
  | { kind: "project"; data: ProjectItem };

export const getWorkItemBySlug = async (
  slug: string,
): Promise<WorkDetailResult | undefined> => {
  const caseStudy = await getCaseStudyBySlug(slug);
  if (caseStudy) {
    return { kind: "case-study", data: caseStudy };
  }

  const project = await getProjectBySlug(slug);
  if (project) {
    return { kind: "project", data: project };
  }

  return undefined;
};

export const getWorkItemSlugs = async (): Promise<string[]> => {
  return [...(await getCaseStudySlugs()), ...(await getProjectSlugs())];
};
