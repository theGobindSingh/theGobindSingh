import { revalidateTag } from "next/cache";
import type { Block, CollectionConfig } from "payload";

import { caseStudyBlocks } from "@/blocks/case-study";

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const sectionBlock: Block = {
  slug: "section",
  interfaceName: "CaseStudySection",
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "title", type: "text" },
    {
      name: "variant",
      type: "select",
      defaultValue: "default",
      options: [
        { label: "Default", value: "default" },
        { label: "Dim", value: "dim" },
        { label: "Inverted", value: "inverted" },
      ],
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "standard",
      options: [
        { label: "Standard", value: "standard" },
        { label: "Full width", value: "full-width" },
      ],
    },
    { name: "items", type: "blocks", blocks: caseStudyBlocks, required: true },
  ],
};

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "category", "featured"],
  },
  access: {
    read: () => {
      return true;
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "Used in the URL: /work/<slug>. Leave blank to generate from title.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value);
            if (data?.title) return slugify(data.title as string);
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "client",
      type: "text",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Build", value: "build" },
        { label: "Rebuild", value: "rebuild" },
        { label: "Integration", value: "integration" },
        { label: "Frontend", value: "frontend" },
      ],
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "stack",
      type: "text",
      hasMany: true,
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
        description: 'Leave blank if the engagement is ongoing ("Present").',
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Lower numbers sort first. Leave blank to sort last.",
      },
    },
    {
      name: "links",
      type: "group",
      fields: [
        { name: "github", type: "text" },
        { name: "live", type: "text" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "sections",
      type: "blocks",
      blocks: [sectionBlock],
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("case-studies", "max");
        } catch {
          // ignore — no static generation store outside a Next.js request
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidateTag("case-studies", "max");
        } catch {
          // ignore
        }
      },
    ],
  },
};
