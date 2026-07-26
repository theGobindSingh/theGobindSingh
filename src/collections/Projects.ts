import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

import { slugField } from "./shared/slugify";
import { workItemFields } from "./shared/work-item-fields";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "timeframe"],
  },
  access: {
    read: () => {
      return true;
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("/work/<slug>"),
    {
      name: "category",
      type: "select",
      options: [
        { label: "Build", value: "build" },
        { label: "Rebuild", value: "rebuild" },
        { label: "Integration", value: "integration" },
        { label: "Frontend", value: "frontend" },
      ],
    },
    ...workItemFields,
  ],
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("projects", "max");
        } catch {
          // ignore — no static generation store outside a Next.js request
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidateTag("projects", "max");
        } catch {
          // ignore
        }
      },
    ],
  },
};
