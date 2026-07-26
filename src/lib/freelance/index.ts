// eslint-disable-next-line camelcase -- next/cache exports this name
import { unstable_cache } from "next/cache";

import type { Freelance as PayloadFreelanceDoc } from "@/payload-types";

import { freelanceImages } from "./images";
import { getFreelancePayload } from "./payload-client";
import type { FreelanceItem } from "./types";

const toImage = (group?: { fileName?: string | null; alt?: string | null }) => {
  const src = group?.fileName ? freelanceImages[group.fileName] : undefined;
  return src ? { src, alt: group?.alt ?? "" } : undefined;
};

const toItem = (doc: PayloadFreelanceDoc): FreelanceItem => {
  const image = toImage(doc.image ?? undefined);
  const imageMobile = toImage(doc.imageMobile ?? undefined);

  return {
    type: "project",
    category: "freelance",
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    stack: doc.stack ?? [],
    timeframe: doc.timeframe,
    sortDate: doc.sortDate,
    problem: doc.problem,
    approach: doc.approach,
    outcome: doc.outcome,
    ...(doc.metrics && doc.metrics.length > 0 ? { metrics: doc.metrics } : {}),
    ...(doc.links && (doc.links.github ?? doc.links.live)
      ? {
          links: {
            ...(doc.links.github ? { github: doc.links.github } : {}),
            ...(doc.links.live ? { live: doc.links.live } : {}),
          },
        }
      : {}),
    ...(image ? { image } : {}),
    ...(imageMobile ? { imageMobile } : {}),
  };
};

export const getAllFreelance = unstable_cache(
  async (): Promise<FreelanceItem[]> => {
    const payload = await getFreelancePayload();
    const result = await payload.find({
      collection: "freelance",
      limit: 0,
      pagination: false,
      depth: 0,
      sort: "-sortDate",
    });
    return result.docs.map(toItem);
  },
  ["freelance-all"],
  { tags: ["freelance"] },
);

export type { FreelanceItem } from "./types";
