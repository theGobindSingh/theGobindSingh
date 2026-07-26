import type { Block } from "payload";

export const ChipListBlock: Block = {
  slug: "chipList",
  interfaceName: "CaseStudyChipListBlock",
  labels: { singular: "Chip List", plural: "Chip Lists" },
  fields: [{ name: "items", type: "text", hasMany: true, required: true }],
};
