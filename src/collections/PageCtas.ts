import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

// One doc per page's closing CTA section (not the site <footer>, hence
// "PageCtas" rather than "Cta(Footer)"). `about`/`work`/`blog` render through
// the shared AccentCta component (title + description); `contact` is a
// bespoke layout using label/coordinates/caption instead.
export const PageCtas: CollectionConfig = {
  slug: "page-ctas",
  admin: {
    useAsTitle: "page",
  },
  access: {
    read: () => {
      return true;
    },
  },
  fields: [
    {
      name: "page",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "About", value: "about" },
        { label: "Work", value: "work" },
        { label: "Blog", value: "blog" },
        { label: "Contact", value: "contact" },
      ],
    },
    {
      name: "title",
      type: "text",
      admin: { description: "Used by about/work/blog." },
    },
    {
      name: "description",
      type: "textarea",
      admin: { description: "Used by about/work/blog." },
    },
    {
      name: "label",
      type: "text",
      admin: { description: "Used by contact only." },
    },
    {
      name: "coordinates",
      type: "text",
      admin: { description: "Used by contact only." },
    },
    {
      name: "caption",
      type: "text",
      admin: { description: "Used by contact only." },
    },
  ],
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("page-ctas", "max");
        } catch {
          // ignore — no static generation store outside a Next.js request
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidateTag("page-ctas", "max");
        } catch {
          // ignore
        }
      },
    ],
  },
};
