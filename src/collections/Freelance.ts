import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

import { slugField } from "./shared/slugify";
import { workItemFields } from "./shared/work-item-fields";

// ponytail: images stay as static Next imports keyed by filename (see
// src/lib/freelance/images.ts) instead of Payload media uploads — Payload
// only stores which file to use. Upgrade to `upload`/media relation fields
// if freelance covers need editing without a code deploy.
const imageGroup = (name: string) => {
  return {
    name,
    type: "group" as const,
    fields: [
      {
        name: "fileName",
        type: "text" as const,
        admin: {
          description:
            "Filename in public/assets/images (e.g. cleantank-site.png). Must also be registered in src/lib/freelance/images.ts.",
        },
      },
      { name: "alt", type: "text" as const },
    ],
  };
};

export const Freelance: CollectionConfig = {
  slug: "freelance",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "timeframe"],
  },
  access: {
    read: () => {
      return true;
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("/work/<slug>"),
    ...workItemFields,
    imageGroup("image"),
    imageGroup("imageMobile"),
  ],
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("freelance", "max");
        } catch {
          // ignore — no static generation store outside a Next.js request
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidateTag("freelance", "max");
        } catch {
          // ignore
        }
      },
    ],
  },
};
