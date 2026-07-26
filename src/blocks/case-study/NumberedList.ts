import type { Block } from "payload";

export const NumberedListBlock: Block = {
  slug: "numberedList",
  interfaceName: "CaseStudyNumberedListBlock",
  labels: { singular: "Numbered List", plural: "Numbered Lists" },
  fields: [{ name: "items", type: "text", hasMany: true, required: true }],
};
