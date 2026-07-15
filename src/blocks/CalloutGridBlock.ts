import type { Block } from "payload";

export const CalloutGridBlock: Block = {
  slug: "calloutGrid",
  interfaceName: "CalloutGridBlock",
  labels: { singular: "Callout grid", plural: "Callout grids" },
  fields: [
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        {
          name: "accent",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Highlight this callout with the accent color.",
          },
        },
      ],
    },
  ],
};
