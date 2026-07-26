import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "position", "timeframeStart"],
  },
  access: {
    read: () => {
      return true;
    },
  },
  fields: [
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "otherPositions",
      type: "text",
      hasMany: true,
      admin: {
        description:
          'Earlier titles at this company, oldest first, e.g. "Intern" → "Associate SDE" → "SDE".',
      },
    },
    {
      name: "website",
      type: "text",
      required: true,
    },
    {
      name: "timeframeStart",
      type: "date",
      required: true,
    },
    {
      name: "timeframeEnd",
      type: "date",
      admin: {
        description: "Leave blank if there is no end date.",
      },
    },
    {
      name: "ongoing",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          'Still working here — shows "Present" as the end date, even if an end date is set above.',
      },
    },
    {
      name: "responsibilities",
      type: "text",
      hasMany: true,
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("experience", "max");
        } catch {
          // ignore — no static generation store outside a Next.js request
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidateTag("experience", "max");
        } catch {
          // ignore
        }
      },
    ],
  },
};
