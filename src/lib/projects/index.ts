// eslint-disable-next-line camelcase -- next/cache exports this name
import { unstable_cache } from "next/cache";

import type { Project } from "@/payload-types";

import { getProjectsPayload } from "./payload-client";
import type { ProjectItem } from "./types";

const toItem = (doc: Project): ProjectItem => {
  return {
    type: "project",
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    stack: doc.stack ?? [],
    timeframe: doc.timeframe,
    sortDate: doc.sortDate,
    problem: doc.problem,
    approach: doc.approach,
    outcome: doc.outcome,
    ...(doc.category ? { category: doc.category } : {}),
    ...(doc.metrics && doc.metrics.length > 0 ? { metrics: doc.metrics } : {}),
    ...(doc.links && (doc.links.github ?? doc.links.live)
      ? {
          links: {
            ...(doc.links.github ? { github: doc.links.github } : {}),
            ...(doc.links.live ? { live: doc.links.live } : {}),
          },
        }
      : {}),
  };
};

export const getAllProjects = unstable_cache(
  async (): Promise<ProjectItem[]> => {
    const payload = await getProjectsPayload();
    const result = await payload.find({
      collection: "projects",
      limit: 0,
      pagination: false,
      depth: 0,
      sort: "-sortDate",
    });
    return result.docs.map(toItem);
  },
  ["projects-all"],
  { tags: ["projects"] },
);

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<ProjectItem | undefined> => {
    const payload = await getProjectsPayload();
    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    const doc = result.docs[0];
    return doc ? toItem(doc) : undefined;
  },
  ["project-by-slug"],
  { tags: ["projects"] },
);

export const getProjectSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getProjectsPayload();
    const result = await payload.find({
      collection: "projects",
      limit: 0,
      pagination: false,
      depth: 0,
    });
    return result.docs.map((doc) => {
      return doc.slug;
    });
  },
  ["project-slugs"],
  { tags: ["projects"] },
);

export type { ProjectItem } from "./types";
