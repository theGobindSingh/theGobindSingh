// eslint-disable-next-line camelcase -- next/cache exports this name
import { unstable_cache } from "next/cache";

import type { Experience } from "@/payload-types";

import { getExperiencePayload } from "./payload-client";
import type { ExperienceItem } from "./types";

const toItem = (doc: Experience): ExperienceItem => {
  return {
    company: doc.company,
    position: doc.position,
    website: doc.website,
    timeframe: {
      start: doc.timeframeStart,
      end: doc.timeframeEnd ?? null,
    },
    responsibilities: doc.responsibilities,
    ...(doc.otherPositions && doc.otherPositions.length > 0
      ? { otherPositions: doc.otherPositions }
      : {}),
  };
};

export const getAllExperience = unstable_cache(
  async (): Promise<ExperienceItem[]> => {
    const payload = await getExperiencePayload();
    const result = await payload.find({
      collection: "experience",
      limit: 0,
      pagination: false,
      depth: 0,
      sort: "-timeframeStart",
    });
    return result.docs.map(toItem);
  },
  ["experience-all"],
  { tags: ["experience"] },
);

export { formatExperienceTimeframe } from "./format";
export type { ExperienceItem, ExperienceTimeframe } from "./types";
