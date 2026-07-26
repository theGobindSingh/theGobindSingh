import {
  BlocksFeature,
  lexicalEditor,
  type FeatureProviderServer,
} from "@payloadcms/richtext-lexical";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

import { CalloutGridBlock } from "@/blocks/CalloutGridBlock";
import { CodeBlock } from "@/blocks/CodeBlock";
import { QuoteBlock } from "@/blocks/QuoteBlock";
import { RawHtmlBlock } from "@/blocks/RawHtmlBlock";
import { TableBlock } from "@/blocks/TableBlock";

/**
 * Shared with scripts/migrate-blogs.ts so seed/migration scripts build
 * richText content against the exact same block set as the admin editor.
 */
export const BlogsContentEditorFeatures = ({
  defaultFeatures,
}: {
  defaultFeatures: FeatureProviderServer<unknown, unknown, unknown>[];
}) => {
  return [
    ...defaultFeatures,
    BlocksFeature({
      blocks: [
        QuoteBlock,
        CodeBlock,
        TableBlock,
        CalloutGridBlock,
        RawHtmlBlock,
      ],
    }),
  ];
};

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate", "featured"],
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
          "Used in the URL: /blog/<slug>. Leave blank to generate from title.",
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
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: BlogsContentEditorFeatures,
      }),
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      defaultValue: () => {
        return new Date().toISOString();
      },
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "updatedDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
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
  ],
  hooks: {
    afterChange: [
      () => {
        // No-op outside a Next.js request (e.g. CLI/seed scripts) — there's
        // no static generation store to revalidate against.
        try {
          revalidateTag("blogs", "max");
        } catch {
          // ignore
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidateTag("blogs", "max");
        } catch {
          // ignore
        }
      },
    ],
  },
};
