import {
  caseStudies,
  experienceData,
  projectData,
  testimonials,
  type WorkItem,
} from "@data";

const byMostRecent = <T extends { sortDate: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    return b.sortDate.localeCompare(a.sortDate);
  });
};

export const caseStudiesSection = {
  title: "Case Studies",
  description:
    "Deeper looks at how I approach architecture, constraints, and shipping real systems.",
  items: byMostRecent(caseStudies),
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

const allWorkItems: WorkItem[] = [...caseStudies, ...projectData];

export const getWorkItemBySlug = (slug: string): WorkItem | undefined => {
  return allWorkItems.find((item) => {
    return item.slug === slug;
  });
};

export const workItemSlugs: string[] = allWorkItems
  .map((item) => {
    return item.slug;
  })
  .filter((slug): slug is string => {
    return Boolean(slug);
  });
