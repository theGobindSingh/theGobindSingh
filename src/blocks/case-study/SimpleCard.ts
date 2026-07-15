import type { Block } from "payload";

export const SimpleCardBlock: Block = {
  slug: "simpleCard",
  interfaceName: "CaseStudySimpleCardBlock",
  labels: { singular: "Simple Card", plural: "Simple Cards" },
  fields: [
    { name: "chip", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "desc", type: "textarea", required: true },
  ],
};
