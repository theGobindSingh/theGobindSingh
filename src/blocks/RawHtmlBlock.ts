import type { Block } from "payload";

export const RawHtmlBlock: Block = {
  slug: "rawHtml",
  interfaceName: "RawHtmlBlock",
  labels: { singular: "Raw HTML", plural: "Raw HTML" },
  fields: [
    {
      name: "html",
      type: "textarea",
      required: true,
      admin: {
        description:
          "Escape hatch for one-off embeds (e.g. inline diagrams) that don't fit the standard blocks. Rendered verbatim.",
      },
    },
  ],
};
