// eslint-disable-next-line camelcase -- next/cache exports this name
import { unstable_cache } from "next/cache";

import { mapCaseStudy } from "./map";
import { getCaseStudyPayload } from "./payload-client";
import type { CaseStudy, CaseStudyWithSlug } from "./types";

export const getCaseStudySlugs = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getCaseStudyPayload();
    const result = await payload.find({
      collection: "case-studies",
      limit: 0,
      pagination: false,
      depth: 0,
    });
    return result.docs.map((doc) => {
      return doc.slug;
    });
  },
  ["case-study-slugs"],
  { tags: ["case-studies"] },
);

export const getCaseStudyBySlug = unstable_cache(
  async (slug: string): Promise<CaseStudyWithSlug | undefined> => {
    const payload = await getCaseStudyPayload();
    const result = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    const doc = result.docs[0];
    return doc ? mapCaseStudy(doc) : undefined;
  },
  ["case-study-by-slug"],
  { tags: ["case-studies"] },
);

const byOrder = (a: CaseStudyWithSlug, b: CaseStudyWithSlug): number => {
  return (
    (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  );
};

export const getAllCaseStudies = unstable_cache(
  async (): Promise<CaseStudyWithSlug[]> => {
    const payload = await getCaseStudyPayload();
    const result = await payload.find({
      collection: "case-studies",
      limit: 0,
      pagination: false,
      depth: 2,
    });
    return result.docs.map(mapCaseStudy).sort(byOrder);
  },
  ["case-study-all"],
  { tags: ["case-studies"] },
);

export const formatCaseStudyTimeframe = (
  timeframe: CaseStudy["timeframe"],
): string => {
  const format = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const start = format(timeframe.start);
  const end = timeframe.end ? format(timeframe.end) : "Present";
  return `${start} — ${end}`;
};

// CMS titles arrive as "Name — thesis". The thesis earns its place inside the
// case study but buries the subject on a card, so split it into a heading plus
// a subtitle. Titles without a dash come back unchanged and subtitle-less.
export const splitCaseStudyTitle = (
  title: string,
): { heading: string; subtitle: string | null } => {
  const [heading, ...rest] = title.split(/\s+[—–-]\s+/);
  return {
    heading: heading ?? title,
    subtitle: rest.length > 0 ? rest.join(" — ") : null,
  };
};

export type {
  Block,
  CaseStudy,
  CaseStudySection,
  CaseStudyWithSlug,
} from "./types";
