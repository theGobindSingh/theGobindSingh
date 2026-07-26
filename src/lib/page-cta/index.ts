// eslint-disable-next-line camelcase -- next/cache exports this name
import { unstable_cache } from "next/cache";

import { getPageCtaPayload } from "./payload-client";
import type { PageCtaContent, PageCtaSlug } from "./types";

export const getPageCta = unstable_cache(
  async (page: PageCtaSlug): Promise<PageCtaContent> => {
    const payload = await getPageCtaPayload();
    const result = await payload.find({
      collection: "page-ctas",
      where: { page: { equals: page } },
      limit: 1,
      depth: 0,
    });
    const doc = result.docs[0];
    return {
      ...(doc?.title ? { title: doc.title } : {}),
      ...(doc?.description ? { description: doc.description } : {}),
      ...(doc?.label ? { label: doc.label } : {}),
      ...(doc?.coordinates ? { coordinates: doc.coordinates } : {}),
      ...(doc?.caption ? { caption: doc.caption } : {}),
    };
  },
  ["page-cta"],
  { tags: ["page-ctas"] },
);

export type { PageCtaContent, PageCtaSlug } from "./types";
